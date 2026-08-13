import {
  SiPython,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiGit,
  SiTensorflow,
  SiGithub,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { Brain } from "lucide-react";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export type Skill = {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
  description: string;
  category?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

export const skills: Skill[] = [
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    description: "Building AI systems and backend applications.",
    category: "AI & Backend",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    description: "Creating modern interactive user interfaces.",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    description: "Building production-ready full stack applications.",
    category: "Frontend",
  },
  {
    name: "FastAPI",
    icon: SiFastapi,
    color: "#009688",
    description: "Developing scalable APIs and backend services.",
    category: "Backend",
  },
  {
    name: "Machine Learning",
    icon: Brain,
    color: "#EAB308",
    description: "Developing intelligent algorithms and predictive models.",
    category: "AI & Machine Learning",
  },
  {
    name: "TensorFlow",
    icon: SiTensorflow,
    color: "#FF6F00",
    description: "Deep learning and neural network development.",
    category: "AI & Machine Learning",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    description: "Version control and collaboration.",
    category: "Tools",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "#FFFFFF",
    description: "Code hosting and project management.",
    category: "Tools",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    description: "Type-safe JavaScript for scalable web applications.",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first CSS framework for modern responsive design.",
    category: "Frontend",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Intelligent models & neural architectures",
    skills: [
      {
        name: "Machine Learning",
        icon: Brain,
        color: "#EAB308",
        description: "Intelligent algorithms & predictive models",
      },
      {
        name: "TensorFlow",
        icon: SiTensorflow,
        color: "#FF6F00",
        description: "Deep learning & neural networks",
      },
      {
        name: "Python",
        icon: SiPython,
        color: "#3776AB",
        description: "AI workflows & data processing",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Architecture",
    description: "Scalable APIs & server logic",
    skills: [
      {
        name: "FastAPI",
        icon: SiFastapi,
        color: "#009688",
        description: "Scalable REST APIs & async services",
      },
      {
        name: "Python",
        icon: SiPython,
        color: "#3776AB",
        description: "Backend microservices & business logic",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Modern interactive web applications",
    skills: [
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#FFFFFF",
        description: "Production full-stack SSR applications",
      },
      {
        name: "React",
        icon: SiReact,
        color: "#61DAFB",
        description: "Interactive UI & state management",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6",
        description: "Type-safe robust web applications",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06B6D4",
        description: "Utility-first modern responsive styling",
      },
    ],
  },
  {
    id: "tools",
    title: "Dev Tools & Workflow",
    description: "Version control & dev ecosystem",
    skills: [
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
        description: "Version control & source management",
      },
      {
        name: "GitHub",
        icon: SiGithub,
        color: "#FFFFFF",
        description: "Code hosting & CI/CD collaboration",
      },
    ],
  },
];