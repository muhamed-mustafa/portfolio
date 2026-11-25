export type Locale = "en" | "ar";

export const links = {
  email: "muhammedmostafa.dev@gmail.com",
  github: "https://github.com/muhamed-mustafa",
  linkedin: "https://www.linkedin.com/in/muhammedmustafa14",
  cv: "/Muhammed_Mustafa_CV.pdf",
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tags: string[];
};

export type Project = {
  title: string;
  repo: string;
  summary: string;
  highlights: string[];
  stack: string[];
  featured?: boolean;
};

export type SectionText = { eyebrow: string; title: string; description?: string };

export type Content = {
  locale: Locale;
  dir: "ltr" | "rtl";
  home: string;
  otherLocale: { href: string; label: string; short: string };
  name: string;
  firstName: string;
  role: string;
  location: string;
  rotatingRoles: string[];
  intro: string;
  badge: string;
  about: string[];
  nav: { id: string; label: string }[];
  sections: {
    about: SectionText;
    experience: SectionText;
    systems: SectionText;
    projects: SectionText;
    writing: SectionText & { note?: string; readMore: string; allPosts: string };
    skills: SectionText;
  };
  stats: { value: number; suffix: string; label: string }[];
  experience: Experience[];
  projects: Project[];
  skillGroups: { title: string; items: string[] }[];
  contact: { eyebrow: string; titleStart: string; titleAccent: string; titleEnd: string; description: string };
  systems: {
    actions: Record<ScenarioId, string>;
    log: string;
    idle: string;
    replay: string;
    effects: Record<string, string>;
    legend: { db: string; bus: string };
    hint: string;
  };
  ui: {
    viewWork: string;
    downloadCv: string;
    skip: string;
    backToTop: string;
    scrollDown: string;
    openMenu: string;
    closeMenu: string;
    commandMenu: string;
    commandPlaceholder: string;
    noResults: string;
    groups: { navigate: string; links: string; actions: string };
    goTo: string;
    openGithub: string;
    openLinkedin: string;
    copyEmail: string;
    emailCopied: string;
    toggleTheme: string;
    switchLanguage: string;
    featured: string;
    source: string;
    moreOnGithub: string;
    footer: string;
    press: string;
    toLight: string;
    toDark: string;
    tech: string;
  };
};

export type ScenarioId = "order" | "pay" | "expire" | "comment" | "ban";

const marqueeItems = [
  "Node.js", "TypeScript", "NestJS", "Express.js", "PostgreSQL", "MongoDB", "Redis", "GraphQL",
  "Socket.IO", "Docker", "Kubernetes", "NATS", "RabbitMQ", "Kafka", "React", "Next.js", "Tailwind CSS", "Jest",
];
export const marquee = marqueeItems;

