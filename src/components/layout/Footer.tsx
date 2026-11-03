"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#projects", label: t("nav.projects") },
    { href: "/#experience", label: t("nav.experience") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com", external: true },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "Dribbble", href: "https://dribbble.com", external: true },
    { label: "Email", href: "mailto:abdulmuid.dev@gmail.com", external: false },
  ];

  return (
    <footer className="w-full border-t border-border bg-surface/40 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-border">
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans font-bold text-20 text-text transition-colors"
            >
              <span>Abdul Muid</span>
            </Link>
            <p className="text-14 text-muted max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-999 border border-border bg-surface-2 text-12 font-medium text-text">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ width: "8px", height: "8px" }} />
              <span>{t("footer.status")}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <p className="font-mono text-12 text-muted uppercase tracking-wider">
              {t("footer.quickLinks")}
            </p>
            <ul className="space-y-2 text-14">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Contact Links */}
          <div className="space-y-3">
            <p className="font-mono text-12 text-muted uppercase tracking-wider">
              {t("footer.socials")}
            </p>
            <ul className="space-y-2 text-14">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-text transition-colors group"
                  >
                    <span>{item.label}</span>
                    {item.external && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        style={{ width: "14px", height: "14px" }}
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-12 text-muted">
          <p>{t("footer.copyright")}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-12 border border-border bg-surface-2 text-text hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
          >
            <span>{t("footer.backToTop")}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
              style={{ width: "14px", height: "14px" }}
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
