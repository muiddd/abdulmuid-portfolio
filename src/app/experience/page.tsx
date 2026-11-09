"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/common/Reveal";
import { Experience } from "@/components/home/Experience";
import { Certificates } from "@/components/home/Certificates";

export default function ExperiencePage() {
  const { lang } = useLanguage();

  return (
    <main className="w-full py-14 md:py-20">
      {/* Page Introduction */}
      <Reveal as="div" y={24} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="max-w-3xl">
          <h1 className="font-serif text-40 sm:text-64 text-text leading-[1.05] tracking-tight">
            {lang === "id" ? "Pengalaman Organisasi &" : "Leadership &"}{" "}
            <span className="text-muted italic">{lang === "id" ? "Sertifikasi" : "Certifications"}</span>
          </h1>
          <p className="mt-4 text-16 text-muted leading-relaxed">
            {lang === "id"
              ? "Dokumentasi perjalanan kepemimpinan di kampus, keterlibatan sebagai Google Student Ambassador, pencapaian kompetisi, dan komitmen belajar berkelanjutan."
              : "Documenting campus leadership, the Google Student Ambassador initiative, competitive milestones, and continuous technical certifications."}
          </p>
        </div>
      </Reveal>

      {/* Full Experience Timeline (limit={0} shows all) */}
      <Experience limit={0} showViewAll={false} />

      {/* Full Certificates Grid with Filter & Lightbox (limit={0} shows all) */}
      <Certificates limit={0} showViewAll={false} />

      {/* Bottom CTA to Contact */}
      <Reveal as="div" y={22} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="border-t border-border pt-12 text-center space-y-4">
          <h2 className="font-serif text-28 sm:text-40 leading-[1.12] tracking-[-0.01em] text-text">
            {lang === "id" ? "Tertarik berdiskusi lebih lanjut?" : "Interested in discussing further?"}
          </h2>
          <p className="text-16 text-muted max-w-md mx-auto">
            {lang === "id"
              ? "Saya selalu terbuka untuk berdiskusi seputar peluang magang atau kolaborasi proyek."
              : "I am always open to exploring internship opportunities or collaborative projects."}
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-7 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              {lang === "id" ? "Hubungi Saya Sekarang" : "Get In Touch"}
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}

