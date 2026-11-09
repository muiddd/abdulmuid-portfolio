"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Reveal } from "@/components/common/Reveal";
import { projects } from "../../../content/projects";

export default function ProjectsPage() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: lang === "id" ? "Semua" : "All" },
    { id: "Aplikasi Web", label: lang === "id" ? "Aplikasi Web" : "Web App" },
    { id: "Website", label: "Website" },
    { id: "Mobile App", label: "Mobile App" },
    { id: "Dashboard", label: "Dashboard" },
  ];

  const filteredProjects = projects.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category.id === activeCategory || item.category.en === activeCategory;
  });

  return (
    <main className="w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <Reveal as="div" y={24} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h1 className="font-serif text-40 sm:text-64 text-text leading-[1.05] tracking-tight">
              {lang === "id" ? "Semua Proyek &" : "All Projects &"}{" "}
              <span className="text-muted italic">{lang === "id" ? "Eksplorasi" : "Explorations"}</span>
            </h1>
            <p className="mt-4 text-16 text-muted leading-relaxed">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* Filter Pills */}
          <Reveal as="div" delay={0.12} y={16} className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-12 text-14 font-mono transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text select-none ${
                    isActive
                      ? "bg-text text-bg shadow-sm"
                      : "bg-surface-2 border border-border text-muted hover:text-text hover:bg-surface"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </Reveal>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.slug} y={28} delay={idx * 0.1} className="h-full">
            <Link
              href={`/projects/${project.slug}`}
              className="group h-full bg-surface rounded-24 border border-border p-5 sm:p-6 shadow-none hover:border-text/30 transition-all duration-200 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
            >
              <div className="space-y-4">
                {/* Image Cover */}
                <div className="overflow-hidden rounded-16 border border-border/80 bg-surface-2">
                  <PlaceholderImage
                    src={project.cover}
                    alt={project.title[lang]}
                    aspectRatio="video"
                    category={project.category[lang]}
                    label={project.title[lang]}
                    className="w-full group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Category & Year */}
                <div className="flex items-center justify-between text-12 font-mono text-muted">
                  <span className="px-2 py-0.5 rounded-6 bg-surface-2 border border-border/80">
                    {project.category[lang]}
                  </span>
                  <span>{project.year}</span>
                </div>

                {/* Title & Summary */}
                <div>
                  <h2 className="font-sans font-bold text-20 text-text group-hover:text-muted transition-colors mb-2">
                    {project.title[lang]}
                  </h2>
                  <p className="font-sans text-14 text-muted leading-relaxed line-clamp-2">
                    {project.summary[lang]}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-8 bg-surface-2 text-12 font-mono text-muted border border-border/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Link Arrow */}
              <div className="pt-5 mt-4 border-t border-border/60 flex items-center justify-between text-14 font-medium text-text">
                <span className="group-hover:underline">
                  {lang === "id" ? "Buka Studi Kasus" : "Read Case Study"}
                </span>
                <LuArrowRight
                  aria-hidden="true"
                  className="text-16 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </main>
  );
}

