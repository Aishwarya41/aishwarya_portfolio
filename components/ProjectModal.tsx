"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { TerminalBar } from "./TerminalBar";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import type { Project } from "@/content/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
  restoreFocusTo?: React.RefObject<HTMLElement | null>;
};

export function ProjectModal({ project, onClose, restoreFocusTo }: Props) {
  return (
    <Dialog.Root
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[rgba(43,39,34,0.45)]" />
        <Dialog.Content
          className="modal-panel bg-surface border-ink-line shadow-pixel-lg focus-visible:outline-accent-fill fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[calc(100vw-32px)] max-w-[680px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border-[3px] focus-visible:outline-2"
          aria-describedby={project ? "project-summary" : undefined}
          // Land on the panel, not the close button: a screen reader then reads
          // the title first, and the Enter keyup that opened the dialog can't
          // immediately re-trigger Close.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement | null)?.focus();
          }}
          // Send focus back to the card that opened this, so keyboard users
          // resume where they left off instead of at the top of the page.
          onCloseAutoFocus={(event) => {
            const target = restoreFocusTo?.current;
            if (!target) return;
            event.preventDefault();
            target.focus();
          }}
        >
          {project && (
            <>
              <div className="bg-surface-alt sticky top-0 z-10">
                <TerminalBar slug={project.slug}>
                  <Dialog.Close
                    aria-label="Close"
                    className="text-ink hover:bg-bg focus-visible:outline-accent-fill ml-auto px-2 py-1 text-xs leading-none focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    ✕
                  </Dialog.Close>
                </TerminalBar>
              </div>

              <div className="flex flex-col gap-5 p-6">
                <div>
                  <Dialog.Title className="font-display text-ink text-sm leading-[1.7]">
                    {project.title}
                  </Dialog.Title>
                  <p className="text-muted mt-2 text-xs">
                    {project.role} · {project.timeframe}
                  </p>
                  <Dialog.Description id="project-summary" className="sr-only">
                    {project.summary}
                  </Dialog.Description>
                </div>

                <ul className="flex list-none flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border-ink-line bg-surface-alt text-ink border-2 px-2 py-1 text-[11px]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  {project.description.map((para, i) => (
                    <p key={i} className="text-body text-[13px] leading-[1.75]">
                      {para}
                    </p>
                  ))}
                </div>

                {project.images?.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={675}
                    className="border-ink-line h-auto w-full border-[3px]"
                  />
                ))}

                {(project.repo || project.demo) && (
                  <div className="flex flex-wrap gap-3.5">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnPrimary}
                      >
                        GITHUB ↗
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnSecondary}
                      >
                        LIVE DEMO ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
