#!/usr/bin/env python3
"""Scrape a Nexon probability-disclosure page into lib/data/*.json.

Nexon publishes these tables as Word-pasted HTML (`MsoNormalTable`) inside an
otherwise script-heavy page, so the whole table is present in the raw HTML —
no browser needed. Layout is one wide table per page:

    row 0        slot name | Rare |    | Epic |    | ...   (rarity spans 2 cols)
    row 1        "Option"  | Value | Prob. | Value | Prob. | ...
    rows 2..n    option    | 0.20% | 1.67% | ...
    then the next slot's header row repeats, and so on.

Sections are detected by "a row whose second cell is the first rarity".

Usage:
    python3 scripts/parse-nexon-probability.py <url|file.html> <out.json>

Accepts a saved file as well as a URL, since a TLS-inspecting proxy can make
Python's urllib fail where curl succeeds:

    curl -sL "<url>" -o page.html
    python3 scripts/parse-nexon-probability.py page.html out.json

Requires: beautifulsoup4, lxml  (pip3 install beautifulsoup4 lxml)

Note: some numbers on these pages live in embedded base64 <img> tags rather
than the table (for Rebirth Flame, the 1-vs-2 option chances). Those must be
read off the image by hand — see `twoOptionChance` in flames.json.
"""

import json
import re
import sys
import urllib.request

from bs4 import BeautifulSoup

RARITIES = ["Rare", "Epic", "Unique", "Legendary", "Mythic"]
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"


def fetch(src: str) -> str:
    if not src.startswith(("http://", "https://")):
        with open(src, encoding="utf-8", errors="replace") as f:
            return f.read()
    req = urllib.request.Request(src, headers={"User-Agent": UA})
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode("utf-8", "replace")


def cell_text(td) -> str:
    text = td.get_text(" ", strip=True).replace("\xa0", " ")
    return re.sub(r"\s+", " ", text).strip()


def to_grid(table) -> list[list[str]]:
    """Flatten to a rectangular grid, expanding colspans into blank cells."""
    rows = []
    for tr in table.find_all("tr"):
        row = []
        for td in tr.find_all(["td", "th"]):
            row.append(cell_text(td))
            row.extend("" for _ in range(int(td.get("colspan", 1) or 1) - 1))
        rows.append(row)
    return rows


def pct(s: str):
    s = s.strip()
    return round(float(s.rstrip("%")), 4) if s.endswith("%") else None


def parse(grid: list[list[str]]) -> dict:
    starts = [i for i, r in enumerate(grid) if len(r) > 1 and r[1] == RARITIES[0]]
    slots = {}
    for n, start in enumerate(starts):
        name = grid[start][0]
        end = starts[n + 1] if n + 1 < len(starts) else len(grid)
        grouped, order = {}, []
        for row in grid[start + 2 : end]:
            option = row[0].strip()
            if not option:
                continue
            grade = []
            for k in range(len(RARITIES)):
                value, prob = pct(row[1 + k * 2]), pct(row[2 + k * 2])
                grade.append(None if value is None and prob is None else [value, prob])
            if option not in grouped:
                grouped[option] = []
                order.append(option)
            grouped[option].append(grade)
        slots[name] = [{"option": o, "grades": grouped[o]} for o in order]
    return slots


def validate(slots: dict) -> None:
    """Every slot/rarity column should total ~100% — the parse's own check."""
    for name, entries in slots.items():
        for i, rarity in enumerate(RARITIES):
            total = sum(
                g[i][1] for e in entries for g in e["grades"] if g[i] and g[i][1]
            )
            if total and abs(total - 100) > 1.0:
                print(f"  WARN {name}/{rarity} totals {total:.2f}%", file=sys.stderr)


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    url, out = sys.argv[1], sys.argv[2]
    soup = BeautifulSoup(fetch(url), "lxml")
    tables = soup.find_all("table")
    if not tables:
        sys.exit("no <table> found — page layout may have changed")
    slots = parse(to_grid(tables[0]))
    validate(slots)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(
            {"source": url, "rarities": RARITIES, "slots": slots},
            f,
            ensure_ascii=False,
            separators=(",", ":"),
        )
    print(
        f"{len(slots)} slots, "
        f"{sum(len(v) for v in slots.values())} options -> {out}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
