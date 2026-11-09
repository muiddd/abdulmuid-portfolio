"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Reveal } from "@/components/common/Reveal";
import { projects } from "../../../content/projects";

export function SelectedWork() {
  const { lang, t } = useLanguage();
  const router = useRouter();

  return (
    <section id="projects" className="relative w-full py-16 md:py-24 border-t border-border scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal as="div" y={22} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-2.5">
            <h2 className="font-serif text-28 sm:text-40 tracking-[-0.01em] text-text leading-[1.12]">
              {t("projects.titlePart1")}{" "}
              <span className="text-muted italic">{t("projects.titlePart2")}</span>
            </h2>
            <p className="text-16 text-muted max-w-xl leading-relaxed">
              {t("projects.subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Projects Grid: 2 columns matching the current 2 projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <Reveal
              key={project.slug}
              as="div"
              delay={idx * 0.1}
              y={28}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/projects/${project.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/projects/${project.slug}`);
                }
              }}
              className="group rounded-24 p-5 sm:p-6 bg-surface-2 border border-border shadow-sm hover:shadow-md hover:border-text/30 transition-all duration-200 flex flex-col justify-between gap-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-12 font-mono text-muted">
                  <span className="px-2.5 py-0.5 rounded-999 bg-surface border border-border">
                    {project.category[lang]}
                  </span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-sans font-bold text-20 text-text group-hover:text-muted transition-colors">
                  {project.title[lang]}
                </h3>

                <p className="text-14 text-muted line-clamp-2 leading-relaxed">
                  {project.summary[lang]}
                </p>
              </div>

              <div className="space-y-4">
                <PlaceholderImage
                  src={project.cover}
                  aspectRatio="video"
                  label={project.title[lang]}
                  category={project.category[lang]}
                  className="w-full rounded-16"
                />

                {/* Tech stack badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-8 bg-surface text-12 font-mono text-muted border border-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center text-14 font-medium text-text group-hover:underline">
                  <span>{t("selectedWork.viewDetails")}</span>
                  <LuArrowRight
                    aria-hidden="true"
                    className="ml-1.5 text-14 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA to View All Projects */}
        <Reveal as="div" delay={0.1} y={18} className="pt-10 sm:pt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
          >
            {t("projects.viewAll")}
            <LuArrowRight
              aria-hidden="true"
              className="text-16 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export const Projects = SelectedWork;
