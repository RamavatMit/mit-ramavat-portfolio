import {
  SiPython,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiGit,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiGithub,
  SiTypescript,
  SiTailwindcss,
  SiDjango,
  SiDocker,
  SiStreamlit,
  SiPostgresql,
  SiGooglegemini,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type Skill = {
  name: string;
  icon?: IconType;
};

export type SkillGroup = {
  id: string;
  index: string;
  title: string;
  summary: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ml",
    index: "01",
    title: "Machine Learning",
    summary: "Modelling, evaluation and honest validation",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "XGBoost" },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "Walk-forward CV" },
    ],
  },
  {
    id: "dl",
    index: "02",
    title: "Deep Learning & Vision",
    summary: "Neural networks, perception and detection",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTorch", icon: SiPytorch },
      { name: "OpenCV", icon: SiOpencv },
      { name: "Object Detection" },
      { name: "Speech / Wake-word" },
    ],
  },
  {
    id: "llm",
    index: "03",
    title: "LLMs & Agents",
    summary: "Tool-using agents that act in the real world",
    skills: [
      { name: "Gemini", icon: SiGooglegemini },
      { name: "Groq" },
      { name: "Prompt Engineering" },
      { name: "Tool Calling" },
      { name: "Playwright" },
    ],
  },
  {
    id: "backend",
    index: "04",
    title: "Backend & MLOps",
    summary: "APIs, data and shipping models",
    skills: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Django", icon: SiDjango },
      { name: "Docker", icon: SiDocker },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "SQL", icon: SiPostgresql },
      { name: "Data Scraping" },
    ],
  },
  {
    id: "frontend",
    index: "05",
    title: "Interfaces",
    summary: "Products people enjoy using",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
    ],
  },
];
