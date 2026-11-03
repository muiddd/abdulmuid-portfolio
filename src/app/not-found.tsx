"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="font-mono text-12 text-muted uppercase tracking-wider mb-3 px-3 py-1 rounded-8 bg-surface border border-border select-none">
        404 · Page Not Found
      </span>

      <h1 className="font-serif text-40 sm:text-64 text-text leading-[1.05] tracking-tight mb-4">
        {lang === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found"}
      </h1>

      <p className="font-sans text-16 text-muted max-w-md mb-8 leading-relaxed">
        {lang === "id"
          ? "Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau tautan yang dimasukkan keliru."
          : "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center h-11 px-6 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity shadow-sm"
      >
        {lang === "id" ? "Kembali ke Beranda" : "Return to Home"}
      </Link>
    </div>
  );
}

