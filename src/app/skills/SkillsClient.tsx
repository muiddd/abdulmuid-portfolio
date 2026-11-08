"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import {
  skillsData,
  skillCategories,
  SkillGroupId,
  SkillItem,
} from "../../../content/skills";

export function SkillsClient() {
  const { t, lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<SkillGroupId>("frontend");
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Group skills by category with metadata
  const categorySections = skillCategories.map((cat) => {
    const items = skillsData.filter((skill) => skill.group === cat.id);
    const iconSkills = items.filter((skill) => skill.icon !== undefined);
    const chipSkills = items.filter((skill) => skill.icon === undefined);
    const countFormatted = String(items.length).padStart(2, "0");
    const label = t(`skills.categories.${cat.id}`) || (lang === "id" ? cat.labelId : cat.labelEn);

    return {
      id: cat.id,
      label,
      items,
      iconSkills,
      chipSkills,
      countFormatted,
    };
  });

  // Smooth scroll handler respecting prefers-reduced-motion
  const scrollToSection = (categoryId: SkillGroupId) => {
    setActiveCategory(categoryId);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 700);

    const target = document.getElementById(categoryId);
    if (target) {
      target.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  // Scroll spy via IntersectionObserver with fallback
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const categoryIds = skillCategories.map((c) => c.id);
      const scrollPos = window.scrollY + 180;

      for (let i = categoryIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(categoryIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveCategory(categoryIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const getChipDisplayName = (skill: SkillItem) => {
    if (lang === "en" && skill.nameEn) return skill.nameEn;
    if (lang === "id" && skill.nameId) return skill.nameId;
    return skill.name;
  };

  return (
    <main className="w-full py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header (Single H1, Mono label, Serif heading with muted accent) */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-2 select-none">
            {t("skills.label")}
          </span>
          <h1 className="font-serif text-40 sm:text-64 text-text leading-[1.05] tracking-tight">
            {t("skills.titlePart1")}{" "}
            <span className="text-muted italic">{t("skills.titlePart2")}</span>
          </h1>
          <p className="mt-4 text-16 text-muted leading-relaxed">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Mobile Sub-Navbar: Sticky Horizontal Bar with hidden scrollbar */}
        <div className="lg:hidden sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-bg/90 backdrop-blur-md border-y border-border/80 mb-8">
          <nav
            aria-label={t("skills.subnavAria")}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
          >
            {categorySections.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToSection(cat.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-13 font-mono shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text select-none ${
                    isActive
                      ? "bg-text text-bg shadow-sm"
                      : "bg-surface-2 border border-border text-muted hover:text-text hover:bg-surface"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-11 font-mono ${
                      isActive ? "text-bg/80" : "text-muted/70"
                    }`}
                  >
                    {cat.countFormatted}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Two Column Layout on Desktop (Left sticky sub-nav, Right content sections) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (lg:col-span-4): Sticky Vertical Sub-navbar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="bg-surface rounded-24 border border-border p-3.5 shadow-none">
              <nav aria-label={t("skills.subnavAria")} className="flex flex-col space-y-1">
                {categorySections.map((cat) => {
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => scrollToSection(cat.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative flex items-center justify-between w-full px-4 py-3 rounded-16 text-14 font-mono transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text select-none text-left ${
                        isActive
                          ? "text-text font-semibold"
                          : "text-muted hover:text-text hover:bg-surface-2/60"
                      }`}
                    >
                      {/* Smooth spring sliding active background indicator */}
                      {isActive && (
                        <motion.span
                          layoutId={shouldReduceMotion ? undefined : "skills-subnav-indicator"}
                          className="absolute inset-0 bg-surface-2 rounded-16 border border-border/90 shadow-sm"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                      <span className="relative z-10 font-mono text-12 text-muted">
                        {cat.countFormatted}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column (lg:col-span-8): All Categories as Sequential Sections */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {categorySections.map((cat) => (
              <motion.section
                key={cat.id}
                id={cat.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="scroll-mt-28 md:scroll-mt-32 space-y-5"
              >
                {/* Section Header: Label Mono + Thin Line + 2-digit Count */}
                <div className="flex items-center gap-3 select-none">
                  <h2 className="font-mono text-12 text-muted uppercase tracking-wider">
                    {cat.label}
                  </h2>
                  <div className="h-px flex-1 bg-border/80" />
                  <span className="font-mono text-12 text-muted/70">
                    {cat.countFormatted}
                  </span>
                </div>

                {/* Tech Skills Tile Grid (4 cols desktop, 3 cols mobile) */}
                {cat.iconSkills.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                    {cat.iconSkills.map((skill) => {
                      const IconComp = skill.icon!;
                      const skillName = skill.name;

                      return (
                        <div
                          key={skill.id}
                          tabIndex={0}
                          role="img"
                          aria-label={skillName}
                          title={skillName}
                          className="group relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-16 sm:rounded-20 bg-surface border border-border text-muted hover:text-text hover:border-text/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                        >
                          {/* Monochrome Icon: --muted by default, --text on hover/focus */}
                          <IconComp className="w-6 h-6 sm:w-8 sm:h-8 text-muted group-hover:text-text transition-colors duration-200" />
                          
                          {/* Visible label with tooltip fallback */}
                          <span className="mt-2 sm:mt-2.5 font-sans text-12 sm:text-14 font-medium text-text text-center truncate max-w-full">
                            {skillName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Text Chips Row (pill --surface-2, thin border) for non-icon skills */}
                {cat.chipSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.chipSkills.map((skill) => {
                      const chipName = getChipDisplayName(skill);

                      return (
                        <span
                          key={skill.id}
                          className="inline-flex items-center px-4 py-2 rounded-full bg-surface-2 border border-border/80 text-13 sm:text-14 font-mono text-text select-none hover:border-text/30 transition-colors shadow-sm"
                        >
                          {chipName}
                        </span>
                      );
                    })}
                  </div>
                )}
              </motion.section>
            ))}

            {/* Bottom Navigation CTA */}
            <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
              >
                <LuArrowLeft
                  aria-hidden="true"
                  className="text-16 transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                <span>{lang === "id" ? "Kembali ke Tentang" : "Back to About"}</span>
              </Link>

              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
              >
                <span>{lang === "id" ? "Lihat Proyek & Karya" : "Explore Projects"}</span>
                <LuArrowRight
                  aria-hidden="true"
                  className="text-16 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

