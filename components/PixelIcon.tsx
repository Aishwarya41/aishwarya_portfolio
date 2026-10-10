import Image from "next/image";
import { iconPixels, type IconKey } from "@/lib/pixel";

/**
 * Hand-drawn PNGs take over from the fallback grids as they land.
 * Add an entry here once the file exists in public/icons/, e.g.
 *   edu: "/icons/edu.png",
 * Everything else keeps rendering the built-in grid.
 */
const ICON_SRC: Partial<Record<IconKey, string>> = {};

type Props = {
  variant: IconKey;
  size?: number;
  className?: string;
};

export function PixelIcon({ variant, size = 26, className = "" }: Props) {
  const src = ICON_SRC[variant];
  // The grids are 10 wide by 8 tall; keep that ratio at any size.
  const height = Math.round((size / 10) * 8);

  if (src) {
    return (
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        width={size}
        height={height}
        unoptimized
        className={`px pixelated block ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 10 8"
      width={size}
      height={height}
      aria-hidden="true"
      focusable="false"
      className={`px pixelated block ${className}`}
    >
      {iconPixels[variant].map((p) => (
        <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width="1" height="1" fill={p.c} />
      ))}
    </svg>
  );
}
