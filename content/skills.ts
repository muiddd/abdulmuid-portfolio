import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiFigma,
  SiFlutter,
  SiDart,
  SiAndroidstudio,
  SiGit,
  SiGithub,
  SiDocker,
  SiTrello,
  SiNotion,
  SiVercel,
  SiGooglecolab,
  SiGooglesheets,
} from "react-icons/si";
import { FaJava, FaFileExcel } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

export type SkillGroupId =
  | "frontend"
  | "backend"
  | "design"
  | "mobile"
  | "tools"
  | "soft";

export interface SkillItem {
  id: string;
  name: string;
  group: SkillGroupId;
  icon?: IconType;
  nameId?: string;
  nameEn?: string;
  featured?: boolean;
}

export interface SkillCategoryMeta {
  id: SkillGroupId;
  labelId: string;
  labelEn: string;
}

export const skillCategories: SkillCategoryMeta[] = [
  { id: "frontend", labelId: "Frontend", labelEn: "Frontend" },
  { id: "backend", labelId: "Backend & Database", labelEn: "Backend & Database" },
  { id: "design", labelId: "UI/UX & Desain", labelEn: "UI/UX & Design" },
  { id: "mobile", labelId: "Mobile", labelEn: "Mobile" },
  { id: "tools", labelId: "Tools & Data", labelEn: "Tools & Data" },
  { id: "soft", labelId: "Soft Skills", labelEn: "Soft Skills" },
];

export const skillsData: SkillItem[] = [
  // ==========================================
  // Kategori 1: Frontend
  // ==========================================
  { id: "html", name: "HTML", group: "frontend", icon: SiHtml5 },
  { id: "css", name: "CSS", group: "frontend", icon: SiCss },
  { id: "javascript", name: "JavaScript", group: "frontend", icon: SiJavascript, featured: true },
  { id: "typescript", name: "TypeScript", group: "frontend", icon: SiTypescript },
  { id: "react", name: "React", group: "frontend", icon: SiReact, featured: true },
  { id: "nextjs", name: "Next.js", group: "frontend", icon: SiNextdotjs, featured: true },
  { id: "tailwind", name: "Tailwind CSS", group: "frontend", icon: SiTailwindcss },
  { id: "bootstrap", name: "Bootstrap", group: "frontend", icon: SiBootstrap },

  // ==========================================
  // Kategori 2: Backend & Database
  // ==========================================
  { id: "php", name: "PHP", group: "backend", icon: SiPhp, featured: true },
  { id: "laravel", name: "Laravel", group: "backend", icon: SiLaravel, featured: true },
  { id: "python", name: "Python", group: "backend", icon: SiPython, featured: true },
  { id: "java", name: "Java", group: "backend", icon: FaJava },
  { id: "postgresql", name: "PostgreSQL", group: "backend", icon: SiPostgresql, featured: true },
  { id: "mysql", name: "MySQL", group: "backend", icon: SiMysql },
  { id: "sqlite", name: "SQLite", group: "backend", icon: SiSqlite },
  { id: "mvc", name: "MVC", group: "backend" }, // Chip teks

  // ==========================================
  // Kategori 3: UI/UX & Design
  // ==========================================
  { id: "figma", name: "Figma", group: "design", icon: SiFigma, featured: true },
  { id: "wireframing", name: "Wireframing", group: "design" }, // Chip teks
  { id: "prototyping", name: "Prototyping", group: "design" }, // Chip teks
  { id: "design-system", name: "Design System", group: "design" }, // Chip teks
  { id: "user-research", name: "User Research", group: "design" }, // Chip teks
  { id: "usability-testing", name: "Usability Testing", group: "design" }, // Chip teks
  { id: "user-flow", name: "User Flow", group: "design" }, // Chip teks

  // ==========================================
  // Kategori 4: Mobile
  // ==========================================
  { id: "flutter", name: "Flutter", group: "mobile", icon: SiFlutter },
  { id: "dart", name: "Dart", group: "mobile", icon: SiDart },
  { id: "android-studio", name: "Android Studio", group: "mobile", icon: SiAndroidstudio },

  // ==========================================
  // Kategori 5: Tools & Data
  // ==========================================
  { id: "git", name: "Git", group: "tools", icon: SiGit },
  { id: "github", name: "GitHub", group: "tools", icon: SiGithub },
  { id: "docker", name: "Docker", group: "tools", icon: SiDocker },
  { id: "vscode", name: "VS Code", group: "tools", icon: VscVscode },
  { id: "trello", name: "Trello", group: "tools", icon: SiTrello },
  { id: "notion", name: "Notion", group: "tools", icon: SiNotion },
  { id: "vercel", name: "Vercel", group: "tools", icon: SiVercel },
  { id: "google-colab", name: "Google Colab", group: "tools", icon: SiGooglecolab },
  { id: "power-bi", name: "Power BI", group: "tools" }, // Chip teks (tidak ada logo resmi di react-icons)
  { id: "excel", name: "Excel", group: "tools", icon: FaFileExcel },
  { id: "google-sheets", name: "Google Sheets", group: "tools", icon: SiGooglesheets },

  // ==========================================
  // Kategori 6: Soft Skills (Hanya chip teks)
  // ==========================================
  {
    id: "leadership",
    name: "Kepemimpinan",
    nameId: "Kepemimpinan",
    nameEn: "Leadership",
    group: "soft",
  },
  {
    id: "project-management",
    name: "Manajemen Proyek",
    nameId: "Manajemen Proyek",
    nameEn: "Project Management",
    group: "soft",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    nameId: "Problem Solving",
    nameEn: "Problem Solving",
    group: "soft",
  },
  {
    id: "teamwork",
    name: "Kerja Tim",
    nameId: "Kerja Tim",
    nameEn: "Teamwork",
    group: "soft",
  },
  {
    id: "public-speaking",
    name: "Public Speaking",
    nameId: "Public Speaking",
    nameEn: "Public Speaking",
    group: "soft",
  },
  {
    id: "time-management",
    name: "Manajemen Waktu",
    nameId: "Manajemen Waktu",
    nameEn: "Time Management",
    group: "soft",
  },
];
