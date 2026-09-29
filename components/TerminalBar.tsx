type Props = {
  slug: string;
  children?: React.ReactNode;
};

/** The window chrome shared by project cards and the project modal. */
export function TerminalBar({ slug, children }: Props) {
  return (
    <div className="bg-surface-alt border-ink-line flex items-center gap-1.5 border-b-2 px-3 py-2">
      <span className="bg-light-red block size-2" />
      <span className="bg-light-amber block size-2" />
      <span className="bg-light-green block size-2" />
      <span className="text-muted ml-1.5 truncate text-[10px]">~/{slug}</span>
      {children}
    </div>
  );
}
