/**
 * Single source of truth for every piece of content on the site.
 *
 * Everything here comes from Sudeep Vishwakarma's resume or from the scanned
 * certificates in /public/certificates, so updating those documents only means
 * updating this file. No invented metrics or skills.
 */

export const profile = {
  name: "Sudeep Vishwakarma",
  shortName: "Sudeep",
  initials: "SV",
  title: "Java Full Stack Developer",
  roles: [
    "Java Full Stack Developer",
    "Spring Boot Engineer",
    "Backend Developer",
    "React.js Developer",
  ],
  tagline:
    "Computer Science graduate building scalable, reliable web applications with Java, Spring, Hibernate and React.",
  /** Signature hero headline, split so each clause can animate separately. */
  headline: ["Thoughtful interfaces.", "Reliable backends."] as const,
  /** Short hero introduction, drawn from the resume's career objective. */
  intro:
    "I build production-minded web applications end to end — layered Java backends with Spring and Hibernate, relational data models in MySQL, and clean responsive interfaces on top. Recently I shipped a three-role food delivery marketplace on the bare Servlet API and an AI resume engine powered by GPT-4o.",
  objective:
    "Computer Science graduate seeking a Software Developer role where I can apply hands-on experience in Java, Spring, Hibernate and full-stack web development to build scalable, reliable applications, while continuously growing my technical skills in a collaborative, fast-paced engineering environment.",
  location: "Challakere, Karnataka, India",
  availability: "Open to Software Developer roles",
  email: "sudeepvishwakarma5456@gmail.com",
  phone: "+91 7676102096",
  phoneHref: "tel:+917676102096",
  github: "https://github.com/Sudeep7676",
  githubHandle: "github.com/Sudeep7676",
  linkedin: "https://www.linkedin.com/in/sudeep-v7676/",
  linkedinHandle: "linkedin.com/in/sudeep-v7676",
  /** Single-page PDF — used for both the "View" and "Download" actions. */
  resume: "/resume.pdf",
  resumeFileName: "Sudeep_Vishwakarma_Resume.pdf",
  /** Image version of the same document, kept for preview use. */
  resumeImage: "/resume.jpg",
  photo: "/photo.jpg",
  /**
   * Portrait focal point. Tune these if the crop ever clips the face:
   * objectPosition is applied directly to the hero and about images.
   */
  photoFocus: "50% 22%",
} as const;

/** Headline facts, each traceable to the resume. */
export const heroFacts = [
  { value: "8.3", label: "CGPA", hint: "B.E. CSE" },
  { value: "2", label: "Internships", hint: "2026" },
  { value: "2", label: "Certifications", hint: "Verified" },
] as const;

/**
 * Hero stack annotation. Each step is confirmed by the resume: Java is the
 * primary language, Spring/Spring Boot the backend framework, MySQL the store.
 */
export const stackFlow = [
  {
    id: "java",
    label: "Java",
    note: "Primary language — 106 classes in Foodly",
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    note: "Backend framework across the Spring ecosystem",
  },
  {
    id: "mysql",
    label: "MySQL",
    note: "Relational store, accessed through JDBC",
  },
] as const;

/* ------------------------------------------------------------------ skills */

/** A concrete, verifiable place a technology was used. */
export type SkillUsage = {
  /** Where it was used — a project title or organisation. */
  context: string;
  kind: "project" | "experience" | "certification";
  /** A short factual implementation example. */
  detail: string;
  /** Anchor to the relevant section, when one exists. */
  href?: string;
};

export type Skill = {
  name: string;
  group: SkillGroupName;
  usages: SkillUsage[];
  /**
   * Shown when a skill is on the resume but has no shipped project here yet.
   * Keeps the explorer honest instead of inventing an association.
   */
  note?: string;
};

export type SkillGroupName =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Tools & Concepts";

export const skillGroupMeta: {
  name: SkillGroupName;
  caption: string;
  accent: "blue" | "violet" | "emerald" | "amber" | "sky";
}[] = [
  { name: "Languages", caption: "Core programming", accent: "amber" },
  { name: "Frontend", caption: "Markup, styling and views", accent: "sky" },
  { name: "Backend", caption: "J2EE and the Spring ecosystem", accent: "emerald" },
  { name: "Databases", caption: "Relational modelling", accent: "violet" },
  { name: "Tools & Concepts", caption: "Build, deploy and design", accent: "blue" },
];

