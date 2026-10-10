export type ProjectCover = "image" | "jarvis" | "trading";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  cover: ProjectCover;
  github: string;
  demo: string;
  tech: string[];
  features: string[];
  challenge: string;
  learning: string;
  featured?: boolean;
  year?: string;
  metrics?: { label: string; value: string }[];
  note?: string;
  duration?: string;
  role?: string;
  status?: string;
  category?: string;
};

export const projects: Project[] = [
  {
    slug: "jarvis-voice-assistant",
    title: "Jarvis",
    featured: true,
    year: "2026",
    duration: "Ongoing",
    role: "AI Engineer",
    status: "Active",
    category: "Voice AI · Autonomous Agents",
    description:
      "A multilingual voice agent that operates an entire Windows laptop — any app, any website — through generic desktop and browser agents.",
    longDescription:
      "Say \"Hey Jarvis\" and talk naturally in English, Hindi or Hinglish. Jarvis listens with a personally calibrated wake-word model, reasons with Groq and Gemini LLMs, and acts through two generic agents: a desktop agent that reads any application's controls via Windows UI Automation (with screenshot vision as fallback), and a Chrome agent that navigates any website from its accessibility snapshot. There is no app- or site-specific code — the same agents work everywhere. Risky actions always ask for confirmation, and an always-on-top WebGL HUD shows exactly what the assistant is thinking and doing.",
    image: "/mit-office.webp",
    cover: "jarvis",
    github: "https://github.com/RamavatMit/Voice-Assistant",
    demo: "",
    tech: ["Python", "Groq LLM", "Gemini", "Wake-word ML", "Speech-to-Text", "TTS", "Playwright", "UI Automation", "WebGL"],
    metrics: [
      { label: "Languages", value: "EN · HI · Hinglish" },
      { label: "App-specific code", value: "0 lines" },
      { label: "Agents", value: "Desktop + Chrome" },
      { label: "Runs on", value: "Free tiers + local" },
    ],
    features: [
      "Wake-word model trained on the user's own voice in ~90 seconds",
      "Desktop agent driven by Windows UI Automation + screenshot vision",
      "Chrome agent that reads accessibility snapshots and acts step by step",
      "PowerShell tool: read-only commands run, anything destructive asks first",
      "Live 3D HUD orb whose colour reflects listening, thinking, acting, speaking",
      "Natural human voice responses, hotkeys and text-mode fallback",
    ],
    challenge:
      "Making one agent loop reliable across every app and website without hard-coding any of them — while keeping it safe enough to run on a real machine. That meant grounding every step in accessibility trees, verifying the result of each action, and putting a confirmation gate in front of anything irreversible.",
    learning:
      "Agent reliability is mostly about observation and verification, not the model. I learned to design tool interfaces for LLMs, budget latency across speech, reasoning and action, and build human-in-the-loop safety into the core loop instead of bolting it on.",
  },
  {
    slug: "crypto-ai-trading-bot",
    title: "Crypto AI Trading Bot",
    featured: true,
    year: "2026",
    duration: "Research project",
    role: "ML Engineer",
    status: "Paper trading",
    category: "Machine Learning · Quant Research",
    description:
      "An end-to-end ML trading system for Binance Spot — walk-forward gradient boosting, strict risk management and an honest research process.",
    longDescription:
      "A complete trading research platform: market data ingestion, indicators and pattern detection, five rule-based strategies, an ML signal model, a risk manager that places an OCO stop-loss on every trade, an AI analyst, a trade journal, Telegram alerts, a Streamlit dashboard, a backtester and a security layer. The ML model is trained walk-forward on BTC, ETH, BNB and SOL with triple-barrier labels net of fees and slippage; setups are chosen on validation data and the final 12 months are held out and never used for any decision. It runs in paper mode on live prices — by design, nothing goes live until it passes the testing ladder.",
    image: "/mit-office.webp",
    cover: "trading",
    github: "https://github.com/RamavatMit/Binance",
    demo: "",
    tech: ["Python", "Gradient Boosting", "Pandas", "Backtesting", "Streamlit", "Docker", "Binance API", "Pytest"],
    metrics: [
      { label: "Validation win rate", value: "74.6%" },
      { label: "Holdout profit factor", value: "1.92" },
      { label: "Holdout max drawdown", value: "1.6%" },
      { label: "Setups evaluated", value: "~120" },
    ],
    note:
      "Research results in paper mode, not live trading. The holdout has only 21 trades — too few to prove an edge — and the README documents every caveat.",
    features: [
      "Walk-forward training: learn on the past, predict the next 3 months, repeat",
      "Triple-barrier labelling net of 0.1% fees and 0.05% slippage",
      "Untouched 12-month holdout used only for final evaluation",
      "Risk manager with OCO stop-loss on every single trade",
      "SHA-256 verification of model files before loading",
      "Backtester, Streamlit dashboard, Telegram alerts, Docker deploy",
    ],
    challenge:
      "Avoiding self-deception. With ~120 setups tested, it is easy to overfit and call luck an edge. I built the pipeline around walk-forward validation, a sealed holdout and cost-aware labels — and documented that most strategies fail, including the reason (stops too tight relative to fees).",
    learning:
      "A high win rate is not profit — without the model, the same take-profit/stop-loss wins 65% of the time and still loses 99.8%. This project taught me rigorous evaluation, leakage prevention, and why honest reporting matters more than impressive numbers.",
  },
  {
    slug: "nodal-wealth-club",
    title: "Nodal Wealth Club",
    featured: true,
    year: "2026",
    duration: "Phase 1 shipped",
    role: "Design & Full-stack Engineering",
    status: "In development",
    category: "FinTech · Education Platform",
    description:
      "Financial-future literacy for India — AI, Web3 and agentic systems explained in plain language, with real products and a private members' club.",
    longDescription:
      "Nodal Wealth Club helps people in India understand how AI, Web3 and autonomous agents are reshaping money — in plain language, without hype. I designed and engineered the Phase 1 foundation: an editorial Next.js 16 site with a custom motion library (intro film, page transitions, pinned carousels, an animated node network), an interactive future-readiness quiz, and a production-grade security layer with per-request CSP nonces, rate limiting, validated environment config and Zod schemas. It is built education-first, with compliance rules baked in: no investment advice, read-only wallets and privacy by default.",
    image: "/projects/nodal-wealth-club.webp",
    cover: "image",
    github: "",
    demo: "",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Lenis", "next-intl", "Zod", "Redis", "Vitest", "Playwright", "Docker"],
    metrics: [
      { label: "Security", value: "CSP nonce / request" },
      { label: "Testing", value: "Vitest + Playwright" },
      { label: "Languages ready", value: "EN · HI · GU" },
      { label: "Deploy", value: "Docker + CI/CD" },
    ],
    features: [
      "Editorial design system with a reusable motion library",
      "Interactive \"future-ready\" money-sense quiz with learning paths",
      "Per-request CSP nonce, security headers and rate limiting (Redis with memory fallback)",
      "Zod-validated environment and API schemas, covered by unit tests",
      "i18n-ready with next-intl — English now, Hindi and Gujarati prepared",
      "Docker, GitHub Actions CI/CD and Playwright end-to-end smoke tests",
    ],
    challenge:
      "Building a finance-education product that feels premium and trustworthy while staying strictly compliant — no advice, no price data, privacy by default — and laying a secure foundation that later phases (auth, payments, CMS, wallets) can grow on.",
    learning:
      "Security as architecture: CSP nonces, rate limiting and schema validation from day one. I also learned to design a motion system that adds meaning without hurting performance or accessibility.",
  },
  {
    slug: "revenue-forecasting",
    title: "Revenue Forecasting",
    year: "2025",
    duration: "2 Months",
    role: "ML Engineer",
    status: "Completed",
    category: "Predictive Analytics",
    description:
      "Machine learning revenue prediction from historical sales and business data.",
    longDescription:
      "A predictive analytics system that forecasts future revenue trends from historical business data. It applies feature engineering and gradient-boosted regression to identify patterns, generate forecasts and support strategic decision-making.",
    image: "/projects/revenue.webp",
    cover: "image",
    github: "",
    demo: "",
    tech: ["Python", "Pandas", "Scikit-Learn", "XGBoost", "Matplotlib"],
    features: [
      "Revenue trend prediction",
      "Historical data analysis",
      "Feature engineering pipeline",
      "Data visualization dashboard",
      "Model performance evaluation",
      "Business decision support",
    ],
    challenge:
      "Handling inconsistent historical business data and selecting the most relevant features for accurate forecasting.",
    learning:
      "Feature engineering, regression models, business analytics and forecasting techniques using machine learning.",
  },
  {
    slug: "employee-shift-scheduling",
    title: "Shift Scheduling Optimizer",
    year: "2025",
    duration: "2 Months",
    role: "ML Engineer",
    status: "Completed",
    category: "Operations Research",
    description:
      "Linear-programming optimizer that minimizes staffing cost while satisfying workforce constraints.",
    longDescription:
      "A Linear Programming model that allocates employees across shifts while minimizing operational cost and satisfying workforce constraints — a practical application of Operations Research and mathematical optimization.",
    image: "/projects/shift-scheduling.webp",
    cover: "image",
    github: "",
    demo: "",
    tech: ["Python", "PuLP", "Linear Programming", "Optimization"],
    features: [
      "Shift allocation optimization",
      "Cost minimization",
      "Constraint handling",
      "Workforce planning",
      "Resource utilization improvement",
      "Automated scheduling solution",
    ],
    challenge:
      "Balancing workforce requirements with operational constraints while keeping the model feasible and cost-efficient.",
    learning:
      "Optimization, linear programming, mathematical modelling and real-world resource allocation problems.",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    year: "2026",
    duration: "Ongoing",
    role: "Design & Engineering",
    status: "Live",
    category: "Creative Development",
    description:
      "Dark editorial portfolio with an interactive dot-matrix canvas and calm motion — built with Next.js.",
    longDescription:
      "A dark, cinematic portfolio built with Next.js, TypeScript and Tailwind. It features a hand-written canvas dot-matrix field that reacts to the pointer, Lenis smooth scrolling, restrained Framer Motion transitions, and statically generated, SEO-optimized case study pages.",
    image: "/projects/portfolio.webp",
    cover: "image",
    github: "https://github.com/RamavatMit/mit-ramavat-portfolio",
    demo: "https://mit-ramavat-portfolio.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas"],
    features: [
      "Interactive canvas dot-matrix hero",
      "Calm, purposeful motion and smooth scrolling",
      "Statically generated case studies",
      "Reduced-motion accessible fallbacks",
      "SEO metadata, sitemap and structured data",
      "Fully responsive layout",
    ],
    challenge:
      "Delivering a distinctive, interactive look while keeping the site fast, accessible and smooth on mobile.",
    learning:
      "Canvas rendering, restraint in motion design and performance budgeting for motion-heavy interfaces.",
  },
];
