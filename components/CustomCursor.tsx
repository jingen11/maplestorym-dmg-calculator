"use client";

import { useEffect } from "react";

const FRAMES = ["url(/cursors/hover-1.png)", "url(/cursors/hover-2.png)"];
const FRAME_MS = 350;

/**
 * Animates the hover cursor. The static pointer and which elements get the
 * "clickable" hand live in globals.css; here we just flip the shared
 * `--cursor-hover-frame` custom property on an interval so every element the
 * user is currently hovering swaps between hover-1 and hover-2 in sync.
 *
 * Skipped for coarse pointers (touch) and when the user prefers reduced
 * motion — in the latter case the CSS default (hover-1) simply stays put.
 */
export default function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    let frame = 0;
    const id = window.setInterval(() => {
      frame = (frame + 1) % FRAMES.length;
      document.documentElement.style.setProperty(
        "--cursor-hover-frame",
        FRAMES[frame],
      );
    }, FRAME_MS);

    return () => {
      window.clearInterval(id);
      document.documentElement.style.removeProperty("--cursor-hover-frame");
    };
  }, []);

  return null;
}