const FOODLY = { context: "Foodly", kind: "project" as const, href: "#projects" };
const OPTIMIZER = {
  context: "AI Resume Optimizer",
  kind: "project" as const,
  href: "#projects",
};
const TAP = {
  context: "Tap Academy internship",
  kind: "experience" as const,
  href: "#experience",
};
const SUPRMENTR = {
  context: "SuprMentr internship",
  kind: "experience" as const,
  href: "#experience",
};
const TAP_CERT = {
  context: "Tap Academy certification",
  kind: "certification" as const,
  href: "#certifications",
};

/**
 * The skills explorer reads this catalogue. Every `usages` entry maps to
 * something stated on the resume or printed on a certificate — nothing is
 * inferred. Skills without a shipped association carry a `note` instead.
 */
export const skills: Skill[] = [
  /* ----------------------------- languages ----------------------------- */
  {
    name: "Java",
    group: "Languages",
    usages: [
      {
        ...FOODLY,
        detail:
          "106 Java classes organised across a layered DAO → Service → Controller design, with no web framework underneath.",
      },
      {
        ...TAP,
        detail:
          "Built and deployed dynamic web applications using Java, Servlets, JDBC and MySQL with full CRUD functionality.",
      },
    ],
  },
  {
    name: "JavaScript",
    group: "Languages",
    usages: [
      {
        ...TAP,
        detail:
          "Created responsive front-end interfaces with HTML, CSS and JavaScript following OOP design principles.",
      },
    ],
  },
  {
    name: "SQL",
    group: "Languages",
    usages: [
      {
        ...FOODLY,
        detail:
          "All queries hand-written in the DAO layer and executed through JDBC — no ORM generating statements.",
      },
      {
        ...TAP,
        detail: "Full CRUD operations against MySQL from servlet-backed pages.",
      },
    ],
  },

  /* ------------------------------ frontend ----------------------------- */
  {
    name: "HTML",
    group: "Frontend",
    usages: [
      {
        ...TAP,
        detail: "Responsive front-end interfaces built alongside CSS and JavaScript.",
      },
      { ...FOODLY, detail: "JSP views rendering the customer, partner and admin screens." },
    ],
  },
  {
    name: "CSS",
    group: "Frontend",
    usages: [
      {
        ...FOODLY,
        detail:
          "A custom CSS design system with light/dark theming and an accessibility-aware animation layer — written from scratch, no UI library.",
      },
    ],
  },
  {
    name: "JSP",
    group: "Frontend",
    usages: [
      {
        ...FOODLY,
        detail:
          "Server-rendered views for all three roles, served by hand-mapped servlets on Tomcat 10.",
      },
    ],
  },
  {
    name: "React.js",
    group: "Frontend",
    usages: [],
    note: "Listed in my resume skill set. The projects shown here are server-rendered (JSP) or built with Next.js, so I have not linked it to a case study.",
  },

  /* ------------------------------ backend ------------------------------ */
  {
    name: "J2EE",
    group: "Backend",
    usages: [
      {
        ...FOODLY,
        detail:
          "Built directly on the Jakarta Servlet API — request dispatch, sessions and filters handled manually.",
      },
    ],
  },
  {
    name: "Servlets",
    group: "Backend",
    usages: [
      {
        ...FOODLY,
        detail:
          "30+ servlet routes mapped by hand, each re-checking the session role before doing any work.",
      },
      { ...TAP, detail: "Servlet-driven web applications with JDBC persistence." },
    ],
  },
  {
    name: "JDBC",
    group: "Backend",
    usages: [
      {
        ...FOODLY,
        detail:
          "The only database access path; every partner query is scoped to the authenticated session's restaurant ID.",
      },
      { ...TAP, detail: "Data access layer for CRUD-backed web applications." },
    ],
  },
  {
    name: "REST APIs",
    group: "Backend",
    usages: [
      {
        ...TAP,
        detail:
          "Designed and integrated RESTful APIs for user authentication, session management and server-side data processing.",
      },
    ],
  },
  {
    name: "Hibernate",
    group: "Backend",
    usages: [
      {
        ...TAP_CERT,
        detail:
          "Part of the Full Stack Web Development curriculum printed on my Tap Academy certificate.",
      },
    ],
  },
  {
    name: "Spring",
    group: "Backend",
    usages: [
      {
        ...TAP_CERT,
        detail:
          "Part of the Full Stack Web Development curriculum printed on my Tap Academy certificate.",
      },
    ],
  },
  {
    name: "Spring Boot",
    group: "Backend",
    usages: [],
    note: "Listed in my resume skill set and studied during my Tap Academy training. Foodly was written deliberately without a framework, so there is no Spring Boot case study here yet.",
  },
  {
    name: "Spring MVC",
    group: "Backend",
    usages: [],
    note: "Listed in my resume skill set. Foodly implements the same MVC separation manually on the Servlet API rather than through Spring MVC.",
  },

  /* ----------------------------- databases ----------------------------- */
  {
    name: "MySQL",
    group: "Databases",
    usages: [
      {
        ...FOODLY,
        detail:
          "Relational schema behind users, restaurants, menus and orders, reached only through the DAO layer.",
      },
      { ...TAP, detail: "Backing store for CRUD web applications built during the internship." },
    ],
  },

  /* -------------------------- tools & concepts ------------------------- */
  {
    name: "Apache Tomcat 10",
    group: "Tools & Concepts",
    usages: [
      {
        ...FOODLY,
        detail:
          "Deployment target for the servlet application; the project runs locally rather than on a public host.",
      },
    ],
  },
  {
    name: "Vercel",
    group: "Tools & Concepts",
    usages: [
      {
        ...OPTIMIZER,
        detail: "Hosts the live AI Resume Optimizer deployment.",
      },
      {
        ...SUPRMENTR,
        detail:
          "Cloud-based deployment was a hands-on component of the AI and Cloud Computing programme.",
      },
    ],
  },
  {
    name: "OOPS",
    group: "Tools & Concepts",
    usages: [
      {
        ...FOODLY,
        detail:
          "Layered class design across 106 classes, with responsibilities separated per tier.",
      },
      { ...TAP, detail: "Front-end and back-end work followed OOP design principles." },
    ],
  },
  {
    name: "GitHub",
    group: "Tools & Concepts",
    usages: [],
    note: "Source for these projects lives on github.com/Sudeep7676.",
  },
];

