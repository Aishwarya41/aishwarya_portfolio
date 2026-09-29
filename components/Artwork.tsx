import Image from "next/image";
import { Section } from "./Section";
import { artwork } from "@/content/artwork";

export function Artwork() {
  // Nothing to show yet — better no section than a grid of empty frames.
  if (artwork.length === 0) return null;

  return (
    <Section id="art" icon="art" title="ARTWORK">
      {/* Masonry via CSS columns. These pieces run from 1:3 verticals to
          landscapes, so every image keeps its own aspect ratio rather than
          being cropped into a square. */}
      <div className="columns-2 gap-3.5 md:columns-3">
        {artwork.map((piece) => (
          <Image
            key={piece.src}
            src={piece.src}
            alt={piece.alt}
            width={piece.width}
            height={piece.height}
            sizes="(min-width: 768px) 290px, 45vw"
            className="border-ink-line mb-3.5 block h-auto w-full break-inside-avoid border-[3px]"
          />
        ))}
      </div>
    </Section>
  );
}
