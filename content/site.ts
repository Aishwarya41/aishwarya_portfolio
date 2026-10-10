export const site = {
  name: "Aishwarya Joshi",
  nameLines: ["Hi,I'm", "Aishwarya"],
  badge: "SOFTWARE DEVELOPER",
  intro:
    "I'm a creative who codes. I love the spot where design thinking meets engineering, where a clunky process becomes something smooth and even a little delightful.",
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
