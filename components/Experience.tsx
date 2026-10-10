import { Card } from "./Card";
import { Section } from "./Section";
import { jobs } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience" icon="work" title="EXPERIENCE">
      <div className="flex flex-col gap-4">
        {jobs.map((job, i) => (
          <Card key={`${job.company}-${job.dates}`}>
            {/* Native <details> so this works without JavaScript and gets
                keyboard handling and expanded/collapsed announcements free.
                The current role starts open so the section is not just a
                stack of shut drawers. */}
            <details className="job" open={i === 0}>
              <summary className="focus-visible:outline-accent-fill hover:bg-surface-alt flex cursor-pointer list-none items-start gap-4 p-5 focus-visible:outline-2 focus-visible:-outline-offset-2">
                <div className="min-w-0 grow">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-ink text-[15px] font-semibold">
                      {job.role}
                    </h3>
                    <p className="text-muted text-xs">{job.dates}</p>
                  </div>
                  <p className="text-accent-text mt-0.5 text-[13px]">
                    {job.company}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="job-toggle border-ink-line text-ink mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 text-sm leading-none"
                />
              </summary>

              <div className="px-5 pb-5">
                <p className="text-body text-[13px] leading-[1.7]">
                  {job.summary}
                </p>

                {job.details
                  ?.filter((section) => section.points.length > 0)
                  .map((section, i) => (
                    <div key={section.heading ?? i} className="mt-4">
                      {section.heading && (
                        <h4 className="text-muted text-[10px] tracking-wider uppercase">
                          {section.heading}
                        </h4>
                      )}
                      <ul className="text-body mt-2 flex list-none flex-col gap-2 text-[13px] leading-[1.7]">
                        {section.points.map((point) => (
                          <li key={point} className="flex gap-2.5">
                            <span
                              aria-hidden="true"
                              className="text-accent-text"
                            >
                              ▪
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </details>
          </Card>
        ))}
      </div>
    </Section>
  );
}
