"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { skillsData } from "../../../content/skills";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <main className="w-full py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">
        
        {/* Header */}
        <header className="space-y-4">
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
        </header>

        {/* Portrait & Core Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 overflow-hidden rounded-24 border border-border bg-surface">
            <PlaceholderImage
              src="/images/profile.png"
              alt="Abdul Muid Portrait"
              aspectRatio="portrait"
              category="Portrait"
              label="Abdul Muid"
              className="w-full grayscale contrast-[1.04]"
            />
          </div>

          <div className="md:col-span-7 space-y-5 text-16 text-muted leading-relaxed">
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
              {lang === "id"
                ? "[PLACEHOLDER] Dalam setiap proyek yang saya kerjakan, saya selalu mengawali dengan pertanyaan: 'Apakah solusi ini menyederhanakan masalah bagi pengguna?' Fondasi arsitektur kode yang teruji dan estetika visual yang konsisten adalah dua pilar yang selalu saya pegang."
                : "[PLACEHOLDER] In every project I build, I always begin with the fundamental question: 'Does this genuinely solve a user problem simply?' Robust code architecture and cohesive interface aesthetics are the two core pillars I adhere to."}
            </p>
          </div>
        </div>

        {/* Education & Academic Facts */}
        <section className="bg-surface rounded-24 border border-border p-6 sm:p-8 space-y-6">
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
        </section>

        {/* Complete Skills Directory */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-12 text-muted uppercase tracking-wider block">
              Tech Stack & Toolkit
            </span>
            <h2 className="font-serif text-28 sm:text-40 leading-[1.12] tracking-[-0.01em] text-text">
              {lang === "id" ? "Keahlian & Teknologi" : "Skills & Technologies"}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {skillsData.map((skill) => {
              const IconComp = skill.icon;
              return (
                <div
                  key={skill.id}
                  className="flex items-center gap-3 p-3.5 rounded-16 bg-surface border border-border text-text"
                >
                  <IconComp className="w-5 h-5 text-muted shrink-0" />
                  <span className="font-sans text-14 font-medium truncate">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Actions (Download CV & Contact) */}
        <section className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/cv.pdf"
              download
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
            className="text-14 font-medium text-text hover:underline"
          >
            {lang === "id" ? "Lihat Pengalaman & Sertifikat →" : "Explore Experience & Credentials →"}
          </Link>
        </section>

      </div>
    </main>
  );
}

