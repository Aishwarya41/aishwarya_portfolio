"use client";

import { useRef, useState } from "react";
import { Section } from "./Section";
import { TerminalBar } from "./TerminalBar";
import { ProjectModal } from "./ProjectModal";
import { projects, type Project } from "@/content/projects";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  // Remember which card opened the modal so focus can go back to it on close.
  // Not every browser focuses a button on click, so we can't rely on Radix's
  // default "restore to whatever was focused" behavior.
  const opener = useRef<HTMLButtonElement | null>(null);

  return (
    <Section id="projects" icon="code" title="PROJECTS">
      <ul className="grid list-none grid-cols-1 gap-[18px] sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} className="flex">
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setActive(project);
              }}
              className="bg-surface border-ink-line shadow-pixel hover:shadow-pixel-lg focus-visible:shadow-pixel-lg focus-visible:outline-accent-fill flex w-full cursor-pointer flex-col border-[3px] text-left transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <TerminalBar slug={project.slug}>
                <span className="text-muted ml-auto text-[10px]">VIEW ↗</span>
              </TerminalBar>

              <div className="flex grow flex-col gap-2 p-4">
                <span className="text-ink text-sm font-semibold">
                  {project.title}
                </span>
                <span className="text-accent-text text-[11px]">
                  {project.stack.join(" · ")}
                </span>
                <span className="text-body mt-1 text-[12.5px] leading-[1.6]">
                  {project.summary}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        restoreFocusTo={opener}
      />
    </Section>
  );
}
