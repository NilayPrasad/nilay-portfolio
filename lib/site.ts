/**
 * §10 — single source of truth for all copy and every swappable asset.
 * Replacing real artwork later is one edit per asset, and nothing else.
 */

export const site = {
  name: "NNP",
  fullName: "Nilay Prasad",
  initials: "NNP",
  wordmark: "Nilay Prasad",
  role: "AI Design Engineer",
  discipline: "AI-Driven Engineer · Product & UI/UX Designer",
  statement: "A practice where systems outperform creative heroics.",
  city: "Pune",
  timezone: "Asia/Kolkata",
  location: "Based in Pune",
  /** §2 hero meta row — left label, right label. */
  heroMetaLeft: "Based in India",
  heroMetaRight: "AI Design Engineer",
  email: "nilay.n.prasad@gmail.com",
  hours: "Monday to Friday, 9am to 6pm IST",
  place: "Pune, India (Working globally)",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://www.behance.net/nilayprasad" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://x.com" },
  ],
};

export const nav = [
  { label: "Home", href: "/", index: "01" },
  { label: "About Me", href: "/about", index: "02" },
  { label: "Work", href: "/work", index: "03" },
  { label: "Contact", href: "/contact", index: "04" },
];

/* ── §10 Swappable assets ─────────────────────────────────────────────
   `img()` points at picsum today. To use your own files, change this one
   line to `/images/${seed}.jpg` and drop the files into public/images.
   Every seed below is already named for what it should hold.           */
