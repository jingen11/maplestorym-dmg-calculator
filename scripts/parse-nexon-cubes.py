#!/usr/bin/env python3
"""Scrape Nexon's cube probability pages into lib/data/cubes.json.

One page per equipment part (see PAGES). Each page carries up to two
Word-pasted tables, both laid out as two option pools side by side:

  Potential table          Bonus Potential table
    cols 0-2  First          cols 0-3  group label, option, value, prob
    cols 4-6  Second/Third   cols 5-8  same, for the other pool

The Potential table is split into rank sections by a "Potential Rank"
header row; the Bonus Potential table instead encodes rank and pool in a
label column ("... First Bonus Potential (Legendary)"). Accessory pages
titled "Cube (X)" have no Bonus Potential table at all.

Option names are interned into a shared string table and rows are emitted
as [optionIndex, value, prob] so the JSON stays small enough to ship to
the client — the expanded form is roughly 5x larger.

The rank-up chances are published only as embedded images, so they are
transcribed in RANK_UP below rather than parsed.

Usage:
    python3 scripts/parse-nexon-cubes.py <html-dir> <out.json>

where <html-dir> holds "<pageId>.html" for each page in PAGES:
    curl -s "https://m.nexon.com/probability/6438?language=en" -o 6438.html

Requires: beautifulsoup4, lxml
"""

import json
import os
import re
import sys
from collections import OrderedDict

from bs4 import BeautifulSoup

BASE = "https://m.nexon.com/probability/{}?language=en"

# Page id -> equipment part, in the order they should appear in the UI.
PAGES = OrderedDict(
    [
        (6438, "Weapon"),
        (6458, "Signet"),
        (6439, "Hat"),
        (6440, "Outfit"),
        (6441, "Top"),
        (6442, "Bottom"),
        (6443, "Gloves"),
        (6444, "Shoes"),
        (6450, "Shoulders"),
        (6451, "Belt"),
        (6452, "Cape"),
        (6456, "Mechanical Heart"),
        (6454, "Pendant"),
        (6455, "Ring"),
        (6457, "Pocket"),
    ]
)

RANKS = ["Rare", "Epic", "Unique", "Legendary"]

# Rank-up chance per cube use, transcribed from the page's embedded images.
RANK_UP = {
    "potential": {
        "Occult Cube / Red Cube": 1.0,
        "Black Cube / Choice Cube": 2.0,
    },
    "bonus": {
        "Bonus Mystical Cube / Bonus Potential Cube": 1.0,
        "Bonus Bright Cube / Bonus Choice Cube": 2.0,
    },
}

BONUS_LABEL = re.compile(r"(First|Second/Third) Bonus Potential \((\w+)\)")


def cell(td):
    text = td.get_text(" ", strip=True).replace("\xa0", " ")
    return re.sub(r"\s+", " ", text).strip()


def to_grid(table):
    rows = []
    for tr in table.find_all("tr"):
        row = []
        for td in tr.find_all(["td", "th"]):
            row.append(cell(td))
            row.extend("" for _ in range(int(td.get("colspan", 1) or 1) - 1))
        rows.append(row)
    return rows


def prob(s):
    s = s.strip()
    return round(float(s.rstrip("%")), 4) if s.endswith("%") else None


def empty_pools():
    return {r: {"first": [], "second": []} for r in RANKS}


def split_row(row, tail):
    """Split a two-pool row into its left and right halves.

    Column counts are not constant: some rows carry a duplicated value cell
    (['Max HP', '3.24%', '3.24%', '1.36%', ...]), which shifts every fixed
    index and silently reads the duplicate as the probability. The halves
    are separated by one blank cell, so slicing a fixed-width tail off the
    right and taking the rest as the left survives the extra column. Within
    a half, callers anchor on the edges: the probability is always last and
    the value second to last.
    """
    if len(row) < tail * 2 + 1:
        return None, None
    right = row[-tail:]
    left = row[: len(row) - tail - 1]
    if len(left) < tail:
        return None, None
    return left, right


def find_grid(grids, matches):
    """First grid with a row satisfying `matches` — see the caller's note."""
    for g in grids:
        if any(r and matches(r) for r in g[:4]):
            return g
    return None


def title(soup):
    tag = soup.select_one(".navbar-brand span")
    return tag.get_text(strip=True) if tag else ""


def parse_potential(grid):
    """Rank sections keyed by 'Potential Rank' header rows."""
    pools = empty_pools()
    starts = [i for i, r in enumerate(grid) if r and r[0] == "Potential Rank"]
    for n, start in enumerate(starts):
        rank = grid[start][2]
        end = starts[n + 1] if n + 1 < len(starts) else len(grid)
        if rank not in pools:
            continue
        for row in grid[start + 3 : end]:  # +3 skips the two header rows
            left, right = split_row(row, tail=3)
            for key, half in (("first", left), ("second", right)):
                if not half:
                    continue
                option, value, p = half[0], half[-2], half[-1]
                if option and prob(p) is not None:
                    pools[rank][key].append((option, value, prob(p)))
    return pools


