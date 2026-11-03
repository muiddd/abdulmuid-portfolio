"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-12 border border-border bg-surface-2 text-14 font-medium text-text hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text ${className}`}
      aria-label={t("lang.toggle")}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 shrink-0 text-muted"
        style={{ width: "16px", height: "16px" }}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <span className="font-semibold tracking-wider text-12">
        {lang.toUpperCase()}
      </span>
    </button>
  );
}
