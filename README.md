# Aishwarya Joshi — Portfolio

Pixel-art portfolio built with Next.js 16, TypeScript and Tailwind CSS v4.

## Setup

Next.js 16 requires Node **20.9+**. The repo pins a version in `.nvmrc`:

```bash
nvm use
```

Then:

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Contact form

The form posts to `app/api/contact/route.ts`, which sends through
[Resend](https://resend.com). Copy `.env.example` to `.env.local` and add a key:

```
RESEND_API_KEY=re_...
```

Without a key the form still validates, but sending returns a 500 and the UI
shows its error state. Resend sends from `onboarding@resend.dev` until you
verify your own domain.

Because the form needs a server runtime, this app cannot be deployed as a fully
static export. Vercel and Netlify both work with no configuration.

## Editing content

Everything on the page is data. No component changes needed to add to it:

| File | What it holds |
| --- | --- |
| `content/site.ts` | Name, intro, email, social links, nav items |
| `content/education.ts` | Degree and highlights |
| `content/experience.ts` | Jobs |
| `content/projects.ts` | Projects, including the modal write-ups |
| `content/artwork.ts` | Gallery — empty, so the section is hidden |

## Pixel art

Icons currently render from fallback grids defined in `lib/pixel.ts`. To use
your own drawings:

1. Export PNGs at native size (16×16 or 32×32) — do not upscale in the editor.
2. Save them as `public/icons/{edu,work,code,art,mail}.png`.
3. Add each one to the `ICON_SRC` map at the top of `components/PixelIcon.tsx`.

Anything left out of that map keeps using its fallback grid, so you can migrate
one icon at a time.

On this cream background, icons want a dark outline (`#1f1c17`) with clay
details (`#d4553d`) — the inverse of typical dark-mode pixel art. Set your
editor's canvas background to `#faf6ee` to judge contrast correctly.

## Design tokens

The palette lives in one `@theme` block in `app/globals.css`. Changing the
site's colors means editing that block and nothing else.
