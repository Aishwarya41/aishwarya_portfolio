import { PixelIcon } from "./PixelIcon";
import { navItems } from "@/content/site";

export function Dock() {
  return (
    <nav
      aria-label="Section navigation"
      className="bg-surface-alt border-ink-line sticky top-0 z-50 border-b-[3px] shadow-[0_4px_0_rgba(43,39,34,0.18)]"
    >
      <div className="mx-auto flex max-w-[920px] items-center justify-between gap-4 px-5 py-2">
        <a
          href="#hero"
          aria-label="Back to top"
          className="font-display text-ink focus-visible:outline-accent-fill shrink-0 px-2 py-3 text-xs tracking-widest focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          AJ<span className="text-accent-text">_</span>
        </a>

        <ul className="no-scrollbar flex items-stretch gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                aria-label={item.title}
                className={`icon-${item.key} hover:bg-bg focus-visible:outline-accent-fill flex min-w-[52px] flex-col items-center gap-1 rounded-[4px] px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2`}
              >
                <PixelIcon variant={item.key} size={26} />
                <span className="text-muted hidden text-[9px] tracking-wider uppercase sm:block">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
