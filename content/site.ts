export const site = {
  name: "Aishwarya Joshi",
  nameLines: ["AISHWARYA", "JOSHI"],
  badge: "SOFTWARE DEVELOPER",
  intro:
    "I build resilient full-stack applications and automations",
  contactBlurb:
    "Let's chat!",
  footer: "MADE WITH PIXELS & COFFEE",
  email: "aishwaryajoshi893@gmail.com",
  github: "https://github.com/Aishwarya41",
  linkedin: "https://linkedin.com/in/aishwarya-joshi9",
} as const;

export const navItems = [
  { key: "edu", href: "#education", label: "Edu", title: "Education" },
  { key: "work", href: "#experience", label: "Work", title: "Experience" },
  { key: "code", href: "#projects", label: "Code", title: "Projects" },
  { key: "art", href: "#art", label: "Art", title: "Artwork" },
  { key: "mail", href: "#contact", label: "Mail", title: "Contact" },
] as const;
