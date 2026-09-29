import { Card } from "./Card";
import { Section } from "./Section";
import { jobs } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience" icon="work" title="EXPERIENCE">
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <Card key={`${job.company}-${job.dates}`} className="p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="text-ink text-[15px] font-semibold">{job.role}</h3>
              <p className="text-muted text-xs">{job.dates}</p>
            </div>
            <p className="text-accent-text mt-0.5 text-[13px]">{job.company}</p>
            <p className="text-body mt-3 text-[13px] leading-[1.7]">
              {job.summary}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
