export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  github: string;
  demo: string;
  tech: string[];
  features: string[];
  challenge: string;
  learning: string;
  duration?: string;
  role?: string;
  status?: string;
  category?: string;
};

export const projects: Project[] = [
  {
    slug: "swifter-ai",
    title: "Swifter AI",
    duration: "3 Months",
    role: "AI Engineer",
    status: "Completed",
    category: "Artificial Intelligence",

    description:
      "AI-powered assistant built using FastAPI, React and modern LLM workflows.",
    longDescription:
      "Swifter AI is an intelligent conversational assistant designed to improve productivity through natural language interactions. The platform combines FastAPI, React and Large Language Models to deliver real-time responses, task assistance and an intuitive user experience.",
    image: "/projects/swifter-AI.png",
    github: "https://github.com/RamavatMit/swifter-ai",
    demo: "",
    tech: ["Python", "FastAPI", "React", "LLM", "REST API"],
    features: [
      "Real-time AI-powered conversations",
      "Modern React user interface",
      "FastAPI backend architecture",
      "Scalable REST API integration",
      "Conversation history management",
      "Responsive desktop and mobile experience",
    ],
    challenge:
      "The biggest challenge was creating a seamless communication layer between the frontend, backend and language model while maintaining fast response times and a smooth user experience.",
    learning:
      "This project helped me gain practical experience in API architecture, frontend-backend integration, prompt engineering, AI workflows and building scalable applications powered by Large Language Models.",
  },
  {
    slug: "portfolio",
    title: "Portfolio Website",
    duration: "2 Months",
    role: "ML Engineer",
    status: "Completed",
    category: "Machine Learning",
    description:
      "Premium portfolio built with Next.js, Tailwind and modern UI principles.",
    longDescription:
      "A modern developer portfolio designed to showcase projects, technical skills and professional achievements through a visually appealing and responsive user experience. The website focuses on performance, scalability and clean UI design.",
    image: "/projects/portfolio.jpg",
    github: "https://github.com/RamavatMit/portfolio",
    demo: "",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    features: [
      "Fully responsive design",
      "Dynamic project detail pages",
      "Modern black and gold UI theme",
      "Optimized performance with Next.js",
      "Reusable component architecture",
      "SEO-friendly structure",
    ],
    challenge:
      "The main challenge was creating a visually unique portfolio while maintaining excellent performance, responsiveness and scalability across different devices.",
    learning:
      "Through this project I improved my understanding of Next.js routing, reusable component design, responsive layouts, UI/UX principles and production-ready frontend development.",
  },
  {
  slug: "revenue-forecasting",

  title: "Revenue Forecasting System",
  duration: "2 Months",
  role: "ML Engineer",
  status: "Completed",
  category: "Machine Learning",

  description:
    "Machine Learning based revenue prediction system using historical sales and business data.",

  longDescription:
    "A predictive analytics system developed to forecast future revenue trends using historical business data. The project applies machine learning techniques to identify patterns, generate forecasts and support strategic business decision-making.",

  image: "/projects/revenue.jpg",

  github: "https://github.com/RamavatMit/revenue-forecasting",

  demo: "",

  tech: [
    "Python",
    "Pandas",
    "Scikit-Learn",
    "XGBoost",
    "Matplotlib",
    "Machine Learning",
  ],

  features: [
    "Revenue trend prediction",
    "Historical data analysis",
    "Feature engineering pipeline",
    "Data visualization dashboard",
    "Model performance evaluation",
    "Business decision support",
  ],

  challenge:
    "The main challenge was handling inconsistent historical business data and selecting the most relevant features for accurate forecasting.",

  learning:
    "This project improved my understanding of feature engineering, regression models, business analytics and forecasting techniques using machine learning.",
  },
  {
  slug: "employee-shift-scheduling",

  title: "Employee Shift Scheduling Optimization",
  duration: "2 Months",
  role: "ML Engineer",
  status: "Completed",
  category: "Machine Learning",

  description:
    "Optimization system that minimizes staffing costs while satisfying workforce requirements.",

  longDescription:
    "A Linear Programming based optimization model designed to allocate employees across multiple shifts while minimizing operational costs and satisfying workforce constraints. The project demonstrates practical applications of Operations Research and Optimization.",

  image: "/projects/shift-scheduling.jpg",

  github: "https://github.com/RamavatMit/shift-scheduling",

  demo: "",

  tech: [
    "Python",
    "PuLP",
    "Linear Programming",
    "Optimization",
    "Operations Research",
  ],

  features: [
    "Shift allocation optimization",
    "Cost minimization",
    "Constraint handling",
    "Workforce planning",
    "Resource utilization improvement",
    "Automated scheduling solution",
  ],

  challenge:
    "The primary challenge was balancing workforce requirements with operational constraints while ensuring the optimization model remained feasible and cost-efficient.",

  learning:
    "This project strengthened my knowledge of optimization, linear programming, mathematical modeling and real-world resource allocation problems.",
  },
];