export const img = (seed: string, w = 1600, h = 2000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Looping dither-gradient background film. Empty string = use the CSS
 *  field. Set to "/field.mp4" once a real loop exists in /public.      */
export const fieldVideo = "";

/** Secondary media used in the Service and About sections. */
export const serviceReel = "";


/* ── §4.1 Hero sequence ──────────────────────────────────────────────── */
export const heroLabel = "Design Is Applied Intelligence";

export const heroStatements = [
  "Most people think design is about making things beautiful. It rarely begins there.",
  "Design as the thoughtful organization of information for clear understanding.",
];

/* ── 01 / Intro teaser ───────────────────────────────────────────────── */
export const intro = {
  label: "Index",
  title: "A practice of one, built like a system.",
  body: [
    "I am Nilay Prasad — an AI-driven engineer, product designer, and UI/UX designer. I work on the part nobody photographs: deciding what a thing is for, and framing the information so a person, or a model, can act on it.",
    "Detail is the only honest signal of how much thought went in. A misaligned baseline, a label that hedges, a loading state nobody designed — each one tells the person using it exactly how seriously the problem was taken.",
  ],
  seed: "nnp-intro",
};

/* ── 02 / Service ────────────────────────────────────────────────────── */
export const services = [
  { n: "01", title: "Digital Interface", body: "I design clear and usable interfaces by organizing content, flows, and components into systems that scale across screens and devices.", seed: "svc-interface", video: "/services/digital-interface.mp4" },
  { n: "02", title: "Brand Identity", body: "I create identity systems that define how a product looks, speaks, and holds together across digital and physical environments.", seed: "svc-brand", video: "/services/brand-identity.mp4" },
  { n: "03", title: "Web Design", body: "I design websites with a strong structure, readable layouts, and responsive behavior, ready to be built and maintained over time.", seed: "svc-web", video: "/services/web-design.mp4" },
  { n: "04", title: "Design Systems", body: "I build reusable design systems that keep interfaces consistent, reduce friction, and make collaboration easier across engineering and design.", seed: "svc-systems", video: "/services/design-systems.mp4" },
  { n: "05", title: "Editorial Design", body: "I design long-form and structured content with strong hierarchy, typography, and layout to support reading and clarity.", seed: "svc-editorial", video: "/services/editorial-design.mp4" },
];

export const serviceIntro =
  "I help teams design, build, and launch thoughtful digital experiences that are clear, scalable, and built to perform.";

/* ── Work ────────────────────────────────────────────────────────────
   The case studies live in lib/projects.ts — they're long enough to earn
   their own module — and are re-exported here so `@/lib/site` stays the
   single import for page content. */
export { projects, featuredProjects, featuredSlugs, workCategories } from "./projects";
export type { Project, ProjectBlock, Slot } from "./projects";

/* ── Key Features · what working with AI actually changed ───────────── */
export const keyFeatures = {
  label: "Key Features",
  title: "What AI Changed About How I Work",
  intro:
    "Not a claim that the tools do the work, a record of where they moved the bottleneck, and how much of the result I can stand behind.",
  figures: [
    { value: 78, label: "Faster from brief to a working, clickable prototype" },
    { value: 94, label: "AI-assisted builds shipped without a later rewrite" },
    { value: 91, label: "Reference interfaces I can reconstruct from a screenshot alone" },
    { value: 86, label: "Model use cases scoped and validated before any build began" },
  ],
  notesLabel: "Proficiency",
  notes: [
    {
      title: "Productivity, measured honestly",
      body: "The gain is in exploration, not typing. I can put several real directions in front of a client in the time a deck used to take, because each one is a running build rather than a picture of one.",
    },
    {
      title: "Recreation as proficiency",
      body: "Give me an interface and I can rebuild its grid, type, and motion from observation. Knowing exactly how something was made is the difference between referencing it and copying it.",
    },
    {
      title: "Knowing the use case",
      body: "Most AI features fail because nobody asked what the model is for. I scope the job, the failure modes, and the evaluation before a single prompt is written.",
    },
  ],
};

/** Background for the METHOD title panel, the first stop in the track.
 *  Drop a file into /public and point this at it, e.g. "/method/intro.mp4".
 *  Empty leaves that panel on the flat light field. */
export const methodIntroVideo = "";

/* ── 05 / Method — the AI-driven, vibe-coded process ─────────────────── */
export const method = [
  {
    n: "01",
    title: "Discovery & Immersion",
    video: "/method/discovery-immersion.mp4",
    body: "I read everything before I draw anything: the existing product, competitor language, support tickets, analytics. The output is a written point of view, not a moodboard.",
    items: ["Stakeholder interviews", "Content & interface audit", "Competitive reading", "Written problem statement"],
  },
  {
    n: "02",
    title: "Framing & Architecture",
    video: "/method/framing-architecture.mp4",
    body: "Structure gets decided in text first. Information architecture, naming, states, and edge cases are written down while they are still cheap to change.",
    items: ["Information architecture", "Naming & taxonomy", "State & edge-case map", "Prompt and content framing"],
  },
  {
    n: "03",
    title: "Design & Vibe-Coded Build",
    video: "",
    body: "Design and code move together. I prototype in the real medium (real type, real data, real motion) using AI to compress the distance between an idea and a working build.",
    items: ["Design system & tokens", "AI-assisted implementation", "Motion specification", "Live prototype review"],
  },
  {
    n: "04",
    title: "Launch & Optimisation",
    video: "",
    body: "Shipping is a checkpoint, not a finish line. Instrumentation goes in before launch so the first month of behaviour answers questions instead of raising them.",
    items: ["Performance & a11y pass", "Analytics instrumentation", "Handover documentation", "Post-launch iteration"],
  },
];

/* ── 06 / Reviews ────────────────────────────────────────────────────
   Real feedback, condensed. Role labels only: the reviewers are named in
   Nilay's own records, and this repo is public, so no names live here. */
export const reviewsIntro =
  "Feedback from leads, managers, and the people I work with.";

export const reviews = [
  {
    quote:
      "Nilay thinks clearly and generates strong ideas, with quick turnaround and dependable quality. He is highly collaborative, pairs well with peers, and brings real value to the team.",
    role: "Assistant Director",
  },
  {
    quote:
      "He has levelled up his craft with AI-first workflows, embedding AI across research, prototyping, and design systems, and delivering production-ready work across several projects that exceeded the target for AI adoption.",
    role: "Associate Manager, People Lead",
  },
  {
    quote:
      "Strong, consistent design quality and a thorough grasp of requirements, keeping user needs and business goals aligned. His investigative approach and energy in brainstorms lift the whole team.",
    role: "Senior Manager",
  },
  {
    quote:
      "A genuine force in the design community: he mentors colleagues on AI-assisted design and builds reusable accelerators that benefit the wider practice.",
    role: "Associate Manager, People Lead",
  },
  {
    quote:
      "Nilay takes strong ownership, supports his teammates whenever challenges arise, and was among the first on the team to earn the Claude Architect certification, showing real commitment to growth.",
    role: "Senior Manager",
  },
  {
    quote:
      "He took full ownership of the audit-process work and delivered high-quality results that noticeably improved its presentation and effectiveness. Reliable, creative, and always willing to go the extra mile.",
    role: "Manager",
  },
  {
    quote:
      "Nilay brings strong out-of-the-box thinking and a willingness to experiment, consistently offering fresh, innovative perspectives. A dedicated designer who pushes to deliver relevant, impactful solutions.",
    role: "Associate Manager",
  },
  {
    quote:
      "An amazing balance of speed and style. He turns ideas into clean, impactful visuals without missing a beat, and his quick execution lifts the whole team's output.",
    role: "Design colleague",
  },
  {
    quote:
      "Highly prompt with a strong work ethic and a clear grasp of requirements. What stands out most is his curiosity and willingness to explore new ideas and stay current with the latest trends.",
    role: "Design colleague",
  },
  {
    quote:
      "Dedicated, skilled, and dependable, with thoughtful ideas and a positive attitude. One of his strongest qualities is how approachable and generous he is whenever a teammate needs help.",
    role: "Team colleague",
  },
  {
    quote:
      "Professional, creative, and solution-oriented. He approaches challenges with positivity and clarity, making sure the work does not just meet expectations but exceeds them.",
    role: "Team colleague",
  },
];

/** How many show before the reveal. */
export const reviewsLead = 6;

/* ── About · Profile ─────────────────────────────────────────────────
   Everything below comes from the CV. This is the credentials view, so
   it is the one place real employer and client names appear; the case
   studies in lib/projects.ts stay white-labelled. */
export const profile = {
  label: "Profile",
  role: "UX & Visual Designer · Design Engineer",
  lead: [
    "UX/UI designer and design engineer who takes products from concept to production-ready design, wireframes, user flows, and high-fidelity prototypes, balancing user needs, business goals, and real technical constraints, with a focus on consistency, hierarchy, and accessibility.",
    "I've moved from AI-assisted designer to architecting agentic experiences, multi-agent pipelines, AI copilots, and master-prompt systems embedded directly in client work. I approach a prompt the way I approach an interface: a designed surface with states, failure modes, and an intended reading order.",
  ],
  /** Give this a `src` and the portrait replaces the labelled slot. */
  photo: { label: "Portrait", src: "" },
};

export const aboutStats = [
  { value: 4, suffix: "", label: "Years in design (first paid work 2020)" },
  { value: 4, suffix: "", label: "Live case studies" },
  { value: 6, suffix: "", label: "Design tools in daily use" },
  { value: 3, suffix: "", label: "Languages" },
];

/* ── Experience · real names, CV view ───────────────────────────────── */
export const experience = [
  {
    org: "Accenture · RDE",
    role: "UX / UI Designer, Analyst (L11)",
    year: "Sep 2024 to Present",
    body: "Reinvention Design Engineers (RDE), ServiceNow Business Group, India. Concept to production design across enterprise agentic-AI platforms: multi-agent pipelines, AI copilots, master-prompt systems, and design systems documented for engineering handoff.",
  },
  {
    org: "Soncur",
    role: "UX & Graphic Designer (Intern)",
    year: "Jul to Oct 2023",
    body: "A sound-to-jewellery app: wireframes, information architecture, a UX audit, and brand guidelines.",
  },
  {
    org: "Extentia",
    role: "UX Designer (Intern)",
    year: "May to Aug 2021",
    body: "An AI travel platform for an Australian client that plans and books personalised itineraries. Worked to real client deadlines.",
  },
  {
    org: "Prime Rabbit",
    role: "Visual Designer (Intern)",
    year: "Jul to Oct 2020",
    body: "Social and brand-promotion design, Instagram content and campaigns, working alongside content writers.",
  },
];

export const timeline = [
  { year: "2020", title: "First Work", body: "First paid visual-design work at Prime Rabbit. The brief is never the problem statement." },
  { year: "2021", title: "Into UX", body: "First UX internship at Extentia, working with real clients and real deadlines." },
  { year: "2023", title: "Systems & Brand", body: "UX and graphic design with brand guidelines at Soncur. Writing before designing." },
  { year: "2024", title: "Enterprise & AI", body: "Joined the Reinvention Design Engineers practice. Agentic AI became the core of the work." },
  { year: "2025", title: "AI as a Medium", body: "Content framing and master prompts became the centre of the practice." },
];

export const awards = [
  { title: "ACE Award", note: "Flagship agentic platform", org: "Accenture", year: "2025" },
  { title: "Star of the Month", note: "Flagship agentic platform", org: "Accenture", year: "2025" },
  { title: "Client Value & Core Values Award", note: "", org: "Accenture", year: "2024" },
];

/* Issuer and year are blank where the CV did not record them. The card
   drops the meta row rather than showing an invented source. */
export const certifications = [
  { title: "Certified Claude Architect", org: "", year: "" },
  { title: "Certified Product Design", org: "", year: "" },
  { title: "Certified UI Designer", org: "", year: "" },
  { title: "UX Writer & UX Researcher", org: "", year: "" },
  { title: "Full-Stack, FDE", org: "", year: "" },
  { title: "Gen AI L1 & L2 · DFA 3.0 / 4.0", org: "", year: "" },
];

export const education = [
  {
    title: "M.Des, Master of Design",
    org: "MIT Institute of Design, Pune",
    field: "User Experience Design",
    year: "2022-2024",
  },
  {
    title: "B.Des, Bachelor of Design",
    org: "Unitedworld Institute of Design, Ahmedabad",
    field: "Visual Communication & Graphics Design",
    year: "2018-2022",
  },
];

export const capabilities = [
  {
    title: "Skills",
    items: [
      "UX & interaction design",
      "Enterprise workflow design",
      "Wireframing & prototyping",
      "Design systems",
      "Agentic solution design",
      "AI & master-prompt engineering",
      "Vibe coding",
    ],
  },
  {
    title: "Tools",
    items: [
      "Figma",
      "Figma Make",
      "Adobe XD",
      "Illustrator",
      "Photoshop",
      "InDesign",
      "Blender",
      "Claude Code",
      "VS Code",
      "React / Vite",
    ],
  },
  { title: "Languages", items: ["English", "Hindi", "Marathi"] },
];