const en: Content = {
  locale: "en",
  dir: "ltr",
  home: "/",
  otherLocale: { href: "/ar", label: "العربية", short: "ع" },
  name: "Muhammed Mustafa",
  firstName: "Muhammed",
  role: "Backend Software Engineer",
  location: "Cairo, Egypt",
  rotatingRoles: [
    "Backend Software Engineer",
    "Node.js · TypeScript · NestJS",
    "Microservices & event-driven systems",
    "React · Next.js",
  ],
  intro:
    "I build production APIs and backend services with Node.js, TypeScript and NestJS, from real-time features to event-driven microservices.",
  badge: "Open to backend & full-stack opportunities",
  about: [
    "I'm a software engineer who has been building production backend systems with Node.js since 2021, currently at AAIT.",
    "Most of my work is API and service design: REST and GraphQL APIs, real-time features over WebSockets, and event-driven microservices that communicate through message brokers. I care about clear module boundaries, data consistency, and APIs that behave predictably for the teams consuming them.",
    "Across my roles I have worked on products in fintech, healthcare, education, e-commerce and online auctions.",
  ],
  nav: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "systems", label: "Systems" },
    { id: "projects", label: "Projects" },
    { id: "writing", label: "Writing" },
    { id: "contact", label: "Contact" },
  ],
  sections: {
    about: { eyebrow: "About", title: "Backend engineer who cares about the boring details that keep systems correct." },
    experience: {
      eyebrow: "Experience",
      title: "Where I've been shipping.",
      description: "Production backends for client products, fintech systems and freelance projects since 2021.",
    },
    systems: {
      eyebrow: "Live system",
      title: "A system I built, running in front of you.",
      description:
        "This is the real event flow from social-microservices: eight services that never call each other directly and talk only through NATS Streaming. Trigger an action and follow the events.",
    },
    projects: {
      eyebrow: "Selected work",
      title: "Open-source projects, with the source to back them up.",
      description: "Every project below links to its repository: architecture, tests and documentation included.",
    },
    writing: {
      eyebrow: "Writing",
      title: "Notes from things I've built.",
      description: "Technical write-ups of problems I solved in my own projects.",
      readMore: "Read article",
      allPosts: "All articles",
    },
    skills: { eyebrow: "Skills", title: "The tools I reach for." },
  },
  stats: [
    { value: 4, suffix: "+", label: "Years building backends" },
    { value: 10, suffix: "+", label: "Client products shipped" },
    { value: 3, suffix: "", label: "Companies & freelance" },
    { value: 6, suffix: "", label: "Featured open-source projects" },
  ],
  experience: [
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
  ],
  projects: [
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
      highlights: ["Three services communicating through NATS events", "Delayed Twilio SMS reminders with Bull and Redis"],
      stack: ["TypeScript", "MongoDB", "NATS", "Twilio", "Kubernetes"],
    },
    {
      title: "E-commerce API",
      repo: "ecommerce-backend-nest",
      summary:
        "A NestJS, TypeORM and PostgreSQL e-commerce API with JWT role-based auth, email verification, products and reviews.",
      highlights: ["Migrations, Swagger docs and rate limiting", "Unit and end-to-end tests for the products module"],
      stack: ["NestJS", "TypeORM", "PostgreSQL", "Jest"],
    },
  ],
  skillGroups: [
    { title: "Backend", items: ["Node.js", "NestJS", "Express.js", "TypeScript", "JavaScript"] },
    { title: "APIs", items: ["REST", "GraphQL", "Socket.IO", "WebSockets", "Swagger / OpenAPI"] },
    { title: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "TypeORM", "Prisma", "Mongoose"] },
    { title: "Messaging", items: ["NATS", "RabbitMQ", "Apache Kafka", "Bull"] },
    { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Redux"] },
    { title: "DevOps & Testing", items: ["Docker", "Kubernetes", "CI/CD", "Jest", "Vitest", "Playwright"] },
  ],
  contact: {
    eyebrow: "Contact",
    titleStart: "Let's build something ",
    titleAccent: "reliable",
    titleEnd: " together.",
    description: "I'm open to backend and full-stack roles. The fastest way to reach me is email.",
  },
  systems: {
    actions: {
      order: "Place an order",
      pay: "Pay for the order",
      expire: "Let the order expire",
      comment: "Comment on a product",
      ban: "Ban a user for 7 days",
    },
    log: "Event log",
    idle: "Pick an action to publish an event.",
    replay: "Clear",
    effects: {
      "market:reserve": "product reserved",
      "payment:replicate": "order replicated",
      "expiration:schedule": "expiry job scheduled",
      "order:complete": "order marked complete",
      "order:cancel": "order cancelled",
      "market:release": "product released",
      "payment:cancel": "order cancelled",
      "post:count": "comment count updated",
      "market:count": "comment count updated",
      "reply:replicate": "comment replicated",
      "expiration:ban": "ban expiry scheduled",
      "auth:unban": "ban lifted",
    },
    legend: { db: "own database", bus: "event bus" },
    hint: "Services never call each other over HTTP.",
  },
  ui: {
    viewWork: "View my work",
    downloadCv: "Download CV",
    skip: "Skip to content",
    backToTop: "Back to top",
    scrollDown: "Scroll to about",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    commandMenu: "Command menu",
    commandPlaceholder: "Type a command or search...",
    noResults: "No results",
    groups: { navigate: "Navigate", links: "Links", actions: "Actions" },
    goTo: "Go to",
    openGithub: "Open GitHub",
    openLinkedin: "Open LinkedIn",
    copyEmail: "Copy email address",
    emailCopied: "Email copied",
    toggleTheme: "Toggle theme",
    switchLanguage: "Switch to Arabic",
    featured: "Featured",
    source: "Source",
    moreOnGithub: "More on GitHub",
    footer: "Built with Next.js, TypeScript and Motion.",
    press: "Press",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    tech: "Technologies",
  },
};

