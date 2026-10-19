import Image from "next/image";
import { site } from "@/content/site";
import { btnPrimaryCompact, btnSecondaryCompact } from "@/lib/ui";

// The source art is 40x75 native pixels. Rendered at 2x on a phone and 4x from
// md up — whole numbers only, since a fractional scale makes some pixel rows
// thicker than others.
const AVATAR_W = 160;
const AVATAR_H = 300;

function Avatar() {
  return (
    <div className="avatar-frame relative w-20 md:w-40">
      <Image
        src="/avatar.png"
        alt="Pixel-art portrait of Aishwarya"
        width={AVATAR_W}
        height={AVATAR_H}
        priority
        unoptimized
        className="pixelated block h-auto w-full"
      />
      {/* Same sprite with the eyes shut, flashed briefly over the top. The two
          frames share an identical silhouette, so nothing shifts. */}
      <Image
        src="/avatar-blink.png"
        alt=""
        aria-hidden="true"
        width={AVATAR_W}
        height={AVATAR_H}
        priority
        unoptimized
        className="avatar-blink pixelated absolute inset-0 block h-auto w-full opacity-0"
      />
    </div>
  );
}

export function Hero() {
  return (
    /**
     * Two columns throughout. On a phone the name sits beside the avatar and
     * the prose runs full width underneath; from md the avatar moves to a
     * single tall cell on the right and the text stacks beside it.
     */
    <section
      id="hero"
      className="mx-auto grid max-w-[920px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-6 px-7 pt-12 pb-16 md:gap-x-9 md:pt-16"
    >
      <div className="col-start-1 row-start-1 flex flex-col gap-4">
        <p className="border-accent text-accent-text bg-surface self-start border-2 px-2.5 py-1 text-[10px] tracking-widest md:text-[11px]">
          {site.badge}
        </p>

        <h1 className="font-display text-ink m-0 text-[clamp(17px,4.4vw,38px)] leading-[1.6]">
          {site.nameLines[0]}
          <br />
          {site.nameLines[1]}
        </h1>
      </div>

      <div className="col-start-2 row-start-1 flex shrink-0 flex-col items-center gap-2.5 md:row-span-3 md:self-center">
        <Avatar />
        <p className="text-muted text-center text-[9px] tracking-wider md:text-[10px]">
          IT&apos;S ME, PIXELATED
        </p>
      </div>

      <p className="text-body col-span-2 row-start-2 max-w-[560px] text-[15px] leading-[1.75] md:col-span-1 md:col-start-1">
        {site.intro}
      </p>

      <div className="col-span-2 row-start-3 flex flex-nowrap gap-2 md:col-span-1 md:col-start-1 md:flex-wrap md:gap-3.5">
        <a href="#contact" className={btnPrimaryCompact}>
          GET IN TOUCH
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className={btnSecondaryCompact}
        >
          GITHUB ↗
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={btnSecondaryCompact}
        >
          LINKEDIN ↗
        </a>
      </div>
    </section>
  );
}
