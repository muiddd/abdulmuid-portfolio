// GANTI sesuai keahlian asli
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiFigma,
} from "react-icons/si";
import {
  LuNetwork,
  LuImage,
  LuPenTool,
  LuPalette,
} from "react-icons/lu";

export type SkillGroupId = "frontend" | "backend" | "tools";

export interface SkillItem {
  id: string;
  name: string;
  group: SkillGroupId;
  icon: IconType;
}

export const skillsData: SkillItem[] = [
  // Frontend
  { id: "react", name: "React", group: "frontend", icon: SiReact },
  { id: "nextjs", name: "Next.js", group: "frontend", icon: SiNextdotjs },
  { id: "typescript", name: "TypeScript", group: "frontend", icon: SiTypescript },
  { id: "javascript", name: "JavaScript", group: "frontend", icon: SiJavascript },
  { id: "tailwind", name: "Tailwind CSS", group: "frontend", icon: SiTailwindcss },
  { id: "html", name: "HTML", group: "frontend", icon: SiHtml5 },
  { id: "css", name: "CSS", group: "frontend", icon: SiCss },

  // Backend & Database
  { id: "nodejs", name: "Node.js", group: "backend", icon: SiNodedotjs },
  { id: "postgresql", name: "PostgreSQL", group: "backend", icon: SiPostgresql },
  { id: "mysql", name: "MySQL", group: "backend", icon: SiMysql },
  { id: "restapi", name: "REST API", group: "backend", icon: LuNetwork },
  { id: "git", name: "Git", group: "backend", icon: SiGit },

  // Design & Tools
  { id: "figma", name: "Figma", group: "tools", icon: SiFigma },
  { id: "photoshop", name: "Photoshop", group: "tools", icon: LuImage },
  { id: "illustrator", name: "Illustrator", group: "tools", icon: LuPenTool },
  { id: "canva", name: "Canva", group: "tools", icon: LuPalette },
];

