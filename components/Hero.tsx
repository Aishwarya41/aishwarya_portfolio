import Image from "next/image";
import { site } from "@/content/site";
import { btnPrimary, btnSecondary } from "@/lib/ui";

// The source art is 40x75 native pixels. Scale by a whole number only —
// fractional scaling makes some pixel rows thicker than others.
const AVATAR_SCALE = 4;

const AVATAR_W = 40 * AVATAR_SCALE;
const AVATAR_H = 75 * AVATAR_SCALE;

function Avatar() {
  return (
    <div
      className="relative"
      style={{ width: AVATAR_W, height: AVATAR_H }}
    >
      <Image
        src="/avatar.png"
        alt="Pixel-art portrait of Aishwarya"
        width={AVATAR_W}
        height={AVATAR_H}
        priority
        unoptimized
        className="pixelated block"
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
        className="avatar-blink pixelated absolute inset-0 block opacity-0"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex max-w-[920px] flex-wrap-reverse items-center gap-9 px-7 pt-16 pb-16"
    >
      <div className="flex flex-1 basis-[340px] flex-col gap-5">
        <p className="border-accent text-accent-text bg-surface self-start border-2 px-2.5 py-1 text-[11px] tracking-widest">
          {site.badge}
        </p>

        <h1 className="font-display text-ink m-0 text-[clamp(22px,5vw,38px)] leading-[1.6]">
          {site.nameLines[0]}
          <br />
          {site.nameLines[1]}
        </h1>

        <p className="text-body max-w-[560px] text-[15px] leading-[1.75]">
          {site.intro}
        </p>

        <div className="mt-1 flex flex-wrap gap-3.5">
          <a href="#contact" className={btnPrimary}>
            GET IN TOUCH
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            GITHUB ↗
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            LINKEDIN ↗
          </a>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2.5">
        <Avatar />
        <p className="text-muted text-[10px] tracking-wider">
          IT&apos;S ME, PIXELATED
        </p>
      </div>
    </section>
  );
}
