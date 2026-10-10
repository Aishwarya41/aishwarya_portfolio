/**
 * Fallback pixel art, used until hand-drawn PNGs land in public/icons/.
 *
 * Each icon is a grid of character rows: "." is transparent, any other
 * character maps to a color through the icon's palette. Recolored for the
 * light Paper-and-ink palette — dark outlines, clay details.
 */

export type Pixel = { x: number; y: number; c: string };

const INK = "#1f1c17";
const ACCENT = "#d4553d";

export function gridToPixels(
  rows: string[],
  palette: Record<string, string>,
): Pixel[] {
  const pixels: Pixel[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === ".") continue;
      const c = palette[ch];
      if (!c) continue;
      pixels.push({ x, y, c });
    }
  });
  return pixels;
}

const gradCapRows = [
  "...1111...",
  "..111111..",
  ".11111111.",
  "1111111111",
  "...1111...",
  "...1111...",
  ".......2..",
  "........2.",
];

const briefcaseRows = [
  "....11....",
  "...1..1...",
  "1111111111",
  "1...22...1",
  "1........1",
  "1111111111",
  "1........1",
  "1111111111",
];

const computerRows = [
  ".11111111.",
  ".1......1.",
  ".1.2222.1.",
  ".1.2222.1.",
  ".11111111.",
  "....11....",
  "..111111..",
  ".11111111.",
];

const paletteRows = [
  "..111111..",
  ".1......1.",
  "1..3..4..1",
  "1........1",
  "1...5....1",
  ".1......1.",
  "..111111..",
  "....11....",
];

const mailRows = [
  "1111111111",
  "1........1",
  "1.2....2.1",
  "1..2..2..1",
  "1...22...1",
  "1........1",
  "1........1",
  "1111111111",
];

/** Icon grids are 10x8. */
export const iconPixels = {
  edu: gridToPixels(gradCapRows, { "1": INK, "2": ACCENT }),
  work: gridToPixels(briefcaseRows, { "1": INK, "2": ACCENT }),
  code: gridToPixels(computerRows, { "1": INK, "2": ACCENT }),
  art: gridToPixels(paletteRows, {
    "1": INK,
    "3": "#5c9e6f",
    "4": ACCENT,
    "5": "#e0a33c",
  }),
  mail: gridToPixels(mailRows, { "1": INK, "2": ACCENT }),
};

export type IconKey = keyof typeof iconPixels;