/* ---------------------------------------------------------------- projects */

/** A single box in a project's architecture diagram. */
export type ArchNode = {
  id: string;
  label: string;
  /** Optional technology annotation shown under the label. */
  tech?: string;
  /** Column index in the left-to-right flow (stacks vertically on mobile). */
  lane: number;
  kind: "client" | "web" | "domain" | "data" | "external";
  /** What this piece is responsible for — revealed when the node is selected. */
  responsibility: string;
};

export type Architecture = {
  /** Plain-language summary of the diagram, also used as its accessible description. */
  caption: string;
  laneLabels: string[];
  nodes: ArchNode[];
  /** Footnotes shown beneath the diagram. */
  notes: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  /** One-line summary shown under the title. */
  blurb: string;
  /** The problem the project set out to solve. */
  problem: string;
  /** What Sudeep personally built. */
  contribution: string;
  /** Key features, each backed by the resume. */
  features: string[];
  /** Verified outcomes — only facts stated on the resume. */
  results: string[];
  /**
   * Screenshot shown in the browser frame.
   *
   * `shot` currently points at a hand-authored SVG mock of each product's real
   * UI, because no raster capture exists in the repo yet. To use a real
   * screenshot, save it as /public/projects/<slug>.png and change `shot` to
   * that path — `fallback` keeps the SVG as a safety net, so the card can
   * never render as a broken image.
   */
  shot: string;
  fallback: string;
  /** Shown in the faux browser address bar above the screenshot. */
  displayUrl: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  liveUrl: string | null;
  repoUrl: string;
  accent: "blue" | "violet" | "emerald";
  featured: boolean;
  /** Powers the "Architecture" tab. Derived from the real implementation. */
  architecture: Architecture;
  /** Deeper engineering notes behind the "Behind the Build" disclosure. */
  behindTheBuild: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "foodly",
    title: "Foodly",
    subtitle: "Full-Stack Food Delivery Marketplace",
    period: "Feb 2026 – Jul 2026",
    blurb:
      "A three-role food delivery marketplace built without a web framework — every route, query and security boundary written by hand on the Jakarta Servlet API.",
    problem:
      "A delivery marketplace has to serve three very different audiences from one codebase: customers browsing and ordering, restaurant partners managing their own menus and orders, and administrators approving partners. Doing that without a framework means authentication, routing, authorisation and tenant isolation all have to be designed and enforced manually — and a single missed check lets one restaurant read another's data.",
    contribution:
      "I architected and built the entire application solo: the layered DAO → Service → Controller structure across 106 Java classes, all 30+ servlet routes, the role and session model, the payment verification step, PDF invoicing, and a custom CSS design system with light/dark theming.",
    features: [
      "Three distinct role experiences — customer, restaurant partner and administrator — sharing one layered codebase.",
      "Privilege-escalation-resistant access model: roles are assigned server-side at registration, so a forged role in a request body is ignored.",
      "Partner accounts gated behind explicit admin approval before they can trade.",
      "Every partner query scoped to the authenticated session's restaurant ID, blocking cross-tenant reads via URL tampering.",
      "Server-side payment signature verification performed before an order is ever confirmed.",
      "Access-scoped PDF invoicing, so an invoice can only be fetched by the order's owner.",
      "Custom CSS design system with light/dark theming and an accessibility-aware animation layer.",
    ],
    results: [
      "106 Java classes organised across a clean DAO → Service → Controller separation.",
      "30+ servlet routes hand-mapped with no web framework.",
      "Cross-tenant access and forged role requests blocked by design, not by patching.",
    ],
    shot: "/projects/foodly.svg",
    fallback: "/projects/foodly.svg",
    displayUrl: "localhost:8080/foodly",
    stack: ["Java", "Jakarta Servlets", "JSP", "Tomcat 10", "MySQL", "JDBC"],
    metrics: [
      { value: "106", label: "Java classes" },
      { value: "30+", label: "Servlet routes" },
      { value: "3", label: "User roles" },
      { value: "0", label: "Frameworks" },
    ],
    liveUrl: null,
    repoUrl: "https://github.com/Sudeep7676",
    accent: "emerald",
    featured: true,
    architecture: {
      caption:
        "A request enters through a hand-mapped servlet route, is checked against the session's server-assigned role, then passes through the service layer to a DAO before touching MySQL. No framework dispatcher sits in between.",
      laneLabels: ["Client", "Web layer", "Domain", "Persistence"],
      nodes: [
        {
          id: "jsp",
          label: "JSP views",
          tech: "JSP",
          lane: 0,
          kind: "client",
          responsibility:
            "Server-rendered screens for all three audiences — customer, restaurant partner and administrator. Styled by a custom CSS design system with light/dark theming.",
        },
        {
          id: "routes",
          label: "Servlet routes",
          tech: "30+ mappings",
          lane: 1,
          kind: "web",
          responsibility:
            "Over thirty servlet routes mapped by hand. Each one is responsible for its own request parsing and dispatch, because there is no framework front controller doing it.",
        },
        {
          id: "guard",
          label: "Session & role guard",
          tech: "Server-assigned roles",
          lane: 1,
          kind: "web",
          responsibility:
            "Roles are assigned server-side at registration, so a forged role in a request body is ignored. Every request re-reads the role from the session rather than trusting the client.",
        },
        {
          id: "service",
          label: "Service layer",
          lane: 2,
          kind: "domain",
          responsibility:
            "Business rules live here: the order lifecycle, admin approval of partner accounts, and the checks that must pass before an order is confirmed.",
        },
        {
          id: "payment",
          label: "Payment verification",
          tech: "Signature check",
          lane: 2,
          kind: "domain",
          responsibility:
            "The payment signature is verified on the server before an order is ever confirmed, so a tampered client response cannot mark an order as paid.",
        },
        {
          id: "invoice",
          label: "PDF invoicing",
          tech: "Access-scoped",
          lane: 2,
          kind: "domain",
          responsibility:
            "Invoices are generated as PDFs and scoped to the requesting account, so an invoice can only be fetched by the order's owner.",
        },
        {
          id: "dao",
          label: "DAO layer",
          tech: "JDBC",
          lane: 3,
          kind: "data",
          responsibility:
            "The only path to the database. Every partner query is scoped to the authenticated session's restaurant ID, which is what blocks cross-tenant reads through URL tampering.",
        },
        {
          id: "mysql",
          label: "MySQL",
          tech: "Relational schema",
          lane: 3,
          kind: "data",
          responsibility:
            "Stores users, restaurants, menus and orders. Reached only through the DAO layer — no query is issued from a servlet directly.",
        },
      ],
      notes: [
        "Deployed on Apache Tomcat 10; the application runs locally rather than on a public host.",
        "The layering is enforced by convention and code review rather than by a framework, which is exactly why the boundaries were designed up front.",
      ],
    },
    behindTheBuild: [
      {
        heading: "Why no framework",
        body: "Writing it on the bare Servlet API meant request dispatch, session handling, authorisation and transactions were all mine to design. That was the point: I wanted to understand what Spring does for you before relying on it.",
      },
      {
        heading: "Tenant isolation",
        body: "The riskiest surface in a three-role marketplace is a partner reading another partner's data. Rather than filtering in the UI, every partner-facing query takes the restaurant ID from the session, so a tampered URL parameter has nothing to act on.",
      },
      {
        heading: "Trust boundaries",
        body: "Two rules kept the model simple: roles are only ever written server-side at registration, and payment state only changes after a server-side signature check. Both move the decision away from anything the client controls.",
      },
      {
        heading: "Scale of the codebase",
        body: "106 classes sounds large for a student project, but the DAO → Service → Controller split is what kept it navigable — each tier has one reason to change.",
      },
    ],
  },
  {
    slug: "ai-resume-optimizer",
    title: "AI Resume Optimizer",
    subtitle: "GPT-4o resume generation platform",
    period: "May 2026 – Jul 2026",
    blurb:
      "An AI resume engine that turns structured prompts into recruiter-ready, ATS-optimised resumes and exports them through a LaTeX → PDF pipeline.",
    problem:
      "Most resume tools output generic documents that read the same for every role and often fail applicant tracking systems. Getting a genuinely tailored, professionally typeset resume usually means rewriting content by hand and then fighting with formatting.",
    contribution:
      "I built the platform end to end as the capstone of my SuprMentr AI & Cloud Computing internship: the GPT-4o prompting layer that generates job-tailored content, the automated LaTeX → PDF export pipeline integrated with Overleaf, and the responsive Next.js interface. I deployed and host it on Vercel.",
    features: [
      "Job-tailored resume generation from structured user input, driven by GPT-4o.",
      "Automated LaTeX → PDF export pipeline for professional-quality typesetting.",
      "Overleaf integration so the generated LaTeX source stays editable.",
      "ATS-oriented output structure rather than decorative layouts.",
      "Fully responsive interface with a clean, focused flow.",
    ],
    results: [
      "Deployed and publicly reachable on Vercel.",
      "Delivered as the capstone project for the SuprMentr AI & Cloud Computing internship.",
      "Named on the SuprMentr internship certificate as “Ai resume builder with feedback”.",
    ],
    shot: "/projects/ai-resume-optimizer.svg",
    fallback: "/projects/ai-resume-optimizer.svg",
    displayUrl: "resume-optimizer-beta-seven.vercel.app",
    stack: ["Next.js", "GPT-4o", "LaTeX", "Overleaf", "Vercel"],
    metrics: [
      { value: "GPT-4o", label: "Model" },
      { value: "LaTeX", label: "Export pipeline" },
      { value: "Live", label: "On Vercel" },
    ],
    liveUrl: "https://resume-optimizer-beta-seven.vercel.app/unlock",
    repoUrl: "https://github.com/Sudeep7676",
    accent: "blue",
    featured: true,
    architecture: {
      caption:
        "Structured input is assembled into a prompt, GPT-4o generates job-tailored content, that content is injected into a LaTeX template, and the pipeline exports a typeset PDF. The whole app is hosted on Vercel.",
      laneLabels: ["Client", "Generation", "Typesetting", "Delivery"],
      nodes: [
        {
          id: "ui",
          label: "Next.js interface",
          tech: "Next.js",
          lane: 0,
          kind: "client",
          responsibility:
            "A responsive form that collects structured details from the user — the input the prompt is built from, rather than a freeform text box.",
        },
        {
          id: "prompt",
          label: "Prompt assembly",
          lane: 1,
          kind: "domain",
          responsibility:
            "Turns the structured input into a consistent prompt, so output stays predictable instead of varying with how the user phrased things.",
        },
        {
          id: "gpt",
          label: "GPT-4o",
          tech: "Generation model",
          lane: 1,
          kind: "external",
          responsibility:
            "Generates the job-tailored resume content that distinguishes one application from another.",
        },
        {
          id: "latex",
          label: "LaTeX template",
          tech: "LaTeX",
          lane: 2,
          kind: "domain",
          responsibility:
            "Generated content is injected into a LaTeX template, which is what produces professional typesetting rather than a decorative web layout.",
        },
        {
          id: "overleaf",
          label: "Overleaf",
          tech: "Editable source",
          lane: 2,
          kind: "external",
          responsibility:
            "Integrated so the generated LaTeX source stays editable — the user is not locked out of the document after generation.",
        },
        {
          id: "pdf",
          label: "PDF export",
          tech: "Automated pipeline",
          lane: 3,
          kind: "data",
          responsibility:
            "The automated LaTeX → PDF step that produces the final downloadable document.",
        },
        {
          id: "vercel",
          label: "Vercel",
          tech: "Hosting",
          lane: 3,
          kind: "external",
          responsibility:
            "Hosts the deployed application. Cloud deployment was a hands-on part of the SuprMentr programme this project was built for.",
        },
      ],
      notes: [
        "Structuring the input before prompting is what keeps output ATS-oriented instead of decorative.",
        "Built as the capstone of the SuprMentr AI & Cloud Computing internship.",
      ],
    },
    behindTheBuild: [
      {
        heading: "Structured input over freeform prompts",
        body: "Asking a model to \"improve my resume\" gives inconsistent results. Collecting structured fields first and assembling the prompt server-side made the output repeatable and let me keep the phrasing ATS-oriented.",
      },
      {
        heading: "Why LaTeX",
        body: "Recruiter-ready typesetting is the part most AI resume tools get wrong. Routing generated content through a LaTeX template moves layout quality out of the model's hands and into a typesetting engine built for it.",
      },
      {
        heading: "Keeping the document editable",
        body: "Integrating Overleaf means the generated LaTeX stays open for editing, so the tool assists rather than producing a black-box file.",
      },
    ],
  },
];

