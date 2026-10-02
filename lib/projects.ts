/**
 * The six case studies.
 *
 * Everything here is white-labelled by design: no employer, client,
 * product, competitor, or person is named anywhere in visible copy.
 * Confidential relationships are described by sector and scope only.
 *
 * Imagery is intentionally absent — each project declares labelled
 * placeholder slots instead, so nothing ships until real, cleared
 * artwork replaces it. Give a slot a `src` to swap it in.
 */

export type ProjectBlock = {
  n: string;
  label: string;
  body?: string[];
  /** Rendered as a plus-marked list under the block copy. */
  items?: string[];
};

export type Slot = {
  label: string;
  /** Set this to a real path once cleared artwork exists. */
  src?: string;
};

export type Project = {
  n: string;
  slug: string;
  title: string;
  tag: string;
  status: "full" | "soon";
  /** Home row: disciplines, shown as the card's tag. */
  roles: string[];
  /** Home row: one-line description. */
  blurb: string;
  /** Meta line: role, sector, confidentiality, year. */
  facts: string[];
  year: string;
  /** Drives the filter rail on the work index. */
  category: string;
  lede: string;
  /** Shown above the blocks when a project needs a white-labelling note. */
  note?: string;
  blocks: ProjectBlock[];
  features?: string[];
  featuresLabel?: string;
  personas?: string[];
  tokens?: { name: string; value: string }[];
  typeface?: string;
  stats?: { value: string; label: string }[];
  /** Coming-soon stubs list what the page will cover. */
  willCover?: string[];
  slots: Slot[];
};

