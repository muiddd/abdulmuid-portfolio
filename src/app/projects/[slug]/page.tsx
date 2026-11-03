import { notFound } from "next/navigation";
import { projects } from "../../../../content/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

