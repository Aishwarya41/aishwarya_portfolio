import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Press Start 2P ships a single weight, so it has to be named explicitly.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aishwarya Joshi — Software Developer",
  description:
    "Full-stack developer building resilient applications and automations. Calvin University CS.",
  openGraph: {
    title: "Aishwarya Joshi — Software Developer",
    description:
      "Full-stack developer building resilient applications and automations.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${pressStart.variable} h-full antialiased`}
    >
      {/* Browser extensions (Grammarly, password managers, dark-mode tools)
          add their own attributes to <body> before React hydrates, which
          otherwise reports a hydration mismatch. This suppresses the warning
          for this element's attributes only — mismatches in the page content
          below are still reported. */}
      <body
        suppressHydrationWarning
        className="bg-bg text-ink font-mono min-h-full"
      >
        {children}
      </body>
    </html>
  );
}
