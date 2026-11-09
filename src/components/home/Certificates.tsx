"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LuArrowDown, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/common/Reveal";
import {
  certificates,
  CertificateItem,
  CertificateCategory,
} from "../../../content/certificates";

interface CertificatesProps {
  limit?: number;
  showViewAll?: boolean;
}

export function Certificates({ limit = 6, showViewAll = true }: CertificatesProps) {
  const { lang, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Accessible focus restoration ref
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const allCategories: { id: string; label: string }[] = [
    { id: "all", label: t("certificates.categories.all") },
    { id: "Kompetisi", label: t("certificates.categories.Kompetisi") },
    { id: "Kepanitiaan", label: t("certificates.categories.Kepanitiaan") },
    { id: "Development", label: t("certificates.categories.Development") },
    { id: "Design", label: t("certificates.categories.Design") },
    { id: "Lainnya", label: t("certificates.categories.Lainnya") },
  ];

  // Sembunyikan tombol filter untuk kategori yang tidak punya item selama masih kosong
  const visibleCategories = allCategories.filter((cat) => {
    if (cat.id === "all") return true;
    return certificates.some((item) => item.category === cat.id);
  });

  const getCategoryLabel = (category: CertificateCategory | string) => {
    switch (category) {
      case "Kompetisi":
        return t("certificates.categories.Kompetisi");
      case "Kepanitiaan":
        return t("certificates.categories.Kepanitiaan");
      case "Development":
        return t("certificates.categories.Development");
      case "Design":
        return t("certificates.categories.Design");
      case "Lainnya":
        return t("certificates.categories.Lainnya");
      default:
        return category;
    }
  };

  const getCertTitle = (cert: CertificateItem) => {
    if (typeof cert.title === "object") {
      return cert.title[lang] || cert.title.id;
    }
    return cert.title;
  };

  const getCertAlt = (cert: CertificateItem) => {
    const titleStr = getCertTitle(cert);
    if (cert.award) {
      const awardStr = lang === "id" ? cert.award.id : cert.award.en;
      return lang === "id"
        ? `Sertifikat ${awardStr} ${titleStr}`
        : `Certificate ${awardStr} ${titleStr}`;
    }
    return lang === "id" ? `Sertifikat ${titleStr}` : `Certificate ${titleStr}`;
  };

  // Badge di kartu & lightbox: award (PORSENI) bila ada, kalau tidak pakai role.
  const getCertBadge = (cert: CertificateItem) => {
    if (cert.award) return cert.award[lang] || cert.award.id;
    if (cert.role) return cert.role[lang] || cert.role.id;
    return null;
  };

  const getCertEventDate = (cert: CertificateItem) => {
    if (cert.eventDate) return cert.eventDate[lang] || cert.eventDate.id;
    return cert.date ?? null;
  };

  const getCertDescription = (cert: CertificateItem) => {
    if (!cert.description) return null;
    return cert.description[lang] || cert.description.id;
  };

  const filteredItems = certificates.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const handleOpenModal = (cert: CertificateItem, e: React.MouseEvent | React.KeyboardEvent) => {
    triggerRef.current = e.currentTarget as HTMLElement;
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Keyboard Escape listener + focus trap while the lightbox is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCert) return;

      if (e.key === "Escape") {
        handleCloseModal();
        return;
      }

      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  // Focus trap / focus management when modal opens
  useEffect(() => {
    if (selectedCert) {
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    }
  }, [selectedCert]);

  return (
    <section id="certificates" className="relative w-full py-16 md:py-24 border-t border-border/70 scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal as="div" y={22} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="font-serif text-28 sm:text-40 leading-[1.12] text-text tracking-[-0.01em]">
              {t("certificates.titlePart1")}{" "}
              <span className="text-muted italic">{t("certificates.titlePart2")}</span>
            </h2>
            <p className="mt-3.5 text-16 text-muted leading-relaxed">
              {t("certificates.subtitle")}
            </p>
          </div>

          {/* Category Filter Pills (Hanya tampilkan jika ada lebih dari 1 kategori yang punya item) */}
          {visibleCategories.length > 1 && (
            <Reveal as="div" delay={0.12} y={16} className="flex flex-wrap items-center gap-2 self-start md:self-end">
              {visibleCategories.map((cat) => {
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
            </Reveal>
          )}
        </Reveal>

        {/* Certificates List: satu baris per sertifikat, pratinjau gambar hanya di lightbox */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {displayItems.map((cert, idx) => {
            const certTitle = getCertTitle(cert);
            const badge = getCertBadge(cert);
            const eventDate = getCertEventDate(cert);

            return (
              <Reveal
                key={cert.id}
                as="div"
                delay={idx * 0.06}
                y={22}
                role="button"
                tabIndex={0}
                onClick={(e) => handleOpenModal(cert, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal(cert, e);
                  }
                }}
                className="group bg-surface rounded-24 border border-border p-5 sm:p-6 shadow-none hover:border-text/30 transition-colors duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                aria-label={`Buka pratinjau ${certTitle}`}
              >
                {/* Details */}
                <div className="flex-1 min-w-0">
                  {/* Meta details: Badge award/role, category & date */}
                  <div className="flex flex-wrap items-center gap-2 text-12 font-mono text-muted mb-2">
                    {/* Badge: award bila ada, jika tidak role */}
                    {badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-text font-medium select-none">
                        {badge}
                      </span>
                    )}
                    {/* Category Badge */}
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-2 border border-border/80 select-none">
                      {getCategoryLabel(cert.category)}
                    </span>
                    {/* Sembunyikan tanggal jika kosong */}
                    {eventDate && <span>{eventDate}</span>}
                  </div>

                  {/* Certificate Title */}
                  <h3 className="font-sans font-bold text-16 sm:text-20 text-text leading-snug group-hover:text-muted transition-colors mb-1.5">
                    {certTitle}
                  </h3>

                  {/* Sembunyikan issuer jika kosong */}
                  {cert.issuer && (
                    <p className="font-mono text-12 text-muted line-clamp-1">
                      {cert.issuer}
                    </p>
                  )}
                </div>

                {/* Action Hint */}
                <div className="shrink-0 flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60 sm:border-l sm:pl-5 text-12 font-medium text-text">
                  <span className="group-hover:underline">{t("certificates.preview")}</span>
                  <LuArrowUpRight
                    aria-hidden="true"
                    className="text-14 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <Reveal as="div" delay={0.1} y={18} className="pt-10 sm:pt-14 flex justify-center">
            <Link
              href="/experience"
              className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
            >
              {t("certificates.viewAll")}
              <LuArrowRight
                aria-hidden="true"
                className="text-16 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-cert-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-text/50 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              ref={dialogRef}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-surface-2 rounded-24 border border-border p-5 sm:p-7 shadow-2xl z-10 space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {getCertBadge(selectedCert) && (
                      <span className="font-mono text-12 text-text px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 font-semibold select-none">
                        {getCertBadge(selectedCert)}
                      </span>
                    )}
                    <span className="font-mono text-12 text-muted px-2.5 py-0.5 rounded-full bg-surface border border-border select-none">
                      {getCategoryLabel(selectedCert.category)}
                    </span>
                  </div>
                  <h3 id="modal-cert-title" className="font-sans font-bold text-20 text-text mt-2 leading-snug">
                    {getCertTitle(selectedCert)}
                  </h3>
                  {(selectedCert.issuer || getCertEventDate(selectedCert)) && (
                    <p className="font-mono text-12 text-muted mt-1">
                      {[selectedCert.issuer, getCertEventDate(selectedCert)]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  {getCertDescription(selectedCert) && (
                    <p className="text-14 text-muted leading-relaxed mt-2">
                      {getCertDescription(selectedCert)}
                    </p>
                  )}
                </div>

                {/* Close Button */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={handleCloseModal}
                  aria-label={t("certificates.closeLightbox")}
                  className="w-8 h-8 rounded-12 bg-surface border border-border flex items-center justify-center text-text hover:bg-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Large Certificate Preview: object-contain, tidak melebihi tinggi layar */}
              <div className="overflow-hidden rounded-16 border border-border bg-surface p-2 sm:p-4 flex items-center justify-center">
                <Image
                  src={selectedCert.image}
                  alt={getCertAlt(selectedCert)}
                  width={1600}
                  height={1131}
                  priority
                  className="w-full h-auto max-h-[62vh] object-contain rounded-12"
                />
              </div>

              {/* Footer Actions: Unduh PDF & Tutup */}
              <div className="flex items-center justify-between pt-2">
                {selectedCert.pdf ? (
                  <a
                    href={selectedCert.pdf}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-12 bg-surface border border-border text-text text-14 font-medium hover:bg-surface-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                  >
                    <LuArrowDown aria-hidden="true" className="text-16" />
                    <span>{t("certificates.downloadPdf")}</span>
                  </a>
                ) : (
                  <span className="text-12 font-mono text-muted">{t("certificates.verifiedCredential")}</span>
                )}

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                >
                  {t("certificates.close")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
