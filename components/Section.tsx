import { PixelIcon } from "./PixelIcon";
import type { IconKey } from "@/lib/pixel";

type Props = {
  id: string;
  icon: IconKey;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, icon, title, children, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-[920px] px-7 pt-9 pb-16 ${className}`}
    >
      <div className="mb-6 flex items-center gap-3">
        <PixelIcon variant={icon} size={30} />
        <h2 className="font-display text-ink text-base leading-relaxed">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
