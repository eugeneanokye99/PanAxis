/**
 * Static mirrors of the CSS tokens in `globals.css`, for the few places that
 * cannot read CSS variables (meta theme-color, generated OG images, icons).
 * Keep in sync with the `--paper-*`, `--navy-*`, `--gold-*` and `--green-*` primitives.
 */
export const brandColors = {
  paper: "#f6f4ef",
  ink: "#0b1322",
  inkCard: "#111c30",
  inkMuted: "#a3adbf",
  gold: "#e8ab3c",
  green: "#3f9b4f",
} as const