const ar: Content = {
  ...en,
  locale: "ar",
  dir: "rtl",
  home: "/ar",
  otherLocale: { href: "/", label: "English", short: "EN" },
  name: "محمد مصطفى",
  firstName: "محمد",
  role: "مهندس برمجيات Backend",
  location: "القاهرة، مصر",
  rotatingRoles: [
    "مهندس برمجيات Backend",
    "Node.js · TypeScript · NestJS",
    "Microservices وأنظمة الأحداث",
    "React · Next.js",
  ],
  intro:
    "أبني واجهات برمجية وخدمات Backend تعمل في بيئة الإنتاج باستخدام Node.js وTypeScript وNestJS، من الميزات اللحظية حتى الـ microservices القائمة على الأحداث.",
  badge: "متاح لفرص Backend وFull-stack",
  about: [
    "أنا مهندس برمجيات أبني أنظمة Backend تعمل في بيئة الإنتاج باستخدام Node.js منذ 2021، وأعمل حاليًا في AAIT.",
    "معظم عملي في تصميم الواجهات البرمجية والخدمات: REST وGraphQL، وميزات لحظية عبر WebSockets، وmicroservices تتواصل عبر وسطاء الرسائل. أهتم بالحدود الواضحة بين الوحدات، واتساق البيانات، وواجهات برمجية تتصرف بشكل متوقع مع الفرق التي تستخدمها.",
    "عملت على منتجات في التقنية المالية، والرعاية الصحية، والتعليم، والتجارة الإلكترونية، والمزادات الإلكترونية.",
  ],
  nav: [
    { id: "about", label: "نبذة" },
    { id: "experience", label: "الخبرة" },
    { id: "systems", label: "الأنظمة" },
    { id: "projects", label: "المشاريع" },
    { id: "writing", label: "مقالات" },
    { id: "contact", label: "تواصل" },
  ],
  sections: {
    about: { eyebrow: "نبذة", title: "مهندس Backend يهتم بالتفاصيل التي تُبقي الأنظمة صحيحة." },
    experience: {
      eyebrow: "الخبرة",
      title: "أين عملت.",
      description: "أنظمة Backend في بيئة الإنتاج لمنتجات عملاء، وأنظمة مالية، ومشاريع حرة منذ 2021.",
    },
    systems: {
      eyebrow: "نظام حقيقي",
      title: "نظام بنيته، يعمل أمامك الآن.",
      description:
        "هذا هو تدفق الأحداث الحقيقي من مشروع social-microservices: ثماني خدمات لا تستدعي بعضها مباشرة، وتتواصل فقط عبر NATS Streaming. شغّل أي إجراء وتابع حركة الأحداث.",
    },
    projects: {
      eyebrow: "أعمال مختارة",
      title: "مشاريع مفتوحة المصدر، والكود متاح للجميع.",
      description: "كل مشروع هنا مرتبط بمستودعه على GitHub: المعمارية والاختبارات والتوثيق.",
    },
    writing: {
      eyebrow: "مقالات",
      title: "ملاحظات من أشياء بنيتها.",
      description: "شرح تقني لمشكلات حللتها في مشاريعي.",
      note: "المقالات مكتوبة باللغة الإنجليزية.",
      readMore: "اقرأ المقال",
      allPosts: "كل المقالات",
    },
    skills: { eyebrow: "المهارات", title: "الأدوات التي أعتمد عليها." },
  },
  stats: [
    { value: 4, suffix: "+", label: "سنوات في بناء الـ Backend" },
    { value: 10, suffix: "+", label: "منتجات عملاء تم تسليمها" },
    { value: 3, suffix: "", label: "شركات وعمل حر" },
    { value: 6, suffix: "", label: "مشاريع مفتوحة المصدر مميزة" },
  ],
  experience: [
    {
      ...en.experience[0],
      role: "مطوّر Backend (Node.js)",
      period: "مارس 2023 — الآن",
      location: "المنصورة، مصر · من المقر",
      points: [
        "أسلّم خدمات Backend وواجهات REST لأكثر من 10 منتجات لعملاء (تطبيقات موبايل ولوحات تحكم) ضمن فريق Backend من 3 مهندسين.",
        "بنيت الـ Backend لمنصة Teacher Now التعليمية: حجوزات بين المعلمين والطلاب، وتواصل لحظي، ولوحة إدارة.",
        "بنيت الـ Backend لمنصة Azzam للاستشارات الطبية والنفسية: مكالمات فيديو، ومحادثات، وخطط علاج.",
        "بنيت الـ Backend لمنصة Sahel Lilmarkbat للمزادات الإلكترونية مع مزايدة تلقائية.",
      ],
    },
    {
      ...en.experience[1],
      role: "مطوّر Backend (Node.js)",
      period: "سبتمبر 2022 — مارس 2023",
      location: "القاهرة، مصر · عن بُعد",
      points: [
        "ساهمت في نظام مصرفي لتبادل العملات مع التركيز على الأمان وقابلية التوسع.",
        "طوّرت وحدات Backend لنظام Nexta لعمليات البطاقات الائتمانية باستخدام TypeScript وPrisma.",
        "بنيت الـ Backend لمتجر Zink للأزياء، وواجهات بيانات لموقع Ligainsider لإحصائيات الكرة الألمانية باستخدام GraphQL.",
        "عملت ضمن فريق Agile من 22 شخصًا، من تخطيط السبرنت حتى الإطلاق.",
      ],
    },
    {
      ...en.experience[2],
      company: "عمل حر",
      role: "مطوّر Backend (Node.js)",
      period: "يناير 2021 — سبتمبر 2022",
      location: "المنصورة، مصر · عن بُعد",
      points: [
        "سلّمت 3 مشاريع Backend لعملاء من البداية للنهاية، من المتطلبات حتى النشر.",
        "حصلت على تعاون متكرر من العملاء بفضل جودة العمل والالتزام بالمواعيد.",
      ],
    },
  ],
  projects: [
    {
      ...en.projects[0],
      title: "منصة تأجير: الـ API",
      summary:
        "واجهة برمجية بطبقات باستخدام NestJS وMongoDB لمنصة تأجير قصير المدى، مع حدود بين طبقات HTTP والتطبيق والبنية التحتية تفرضها قواعد الـ lint.",
      highlights: [
        "مصادقة JWT مع تدوير الـ refresh token وصلاحيات حسب الدور",
        "تحكم متفائل في التزامن على الإعلانات مع MongoDB transactions",
        "تخزين قابل للتبديل بين S3 وCloudinary مع عامل حذف يعيد المحاولة",
        "عقد أخطاء موحّد، ورسائل بالعربية والإنجليزية، وتوثيق Swagger لكل جمهور",
      ],
    },
    {
      ...en.projects[1],
      title: "منصة تأجير: لوحة الإدارة",
      summary:
        "لوحة إدارة بالعربية والإنجليزية مبنية بـ Next.js للـ API السابق. طبقة backend-for-frontend تحفظ التوكنز في cookie مشفّرة HttpOnly، فلا يراها المتصفح أبدًا.",
      highlights: [
        "تدوير منسّق للـ refresh token وفحوصات CSRF والـ origin",
        "عقد typed ومخططات Zod مولّدة من OpenAPI",
        "دعم كامل للعربية من اليمين لليسار وفحوصات إتاحة WCAG 2.2",
        "اختبارات end-to-end بـ Playwright مقابل الـ backend الحقيقي",
      ],
    },
    {
      ...en.projects[2],
      title: "شبكة اجتماعية وسوق إلكتروني",
      summary:
        "ثماني microservices بـ TypeScript قائمة على الأحداث وتعمل على Kubernetes: الحسابات والإشراف، والمنشورات، والتعليقات، وسوق منتجات، والطلبات، والدفع عبر Stripe.",
      highlights: [
        "قاعدة بيانات لكل خدمة مع نسخ البيانات عبر الأحداث",
        "تحكم متفائل في التزامن على المستندات المنسوخة",
        "مهام مؤجلة بـ Bull وRedis لانتهاء الطلبات والحظر",
      ],
    },
    {
      ...en.projects[3],
      title: "مختبر Redis للتخزين المؤقت",
      summary: "مشروع NestJS يبني cache صحيحًا بـ Redis خطوة بخطوة، من cache-aside حتى الأقفال الموزعة المملوكة بتوكن.",
      highlights: [
        "حماية من الـ cache stampede بأقفال SET NX",
        "تجديد القفل وكتابات cache محمية بـ Lua",
        "اختبارات تزامن للقراءات والتحديثات المتداخلة",
      ],
    },
    {
      ...en.projects[4],
      title: "مواعيد العيادات",
      summary:
        "microservices لمواعيد العيادات مع مسارات حجز حسب الدور للمرضى والأطباء والمسؤولين، وتذكيرات SMS مجدولة عبر الأحداث.",
      highlights: ["ثلاث خدمات تتواصل عبر أحداث NATS", "تذكيرات SMS مؤجلة عبر Twilio باستخدام Bull وRedis"],
    },
    {
      ...en.projects[5],
      title: "API للتجارة الإلكترونية",
      summary:
        "واجهة برمجية للتجارة الإلكترونية بـ NestJS وTypeORM وPostgreSQL مع مصادقة JWT حسب الدور، وتأكيد البريد، والمنتجات، والتقييمات.",
      highlights: ["Migrations وتوثيق Swagger وتحديد معدل الطلبات", "اختبارات unit وend-to-end لوحدة المنتجات"],
    },
  ],
  skillGroups: [
    { ...en.skillGroups[0] },
    { ...en.skillGroups[1], title: "الواجهات البرمجية" },
    { ...en.skillGroups[2], title: "البيانات" },
    { ...en.skillGroups[3], title: "الرسائل" },
    { ...en.skillGroups[4] },
    { ...en.skillGroups[5], title: "DevOps والاختبارات" },
  ],
  contact: {
    eyebrow: "تواصل",
    titleStart: "لنبنِ معًا شيئًا ",
    titleAccent: "يُعتمد عليه",
    titleEnd: ".",
    description: "أنا متاح لوظائف Backend وFull-stack. أسرع طريقة للتواصل معي هي البريد الإلكتروني.",
  },
  systems: {
    actions: {
      order: "إنشاء طلب",
      pay: "دفع قيمة الطلب",
      expire: "ترك الطلب حتى ينتهي",
      comment: "تعليق على منتج",
      ban: "حظر مستخدم 7 أيام",
    },
    log: "سجل الأحداث",
    idle: "اختر إجراءً لنشر حدث.",
    replay: "مسح",
    effects: {
      "market:reserve": "تم حجز المنتج",
      "payment:replicate": "تم نسخ الطلب",
      "expiration:schedule": "تمت جدولة انتهاء الطلب",
      "order:complete": "اكتمل الطلب",
      "order:cancel": "أُلغي الطلب",
      "market:release": "تم تحرير المنتج",
      "payment:cancel": "أُلغي الطلب",
      "post:count": "تم تحديث عدد التعليقات",
      "market:count": "تم تحديث عدد التعليقات",
      "reply:replicate": "تم نسخ التعليق",
      "expiration:ban": "تمت جدولة انتهاء الحظر",
      "auth:unban": "رُفع الحظر",
    },
    legend: { db: "قاعدة بيانات مستقلة", bus: "ناقل الأحداث" },
    hint: "الخدمات لا تستدعي بعضها عبر HTTP أبدًا.",
  },
  ui: {
    viewWork: "شاهد أعمالي",
    downloadCv: "تحميل السيرة الذاتية",
    skip: "انتقل إلى المحتوى",
    backToTop: "العودة للأعلى",
    scrollDown: "انتقل إلى النبذة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    commandMenu: "قائمة الأوامر",
    commandPlaceholder: "اكتب أمرًا أو ابحث...",
    noResults: "لا توجد نتائج",
    groups: { navigate: "تنقّل", links: "روابط", actions: "إجراءات" },
    goTo: "انتقل إلى",
    openGithub: "فتح GitHub",
    openLinkedin: "فتح LinkedIn",
    copyEmail: "نسخ البريد الإلكتروني",
    emailCopied: "تم نسخ البريد",
    toggleTheme: "تبديل المظهر",
    switchLanguage: "التبديل إلى الإنجليزية",
    featured: "مميز",
    source: "الكود",
    moreOnGithub: "المزيد على GitHub",
    footer: "مبني بـ Next.js وTypeScript وMotion.",
    press: "اضغط",
    toLight: "التبديل إلى المظهر الفاتح",
    toDark: "التبديل إلى المظهر الداكن",
    tech: "التقنيات",
  },
};

export const content: Record<Locale, Content> = { en, ar };
