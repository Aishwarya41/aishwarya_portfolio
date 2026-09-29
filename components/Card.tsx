type Props = {
  children: React.ReactNode;
  className?: string;
};

/** The signature surface: cream fill, 3px ink border, hard offset shadow. */
export function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`bg-surface border-[3px] border-ink-line shadow-pixel ${className}`}
    >
      {children}
    </div>
  );
}
