"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Project, projects } from "../../../../content/projects";

export function ProjectDetailClient({ project }: { project: Project }) {
  const { lang } = useLanguage();

  // Find previous and next project for navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Action links validation: only show buttons when URL is non-empty and valid
  const githubUrl = project.links?.github || project.repoUrl;
  const figmaUrl = project.links?.figma;
  const demoUrl = project.links?.demo || project.demoUrl;

  const isValidLink = (url?: string) => {
    if (!url) return false;
    const trimmed = url.trim();
    return trimmed !== "" && trimmed !== "tidak tersedia" && trimmed !== "none";
  };

  const hasGithub = isValidLink(githubUrl);
  const hasFigma = isValidLink(figmaUrl);
  const hasDemo = isValidLink(demoUrl);
  const hasAnyLink = hasGithub || hasFigma || hasDemo;

  // Gallery items fallback
  const galleryItems = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [
        { label: { id: `${project.title.id} - Preview 1`, en: `${project.title.en} - Preview 1` }, aspectRatio: "video" as const },
        { label: { id: `${project.title.id} - Preview 2`, en: `${project.title.en} - Preview 2` }, aspectRatio: "video" as const },
      ];

  return (
    <article className="w-full py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Back Link / Breadcrumb */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-14 text-muted hover:text-text transition-colors select-none"
          >
            <span>←</span>
            <span>{lang === "id" ? "Kembali ke Semua Proyek" : "Back to All Projects"}</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-8 bg-surface border border-border text-12 font-mono text-text">
              {project.category[lang]}
            </span>
            <span className="px-3 py-1 rounded-8 bg-surface border border-border text-12 font-mono text-muted">
              {project.year}
            </span>
            {project.context && (
              <span className="px-3 py-1 rounded-8 bg-surface-2 border border-border text-12 font-mono text-text">
                {project.context[lang]}
              </span>
            )}
          </div>

          <h1 className="font-serif text-40 sm:text-64 text-text leading-[1.05] tracking-tight">
            {project.title[lang]}
          </h1>

          <p className="font-sans text-20 text-muted leading-relaxed">
            {project.summary[lang]}
          </p>

          {/* Action Links: GitHub, Figma, Live Demo (Hanya tampil jika URL terisi) */}
          {hasAnyLink && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {hasGithub && (
                <a
                  href={githubUrl === "[PLACEHOLDER_URL]" ? "#" : githubUrl}
                  target={githubUrl === "[PLACEHOLDER_URL]" ? undefined : "_blank"}
                  rel={githubUrl === "[PLACEHOLDER_URL]" ? undefined : "noopener noreferrer"}
                  onClick={githubUrl === "[PLACEHOLDER_URL]" ? (e) => e.preventDefault() : undefined}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-12 border border-border bg-surface-2 text-text text-13 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
                  aria-label="Repository GitHub"
                >
                  <span>GitHub</span>
                  <span className="text-muted text-12">↗</span>
                </a>
              )}
              {hasFigma && (
                <a
                  href={figmaUrl === "[PLACEHOLDER_URL]" ? "#" : figmaUrl}
                  target={figmaUrl === "[PLACEHOLDER_URL]" ? undefined : "_blank"}
                  rel={figmaUrl === "[PLACEHOLDER_URL]" ? undefined : "noopener noreferrer"}
                  onClick={figmaUrl === "[PLACEHOLDER_URL]" ? (e) => e.preventDefault() : undefined}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-12 border border-border bg-surface-2 text-text text-13 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
                  aria-label="File Desain Figma"
                >
                  <span>Figma</span>
                  <span className="text-muted text-12">↗</span>
                </a>
              )}
              {hasDemo && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-12 bg-text text-bg text-13 font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
                  aria-label="Live Demo Website"
                >
                  <span>Live Demo</span>
                  <span className="text-12">↗</span>
                </a>
              )}
            </div>
          )}

          {/* Metadata Grid (Role, Timeline/Period, Team, Stack) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border">
            <div>
              <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                {lang === "id" ? "Peran" : "Role"}
              </span>
              <span className="font-sans text-14 text-text font-medium leading-snug block">
                {project.role}
              </span>
            </div>

            <div>
              <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                {lang === "id" ? "Periode" : "Timeline"}
              </span>
              <span className="font-sans text-14 text-text font-medium leading-snug block">
                {project.period ? project.period[lang] : project.year}
              </span>
            </div>

            {project.team && (
              <div>
                <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                  {lang === "id" ? "Tim" : "Team"}
                </span>
                <span className="font-sans text-14 text-text font-medium leading-snug block">
                  {project.team[lang]}
                </span>
              </div>
            )}

            <div className={project.team ? "col-span-2 sm:col-span-1" : "col-span-2"}>
              <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-12 px-2 py-0.5 rounded-6 bg-surface border border-border text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="overflow-hidden rounded-24 border border-border bg-surface shadow-sm">
          <PlaceholderImage
            src={project.cover}
            alt={project.title[lang]}
            aspectRatio="video"
            category={project.category[lang]}
            label={project.title[lang]}
            className="w-full"
          />
        </div>

        {/* Case Study Sections (Problem, Process, Results) */}
        <div className="space-y-10 sm:space-y-12">
          {project.sections.map((section, idx) => (
            <section key={idx} className="bg-surface rounded-24 border border-border p-7 sm:p-9 space-y-3">
              <h2 className="font-serif text-28 leading-[1.12] tracking-[-0.01em] text-text">
                {section.title[lang]}
              </h2>
              <p className="font-sans text-16 text-muted leading-relaxed pt-1">
                {section.content[lang]}
              </p>
            </section>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="space-y-6">
          <h2 className="font-serif text-28 leading-[1.12] tracking-[-0.01em] text-text">
            {lang === "id" ? "Galeri Desain & Antarmuka" : "Design & Interface Gallery"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {galleryItems.map((item, gIdx) => (
              <div
                key={gIdx}
                className={`overflow-hidden rounded-20 border border-border bg-surface ${
                  galleryItems.length === 5 && gIdx === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <PlaceholderImage
                  src={item.src}
                  aspectRatio={item.aspectRatio ?? "video"}
                  category={project.category[lang]}
                  label={item.label[lang]}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Previous / Next Project Navigation Footer */}
        <footer className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start p-4 rounded-16 bg-surface border border-border w-full sm:w-[48%] hover:border-text/30 transition-colors"
          >
            <span className="font-mono text-12 text-muted">
              ← {lang === "id" ? "Proyek Sebelumnya" : "Previous Project"}
            </span>
            <span className="font-sans font-bold text-16 text-text group-hover:underline mt-1 truncate w-full">
              {prevProject.title[lang]}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end text-right p-4 rounded-16 bg-surface border border-border w-full sm:w-[48%] hover:border-text/30 transition-colors"
          >
            <span className="font-mono text-12 text-muted">
              {lang === "id" ? "Proyek Berikutnya" : "Next Project"} →
            </span>
            <span className="font-sans font-bold text-16 text-text group-hover:underline mt-1 truncate w-full">
              {nextProject.title[lang]}
            </span>
          </Link>
        </footer>

      </div>
    </article>
  );
}

