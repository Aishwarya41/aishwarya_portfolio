import { Card } from "./Card";
import { Section } from "./Section";
import { education } from "@/content/education";

export function Education() {
  return (
    <Section id="education" icon="edu" title="EDUCATION">
      <Card className="p-6">
        <div className="flex flex-wrap justify-between gap-2">
          <h3 className="text-ink text-base font-semibold">
            {education.school} — {education.location}
          </h3>
          <p className="text-muted text-xs">{education.dates}</p>
        </div>
        <p className="text-accent-text mt-1 text-[13px]">{education.degree}</p>
        <div className="text-body mt-3.5 text-[13px] leading-[1.8]">
          {education.highlights.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Card>
    </Section>
  );
}
