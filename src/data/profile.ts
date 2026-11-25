export const profile = {
  name: "Muhammed Mustafa",
  role: "Backend Software Engineer",
  location: "Cairo, Egypt",
  email: "muhammedmostafa.dev@gmail.com",
  github: "https://github.com/muhamed-mustafa",
  linkedin: "https://www.linkedin.com/in/muhammedmustafa14",
  cv: "/Muhammed_Mustafa_CV.pdf",
  rotatingRoles: [
    "Backend Software Engineer",
    "Node.js · TypeScript · NestJS",
    "Microservices & event-driven systems",
    "React · Next.js",
  ],
  intro:
    "I build production APIs and backend services with Node.js, TypeScript and NestJS, from real-time features to event-driven microservices.",
  about: [
    "I'm a software engineer who has been building production backend systems with Node.js since 2021, currently at AAIT.",
    "Most of my work is API and service design: REST and GraphQL APIs, real-time features over WebSockets, and event-driven microservices that communicate through message brokers. I care about clear module boundaries, data consistency, and APIs that behave predictably for the teams consuming them.",
    "Across my roles I have worked on products in fintech, healthcare, education, e-commerce and online auctions.",
  ],
} as const;

export const stats = [
  { value: 4, suffix: "+", label: "Years building backends" },
  { value: 10, suffix: "+", label: "Client products shipped" },
  { value: 3, suffix: "", label: "Companies & freelance" },
  { value: 6, suffix: "", label: "Featured open-source projects" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Awamer Alshabaka (AAIT)",
    role: "Backend Developer (Node.js)",
    period: "Mar 2023 — Present",
    location: "Mansoura, Egypt · On-site",
    points: [
      "Deliver backend services and REST APIs for 10+ client products (mobile apps and admin dashboards) as part of a 3-person backend team.",
      "Built the backend for Teacher Now, an education platform with teacher and student bookings, real-time communication and an admin dashboard.",
      "Built the backend for Azzam, a medical and psychological consultation platform with video calls, chat and treatment plans.",
      "Built the backend for Sahel Lilmarkbat, an online auction platform with automated bidding.",
    ],
    tags: ["Node.js", "TypeScript", "NestJS", "MongoDB", "Socket.IO", "Swagger"],
  },
  {
    company: "QPIX",
    role: "Backend Developer (Node.js)",
    period: "Sep 2022 — Mar 2023",
    location: "Cairo, Egypt · Remote",
    points: [
      "Contributed to a banking system for currency exchange, with a focus on security and scalability.",
      "Developed backend modules for Nexta, a credit-card operations system, using TypeScript and Prisma.",
      "Built the backend for Zink, a fashion e-commerce store, and data APIs for Ligainsider, a German football statistics website, with GraphQL.",
      "Worked in an Agile team of 22, from sprint planning to release.",
    ],
    tags: ["TypeScript", "Prisma", "GraphQL", "MongoDB", "PostgreSQL"],
  },
  {
    company: "Freelance",
    role: "Backend Developer (Node.js)",
    period: "Jan 2021 — Sep 2022",
    location: "Mansoura, Egypt · Remote",
    points: [
      "Delivered 3 client backend projects end to end, from requirements to deployment.",
      "Earned repeat business from clients for quality of work and on-time delivery.",
    ],
    tags: ["Node.js", "Express.js", "MongoDB"],
  },
];

export type Project = {
  title: string;
  repo: string;
  summary: string;
  highlights: string[];
  stack: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Rental Platform API",
    repo: "airbnb-clone-api",
    summary:
      "A layered NestJS and MongoDB API for a short-term rental platform, with lint-enforced boundaries between the HTTP, application and infrastructure layers.",
    highlights: [
      "JWT auth with refresh-token rotation and role-based access control",
      "Optimistic concurrency on listings with MongoDB transactions",
      "Pluggable S3 / Cloudinary storage with a retryable deletion worker",
      "Unified error contract, English/Arabic messages, audience-split Swagger",
    ],
    stack: ["NestJS", "TypeScript", "MongoDB", "AWS S3", "Swagger"],
    featured: true,
  },
  {
    title: "Rental Platform Admin",
    repo: "airbnb-clone-web",
    summary:
      "An Arabic/English Next.js admin panel for the API above. A backend-for-frontend keeps tokens in an encrypted HttpOnly cookie, so the browser never sees them.",
    highlights: [
      "Coordinated refresh-token rotation, CSRF and origin checks",
      "Typed contract and Zod schemas generated from OpenAPI",
      "Full RTL support and WCAG 2.2 accessibility checks",
      "Playwright end-to-end suite against the real backend",
    ],
    stack: ["Next.js", "React", "TanStack Query", "Tailwind CSS", "Playwright"],
    featured: true,
  },
  {
    title: "Social Network & Marketplace",
    repo: "social-microservices",
    summary:
      "Eight event-driven TypeScript microservices on Kubernetes: accounts and moderation, posts, comments, a product marketplace, orders and Stripe payments.",
    highlights: [
      "Database-per-service with event-based data replication",
      "Optimistic concurrency on replicated documents",
      "Delayed jobs with Bull and Redis for expirations and bans",
    ],
    stack: ["TypeScript", "Express.js", "MongoDB", "NATS", "Kubernetes"],
  },
  {
    title: "Redis Caching Lab",
    repo: "redis-mastery-lab",
    summary:
      "A NestJS project that builds a correct Redis cache step by step, from cache-aside to token-owned distributed locks.",
    highlights: [
      "Cache stampede protection with SET NX locks",
      "Lock renewal and Lua-guarded cache writes",
      "Concurrency tests for interleaved reads and updates",
    ],
    stack: ["NestJS", "Redis", "Lua", "Vitest"],
  },
  {
    title: "Clinic Appointments",
    repo: "clinic",
    summary:
      "Clinic appointment microservices with role-based booking flows for patients, doctors and admins, and SMS reminders scheduled through events.",
    highlights: [
      "Three services communicating through NATS events",
      "Delayed Twilio SMS reminders with Bull and Redis",
    ],
    stack: ["TypeScript", "MongoDB", "NATS", "Twilio", "Kubernetes"],
  },
  {
    title: "E-commerce API",
    repo: "ecommerce-backend-nest",
    summary:
      "A NestJS, TypeORM and PostgreSQL e-commerce API with JWT role-based auth, email verification, products and reviews.",
    highlights: [
      "Migrations, Swagger docs and rate limiting",
      "Unit and end-to-end tests for the products module",
    ],
    stack: ["NestJS", "TypeORM", "PostgreSQL", "Jest"],
  },
];

export const skillGroups = [
  { title: "Backend", items: ["Node.js", "NestJS", "Express.js", "TypeScript", "JavaScript"] },
  { title: "APIs", items: ["REST", "GraphQL", "Socket.IO", "WebSockets", "Swagger / OpenAPI"] },
  { title: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "TypeORM", "Prisma", "Mongoose"] },
  { title: "Messaging", items: ["NATS", "RabbitMQ", "Apache Kafka", "Bull"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Redux"] },
  { title: "DevOps & Testing", items: ["Docker", "Kubernetes", "CI/CD", "Jest", "Vitest", "Playwright"] },
] as const;

export const marquee = [
  "Node.js", "TypeScript", "NestJS", "Express.js", "PostgreSQL", "MongoDB", "Redis", "GraphQL",
  "Socket.IO", "Docker", "Kubernetes", "NATS", "RabbitMQ", "Kafka", "React", "Next.js", "Tailwind CSS", "Jest",
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
