"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { artwork } from "@/content/artwork";

const N = artwork.length;

// Three copies of the gallery, with the viewer parked in the middle one.
// Every slide therefore has real neighbours on both sides, so the last
// painting sits to the left of the first and vice versa. Once scrolling
// settles we shift by exactly one copy-width if the viewer has drifted into
// an outer copy — that lands on an identical snap point, so nothing is seen.
const COPIES = 3;
const slides = Array.from({ length: N * COPIES }, (_, i) => ({
  piece: artwork[i % N],
  key: `${Math.floor(i / N)}-${i % N}`,
  real: i % N,
  isClone: i < N || i >= N * 2,
}));

export function Artwork() {
  const trackRef = useRef<HTMLUListElement>(null);
  const settleTimer = useRef<number | null>(null);
  const [index, setIndex] = useState(N); // absolute index, starts in copy 2

  const centreOf = (el: HTMLElement, track: HTMLElement) =>
    el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2;

  const scrollToIndex = useCallback(
    (target: number, smooth: boolean) => {
      const track = trackRef.current;
      const el = track?.children[target] as HTMLElement | undefined;
      if (!track || !el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      track.scrollTo({
        left: centreOf(el, track),
        behavior: smooth && !reduced ? "smooth" : "auto",
      });
    },
    [],
  );

  // Park on the middle copy before first paint so there is no visible jump.
  useEffect(() => {
    scrollToIndex(N, false);
  }, [scrollToIndex]);

  const nearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return N;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }, []);

  // Runs once motion stops: keep the viewer inside the middle copy.
  const recentre = useCallback(() => {
    const abs = nearestIndex();
    setIndex(abs);
    if (abs >= N && abs < N * 2) return;

    // Jump to the identical painting in the middle copy. Done by scrolling to
    // that slide's own centre rather than by a measured copy-width offset:
    // the slides have fractional widths, so copies differ by up to a pixel and
    // offset arithmetic would drift a little further out of true every lap.
    const target = abs + (abs < N ? N : -N);
    setIndex(target);
    scrollToIndex(target, false);
  }, [nearestIndex, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      setIndex(nearestIndex());
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(recentre, 160);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, [nearestIndex, recentre]);

  const step = useCallback(
    (delta: number) => {
      const target = index + delta;
      setIndex(target);
      scrollToIndex(target, true);
    },
    [index, scrollToIndex],
  );

  // Jump to a given painting within the copy currently on screen.
  const goToReal = useCallback(
    (real: number) => {
      const base = Math.floor(index / N) * N;
      const target = base + real;
      setIndex(target);
      scrollToIndex(target, true);
    },
    [index, scrollToIndex],
  );

  if (N === 0) return null;

  const current = ((index % N) + N) % N;

  return (
    <Section id="art" icon="art" title="ARTWORK">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Artwork"
        className="relative"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
        }}
      >
        <ul ref={trackRef} className="art-track no-scrollbar">
          {slides.map((slide) => (
            <li
              key={slide.key}
              className="art-slide flex shrink-0 snap-center items-center justify-center"
              aria-hidden={slide.isClone ? true : undefined}
            >
              <Image
                src={slide.piece.src}
                alt={slide.isClone ? "" : slide.piece.alt}
                width={slide.piece.width}
                height={slide.piece.height}
                sizes="(min-width: 768px) 400px, 300px"
                className="h-full w-auto max-w-none object-contain"
              />
            </li>
          ))}
        </ul>

        <CarouselButton side="left" onClick={() => step(-1)} />
        <CarouselButton side="right" onClick={() => step(1)} />

        <ul className="mt-5 flex list-none justify-center gap-2">
          {artwork.map((piece, i) => (
            <li key={piece.src}>
              <button
                type="button"
                onClick={() => goToReal(i)}
                aria-label={`Show artwork ${i + 1} of ${N}`}
                aria-current={i === current ? "true" : undefined}
                className={`focus-visible:outline-accent-fill block size-2.5 border-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  i === current
                    ? "bg-accent-fill border-ink-line"
                    : "bg-surface border-muted hover:border-ink-line"
                }`}
              />
            </li>
          ))}
        </ul>

        <p aria-live="polite" className="sr-only">
          Artwork {current + 1} of {N}
        </p>
      </div>
    </Section>
  );
}

function CarouselButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous artwork" : "Next artwork"}
      className={`bg-surface border-ink-line text-ink shadow-pixel-sm hover:bg-surface-alt focus-visible:outline-accent-fill absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border-[3px] text-lg leading-none active:translate-x-[2px] active:translate-y-[calc(-50%+2px)] active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
        side === "left" ? "left-0 md:-left-2" : "right-0 md:-right-2"
      }`}
    >
      {side === "left" ? "←" : "→"}
    </button>
  );
}