def parse_bonus(grid):
    """Rank and pool come from the label column, not from section headers."""
    pools = empty_pools()
    for row in grid[1:]:
        # Same edge-anchored split, but each half leads with a label cell.
        left, right = split_row(row, tail=4)
        for half in (left, right):
            if not half:
                continue
            label, option, value, p = half[0], half[1], half[-2], half[-1]
            m = BONUS_LABEL.search(label)
            if not m or prob(p) is None:
                continue
            rank = m.group(2)
            if rank not in pools:
                continue
            key = "first" if m.group(1) == "First" else "second"
            pools[rank][key].append((option, value, prob(p)))
    return pools


def validate(part, kind, pools):
    """Each rank/pool is one draw, so its probabilities must total ~100%."""
    ok = True
    for rank in RANKS:
        for key in ("first", "second"):
            rows = pools[rank][key]
            total = sum(r[2] for r in rows)
            if rows and abs(total - 100) > 1.5:
                print(
                    f"  WARN {part}/{kind}/{rank}/{key} totals {total:.2f}%",
                    file=sys.stderr,
                )
                ok = False
    return ok


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src_dir, out_path = sys.argv[1], sys.argv[2]

    options: "OrderedDict[str, int]" = OrderedDict()

    def intern(name):
        if name not in options:
            options[name] = len(options)
        return options[name]

    parts, clean = {}, True
    for page_id, part in PAGES.items():
        path = os.path.join(src_dir, f"{page_id}.html")
        if not os.path.exists(path):
            print(f"  skip {part}: {path} missing", file=sys.stderr)
            continue
        with open(path, encoding="utf-8", errors="replace") as f:
            soup = BeautifulSoup(f.read(), "lxml")
        grids = [to_grid(t) for t in soup.find_all("table")]
        # Select by header, not position: several pages nest single-cell
        # <table> fragments inside data cells (Outfit has 14 tables, only
        # two of which carry data), so tables[1] is not reliably the bonus
        # table. Real tables are identified by their header row.
        potential_grid = find_grid(grids, lambda r: r[0] == "Potential Rank")
        bonus_grid = find_grid(grids, lambda r: r[0] == "Equipment Type (Rank)")

        if potential_grid is None:
            print(f"  WARN {part}: no potential table", file=sys.stderr)
            clean = False
            continue

        potential = parse_potential(potential_grid)
        clean &= validate(part, "potential", potential)
        entry = {"pageId": page_id, "potential": encode(potential, intern)}

        # Accessory pages ("Cube (Ring)") genuinely have no bonus table.
        has_bonus = "Bonus Potential Cube" in title(soup)
        if bonus_grid is not None:
            bonus = parse_bonus(bonus_grid)
            if any(bonus[r][k] for r in RANKS for k in ("first", "second")):
                clean &= validate(part, "bonus", bonus)
                entry["bonus"] = encode(bonus, intern)
        if has_bonus and "bonus" not in entry:
            print(f"  WARN {part}: page offers bonus potential but none parsed", file=sys.stderr)
            clean = False
        parts[part] = entry

    doc = {
        "source": BASE.format("<id>"),
        "sourceLabel": "Nexon official probability disclosure — Cube",
        "ranks": RANKS,
        "rankUp": RANK_UP,
        "notes": [
            "The item's Potential Rank is set by its first potential.",
            "Occult, Red, Black and Choice Cubes differ only in function — the option probabilities are identical.",
            "Second and third potential lines roll from a different, larger pool than the first line.",
            "Individual probabilities are rounded to two decimal places, so a pool may not total exactly 100%.",
        ],
        "options": list(options.keys()),
        "parts": parts,
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, separators=(",", ":"))

    rows = sum(
        len(v)
        for p in parts.values()
        for kind in ("potential", "bonus")
        if kind in p
        for rank in p[kind].values()
        for v in rank.values()
    )
    print(
        f"{len(parts)} parts, {len(options)} distinct options, {rows} rows "
        f"-> {out_path} ({os.path.getsize(out_path) // 1024} KB)",
        file=sys.stderr,
    )
    print("all pools ~100%:", clean, file=sys.stderr)


def encode(pools, intern):
    return {
        rank: {
            key: [[intern(o), v, p] for o, v, p in rows]
            for key, rows in slots.items()
            if rows
        }
        for rank, slots in pools.items()
    }


if __name__ == "__main__":
    main()
