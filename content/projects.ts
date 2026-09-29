export type Project = {
  slug: string;
  title: string;
  /** Rendered as individual chips in the modal, joined on the card. */
  stack: string[];
  /** One line, shown on the card. */
  summary: string;
  /** Paragraphs, modal only. */
  description: string[];
  role: string;
  timeframe: string;
  /** Omit when there is no public repo — the button is hidden rather than dead. */
  repo?: string;
  demo?: string;
  images?: { src: string; alt: string }[];
};

// The `description`, `role` and `timeframe` fields below are drafted from the
// resume summaries. Expand them with specifics — what was hard, what you chose
// and why — and fill in `repo` for the projects that are public.
export const projects: Project[] = [
  {
    slug: "calvin-finds",
    title: "Calvin Finds",
    stack: ["React Native", "Node", "Express", "PostgreSQL", "Azure"],
    summary:
      "Led a team of 5 building a full-stack lost-and-found mobile app with a Blob Storage photo pipeline.",
    description: [
      "Calvin Finds is a lost-and-found app for a university campus: students post items they have found, search what others have posted, and claim what is theirs. The core problem is matching — a description alone is rarely enough to identify an object, so photos carry most of the signal.",
      "I led a team of five through the build. The React Native client talks to an Express API backed by PostgreSQL, and uploaded photos go through a pipeline into Azure Blob Storage so images never sit in the database. Beyond the architecture, most of my time went to keeping five people productive in parallel: splitting the work along API boundaries, reviewing pull requests, and unblocking teammates.",
    ],
    role: "Team lead, 5 engineers",
    timeframe: "2024",
  },
  {
    slug: "parallel-computing",
    title: "Parallel & Distributed Computing Repo",
    stack: ["Python", "C/C++", "Java", "MPI", "OpenMP", "CUDA"],
    summary:
      "Coding exercises adopted by universities nationwide, reaching 1,000+ students in a niche CS domain.",
    description: [
      "A collection of teaching exercises for parallel and distributed computing, covering MPI, OpenMP, and CUDA across Python, C/C++, and Java. Parallel computing is a hard subject to teach because the interesting behavior only shows up at scale, and setup friction stops students before they reach it.",
      "The exercises are built to run with minimal setup so students spend their time on the concepts rather than the toolchain. The material has been adopted by universities nationwide and has reached more than 1,000 students.",
    ],
    role: "Contributor",
    timeframe: "2023 – 2024",
  },
  {
    slug: "prompt-refinement",
    title: "Improving Prompts for Image Generation",
    stack: ["Gemma 7b-it", "Streamlit"],
    summary:
      "Multi-turn prompt-refinement pipeline with few-shot constraints for consistent, structured LLM output.",
    description: [
      "People describing an image they want rarely phrase it the way a generation model expects. This project puts a language model in between: it asks clarifying questions across multiple turns, then emits a structured prompt the image model can actually use.",
      "The hard part was consistency. An open model like Gemma 7b-it will drift out of the requested output format without pressure, so the pipeline uses few-shot examples and explicit constraints to keep responses parseable turn after turn. The interface is a Streamlit app.",
    ],
    role: "Solo",
    timeframe: "2024",
  },
  {
    slug: "netlog-speed",
    title: "Internet Speed Measurement",
    stack: ["Python", "JavaScript"],
    summary:
      "Built a Netlog analytics engine with UC San Diego researchers for the RABBITS broadband toolkit.",
    description: [
      "Research work with UC San Diego on the RABBITS broadband measurement toolkit. Chrome's Netlog captures a dense, low-level record of everything the network stack does during a speed test — the question is what you can actually conclude from it.",
      "I built the analytics engine that parses Netlog captures and derives measurements from them, so researchers could reason about real broadband performance rather than a single summary number.",
    ],
    role: "Research collaborator",
    timeframe: "2023",
  },
];
