import { Dock } from "@/components/Dock";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Artwork } from "@/components/Artwork";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Dock />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Artwork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
