export type Job = {
  role: string;
  company: string;
  dates: string;
  summary: string;
};

export const jobs: Job[] = [
  {
    role: "Software Developer",
    company: "Van Andel Institute",
    dates: "Jan 2025 – Present",
    summary:
      "Automated a manual file retrieval process (–86% effort). Architected 2+ full-stack C#/.NET Blazor apps and led modernization of two legacy WebForms tools, cutting security exposure and technical debt.",
  },
  {
    role: "Integration Developer Intern",
    company: "Corewell Health",
    dates: "Jan – Dec 2024",
    summary:
      "Resolved 5+ production integration incidents weekly across HR, Payroll, and Finance systems. Built 2 EIB integrations for employee benefits data, including SFTP setup.",
  },
  {
    role: "Front-end Developer Intern",
    company: "Corewell Health",
    dates: "May – Aug 2023",
    summary:
      "Shipped React.js search, filtering, and feature-toggle components for an internal developer portal used by 30+ developers; redesigned UI/UX across 3 applications.",
  },
  {
    role: "Web Developer",
    company: "Calvin University",
    dates: "Aug 2022 – Dec 2023",
    summary:
      "Developed and maintained KnightCite, a citation site with 550K users and 10M+ pageviews; ran usability tests that surfaced accessibility fixes.",
  },
];