/* -------------------------------------------------------------- experience */

export type Experience = {
  role: string;
  company: string;
  type: string;
  period: string;
  location?: string;
  points: string[];
  tags: string[];
  accent: "blue" | "violet";
  /** Links this role to a certificate in `certifications`, when one exists. */
  certificateSlug?: string;
};

export const experiences: Experience[] = [
  {
    role: "Software Development Intern",
    company: "Tap Academy",
    type: "Internship",
    period: "Feb 2026 – Jul 2026",
    location: "Bangalore",
    points: [
      "Built and deployed dynamic web applications using Java, Servlets, JDBC and MySQL with full CRUD functionality.",
      "Designed and integrated RESTful APIs for user authentication, session management and server-side data processing.",
      "Created responsive front-end interfaces with HTML, CSS and JavaScript following OOP design principles.",
    ],
    tags: ["Java", "Servlets", "JDBC", "MySQL", "REST APIs"],
    accent: "blue",
    certificateSlug: "tap-academy-full-stack",
  },
  {
    role: "AI Trainee",
    company: "SuprMentr Technologies Private Limited",
    type: "Internship",
    period: "Mar 2026 – Jun 2026",
    points: [
      "Completed training in AI and Cloud Computing, building foundational skills in machine learning concepts and cloud-based deployment.",
      "Built the AI Resume Optimizer during the programme, applying course concepts to a real-world use case.",
      "Gained hands-on exposure to cloud-based deployment while developing and hosting the project.",
    ],
    tags: ["AI / ML concepts", "Cloud Computing", "Next.js", "Deployment"],
    accent: "violet",
    certificateSlug: "suprmentr-internship",
  },
];

