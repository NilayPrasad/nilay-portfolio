# NNP — Portfolio

Dark, editorial, motion-heavy personal portfolio. Next.js 15 (App Router) ·
TypeScript · Tailwind v4 · Motion · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Pages

| Route          | Sections                                                               |
| -------------- | ---------------------------------------------------------------------- |
| `/`            | Hero → 01 Index → 02 Service → 03 Work → 04 Value + Key Figures → 05 Method → 06 Reviews → Footer |
| `/work`        | Filterable index, feed and grid views                                   |
| `/work/[slug]` | Cover, details + live-preview link, parallax gallery, next project      |
| `/about`       | 01 Profile (stats, education, timeline) → 02 Culture → 03 Awards → 04 Certifications |
| `/contact`     | Enquiry form and details                                                |

No pricing, no news, no FAQ anywhere. Awards replaces the reference's Client
section; Certifications replaces Team.

## Design system

- **Colour** — dark-first. `--black #000` ground, `--panel #0D0F12`, white text,
  `--muted #8A8C90`. The Method section is the one light panel (`--light #D7D7D5`),
  and it inverts the same variables via `.on-light`, so every child follows.
- **Field** — the signature background: navy → electric blue → black with a teal
  accent and a sand highlight, under a drifting ordered-halftone dot layer.
- **Type** — Switzer (display and text), Fragment Mono (labels, numbers, meta).
  Switzer is the face the reference itself ships; it sits in the same
  neo-grotesque family as Neue Haas Grotesk Display.
- **Grid** — 12 columns, 1512px max, 5–6vw gutters. Stacks to 6 columns at 768px.
- **Line-work** — `.rule` hairlines, `.rail` vertical dividers, `.tick-rule` row
  underlines with the L-shaped riser, and `<PlusFrame>` corner marks.
- **Easing** — one curve, `cubic-bezier(0.16, 1, 0.3, 1)`, shared by CSS, Motion
  and Lenis so scroll momentum matches element motion.

## Motion primitives

| Component       | Behaviour                                                          |
| --------------- | ------------------------------------------------------------------ |
| `ScrollSplit`   | Per-unit mask welded to a scroll value — scrubs both ways, exits on a hard clip |
| `SplitText`     | Per-character mask reveal, fires once on entry                      |
| `SkewMedia`     | Frame skews to a parallelogram and resolves at centre; image counter-skews, parallaxes and zooms |
| `FitText`       | Measures and solves for the font-size that fills the container      |
| `GradientField` | The dithered blue field, animated on transform only                 |
| `Counter`       | Digit strips roll to the target value                               |

`prefers-reduced-motion` disables Lenis, every skew and parallax, and collapses
all transitions to instant.

## Replacing the placeholders

Everything swappable lives in [`lib/site.ts`](lib/site.ts).

**Images.** Change the `img()` helper to `/images/${seed}.jpg` and drop files
into `public/images/`. Seeds are already named for what they hold (`monolith`,
`clearstate-a`, `nnp-portrait-a`, …).

**Background film.** Set `fieldVideo` to `/field.mp4` and add the file. Until
then the CSS gradient field runs in its place — no broken frame, no code change.

**Desaturation.** Placeholder photography is forced greyscale in
`app/globals.css` so stand-in stock can't fight the blue field. Delete the
`.media img, .media video, .plate` filter rule once real, graded art is in.

## Not yet wired

The contact form calls `setSent(true)` on submit — point it at your endpoint
(Formspree, Resend, a route handler) in `components/Contact.tsx`.
