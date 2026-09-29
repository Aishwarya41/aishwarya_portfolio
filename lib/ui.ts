/** Shared button styling — 2px ink border, hard shadow, presses on click. */
export const btnBase =
  "inline-block border-2 border-ink-line px-5 py-3 text-[13px] font-semibold shadow-pixel-sm " +
  "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-ink-line)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fill";

export const btnPrimary = `${btnBase} bg-accent-fill text-surface`;

export const btnSecondary = `${btnBase} bg-surface text-ink`;
