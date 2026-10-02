# Nilay Prasad — Portfolio

Dark-first, editorial, motion-led personal portfolio.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis

```bash
npm install
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

## Pages

| Route          | Contents                                                                     |
| -------------- | ---------------------------------------------------------------------------- |
| `/`            | Hero → Service → Selected Projects → Reviews → Footer                        |
| `/work`        | Filterable index of all six case studies                                     |
| `/work/[slug]` | Outcomes, project details, full case study, parallax gallery, next project   |
| `/about`       | Profile → Experience → Timeline → Key Features → Method → Awards → Certified → Education → Capabilities |
| `/contact`     | Enquiry form and details                                                     |

## How it is put together

**Design tokens** live in `app/globals.css`. Dark is the default; `.on-light`
inverts the same variables for the Method panel. Component classes sit in
`@layer components` on purpose, because unlayered CSS outranks every Tailwind
utility regardless of specificity.

**All copy and every swappable asset** is in `lib/site.ts`, with the six case
studies in `lib/projects.ts`. Changing content should not mean touching a
component.

**Motion** is centralised in `components/motion.tsx` and shares one easing
curve. Everything scroll-driven degrades to a static layout under
`prefers-reduced-motion`.

Notable pieces:

- `Hero.tsx` — a pinned 320vh sequence with a scroll-scrubbed word mask over a
  ported WebGL field (`ShaderField.tsx`)
- `Services.tsx` — a video reel; hover previews, click holds, and with neither
  it plays the set end to end
- `WorkShowcase.tsx` — featured work as sticky siblings of one parent, so each
  card is covered by the next rather than scrolling past it
- `Method.tsx` — a side-scrolling track of full-bleed video panels, scrubbed by
  vertical scroll

## Accessibility

Audited against the rendered pages, not the markup: zero WCAG AA contrast
failures, no heading-level skips, a skip link, a visible 2px focus ring, and
one `banner` / `main` / `contentinfo` landmark per page.

## A note on the case-study imagery

The screens in `public/projects/` are redacted. Employer marks, confidential
footers, client and product names, and person names are destructively
downsampled, not covered — the detail is gone from the file rather than hidden
behind an overlay. Case-study copy is white-labelled throughout; `/about` is
the only place real company names appear, because it is the CV.

## Still open

- Contact form has no backend; `Contact.tsx` only sets local state
- Two of the six case studies are marked "coming soon" and have no imagery
- Method panels 03 and 04 are waiting on background video
