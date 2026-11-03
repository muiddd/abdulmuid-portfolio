"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Close mobile menu on route change or ESC key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track active section on the homepage based on scroll position
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["hero", "about", "projects", "experience", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { href: "/", sectionId: "hero", label: t("nav.home") },
    { href: "/#about", sectionId: "about", label: t("nav.about") },
    { href: "/#projects", sectionId: "projects", label: t("nav.projects") },
    { href: "/#experience", sectionId: "experience", label: t("nav.experience") },
    { href: "/#contact", sectionId: "contact", label: t("nav.contact") },
  ];

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (pathname === "/") {
      return activeSection === link.sectionId;
    }
    if (link.sectionId === "projects") {
      return pathname.startsWith("/projects");
    }
    if (link.sectionId === "about") {
      return pathname.startsWith("/about");
    }
    if (link.sectionId === "experience") {
      return pathname.startsWith("/experience");
    }
    if (link.sectionId === "contact") {
      return pathname.startsWith("/contact");
    }
    return false;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: typeof navLinks[0]
  ) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      e.preventDefault();
      if (link.sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        setActiveSection("hero");
      } else {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${link.sectionId}`);
          setActiveSection(link.sectionId);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/85 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setActiveSection("hero");
            }
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-text rounded-12 p-1 -m-1"
          aria-label="Abdul Muid Homepage"
        >
          {/* Status Dot: strictly using --accent (#5B3DF5) */}
          <span className="relative flex h-2 w-2 shrink-0" style={{ width: "8px", height: "8px" }}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-sans font-bold text-16 tracking-tight text-text transition-colors">
            Abdul Muid
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative py-1 text-14 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text ${
                  active
                    ? "text-text font-semibold"
                    : "text-muted hover:text-text"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-text rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & CTA Button */}
        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <ThemeToggle />

          {/* Black CTA Button */}
          <Link
            href="/#contact"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", "#contact");
                  setActiveSection("contact");
                }
              }
            }}
            className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
          >
            {t("nav.ctaContact")}
          </Link>

          {/* Hamburger button (visible ONLY on mobile screens) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-12 border border-border bg-surface-2 text-text hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4.5 h-4.5 shrink-0 text-text"
                style={{ width: "18px", height: "18px" }}
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              // Hamburger menu icon
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4.5 h-4.5 shrink-0 text-text"
                style={{ width: "18px", height: "18px" }}
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-border bg-surface/98 backdrop-blur-lg px-4 pt-3 pb-6 overflow-hidden shadow-sm"
          >
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-4 py-2.5 rounded-12 text-14 font-medium transition-colors ${
                      active
                        ? "bg-surface-2 text-text font-semibold border border-border"
                        : "text-muted hover:text-text hover:bg-surface-2/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (pathname === "/") {
                    e.preventDefault();
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", "#contact");
                      setActiveSection("contact");
                    }
                  }
                }}
                className="mt-2 text-center py-2.5 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity"
              >
                {t("nav.ctaContact")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
