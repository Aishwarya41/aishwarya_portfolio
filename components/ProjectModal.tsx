"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import type { Project } from "@/content/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
  /** Focus goes back here on close, so keyboard users keep their place. */
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
          // Land on the panel, not the close button: a screen reader reads the
          // title first, and the Enter keyup that opened this can't instantly
          // re-trigger Close.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement | null)?.focus();
          }}
          onCloseAutoFocus={(event) => {
            const target = restoreFocusTo?.current;
            if (!target) return;
            event.preventDefault();
            target.focus();
          }}
        >
          {project && (
            <>
              <div className="bg-surface border-ink-line sticky top-0 z-10 flex items-start justify-between gap-4 border-b-[3px] p-5">
                <div>
                  <Dialog.Title className="font-display text-ink text-sm leading-[1.7]">
                    {project.title}
                  </Dialog.Title>
                  <p className="text-muted mt-2 text-xs">
                    {project.role} · {project.timeframe}
                  </p>
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className="border-ink-line text-ink hover:bg-surface-alt focus-visible:outline-accent-fill flex size-8 shrink-0 items-center justify-center border-2 text-sm leading-none focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  ✕
                </Dialog.Close>
              </div>

              <div className="flex flex-col gap-5 p-5">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? ""}
                    width={1280}
                    height={800}
                    className="border-ink-line h-auto w-full border-[3px]"
                  />
                )}

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

                <Dialog.Description className="sr-only">
                  {project.summary}
                </Dialog.Description>

                {(project.repo ||
                  project.commits ||
                  project.demo ||
                  project.paper) && (
                  <div className="border-ink-line flex flex-wrap gap-3.5 border-t-2 pt-5">
                    {project.paper && (
                      <a
                        href={project.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnPrimary}
                      >
                        READ THE PAPER ↗
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        // One filled button per pop-up: the paper takes
                        // precedence where there is one.
                        className={project.paper ? btnSecondary : btnPrimary}
                      >
                        GITHUB ↗
                      </a>
                    )}
                    {project.commits && (
                      <a
                        href={project.commits}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnSecondary}
                      >
                        MY COMMITS ↗
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
