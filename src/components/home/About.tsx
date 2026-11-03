"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { skillsData } from "../../../content/skills";

export function About() {
  const { t } = useLanguage();

  // Duplicate items to guarantee a 100% seamless infinite loop
  const marqueeItems = [...skillsData, ...skillsData];

  return (
    <section id="about" className="relative w-full py-16 md:py-24 lg:py-28 border-t border-border/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Sevora Style: Mono label above + Large Serif Heading) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-serif text-28 sm:text-40 leading-[1.12] text-text tracking-[-0.01em]">
            {t("about.headingMain")}{" "}
            <span className="text-muted italic">{t("about.headingMuted")}</span>
          </h2>
        </div>

        {/* Upper Content: 2-Column Grid (Bio on Left, 3 Facts & CTAs on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (lg:col-span-7): Bio Paragraphs & Experience Link */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <p className="font-sans text-16 leading-relaxed text-text">
              {t("about.bioParagraph1")}
            </p>
            <p className="font-sans text-16 leading-relaxed text-muted">
              {t("about.bioParagraph2")}
            </p>
            <div className="pt-2">
              <Link
                href="/experience"
                className="inline-flex items-center text-14 font-medium text-text hover:text-muted transition-colors underline-offset-4 hover:underline"
              >
                {t("about.experienceLink")}
              </Link>
            </div>
          </div>

          {/* Right Column (lg:col-span-5): 3 Quick Facts & Action Buttons */}
          <div className="lg:col-span-5 bg-surface rounded-24 border border-border p-5 sm:p-6 shadow-none flex flex-col space-y-5">
            
            {/* 3 Quick Facts (Polinema, Malang, Fullstack & UI/UX) */}
            <dl className="space-y-3.5 divide-y divide-border/80">
              
              {/* Fact 1: Education */}
              <div className="flex flex-col space-y-0.5">
                <dt className="font-mono text-12 text-muted uppercase tracking-wider">
                  {t("about.facts.educationLabel")}
                </dt>
                <dd className="font-sans text-14 text-text font-medium leading-snug">
                  {t("about.facts.educationValue")}
                </dd>
              </div>

              {/* Fact 2: Location */}
              <div className="flex flex-col space-y-0.5 pt-3">
                <dt className="font-mono text-12 text-muted uppercase tracking-wider">
                  {t("about.facts.locationLabel")}
                </dt>
                <dd className="font-sans text-14 text-text font-medium leading-snug">
                  {t("about.facts.locationValue")}
                </dd>
              </div>

              {/* Fact 3: Internship Focus */}
              <div className="flex flex-col space-y-0.5 pt-3">
                <dt className="font-mono text-12 text-muted uppercase tracking-wider">
                  {t("about.facts.focusLabel")}
                </dt>
                <dd className="font-sans text-14 text-text font-medium leading-snug">
                  {t("about.facts.focusValue")}
                </dd>
              </div>

            </dl>

            {/* CTAs: Primary (Download CV) + Secondary (Read More) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-border">
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center justify-center h-10 px-5 rounded-12 bg-text text-bg font-sans text-14 font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
              >
                {t("about.ctaDownloadCv")}
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center h-10 px-5 rounded-12 border border-border bg-surface-2 text-text font-sans text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
              >
                {t("about.ctaMore")}
              </Link>
            </div>

          </div>

        </div>

        {/* Lower Content: Animated Moving Skills Marquee Underneath the Text */}
        <div className="mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-border/70">
          
          {/* Marquee Title */}
          <div className="flex items-center justify-between mb-4 select-none">
            <p className="font-mono text-12 text-muted uppercase tracking-wider">
              {t("about.skillsTitle")}
            </p>
            <span className="font-mono text-12 text-muted/70 hidden sm:inline-block">
              16 Technologies & Tools
            </span>
          </div>

          {/* Marquee Viewport with Edge Gradient Fade */}
          <div className="relative w-full overflow-hidden mask-marquee py-2">
            <div className="animate-marquee flex items-center gap-3">
              {marqueeItems.map((skill, idx) => {
                const IconComponent = skill.icon;

                return (
                  <div
                    key={`${skill.id}-${idx}`}
                    tabIndex={0}
                    role="img"
                    aria-label={skill.name}
                    className="group inline-flex items-center gap-2.5 px-4 py-2 bg-surface rounded-12 border border-border/90 text-muted hover:text-text hover:border-text/30 transition-all duration-200 cursor-pointer select-none shrink-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {/* Monochrome Icon */}
                    <IconComponent className="w-5 h-5 text-muted group-hover:text-text transition-colors duration-200" />
                    
                    {/* Skill Name */}
                    <span className="font-sans text-14 font-medium text-text whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
