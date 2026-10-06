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

/** Body strings may wrap a phrase in **markers** to emphasise it in place.
 *  Used for the facts worth catching on a skim. */
export type ProjectBlock = {
  n: string;
  label: string;
  body?: string[];
  /** Rendered as a plus-marked list under the block copy. */
  items?: string[];
};

export type Metric = { value: string; label: string };

/** A band of evidence. Each project shows only the kind it can honestly
 *  support: KPIs where results are verified, outcomes where they are not.
 *  `context` describes the scale of the problem and is never an outcome. */
export type Evidence = {
  label: string;
  takeaway?: string;
  metrics?: Metric[];
  points?: string[];
  /** Source or scope line set under the band. */
  note?: string;
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
  /** Scale of the environment, shown ahead of the case study. */
  context?: Evidence;
  evidence?: Evidence;
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
          "The previous generation was **point solutions**: largely RPA and workflow, with bespoke AI assets, loose data capture, and **no common process taxonomy**. **Every exception bounced back to a human**.",
          "**Stakeholder interviews, workflow mapping, and data-flow analysis** surfaced the bottlenecks. **Personas were defined per process area** and a shared success matrix agreed.",
        ],
      },
      {
        n: "02",
        label: "Ideation",
        body: [
          "Problem statement: how might we evolve the platform into an **agentic AI engine** that **proactively orchestrates end-to-end processes** with **transparency, control, and trust**?",
          "Explored agent behaviours, cross-process collaboration, and **a single interface language** across Discover, Define, Design, Develop, and Deliver.",
        ],
      },
      {
        n: "03",
        label: "Feature system",
        body: [
          "**Seven capabilities**, each addressing a different layer of the orchestration problem.",
        ],
      },
      {
        n: "04",
        label: "How it was solved",
        body: [
          "Unified **30+ apps into one ecosystem**. Agents **handle routine decisions** and **escalate exceptions** to a human companion.",
          "A **glassmorphic design system** (violet-led palette, full component library) **documented for handoff**, with a structured review-and-feedback loop.",
        ],
      },
      {
        n: "05",
        label: "My Contribution",
        body: [
          "I owned **UX and UI end to end**, starting from the problem rather than the screens: **most of the delay sat in the handoffs, not the work**. I wrote the problem statements, mapped **as-is and to-be flows** for each process area, and built personas for the coordinator, analyst, and manager.",
          "I defined the **information architecture** and the **agentic review loop**, so a person can always see what an agent did and why. Then the interface: flows, component states, a documented design system, **accessibility specified with the components**, and motion that tells agent states apart, refined through build.",
        ],
        items: [
          "Problem statements, as-is and to-be flows",
          "Persona research across coordinator, analyst, and manager",
          "Information architecture and the agentic review loop",
          "Interface design, component states, and the design system",
          "Accessibility specified with the components",
          "Motion and microinteraction for agent states and escalation",
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
    evidence: {
      label: "KPIs & Business Impact",
      metrics: [
        { value: "95%+", label: "First-time-right process accuracy" },
        { value: "80%", label: "Cycle-time reduction" },
        { value: "$70M", label: "Business value from touchless transactional processes" },
        { value: "30+", label: "Applications unified into one ecosystem" },
      ],
      note: "Platform-level impact figures supplied by the business/program team; outcomes reflect the wider transformation and are not attributed solely to UX design.",
    },
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
          "Organizations struggle to **align the workforce with fast-changing needs**. Forecasting demand and matching internal and external talent is slow, causing **skill gaps and costly recruitment**.",
          "Stakeholder interviews, a **design hackathon**, workflow mapping, and demand–supply data-flow analysis. **Four personas** were defined, with **end-to-end journeys** mapped for each.",
        ],
      },
      {
        n: "02",
        label: "Ideation",
        body: [
          "An **agentic AI layer** that assesses **demand and supply in real time**.",
          "Brainstormed features, wireframes, and journeys; prioritized **surge alerts, overdue tracking, and gap forecasting**; defined **a clear module navigation**.",
        ],
      },
      {
        n: "03",
        label: "Feature system",
        body: ["**Four capabilities** spanning planning, execution, foresight, and transparency."],
      },
      {
        n: "04",
        label: "How it was solved",
        body: [
          "A **four-hub information architecture**: Cognitive Command Centre, Manage Demand, Manage Supply, and a summary dashboard, with **GenAI across modules**.",
          "**Predictive alerts** and an assistant shift planning **from reactive to proactive**. The glassmorphic design language was **documented for handoff**.",
        ],
      },
      {
        n: "05",
        label: "My Contribution",
        body: [
          "I owned the **experience end to end**. The brief asked for dashboards, but **the real problem was demand and supply data living in separate systems**, so gaps only surfaced after they had cost a quarter. I reframed it into problem statements, identified the personas, and put **the gap, its cause, and the action on one surface**.",
          "I defined the **information architecture** and **an alert model that separates what to watch from what to act on**, then designed the dashboards and the agentic assistant for readability in dense data. I owned motion too: chart updates, alerts, and the assistant's thinking, streaming, and resolved states each read differently.",
        ],
        items: [
          "Problem statements reframed from the original brief",
          "Persona identification and as-is to to-be journeys",
          "Module information architecture and the alert model",
          "High-fidelity dashboards and the agentic assistant",
          "Readability and accessibility across dense data",
          "Motion for alerts, surge states, and assistant feedback",
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
    evidence: {
      label: "Key Outcomes",
      takeaway: "Reactive workforce planning → Predictive workforce intelligence",
      points: [
        "Established the product's four-hub information architecture",
        "Delivered demand and supply forecasting workflows",
        "Introduced predictive alerts for surge, overdue demand and talent gaps",
        "Designed agent-assisted workforce planning experiences",
        "Defined high-fidelity flows and a roadmap into implementation",
      ],
    },
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
          "Most manufacturers run enquiry management through a **CRM website and app**, routing enquiries from dealer manager to sales rep to admin, and tagging them **hot, warm, or cold**.",
          "**Benchmarked the walk-in experience at three competitor dealerships** — tablet, paper, and desktop respectively. Interviewed sales executives: behaviour is **offline-first**, **follow-up is valued most**, and usage varies sharply by point in the journey.",
          "A **UX audit** covered onboarding, hierarchy, interaction, consistency, and navigation.",
        ],
      },
      {
        n: "02",
        label: "Ideation",
        items: [
          "Improve training with a **guided walkthrough**",
          "**Smart enquiry creation**, prioritized by customer type and temperature",
          "Reduce cognitive load with a **vehicle catalogue**",
          "**Compare vehicles** side by side",
          "Add value at touchpoints — **quotations and brochures**",
          "Create an initial enquiry with **minimal details**",
        ],
      },
      {
        n: "03",
        label: "Feature system",
        body: ["**Five capabilities** covering the lead from first walk-in to follow-up."],
      },
      {
        n: "04",
        label: "How it was solved",
        body: [
          "A **dual-persona app**. A **Sales Executive dashboard and CRM** to run the day (sales analysis, test drives, revenue, funnel, demographics), plus a **Customer Walk-In showcase mode**: compare vehicles, specs and colour, interactive feature identification, then capture the enquiry.",
          "A **dark, high-contrast system** tuned for a **dealership tablet**.",
        ],
      },
      {
        n: "05",
        label: "My Contribution",
        body: [
          "**Solo, end to end.** My research and UX audit showed the problem was **the process as much as the software**: enquiries captured twice, follow-ups that relied on memory, and showroom conversations interrupted by data entry. Mapping both personas' journeys, I **removed the steps that existed for the system rather than the person**.",
          "I split the product into a **CRM mode** and a **customer-facing showcase mode**, designed the full interface and style guide, treated **accessibility and one-handed reach** as constraints from the start, and kept motion light so feedback is immediate and never blocks the next tap.",
        ],
        items: [
          "Research and a UX audit of the existing process",
          "Problem statements, personas, and pain-point mapping",
          "As-is and to-be journeys for both personas",
          "Information architecture across CRM and showcase modes",
          "Full interface design with a style guide",
          "Accessibility and one-handed reach as constraints",
          "Motion and capture feedback tuned for live use",
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
    evidence: {
      label: "Research & Design Evidence",
      takeaway: "One dealership platform. Two distinct moments of use.",
      metrics: [
        { value: "3", label: "Dealerships benchmarked across different enquiry-capture models" },
        { value: "2", label: "Experience modes: Sales Executive and Customer Walk-In" },
        { value: "End to end", label: "Project ownership: research → UX audit → ideation → product design → high-fidelity output" },
      ],
      note: "Field KPIs are not applicable — this was an academic project.",
    },
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
          "**650+ CXOs visit each year**, and **the pitch has to land in one session**. The story is huge: global headcount, a fifteen-city India footprint, twenty-plus years of delivery evolution, five pillars, and client proof.",
          "Turn it into **one guided experience a presenter drives live** — **no slides** — diving deep where a given executive cares, then **returning cleanly**.",
        ],
      },
      {
        n: "02",
        label: "Experience structure",
        body: [
          "Opens on a **personalized welcome** that **greets the executives by name**, branded to their company, with all systems active and agents ready.",
          "**Three modes**: **Overview** — a global globe, India map, differentiators, and the reinvention journey. **Journey** — five pillars, each a 3D world. **Case Studies** — a spin-to-explore function wheel leading to client proof.",
        ],
      },
      {
        n: "03",
        label: "The story it puts in the room",
        body: [
          "**Four figures carry the scale** of the argument, each rendered as a **live, navigable object** rather than a bullet.",
        ],
      },
      {
        n: "04",
        label: "Signature moments",
        body: ["**Eight moments** the presenter can reach for, in **any order the room needs**."],
      },
      {
        n: "05",
        label: "Motion & 3D craft",
        body: [
          "Every pillar carries **its own generative 3D render** — spheres, an orbital atom, a globe, a function wheel — and transitions run to **millisecond-level motion specs**.",
          "I authored **the motion specs and the agent master prompts** so **AI could build to intent**, holding the language consistent across **a dozen pivots**. Dark, cinematic canvas; violet and teal accents; glassmorphic cards.",
        ],
      },
      {
        n: "06",
        label: "My Contribution",
        body: [
          "The problem was format: **a 45-minute CXO conversation cannot be a deck**. I designed for two audiences, a presenter who must steer without appearing to operate software and CXOs who need it to be about their business, around **a spine any branch can leave and return to**.",
          "I set the information architecture with **guaranteed return paths**, designed the interface and signature moments to be **legible at boardroom distance**, and **specified motion to the millisecond**. I paired with the development team through build and ran QA by rehearsing the paths presenters actually take.",
        ],
        items: [
          "Framed the problem and the narrative architecture",
          "Audience identification across presenter and CXO",
          "As-is session mapping and the to-be branching structure",
          "Information architecture with guaranteed return paths",
          "Interface and signature moments, legible at distance",
          "Motion specified to millisecond timing",
          "Paired through build and ran QA on the live experience",
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
    context: {
      label: "Experience Context",
      metrics: [
        { value: "650+", label: "CXO visits annually" },
        { value: "1.14M+", label: "Global workforce represented in the story" },
        { value: "350K+", label: "India workforce represented" },
        { value: "15+", label: "India locations" },
        { value: "23+", label: "Years of evolution compressed into the experience narrative" },
      ],
    },
    evidence: {
      label: "Experience Outcomes",
      points: [
        "Replaced a conventional slide-based pitch with a presenter-controlled digital experience",
        "Created three navigable storytelling modes",
        "Structured five transformation pillars into immersive story worlds",
        "Enabled presenters to move non-linearly based on executive interest",
        "Delivered motion specifications and build-to-intent QA for implementation consistency",
      ],
    },
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
    evidence: {
      label: "Framework Outcomes",
      points: [
        "Created a repeatable heuristic evaluation structure",
        "Established scoring and severity as a common UX language",
        "Connected findings to prioritisation and governance",
        "Made product-quality reviews more structured and comparable",
      ],
    },
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
    evidence: {
      label: "Product Outcomes",
      points: [
        "Centralized milestones, ownership and delivery status",
        "Created a common view of cross-functional project health",
        "Improved visibility of responsibilities and dependencies",
        "Structured planning and governance around real delivery rhythms",
      ],
    },
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
