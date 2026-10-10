import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100, "That's too long"),
  email: z.email("Enter a valid email address").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — 10 characters minimum")
    .max(2000, "That's over 2000 characters"),
  // Honeypot: real people leave this empty, bots fill it in. Deliberately
  // permissive — the route decides what to do, so a caught bot gets a normal
  // success response rather than a validation error telling it what tripped.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
