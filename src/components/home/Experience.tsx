"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { experiences, ExperienceItem } from "../../../content/experience";

interface ExperienceProps {
  limit?: number;
  showViewAll?: boolean;
  showFilter?: boolean;
}

export function Experience({
  limit = 3,
  showViewAll = true,
  showFilter = !limit,
}: ExperienceProps) {
  const { lang, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: t("experience.categories.all") },
    { id: "ambassador", label: t("experience.categories.ambassador") },
    { id: "organisasi", label: t("experience.categories.organisasi") },
    { id: "volunteer", label: t("experience.categories.volunteer") },
  ];

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case "ambassador":
        return t("experience.categories.ambassador");
      case "organisasi":
        return t("experience.categories.organisasi");
      case "volunteer":
        return t("experience.categories.volunteer");
      default:
        return type;
    }
  };

  const getPeriod = (item: ExperienceItem) => {
    const startStr = typeof item.start === "object" ? item.start[lang] : item.start;
    const endStr = typeof item.end === "object" ? item.end[lang] : item.end;
    if (!endStr || startStr === endStr) return startStr;
    return `${startStr} – ${endStr}`;
  };

  const filteredExperiences = experiences.filter((item) => {
    if (activeCategory === "all") return true;
    return item.type === activeCategory;
  });

  const displayItems = limit ? filteredExperiences.slice(0, limit) : filteredExperiences;

  return (
    <section id="experience" className="relative w-full py-16 md:py-24 border-t border-border/70 scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="font-serif text-28 sm:text-40 leading-[1.12] text-text tracking-[-0.01em]">
              {t("experience.titlePart1")}{" "}
              <span className="text-muted italic">{t("experience.titlePart2")}</span>
            </h2>
            <p className="mt-3.5 text-16 text-muted leading-relaxed">
              {t("experience.subtitle")}
            </p>
          </div>

          {/* Category Filter Pills (Active when showFilter is true, e.g. on /experience) */}
          {showFilter && (
            <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
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
            </div>
          )}
        </div>

        {/* Vertical Timeline (Left-aligned, full width to match section boundary) */}
        <div className="relative border-l border-border ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 sm:space-y-10">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <span
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-2 border-2 border-border group-hover:border-accent transition-colors"
                aria-hidden="true"
              />

              {/* Card Container */}
              <div className="bg-surface rounded-24 border border-border p-6 sm:p-7 shadow-none hover:border-text/20 transition-colors">
                
                {/* Header: Badges & Period */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category Badge */}
                    <span className="px-2.5 py-0.5 rounded-8 bg-surface-2 text-12 font-mono text-text border border-border select-none">
                      {getCategoryLabel(item.type)}
                    </span>
                    
                    {/* Special Highlight Badge (e.g. On-site, Lokasi) */}
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-8 bg-accent/10 text-12 font-mono text-text border border-accent/20 select-none">
                        {item.badge[lang]}
                      </span>
                    )}
                  </div>

                  {/* Period */}
                  <span className="font-mono text-12 text-muted">
                    {getPeriod(item)}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="font-sans font-bold text-20 text-text tracking-tight mb-1">
                  {item.role[lang]}
                </h3>

                {/* Organization */}
                <p className="font-mono text-14 text-muted mb-4">
                  {item.org}
                </p>

                {/* Contribution Bullets (Only render if there are points) */}
                {item.bullets && item.bullets[lang] && item.bullets[lang].length > 0 && (
                  <ul className="space-y-2 text-14 text-muted leading-relaxed">
                    {item.bullets[lang].map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-text mt-1 text-12 shrink-0">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-10 sm:mt-12 ml-3 sm:ml-4 pl-6 sm:pl-8">
            <Link
              href="/experience"
              className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
            >
              {t("experience.viewAll")}
              <LuArrowRight
                aria-hidden="true"
                className="text-16 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