/* ----------------------------------------------------------- certificates */

export type Certificate = {
  slug: string;
  /** Exact title as printed on the certificate. */
  title: string;
  issuer: string;
  /** Human-readable date or range as printed. Empty string when absent. */
  date: string;
  kind: "Internship" | "Certification";
  /** Path under /public. */
  image: string;
  /** Intrinsic size, so layout space is reserved and there is no shift. */
  width: number;
  height: number;
  /** Credential / registration number when printed on the document. */
  credentialId?: string;
  /** Extra printed details worth surfacing on the card. */
  details: string[];
  accent: "blue" | "violet";
};

export const certifications: Certificate[] = [
  {
    slug: "tap-academy-full-stack",
    title: "Certificate of Completion — Full Stack Web Development",
    issuer: "Tap Academy",
    date: "20 September 2026",
    kind: "Certification",
    image: "/certificates/tap-academy-full-stack.jpg",
    width: 1536,
    height: 1024,
    credentialId: "TAFEBC2C26549",
    details: [
      "Training in Full Stack Web Development",
      "Curriculum: Java, Python, HTML, CSS, Bootstrap, JavaScript, Spring, Hibernate, MySQL",
      "Signed by Rohit Ravinder, CEO — Tap Academy",
    ],
    accent: "blue",
  },
  {
    slug: "suprmentr-internship",
    title: "Certificate of Internship — Artificial Intelligence with Cloud Computing",
    issuer: "SuprMentr Technologies Pvt Ltd",
    date: "1 February 2026 – 15 May 2026",
    kind: "Internship",
    image: "/certificates/suprmentr-internship.jpg",
    width: 800,
    height: 1130,
    credentialId: "SM26VAICC0968",
    details: [
      "15-week internship, in partnership with VTU, Belagavi",
      "Domain: Artificial Intelligence with Cloud Computing",
      "Capstone project: “Ai resume builder with feedback”",
      "Issued to a student of Government Engineering College, Challakere",
    ],
    accent: "violet",
  },
];

