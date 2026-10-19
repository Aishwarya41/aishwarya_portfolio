export type Job = {
  role: string;
  company: string;
  dates: string;
  /** One-liner shown first when the card is opened. */
  summary: string;
  /**
   * Bullets shown once the card is expanded. Give a section a `heading` only
   * where a role has separate strands worth labelling; a single unlabelled
   * section is the normal case.
   */
  details?: { heading?: string; points: string[] }[];
};
export const jobs: Job[] = [
  {
    role: "Software Developer",
    company: "Van Andel Institute",
    dates: "Jan 2025 – Present",
    summary:
      "Full-stack application development alongside Workday integration work.",
    details: [
      {
        heading: "Software development",
        points: [
          "Own and maintain the full portfolio of 20+ custom web applications used organization-wide, ensuring ongoing uptime and security compliance.",
          "Led modernization of legacy WebForms applications to a secure, maintainable .NET/Blazor/C#/Telerik stack, reducing security exposure and technical debt for research-critical tools.",
        ],
      },
      {
        heading: "Workday",
        points: ["Built 3+ bidirectional Workday ERP integrations and cross-system data pipelines, enabling centralized data analytics and reporting across research and administrative business units.",
        "Automated a manual file retrieval and delivery process using REST APIs, Workday Orchestrate, and document transformation, reducing manual effort by an estimated 86%."],
      },
    ],
  },
  {
    role: "Integration Developer Intern",
    company: "Corewell Health",
    dates: "Jan – Dec 2024",
    summary: "",
    details: [
      {
        points: [
          "Resolved 5+ production integration incidents weekly across HR, Payroll and Finance systems.",
          "Built Workday EIB integrations for employee benefits data, including SFTP setup.",
        ],
      },
    ],
  },
  {
    role: "Web and Mobile Developer Intern",
    company: "Corewell Health",
    dates: "May – Aug 2023",
    summary: "",
    details: [
      {
        points: [
          "Built and shipped front-end UI features including search, filtering, and feature-toggle components using React.js for an internal developer portal used by 30+ developers, translating user research and feedback into working functionality.",
          "Redesigned the UI and UX across 3 applications.",
        ],
      },
    ],
  },
  {
    role: "Web Developer",
    company: "Calvin University",
    dates: "Aug 2022 – Dec 2023",
    summary: "",
    details: [
      {
        points: [
          "Enhanced and maintained KnightCite, a citation site with 550K users and 10M+ pageviews.",
          "Ran usability tests that surfaced accessibility fixes.",
        ],
      },
    ],
  },
];
