import Link from "next/link";

const CONTACT = {
  name: "Md. Shihabuzzaman",
  title: "Software Engineer",
  location: "Dhaka, Bangladesh",
  phone: "+8801570267936",
  email: "shihabuzzaman007@gmail.com",
} as const;

const LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
const GITHUB = process.env.NEXT_PUBLIC_GITHUB_URL ?? "";

const EDUCATION = [
  {
    school: "Shahjalal University of Science and Technology",
    place: "Sylhet, Bangladesh",
    degree: "B.Sc. in Software Engineering",
    detail: "GPA: 3.68/4.00",
    period: "Feb 2020 – May 2025",
  },
  {
    school: "Notre Dame College",
    place: "Dhaka, Bangladesh",
    degree: "Higher Secondary Certificate",
    detail: "GPA: 5.00/5.00",
    period: "Mar 2017 – Jun 2019",
  },
] as const;

const EXPERIENCE = [
  {
    company: "Orbitax",
    place: "Dhaka, Bangladesh",
    role: "Software Engineer",
    type: "Full-time",
    period: "June 2025 – Present",
    bullets: [
      "Implemented a Scenario Publisher tool to automate publishing of 100+ templates daily across multiple database clusters, eliminating manual deployment. Enabled self-service publishing, saving 3–4 hours daily and reducing reliance on other teams. Integrated logging and history tracking for faster debugging and access to 1000+ publishing records.",
      "Built a full-stack drag-and-drop feature using Angular CDK on the frontend and .NET REST API handlers on the backend, enabling users to reorder workflow stages and content sub-sections in a case management module; designed a dedicated data model and service layer to persist custom ordering in Elasticsearch across sessions, implemented reconciliation logic to handle dynamic tab changes gracefully, and resolved multiple post-QA defects to ship a stable release.",
      "Implemented Add Form in GMT Scenario, enabling dynamic form creation via a dropdown-driven interface with instant grid refresh/navigation, automatically updating the Filing Manager library where all forms are stored.",
    ],
  },
  {
    company: "Orbitax",
    place: "Dhaka, Bangladesh",
    role: "Software Engineer Intern",
    type: "Full-time",
    period: "Dec 2024 – May 2025",
    bullets: [
      "Implemented an Excel Template Formatter Tool using .NET and SpreadsheetGear to replace manual formatting of 100+ templates daily, reducing formatting time by over 90%.",
      "Optimized report generation workflow during microservices-to-monolith migration by replacing proxy-based calls with direct command consumer execution, improving performance, reducing inter-module dependencies, and simplifying debugging.",
      "Revamped Audit Tracker UI, fixing relative positioning of tab bars and sub-tab bars for consistent layout. Enabled dynamic addition of main and sub-tab bars through the Manage Fields interface, maintaining proper positioning and enhancing user experience.",
    ],
  },
  {
    company: "Data Elysium Software Inc.",
    place: "Calgary, Canada (Remote)",
    role: "AI Development Intern",
    type: "Internship",
    period: "Aug 2024 – Nov 2024",
    bullets: [
      "Assisted in development of an audio-to-speech pipeline by contributing to system workflow support.",
      "Audited and refined 300+ AI-generated algorithmic solutions across C, C++, Java, and Python for competitive programming and advanced mathematical reasoning benchmarks, under the supervision of Md Alamin.",
    ],
  },
] as const;

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["C/C++", "C#", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    label: "Backend & infra",
    items: [
      "ASP.NET Core",
      "Node.js",
      "MySQL",
      "MongoDB",
      "RabbitMQ",
      "Git",
      "Docker",
    ],
  },
  {
    label: "AI & data",
    items: ["LangChain", "LangGraph", "RAG", "MCP"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Angular"],
  },
  {
    label: "Core strengths",
    items: [
      "LLM application development",
      "Data structures & algorithms",
      "Problem solving",
      "Object-oriented programming",
    ],
  },
] as const;

const PROJECTS = [
  {
    name: "FoodSearchProject",
    stack: ".NET, PostgreSQL, Elasticsearch, Docker",
    bullets: [
      "Built a RESTful API for restaurant and menu item search with fuzzy/full-text search via Elasticsearch, supporting location-radius filtering, relevance ranking, and multi-criteria sorting.",
      "Implemented clean layered architecture with pagination, structured JSON responses, and fully containerized deployment using Docker Compose.",
    ],
  },
  {
    name: "AI Document Intelligence System (RAG Chatbot)",
    stack: "Python, Groq, ChromaDB, Sentence Transformers, Streamlit",
    bullets: [
      "Built a RAG pipeline for semantic search and QA over custom PDF documents using vector embeddings and ChromaDB.",
      "Integrated Groq LLM API with prompt engineering to generate document-grounded answers with multi-turn conversation memory.",
    ],
  },
  {
    name: "All-In-One Store",
    stack: ".NET Core, Angular, MongoDB",
    bullets: [
      "Developed a full-stack e-commerce app using .NET Core, Angular, and MongoDB.",
    ],
  },
] as const;

