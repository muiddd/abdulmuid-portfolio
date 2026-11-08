import type { Metadata } from "next";
import { SkillsClient } from "./SkillsClient";

export const metadata: Metadata = {
  title: "Keahlian Teknis & Alat Kerja | Skills & Tools",
  description:
    "Direktori lengkap keahlian teknis Frontend, Backend & Database, UI/UX Design, Mobile, Tools & Data, serta Soft Skills Abdul Muid.",
};

export default function SkillsPage() {
  return <SkillsClient />;
}

