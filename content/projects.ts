export type Project = {
  slug: string;
  title: string;
  stack: string[];
  /** One or two lines, shown on the card. */
  summary: string;
  /** Paragraphs shown in the pop-up. */
  description: string[];
  role: string;
  timeframe: string;
  /**
   * Screenshot path under public/projects, e.g. "/projects/calvin-finds.png".
   * Any aspect ratio works — it is cropped to 16:10. Leave it off and the
   * card shows a styled placeholder instead.
   */
  image?: string;
  /** Describes the screenshot for screen readers. Required when image is set. */
  imageAlt?: string;
  /**
   * Public repo URL — fine to point at a teammate's account for group work.
   * Omit it and the button is hidden rather than dead.
   */
  repo?: string;
  /** Optional filter showing only your commits, e.g.
   *  "https://github.com/OWNER/REPO/commits?author=Aishwarya41" */
  commits?: string;
  demo?: string;
  /** Paper, write-up or poster under public/documents. */
  paper?: string;
};

export const projects: Project[] = [
  {
    slug: "calvin-finds",
    title: "Calvin Finds",
    stack: ["React Native", "Node", "Express", "PostgreSQL", "Azure"],
    summary:
      "Full-stack lost-and-found app for a university campus. Led a team of five, with an Azure Blob Storage photo pipeline.",
    description: [
      "Calvin Finds is a lost-and-found app for a university campus: students post items they have found, search what others have posted, and claim what is theirs. The core problem is matching — a description alone is rarely enough to identify an object, so photos carry most of the signal.",
      "I led a team of five through the build. The React Native client talks to an Express API backed by PostgreSQL, and uploaded photos go through a pipeline into Azure Blob Storage so images never sit in the database. Beyond the architecture, most of my time went to keeping five people productive in parallel: splitting the work along API boundaries, reviewing pull requests, and unblocking teammates.",
    ],
    role: "Team lead, 5 engineers",
    timeframe: "2024",
    image: "/projects/calvin-finds.png",
    imageAlt:
      "Calvin Finds logo: an illustrated figure holding a magnifying glass over a leaf, beside the wordmark.",
    repo: "https://github.com/calvin-cs262-fall2023-teamA/project",
  },
  {
    slug: "palette",
    title: "Palette",
    stack: ["Angular", "TypeScript", "Angular Material", "Firebase", "Firestore"],
    summary:
      "Online gallery where Calvin art students exhibit paintings, drawings, ceramics and photography, with a submission flow and per-artist pages.",
    description: [
      "Palette is an online art gallery for Calvin art students: a place to exhibit original paintings, drawings, ceramics and photography, and to find work by others in the same community. Student art tends to live in a studio for a semester and then disappear — the gallery gives it somewhere permanent and public.",
      "The app is Angular with Angular Material, backed by Firebase: Firestore for artwork and artist records, Cloud Storage for the images themselves, and Firebase Hosting for the deployed site. Work is browsed by medium — paintings, drawings, photography, ceramics — or by artist, and students submit new pieces through the site rather than by email.",
    ],
    // Checked against the repo: your commits there are under a different
    // account to Swayam's. Rewrite this to match what you actually did.
    role: "Contributor",
    timeframe: "2024",
    image: "/projects/palette.jpg",
    imageAlt:
      "The Palette gallery grid: student paintings, drawings and photographs laid out in columns, including a beach landscape and a charcoal still life.",
    repo: "https://github.com/swayamshrestha05/Palette",
    demo: "https://palette-e3d2a.web.app",
  },
  {
    slug: "prompt-refinement",
    title: "Improving Prompts for Image Generation",
    stack: ["Gemma 7b-it", "Stable Diffusion", "Streamlit"],
    summary:
      "Multi-turn pipeline that turns a vague request into a structured prompt an image model can use.",
    description: [
      "People describing an image they want rarely phrase it the way a generation model expects. This project puts a language model in between: it asks clarifying questions across multiple turns, then emits a structured prompt the image model can actually use.",
      "The hard part was consistency. An open model like Gemma 7b-it will drift out of the requested output format without pressure, so the pipeline uses few-shot examples and explicit constraints to keep responses parseable turn after turn. The interface is a Streamlit app.",
    ],
    role: "Solo",
    timeframe: "2024",
    image: "/projects/prompt-refinement.png",
    imageAlt:
      "Dark app interface titled 'Image Generator', headed 'Describe an image you want to generate', with a text input and a send button.",
  },
  {
    slug: "netlog-speed",
    title: "Internet Speed Measurement",
    stack: ["Python", "JavaScript"],
    summary:
      "Netlog analytics engine built with UC San Diego researchers for the RABBITS broadband toolkit.",
    description: [
      "Research work with UC San Diego on the RABBITS broadband measurement toolkit. Chrome's Netlog captures a dense, low-level record of everything the network stack does during a speed test — the question is what you can actually conclude from it.",
      "I built the analytics engine that parses Netlog captures and derives measurements from them, so researchers could reason about real broadband performance rather than a single summary number.",
    ],
    role: "Research collaborator",
    timeframe: "2023",
    image: "/projects/netlog-speed.png",
    imageAlt:
      "Panel listing the speed-test services analysed: Cloudflare, Comcast, M-Lab, Fast.com, Ookla and SpeedOf.Me.",
    repo: "https://github.com/Aishwarya41/rabbits-netlog",
    paper: "/documents/netlog-mining-research-paper.pdf",
  },
];
