/** Shared button styling — 2px ink border, hard shadow, presses on click. */
const btnShape =
  "inline-block border-2 border-ink-line font-semibold shadow-pixel-sm " +
  "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-ink-line)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fill";

export const btnBase = `${btnShape} px-5 py-3 text-[13px]`;

/**
 * Narrower variant that steps up to the normal size at md. Used where several
 * buttons share one line on a phone. Kept as its own string rather than an
 * override so no two conflicting padding utilities end up on one element.
 */
const btnCompactBase = `${btnShape} px-2.5 py-2.5 text-[10px] md:px-5 md:py-3 md:text-[13px]`;

export const btnPrimary = `${btnBase} bg-accent-fill text-surface`;

export const btnSecondary = `${btnBase} bg-surface text-ink`;

export const btnPrimaryCompact = `${btnCompactBase} bg-accent-fill text-surface`;

export const btnSecondaryCompact = `${btnCompactBase} bg-surface text-ink`;