/* ------------------------------------------------- education + awards */

export type Education = {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  location: string;
};

export const education: Education[] = [
  {
    degree: "B.E. — Computer Science and Engineering",
    institution: "Government Engineering College, Challakere",
    period: "2022 – 2026",
    grade: "CGPA 8.3",
    location: "Challakere, Karnataka",
  },
  {
    degree: "Pre-University Course (PUC)",
    institution: "Best PU Science and Commerce College, Talikote",
    period: "2020 – 2022",
    grade: "86%",
    location: "Talikote, Karnataka",
  },
];

export type Achievement = {
  title: string;
  org: string;
  platform: string;
  description: string;
  skills: string[];
  accent: "emerald" | "blue";
};

export const achievements: Achievement[] = [
  {
    title: "Cybersecurity Job Simulation",
    org: "Deloitte Australia",
    platform: "Forage",
    description:
      "Analysed web activity logs and supported a cybersecurity breach investigation as part of Deloitte Australia's job simulation.",
    skills: ["Log analysis", "Breach investigation", "Cyber forensics"],
    accent: "emerald",
  },
  {
    title: "Cybersecurity Analyst Simulation",
    org: "Tata",
    platform: "Forage",
    description:
      "Focused on Identity and Access Management (IAM) while collaborating with a cybersecurity consulting team.",
    skills: ["IAM", "Access control", "Security consulting"],
    accent: "blue",
  },
];

/* --------------------------------------------------------------- nav */

export const navLinks = [
  { href: "#about", label: "About", index: "01" },
  { href: "#skills", label: "Skills", index: "02" },
  { href: "#projects", label: "Projects", index: "03" },
  { href: "#experience", label: "Experience", index: "04" },
  { href: "#certifications", label: "Certificates", index: "05" },
  { href: "#education", label: "Education", index: "06" },
  { href: "#contact", label: "Contact", index: "07" },
] as const;
