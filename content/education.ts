export type Education = {
  school: string;
  location: string;
  dates: string;
  degree: string;
  highlights: string[];
};

export const education: Education = {
  school: "Calvin University",
  location: "Grand Rapids, MI",
  dates: "Aug 2021 – May 2025",
  degree: "B.S. Computer Science · Minor in Data Science",
  highlights: [
    "GPA: 4.0 · Dean's List · Collegiate Scholars Program (Honors)",
    "Calvin Hacks 2023 Winner",
  ],
};
