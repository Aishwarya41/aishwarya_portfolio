"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Section } from "./Section";
import { ProjectModal } from "./ProjectModal";
import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";

function Thumbnail({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? ""}
        fill
        sizes="(min-width: 640px) 440px, 100vw"
        className="object-cover"
      />
    );
  }

  // No screenshot yet. A deliberate-looking panel beats a broken image or a
  // ragged grid of half-height cards.
  return (
    <div className="bg-surface-alt absolute inset-0 flex items-center justify-center p-5">
      <span className="font-display text-muted text-center text-[10px] leading-[1.9]">
        {project.title}
      </span>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  // Remember which card opened the pop-up so focus can return to it. Not every
  // browser focuses a button on click, so Radix's default restore isn't enough.
  const opener = useRef<HTMLButtonElement | null>(null);

  return (
    <Section id="projects" icon="code" title="PROJECTS">
      <ul className="grid list-none grid-cols-1 gap-[18px] sm:grid-cols-2">
        {projects.map((project) => (
          // The lift is driven from the <li>, which never moves. Hanging it off
          // the button's own :hover made the card slide out from under the
          // cursor, dropping hover and snapping it back — a jitter loop along
          // the edges.
          <li key={project.slug} className="group flex">
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setActive(project);
              }}
              className="bg-surface border-ink-line shadow-pixel group-hover:shadow-pixel-lg focus-visible:shadow-pixel-lg focus-visible:outline-accent-fill flex w-full cursor-pointer flex-col border-[3px] text-left transition-[transform,box-shadow] duration-100 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="border-ink-line relative aspect-[16/10] block border-b-[3px]">
                <Thumbnail project={project} />
              </span>

              <span className="flex grow flex-col gap-2 p-4">
                <span className="text-ink text-[15px] font-semibold">
                  {project.title}
                </span>
                <span className="text-accent-text text-[11px]">
                  {project.stack.join(" · ")}
                </span>
                <span className="text-body text-[12.5px] leading-[1.6]">
                  {project.summary}
                </span>
                <span className="text-muted mt-auto pt-3 text-[10px] tracking-wider">
                  VIEW DETAILS ↗
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink border-accent-fill hover:border-ink-line focus-visible:outline-accent-fill border-b-2 pb-0.5 text-[11px] font-semibold tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          VIEW MORE ON GITHUB ↗
        </a>
      </div>

      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        restoreFocusTo={opener}
      />
    </Section>
  );
}
