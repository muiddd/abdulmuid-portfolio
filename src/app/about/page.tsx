"use client";

import React from "react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Reveal } from "@/components/common/Reveal";
import { skillsData } from "../../../content/skills";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <main className="w-full py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">
        
        {/* Header */}
        <Reveal as="header" y={24} className="space-y-4">
          <h1 className="font-serif text-40 sm:text-64 text-text leading-[1.05] tracking-tight">
            Abdul Muid —{" "}
            <span className="text-muted italic">
              {lang === "id" ? "Fullstack & UI/UX" : "Fullstack & UI/UX"}
            </span>
          </h1>
          <p className="font-sans text-20 text-muted leading-relaxed">
            {lang === "id"
              ? "Mahasiswa Teknik Informatika di Politeknik Negeri Malang yang menggabungkan presisi rekayasa kode dengan kepekaan desain antarmuka."
              : "Informatics Engineering student at Politeknik Negeri Malang bridging code engineering precision with thoughtful user interface design."}
          </p>
        </Reveal>

        {/* Portrait & Core Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <Reveal as="div" delay={0.08} y={26} className="md:col-span-5 overflow-hidden rounded-24 border border-border bg-surface">
            <PlaceholderImage
              src="/images/profile.png"
              alt="Abdul Muid Portrait"
              aspectRatio="portrait"
              category="Portrait"
              label="Abdul Muid"
              className="w-full"
            />
          </Reveal>

          <Reveal as="div" delay={0.16} y={26} className="md:col-span-7 space-y-5 text-16 text-muted leading-relaxed">
            <h2 className="font-serif text-28 leading-[1.12] tracking-[-0.01em] text-text">
              {lang === "id" ? "Filosofi & Cara Kerja" : "Philosophy & Work Approach"}
            </h2>
            <p>
              {t("about.bioParagraph1")}
            </p>
            <p>
              {t("about.bioParagraph2")}
            </p>
            <p>
              {t("about.bioParagraph3")}
            </p>
          </Reveal>
        </div>

        {/* Education & Academic Facts */}
        <Reveal as="section" y={24} className="bg-surface rounded-24 border border-border p-6 sm:p-8 space-y-6">
          <span className="font-mono text-12 text-muted uppercase tracking-wider block">
            {lang === "id" ? "Latar Belakang Akademis & Fokus" : "Academic Background & Focus"}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div>
              <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                {t("about.facts.educationLabel")}
              </span>
              <p className="font-sans font-bold text-16 text-text">
                Politeknik Negeri Malang
              </p>
              <p className="text-14 text-muted">D4 Teknik Informatika</p>
            </div>

            <div>
              <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                {t("about.facts.locationLabel")}
              </span>
              <p className="font-sans font-bold text-16 text-text">
                Malang, Indonesia
              </p>
              <p className="text-14 text-muted">Terbuka Onsite & Remote</p>
            </div>

            <div>
              <span className="font-mono text-12 text-muted uppercase tracking-wider block mb-1">
                {t("about.facts.focusLabel")}
              </span>
              <p className="font-sans font-bold text-16 text-text">
                Fullstack & UI/UX
              </p>
              <p className="text-14 text-muted">Internship Ready</p>
            </div>
          </div>
        </Reveal>

        {/* Featured Skills Summary Card */}
        <Reveal as="section" y={24} className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-12 text-muted uppercase tracking-wider block">
              Tech Stack & Toolkit
            </span>
            <h2 className="font-serif text-28 sm:text-40 leading-[1.12] tracking-[-0.01em] text-text">
              {lang === "id" ? "Keahlian Unggulan" : "Featured Skills"}
            </h2>
          </div>

          {/* 8 Featured Skills Grid: 4 cols desktop, 3 cols mobile */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {skillsData
              .filter((skill) => skill.featured)
              .map((skill) => {
                const IconComp = skill.icon!;
                return (
                  <div
                    key={skill.id}
                    tabIndex={0}
                    role="img"
                    aria-label={skill.name}
                    title={skill.name}
                    className="group flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-16 sm:rounded-20 bg-surface border border-border text-muted hover:text-text hover:border-text/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                  >
                    <IconComp className="w-6 h-6 sm:w-8 sm:h-8 text-muted group-hover:text-text transition-colors duration-200" />
                    <span className="mt-2 sm:mt-2.5 font-sans text-12 sm:text-14 font-medium text-text text-center truncate max-w-full">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
          </div>

          {/* Secondary Button to /skills */}
          <div className="pt-2">
            <Link
              href="/skills"
              className="group inline-flex items-center justify-center gap-2 h-10 px-5 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
            >
              {t("about.viewAllSkills")}
              <LuArrowRight
                aria-hidden="true"
                className="text-16 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        {/* Actions (Download CV & Contact) */}
        <Reveal as="section" y={20} className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Abdul-Muid-CV-ATS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              {t("about.ctaDownloadCv")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors"
            >
              {lang === "id" ? "Hubungi Saya" : "Get in Touch"}
            </Link>
          </div>

          <Link
            href="/experience"
            className="group inline-flex items-center text-14 font-medium text-text hover:underline"
          >
            {lang === "id" ? "Lihat Pengalaman & Sertifikat" : "Explore Experience & Credentials"}
            <LuArrowRight
              aria-hidden="true"
              className="ml-1.5 text-14 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>

      </div>
    </main>
  );
}

