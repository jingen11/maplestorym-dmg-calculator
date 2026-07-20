// Pixel-art sprites for the battle stage, drawn as character grids and
// rendered as 1×1 SVG rects with crisp edges — no image assets, scales
// cleanly at any size.

type Palette = Record<string, string>;

function Sprite({
  grid,
  palette,
  className,
}: {
  grid: string[];
  palette: Palette;
  className?: string;
}) {
  const width = Math.max(...grid.map((row) => row.length));
  return (
    <svg
      viewBox={`0 0 ${width} ${grid.length}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {grid.flatMap((row, y) =>
        [...row].map((ch, x) => {
          const fill = palette[ch];
          if (!fill) return null;
          return (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
          );
        }),
      )}
    </svg>
  );
}

/* o outline · c cap · h cap shine · w spot · s stem · d eye · b stem shade */
const MUSHROOM_GRID = [
  ".....oooooo.....",
  "...oohhhhhhoo...",
  "..ohhcccccccco..",
  ".occwwcccccccco.",
  "occcwwccccccwcco",
  "occcccccccccccco",
  ".oooooooooooooo.",
  "...osssssssso...",
  "...osdssssdso...",
  "...osdssssdso...",
  "...osssssssso...",
  "...osbssssbso...",
  "...oooooooooo...",
];

const MUSHROOM_PALETTE: Palette = {
  o: "#5d2a0a",
  c: "#e8590c",
  h: "#f97b2f",
  w: "#fff4e0",
  s: "#fdf3dc",
  b: "#e8d3a8",
  d: "#43301f",
};

export function MushroomSprite({ className }: { className?: string }) {
  return (
    <Sprite grid={MUSHROOM_GRID} palette={MUSHROOM_PALETTE} className={className} />
  );
}

/* o crown outline · c foliage · h foliage shine · t trunk · k trunk outline */
const TREE_GRID = [
  "......oooooo......",
  "....oohhhhhhoo....",
  "...ohhhhcchhhho...",
  "..ohhcccccccchho..",
  ".ohccccccccccccho.",
  ".occcccccccccccco.",
  "occcccccccccccccco",
  "occcccchccccccccco",
  "occccchhcccccccco.",
  ".occcccccccccco...",
  ".oocccccccccccoo..",
  "..oocccccccccoo...",
  "...ooocccccooo....",
  ".....ooktkoo......",
  "......ktttk.......",
  "......ktttk.......",
  "......ktttk.......",
  ".....kttttk.......",
  "....kttttttk......",
];

const TREE_PALETTE: Palette = {
  o: "#b34505",
  c: "#e8590c",
  h: "#f97b2f",
  t: "#6b4527",
  k: "#53351d",
};

export function TreeSprite({ className }: { className?: string }) {
  return <Sprite grid={TREE_GRID} palette={TREE_PALETTE} className={className} />;
}

/* Maple leaf after the MapleStory one: tilted, slender pointed lobes
   radiating from the center, short stem at the upper right. Two-tone —
   a bright top (a) and a deeper red underside + stem (b). */
const LEAF_GRID = [
  "......a........",
  "......a..a...b.",
  ".....aa..a..b..",
  "a....aa.aa.b...",
  ".aa..aaaa.b....",
  "..aaaaaaaa.....",
  "...aaaaaaa.....",
  ".bbbbbbbbbb....",
  "..bbbbbbbbbbb..",
  ".bb.bbbbbb.bbb.",
  "bb...bbbb...bb.",
  "b.....bbb....bb",
  "......bb......b",
  "......b........",
  ".....b.........",
];

export function LeafSprite({
  light = "#e8552a",
  dark = "#c03a1c",
  className,
}: {
  light?: string;
  dark?: string;
  className?: string;
}) {
  return (
    <Sprite
      grid={LEAF_GRID}
      palette={{ a: light, b: dark }}
      className={className}
    />
  );
}

/* g gold · j gold shade */
const CROWN_GRID = [
  "g...g...g",
  "g..ggg..g",
  "gg.ggg.gg",
  "ggggggggg",
  "jjjjjjjjj",
];

const CROWN_PALETTE: Palette = {
  g: "#ffcf40",
  j: "#eab308",
};

export function CrownSprite({ className }: { className?: string }) {
  return <Sprite grid={CROWN_GRID} palette={CROWN_PALETTE} className={className} />;
}

/* Two overlapping maple leaves, extracted from app/logo.webp — the block
   grid was sampled from the image (23px pitch) and denoised. Bright leaf
   (a) sits over a deep red one (b). Used as the site mark. */
const LOGO_LEAF_GRID = [
  "...............aaa.....................",
  "................aaab...................",
  ".................aaaaa.................",
  ".................aaaaaab...............",
  "..................aaaabab..........bb..",
  "..................aaaaaaab.........bb..",
  "...................aaaaaaab..bb...bb...",
  "...................aaaaaaabb.bb...bb...",
  "...........aaaaa....aaaaaaab.abb..bb...",
  "...aaaaaaaaaaaaaaaa..aaaaaaaaaab.bb....",
  "..aaaaaaaaaaaaaaaaaaaaaaaaaaaaab.b.....",
  "...aaaaaaaaaaaaaaaaaaabaaaaaaaaab......",
  ".....aaaaaaaaaaaaaaaaabbaaaaaaab.......",
  ".......aaaaaaaaaaaaaaaabaaaaaab........",
  "........aaaaaaaaaaaaaaabaaaaab..bbbbbbb",
  ".........aaaaaaaaaaaaabbbbabb.bbbbbbb..",
  "...........aaaaaaabbbbbbbbbb..bbb......",
  ".............aaaaabbbbbbbbb..bbbbbb....",
  "................bbbbbbbbbb..bbbbbbbb...",
  ".................bbbbbbbb..bbbbbbbbb...",
  "...............aabbbbbbb..bbbbbbbbbbb..",
  ".............aaaabbbbbb..bbbbbbbbbbbbb.",
  "............aaaaabbbb..bbbbbbbbbbbbbbb.",
  "...........aaabbbbbb..bbbbbbbbbbbbbbbb.",
  "..........aaaabbbbb..bbbbbbbbbbbbbbbbb.",
  ".........aaaaaabb.bbbbbbbbbbbbbbb.bbbbb",
  "........aaaaaabbbbbbbbbb.bbbbbbb...bbbb",
  "........aaaabbb.bbbbbb...bbbbbbb...bbbb",
  ".......aaabbbbbbbbbbb....bbbbbb......b.",
  "......aabbbbbbbbbbb......bbbbbb........",
  ".....bbbbbbbbbbbb........bbbbbb........",
  "....bbbbbbbbbbb..........bbbbbb........",
  ".........................bbbbb.........",
  ".........................bbbbb.........",
  ".........................bbbbb.........",
  ".........................bbbb..........",
  ".........................bbbb..........",
  "..........................b............",
];

const LOGO_LEAF_PALETTE: Palette = {
  a: "#e36a48",
  b: "#963530",
};

export function LogoLeafSprite({ className }: { className?: string }) {
  return (
    <Sprite
      grid={LOGO_LEAF_GRID}
      palette={LOGO_LEAF_PALETTE}
      className={className}
    />
  );
}

/* Puffy cloud, single color */
const CLOUD_GRID = [
  ".....xxxx.....",
  "...xxxxxxxx...",
  ".xxxxxxxxxxx..",
  "xxxxxxxxxxxxxx",
  ".xxxxxxxxxxxx.",
];

export function CloudSprite({ className }: { className?: string }) {
  return <Sprite grid={CLOUD_GRID} palette={{ x: "#ffffff" }} className={className} />;
}

/* o outline · b blade · l blade shine · g gold guard · h hilt */
const SWORD_GRID = [
  ".....oo.....",
  "....olbo....",
  "....olbo....",
  "....olbo....",
  "....olbo....",
  "....olbo....",
  "...oolboo...",
  "..oggggggo..",
  "...oohhoo...",
  "....ohho....",
  "....ohho....",
  ".....oo.....",
];

const SWORD_PALETTE: Palette = {
  o: "#43301f",
  b: "#aebccb",
  l: "#e6edf3",
  g: "#f0b429",
  h: "#8a5a2b",
};

export function SwordSprite({ className }: { className?: string }) {
  return (
    <Sprite grid={SWORD_GRID} palette={SWORD_PALETTE} className={className} />
  );
}

/* o outline · p gem · e gem shine · g gold mount · s wooden stick */
const WAND_GRID = [
  "....oooo....",
  "...oepppo...",
  "...opppppo..",
  "...oppppo...",
  "....oooo....",
  "....oggo....",
  "....osso....",
  "....osso....",
  "....osso....",
  "....osso....",
  "....osso....",
  ".....oo.....",
];

const WAND_PALETTE: Palette = {
  o: "#43301f",
  p: "#b34fd1",
  e: "#e9b8f7",
  g: "#f0b429",
  s: "#8a5a2b",
};

export function WandSprite({ className }: { className?: string }) {
  return (
    <Sprite grid={WAND_GRID} palette={WAND_PALETTE} className={className} />
  );
}