const CONTESTS = [
  "ICPC Asia West Continent Finalist 2023; ICPC regionalist 2022, 2023, 2024, 2025 (ICPCID: Team SUST Scrumping Puppets)",
  "13th place out of 113 teams — IUPC BUET CSE Fest 2024",
  "15th place out of 223 teams — 2023 ACM-ICPC Asia Dhaka Regional Contest",
  "17th place out of 130 teams — IUPC AUST CSE Fest 2024",
  "18th place out of 309 teams — 2024 ACM-ICPC Asia Dhaka Regional Contest",
  "19th place out of 2489 teams — 2024 ACM-ICPC Asia Dhaka Regional Preliminary Contest",
  "Expert on Codeforces; 5-star on CodeChef; 3000+ problems solved across platforms",
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 md:px-8">
      <section className="relative overflow-hidden rounded-2xl border border-brand-border bg-linear-to-b from-white/8 to-transparent p-8 transition duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_20px_80px_-30px_rgba(59,130,246,0.45)] md:p-12">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl" aria-hidden />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Portfolio
          </p>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {CONTACT.name}
              </h1>
              <p className="mt-2 text-lg text-brand-muted md:text-xl">
                {CONTACT.title} · {CONTACT.location}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
                Software engineer focused on full-stack delivery, scalable backends,
                and LLM-powered applications. Strong competitive programming
                background with proven impact on automation, performance, and user
                experience.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 rounded-xl border border-brand-border bg-white/2 p-5 text-sm transition duration-300 hover:border-white/25 hover:bg-white/4 md:min-w-[260px]">
              <a
                className="font-medium text-white transition hover:text-brand-accent"
                href={`mailto:${CONTACT.email}`}
              >
                {CONTACT.email}
              </a>
              <a
                className="text-brand-muted transition hover:text-white"
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              >
                {CONTACT.phone}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-brand-border pt-3">
                {LINKEDIN ? (
                  <a
                    className="text-brand-muted transition hover:text-brand-accent"
                    href={LINKEDIN}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-brand-muted">LinkedIn</span>
                )}
                {GITHUB ? (
                  <a
                    className="text-brand-muted transition hover:text-brand-accent"
                    href={GITHUB}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                ) : (
                  <span className="text-brand-muted">GitHub</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-md bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_12px_30px_-12px_rgba(59,130,246,0.8)]"
              href={`mailto:${CONTACT.email}?subject=Hello%20Md.%20Shihabuzzaman`}
            >
              Get in touch
            </a>
            <Link
              className="rounded-md border border-brand-border px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/5"
              href="/"
            >
              Back to site
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16" id="experience">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Experience
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Selected roles and measurable outcomes from my CV.
        </p>
        <div className="mt-8 flex flex-col gap-8">
          {EXPERIENCE.map((job) => (
            <article
              key={`${job.company}-${job.period}`}
              className="rounded-xl border border-brand-border bg-white/2 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/4 hover:shadow-[0_18px_50px_-25px_rgba(0,0,0,0.7)] md:p-8"
            >
              <div className="flex flex-col gap-1 border-b border-brand-border pb-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="text-brand-accent">
                    {job.company} · {job.place}
                  </p>
                </div>
                <div className="text-sm text-brand-muted md:text-right">
                  <p>{job.period}</p>
                  <p>{job.type}</p>
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-300 md:text-base">
                {job.bullets.map((b, i) => (
                  <li key={`${job.period}-${i}`}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section id="education">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Education
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {EDUCATION.map((edu) => (
              <div
                key={edu.school}
                className="rounded-xl border border-brand-border bg-white/2 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/4"
              >
                <p className="font-semibold">{edu.school}</p>
                <p className="text-sm text-brand-muted">{edu.place}</p>
                <p className="mt-2 text-sm text-gray-300">{edu.degree}</p>
                <p className="text-sm text-brand-muted">{edu.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-brand-muted">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Skills
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  {group.label}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-brand-border bg-white/2 px-3 py-1 text-xs font-medium text-gray-200 transition duration-200 hover:-translate-y-0.5 hover:border-brand-accent/50 hover:bg-brand-accent/10 hover:text-white md:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16" id="projects">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Projects
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Representative work from my CV; repository links can be wired when you
          add them to your environment or this file.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="group flex h-full flex-col rounded-xl border border-brand-border bg-white/2 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/4 hover:shadow-[0_20px_55px_-30px_rgba(59,130,246,0.55)]"
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="mt-1 text-xs text-brand-accent transition group-hover:text-blue-300">{project.stack}</p>
              <ul className="mt-4 flex-1 list-disc space-y-2 pl-4 text-sm leading-relaxed text-gray-300">
                {project.bullets.map((b, i) => (
                  <li key={`${project.name}-${i}`}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" id="thesis">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Thesis
        </h2>
        <div className="mt-6 rounded-xl border border-brand-border bg-white/2 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/4 md:p-8">
          <h3 className="text-lg font-semibold leading-snug md:text-xl">
            Comparative Evaluation of Large Language Models on Competitive
            Programming Tasks
          </h3>
          <p className="mt-2 text-sm text-brand-muted">
            Supervised by Fazle Rabbi Rakib · Implemented in C++
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300 md:text-base">
            <li>
              Benchmarked state-of-the-art LLMs (Claude 3, GPT-4o, o1-mini,
              Perplexity) on Codeforces problems across difficulty ratings
              800–2000, producing quantitative accuracy comparisons across models.
            </li>
            <li>
              Engineered an automated stress-testing pipeline generating 100
              randomized test cases per problem to empirically validate solution
              correctness across varying difficulty tiers.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16" id="achievements">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Contest & programming profile
        </h2>
        <div className="mt-6 rounded-xl border border-brand-border bg-white/2 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/4 md:p-8">
          <ul className="space-y-3 text-sm leading-relaxed text-gray-300 md:text-base">
            {CONTESTS.map((line) => (
              <li key={line} className="group flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent transition duration-300 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