export const projects: Project[] = [
  /* ── 01 ─────────────────────────────────────────────────────────── */
  {
    n: "01",
    slug: "agentic-operations-platform",
    title: "Agentic Operations Platform",
    tag: "Case study — (01)",
    status: "full",
    roles: ["UX design", "Design systems", "Agentic flows"],
    blurb:
      "Agentic AI that senses, decides, and acts across enterprise operations — from research to a documented design system.",
    facts: [
      "Lead UX & Visual Design",
      "Enterprise finance operations",
      "Client confidential",
      "2025",
    ],
    year: "2025",
    category: "UX Design",
    lede:
      "An AI-powered platform that connects and optimizes enterprise process operations end-to-end. Autonomous agents sense, decide, and act across procure-to-pay, order-to-cash, and record-to-report — collaborating with each other and with people to turn operations from a transactional, rules-driven function into a strategic, adaptive engine.",
    blocks: [
      {
        n: "01",
        label: "Research",
        body: [
          "The previous generation was point solutions: largely RPA and workflow, with bespoke AI assets, loose data capture, and no common process taxonomy. Every exception bounced back to a human.",
          "Stakeholder interviews, workflow mapping, and data-flow analysis surfaced the bottlenecks. Personas were defined per process area and a shared success matrix agreed.",
        ],
      },
      {
        n: "02",
        label: "Ideation",
        body: [
          "Problem statement: how might we evolve the platform into an agentic AI engine that proactively orchestrates end-to-end processes with transparency, control, and trust?",
          "Explored agent behaviours, cross-process collaboration, and a single interface language across Discover, Define, Design, Develop, and Deliver.",
        ],
      },
      {
        n: "03",
        label: "Feature system",
        body: [
          "Seven capabilities, each addressing a different layer of the orchestration problem.",
        ],
      },
      {
        n: "04",
        label: "How it was solved",
        body: [
          "Unified 30+ apps into one ecosystem. Agents handle routine decisions and escalate exceptions to a human companion.",
          "A glassmorphic design system — violet-led palette, full component library — documented for handoff, with a structured review-and-feedback loop.",
        ],
      },
      {
        n: "05",
        label: "My Contribution",
        body: [
          "Hands-on, I owned the motion design and microinteractions across the platform. Because the interface is agentic, motion had to carry meaning rather than decorate — it shows when an agent picks up work, when a decision is made autonomously, and when something is escalated to a person. Each of those states needed a distinct, repeatable treatment so the same signal reads the same way in every process area.",
          "I specified the timing, easing, and sequencing for those transitions and documented them alongside the component library, so the behaviour ships with the component instead of being rebuilt screen by screen.",
          "Through build I troubleshot and solved interaction and consistency issues as they surfaced: drift between process areas, states that had been designed once and implemented differently, and edge cases that only appeared against real data.",
        ],
        items: [
          "Motion system for agent states, handoffs, and escalation",
          "Microinteraction specs documented with the component library",
          "Interaction and consistency fixes through build",
        ],
      },
      {
        n: "06",
        label: "Outcomes & KPIs",
        body: [
          "Loan processing moved from 36 hours to same day. First-time resolution rose from 75% to 95%, with 30% fewer repeat contacts.",
        ],
      },
    ],
    featuresLabel: "Feature system (7)",
    features: [
      "Master Blueprint",
      "Digital Core Integration",
      "Knowledge Brain",
      "AI & Common Services",
      "Observance",
      "Orchestration",
      "Companion",
    ],
    personas: ["Team Lead", "Analyst"],
    tokens: [
      { name: "Primary", value: "#710CCF" },
      { name: "Error", value: "#FB3B52" },
      { name: "Alert", value: "#FFAE00" },
      { name: "Heading", value: "#222222" },
      { name: "Body", value: "#696F8C" },
    ],
    typeface: "Graphik",
    stats: [
      { value: "$70M", label: "Value delivered" },
      { value: "95%+", label: "First-time-right" },
      { value: "80%", label: "Cycle-time reduction — onboarding weeks to days" },
      { value: "160k+", label: "Roles automated" },
      { value: "3×", label: "Banking-portfolio revenue" },
      { value: "30+", label: "Apps unified into one ecosystem" },
    ],
    slots: [
      { label: "Welcome screen — faster decisions, enhanced insights", src: "/projects/agentic-operations-platform/01.jpg" },
      { label: "Landscape view — workforce distribution map", src: "/projects/agentic-operations-platform/02.jpg" },
      { label: "Document processing — live and digitized view", src: "/projects/agentic-operations-platform/03.jpg" },
      { label: "Agentic huddle — agents resolving an exception", src: "/projects/agentic-operations-platform/04.jpg" },
      { label: "Activity log — agent correspondence", src: "/projects/agentic-operations-platform/05.jpg" },
      { label: "Reconciliation dashboard", src: "/projects/agentic-operations-platform/06.jpg" },
    ],
  },

  /* ── 02 ─────────────────────────────────────────────────────────── */
  {
    n: "02",
    slug: "talent-intelligence-platform",
    title: "Talent Intelligence Platform",
    tag: "Case study — (02)",
    status: "full",
    roles: ["UX design", "Data visualization", "Agentic AI"],
    blurb:
      "Real-time workforce demand–supply forecasting with predictive alerts and an agentic assistant.",
    facts: [
      "Lead UX & Visual Design",
      "Workforce demand–supply intelligence",
      "Client confidential",
      "2025",
    ],
    year: "2025",
    category: "UX Design",
    lede:
      "A real-time platform that helps HR and delivery leaders manage workforce demand and supply — forecasting where skills and roles will be needed, surfacing internal and external talent, and using predictive alerts and an agentic assistant to keep the workforce proactively aligned with business demand.",
    blocks: [
      {
        n: "01",
        label: "Research",
        body: [
          "Organizations struggle to align the workforce with fast-changing needs. Forecasting demand and matching internal and external talent is slow, causing skill gaps and costly recruitment.",
          "Stakeholder interviews, a design hackathon, workflow mapping, and demand–supply data-flow analysis. Four personas were defined, with end-to-end journeys mapped for each.",
        ],
      },
      {
        n: "02",
        label: "Ideation",
        body: [
          "An agentic AI layer that assesses demand and supply in real time.",
          "Brainstormed features, wireframes, and journeys; prioritized surge alerts, overdue tracking, and gap forecasting; defined a clear module navigation.",
        ],
      },
      {
        n: "03",
        label: "Feature system",
        body: ["Four capabilities spanning planning, execution, foresight, and transparency."],
      },
      {
        n: "04",
        label: "How it was solved",
        body: [
          "A four-hub information architecture — Cognitive Command Centre, Manage Demand, Manage Supply, and a summary dashboard — with GenAI across modules.",
          "Predictive alerts and an assistant shift planning from reactive to proactive. The glassmorphic design language was documented for handoff.",
        ],
      },
      {
        n: "05",
        label: "My Contribution",
        body: [
          "Hands-on, I designed the motion and microinteractions for the dashboards and the agentic assistant. Dense, data-heavy screens punish careless movement, so most of the work was restraint — deciding what earns animation at all, then making sure a chart updating, an alert arriving, and the assistant responding each read differently at a glance.",
          "The assistant needed motion that communicated work in progress without implying it was finished. Thinking, streaming, and resolved states had to be distinguishable before a word of the response was read.",
          "I resolved interaction issues as they came up during build, tightening behaviour where the prototype and the implementation had diverged, and where live data changed how a component actually behaved.",
        ],
        items: [
          "Motion for predictive alerts and surge states",
          "Thinking, streaming, and resolved states for the assistant",
          "Interaction fixes across the dashboards during build",
        ],
      },
      {
        n: "06",
        label: "Outcomes & KPIs",
        body: [
          "Shipped high-fidelity dashboards and flows. Delivered surge alerts, overdue tracking, and demand–supply gap forecasting, and established the module navigation and a milestone roadmap into build.",
          "Quantified field KPIs are not disclosed.",
        ],
      },
    ],
    featuresLabel: "Feature system (4)",
    features: [
      "Workforce planning & demand–supply forecasting",
      "Agentic task execution & insight generation",
      "Focus Hub — future alerts & watchouts",
      "Agentic Huddle — watch the agents collaborate",
    ],
    personas: [
      "Talent Supply Chain Lead",
      "Recruitment Manager",
      "Demand Analyst",
      "Business Lead",
    ],
    tokens: [
      { name: "Primary", value: "#7500C0" },
      { name: "Error", value: "#FB3B52" },
      { name: "Alert", value: "#FFAE00" },
      { name: "Success", value: "#66A352" },
      { name: "Body", value: "#696F8C" },
    ],
    typeface: "Graphik",
    slots: [
      { label: "Agent — conversational demand intake", src: "/projects/talent-intelligence-platform/01.jpg" },
      { label: "Command centre — revenue, supply and profitability", src: "/projects/talent-intelligence-platform/02.jpg" },
      { label: "Talent Intelligence Platform — screen 03", src: "/projects/talent-intelligence-platform/03.jpg" },
      { label: "Talent Intelligence Platform — screen 04", src: "/projects/talent-intelligence-platform/04.jpg" },
      { label: "Talent Intelligence Platform — screen 05", src: "/projects/talent-intelligence-platform/05.jpg" },
      { label: "Talent Intelligence Platform — screen 06", src: "/projects/talent-intelligence-platform/06.jpg" },
    ],
  },

  /* ── 03 ─────────────────────────────────────────────────────────── */
  {
    n: "03",
    slug: "enquiry-management-system",
    title: "Enquiry Management System",
    tag: "Case study — (03)",
    status: "full",
    roles: ["UX research", "Product design", "Design systems"],
    blurb:
      "An enquiry platform for two-wheeler dealerships — research, a UX audit, and a dual-persona redesign. M.Des graduation project.",
    facts: [
      "UX Designer (solo)",
      "Automotive retail · 2-wheeler",
      "M.Des graduation · OEM confidential",
      "2024",
    ],
    year: "2024",
    category: "UX Research",
    lede:
      "An enquiry management system for two-wheeler dealerships that logs, tracks, and manages every walk-in enquiry — so no lead falls through the cracks and management gets a bird's-eye view to predict sales performance.",
    note:
      "Academic project. The manufacturer and the three benchmarked dealerships are genericized as Dealership A, B, and C.",
    blocks: [
      {
        n: "01",
        label: "Research",
        body: [
          "Most manufacturers run enquiry management through a CRM website and app, routing enquiries from dealer manager to sales rep to admin, and tagging them hot, warm, or cold.",
          "Benchmarked the walk-in experience at three competitor dealerships — tablet, paper, and desktop respectively. Interviewed sales executives: behaviour is offline-first, follow-up is valued most, and usage varies sharply by point in the journey.",
          "A UX audit covered onboarding, hierarchy, interaction, consistency, and navigation.",
        ],
      },
      {
        n: "02",
        label: "Ideation",
        items: [
          "Improve training with a guided walkthrough",
          "Smart enquiry creation, prioritized by customer type and temperature",
          "Reduce cognitive load with a vehicle catalogue",
          "Compare vehicles side by side",
          "Add value at touchpoints — quotations and brochures",
          "Create an initial enquiry with minimal details",
        ],
      },
      {
        n: "03",
        label: "Feature system",
        body: ["Five capabilities covering the lead from first walk-in to follow-up."],
      },
      {
        n: "04",
        label: "How it was solved",
        body: [
          "A dual-persona app. A Sales Executive dashboard and CRM to run the day — sales analysis, test drives, revenue, funnel, demographics — plus a Customer Walk-In showcase mode: compare vehicles, specs and colour, interactive feature identification, then capture the enquiry.",
          "A dark, high-contrast system tuned for a dealership tablet.",
        ],
      },
      {
        n: "05",
        label: "My Contribution",
        body: [
          "Hands-on, I designed the motion and microinteractions across both personas' flows. On a dealership tablet movement does practical work: it confirms an enquiry was captured, orients the rep between the CRM and the showcase mode, and gives the customer-facing screens the feel of a product demo rather than a form.",
          "I kept the treatments light. The app is used standing up, mid-conversation, often on an unreliable connection — so feedback had to be immediate and could never block the next tap.",
          "I solved the usability issues surfaced by the audit and by testing: onboarding steps people skipped, hierarchy that buried the follow-up action, and inconsistencies between screens that had been designed at different points.",
        ],
        items: [
          "Motion across the CRM and walk-in showcase modes",
          "Capture and confirmation feedback tuned for one-handed use",
          "Fixes for the issues the audit and testing surfaced",
        ],
      },
      {
        n: "06",
        label: "Outcomes",
        body: [
          "A validated redesign that lowers cognitive load, speeds onboarding, and fits the rep's offline-first journey. Delivered end to end: research, UX audit, ideation, and high-fidelity design with a style guide.",
          "Field KPIs are not applicable — this was an academic project.",
        ],
      },
    ],
    featuresLabel: "Feature system (5)",
    features: [
      "Lead Tracking",
      "Automated Responses",
      "CRM Integration",
      "Analytics & Reporting",
      "Follow-Up Management",
    ],
    personas: ["Sales Executive", "Customer Walk-In"],
    tokens: [
      { name: "Primary", value: "#0030DC" },
      { name: "Critical", value: "#CC0000" },
      { name: "Base", value: "#000000" },
      { name: "Surface", value: "#FFFFFF" },
    ],
    typeface: "Montserrat",
    slots: [
      { label: "Customer walk-in — vehicle showcase", src: "/projects/enquiry-management-system/01.jpg" },
      { label: "Sales executive dashboard", src: "/projects/enquiry-management-system/02.jpg" },
      { label: "Enquiry Management System — screen 03", src: "/projects/enquiry-management-system/03.jpg" },
      { label: "Enquiry Management System — screen 04", src: "/projects/enquiry-management-system/04.jpg" },
      { label: "Enquiry Management System — screen 05", src: "/projects/enquiry-management-system/05.jpg" },
      { label: "Enquiry Management System — screen 06", src: "/projects/enquiry-management-system/06.jpg" },
      { label: "Enquiry Management System — screen 07", src: "/projects/enquiry-management-system/07.jpg" },
    ],
  },

  /* ── 04 ─────────────────────────────────────────────────────────── */
  {
    n: "04",
    slug: "immersive-boardroom-experience",
    title: "Immersive Boardroom Experience",
    tag: "Case study — (04)",
    status: "full",
    roles: ["Experience design", "Motion", "Art direction"],
    blurb:
      "A presenter-led, motion-driven boardroom experience built for high-stakes CXO conversations.",
    facts: [
      "Lead Experience & Motion Design",
      "Concept → Motion → Build-to-intent",
      "Executive experience · sales enablement",
      "Client confidential · 2025",
    ],
    year: "2025",
    category: "Experience Design",
    lede:
      "A presenter-led, immersive boardroom experience built to pitch a global firm's India technology centers to visiting CXOs — compressing decades of scale, global reach, and reinvention into a single guided, cinematic conversation, with no slides in the room.",
    blocks: [
      {
        n: "01",
        label: "The brief",
        body: [
          "650+ CXOs visit each year, and the pitch has to land in one session. The story is huge: global headcount, a fifteen-city India footprint, twenty-plus years of delivery evolution, five pillars, and client proof.",
          "Turn it into one guided experience a presenter drives live — no slides — diving deep where a given executive cares, then returning cleanly.",
        ],
      },
      {
        n: "02",
        label: "Experience structure",
        body: [
          "Opens on a personalized welcome that greets the executives by name, branded to their company, with all systems active and agents ready.",
          "Three modes: Overview — a global globe, India map, differentiators, and the reinvention journey. Journey — five pillars, each a 3D world. Case Studies — a spin-to-explore function wheel leading to client proof.",
        ],
      },
      {
        n: "03",
        label: "The story it puts in the room",
        body: [
          "Four figures carry the scale of the argument, each rendered as a live, navigable object rather than a bullet.",
        ],
      },
      {
        n: "04",
        label: "Signature moments",
        body: ["Eight moments the presenter can reach for, in any order the room needs."],
      },
      {
        n: "05",
        label: "Motion & 3D craft",
        body: [
          "Every pillar carries its own generative 3D render — spheres, an orbital atom, a globe, a function wheel — and transitions run to millisecond-level motion specs.",
          "I authored the motion specs and the agent master prompts so AI could build to intent, holding the language consistent across a dozen pivots. Dark, cinematic canvas; violet and teal accents; glassmorphic cards.",
        ],
      },
      {
        n: "06",
        label: "My Contribution",
        body: [
          "This is the project where I was most hands-on end to end. I owned the motion design and microinteractions, specified to millisecond-level timing, because a presenter drives the experience live and any hesitation in a transition is visible to everyone in the room.",
          "I worked hand-in-hand with the development team through the build — pairing on intent rather than handing over a spec, reviewing each implementation against the motion specs, and adjusting where the medium pushed back.",
          "I ran QA on the live experience: rehearsing the paths a presenter actually takes, checking that every deep-dive returns cleanly to where it branched, and catching the state and timing issues that only appear once the whole thing is running at full size.",
          "Alongside that I solved issues as they surfaced and held the motion language consistent across a dozen pivots.",
        ],
        items: [
          "Motion specs at millisecond-level timing",
          "Paired with the development team through the build",
          "QA on the live, presenter-driven experience",
          "Issue-solving across a dozen pivots",
        ],
      },
      {
        n: "07",
        label: "Outcomes",
        body: [
          "A boardroom-ready, slide-free experience that compresses a sprawling global story into one guided, presenter-steered, personalized conversation — repeatable across client visits.",
        ],
      },
    ],
    featuresLabel: "Signature moments (8)",
    features: [
      "Personalized welcome",
      "Global presence — dot-matrix globe",
      "India footprint — interactive map",
      "Key differentiators",
      "Reinvention journey arc",
      "Journey pillars carousel",
      "Gen AI orbital model",
      "Case-study function wheel",
    ],
    personas: [
      "Orchestrating the Ecosystem",
      "Talent Transformation",
      "Gen AI-Led Delivery",
      "Deep Industry & Functional Expertise",
      "Pervasive Innovation",
    ],
    stats: [
      { value: "1140K+", label: "Global headcount, on a live globe" },
      { value: "350K+", label: "India, across 15+ city centers" },
      { value: "650+", label: "CXOs in twelve months" },
      { value: "23+", label: "Years — offshore delivery to reinvention engine" },
    ],
    slots: [
      { label: "Personalized welcome", src: "/projects/immersive-boardroom-experience/01.jpg" },
      { label: "Journey pillars — compressing the journey", src: "/projects/immersive-boardroom-experience/02.jpg" },
      { label: "Immersive Boardroom Experience — screen 03", src: "/projects/immersive-boardroom-experience/03.jpg" },
      { label: "Immersive Boardroom Experience — screen 04", src: "/projects/immersive-boardroom-experience/04.jpg" },
      { label: "Immersive Boardroom Experience — screen 05", src: "/projects/immersive-boardroom-experience/05.jpg" },
      { label: "Immersive Boardroom Experience — screen 06", src: "/projects/immersive-boardroom-experience/06.jpg" },
      { label: "Immersive Boardroom Experience — screen 07", src: "/projects/immersive-boardroom-experience/07.jpg" },
      { label: "Immersive Boardroom Experience — screen 08", src: "/projects/immersive-boardroom-experience/08.jpg" },
    ],
  },

  /* ── 05 ─────────────────────────────────────────────────────────── */
  {
    n: "05",
    slug: "ux-evaluation-framework",
    title: "UX Evaluation Framework",
    tag: "Case study — (05)",
    status: "soon",
    roles: ["UX research", "Heuristics", "Design governance"],
    blurb:
      "A heuristic framework and scoring system to audit and strengthen product experiences.",
    facts: ["UX Research & Governance", "Heuristics · Scoring", "Internal", "2025"],
    year: "2025",
    category: "UX Research",
    lede:
      "A heuristic-driven framework and scoring system used to audit product experiences, surface usability gaps, and prioritize fixes — strengthening design governance with a shared, repeatable measure of quality.",
    blocks: [],
    willCover: [
      "Heuristic set & rubric",
      "Scoring & severity model",
      "Audit workflow",
      "Reporting & prioritization",
      "Governance integration",
      "Before/after impact",
    ],
    slots: [{ label: "Hero — scoring dashboard" }],
  },

  /* ── 06 ─────────────────────────────────────────────────────────── */
  {
    n: "06",
    slug: "project-management-system",
    title: "Project Management System",
    tag: "Case study — (06)",
    status: "soon",
    roles: ["Product design", "Systems", "PMO"],
    blurb:
      "Delivery and governance tooling to plan, track, and ship cross-functional work.",
    facts: ["Product Design", "Systems · PMO", "Internal", "2025"],
    year: "2025",
    category: "Product Design",
    lede:
      "Delivery and governance tooling that helps cross-functional teams plan, track, and ship — bringing milestones, ownership, and status into one clear, actionable view built for real delivery rhythms.",
    blocks: [],
    willCover: [
      "Delivery pain points",
      "Planning & tracking model",
      "Ownership & status system",
      "Dashboards & views",
      "Design system",
      "Adoption & outcomes",
    ],
    slots: [{ label: "Hero — delivery dashboard" }],
  },
];

/* The home page shows a short, curated cut rather than the full index —
   /work is where everything lives. Order follows this list, not the
   project numbering. */
export const featuredSlugs = [
  "agentic-operations-platform",
  "talent-intelligence-platform",
  "immersive-boardroom-experience",
] as const;

export const featuredProjects = featuredSlugs.map((slug) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`featuredSlugs references unknown project: ${slug}`);
  return project;
});

/** Categories with counts, derived from the projects that exist. */
export const workCategories = [
  { label: "All", count: projects.length },
  ...Array.from(
    projects.reduce(
      (acc, p) => acc.set(p.category, (acc.get(p.category) ?? 0) + 1),
      new Map<string, number>()
    )
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => ({ label, count })),
];
