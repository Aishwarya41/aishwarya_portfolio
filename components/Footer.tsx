import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[920px] px-7 pb-16">
      <p className="text-muted text-center text-[10px] tracking-widest">
        {site.footer}
      </p>
    </footer>
  );
}
