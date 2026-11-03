"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { certificates, CertificateItem, CertificateCategory } from "../../../content/certificates";

interface CertificatesProps {
  limit?: number;
  showViewAll?: boolean;
}

export function Certificates({ limit = 6, showViewAll = true }: CertificatesProps) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Accessible focus restoration ref
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: "all", label: t("certificates.categories.all") },
    { id: "Development", label: t("certificates.categories.development") },
    { id: "Design", label: t("certificates.categories.design") },
    { id: "Lainnya", label: t("certificates.categories.other") },
  ];

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

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        handleCloseModal();
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
    <section id="certificates" className="relative w-full py-16 md:py-24 border-t border-border/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="font-serif text-28 sm:text-40 leading-[1.12] text-text tracking-[-0.01em]">
              {t("certificates.titlePart1")}{" "}
              <span className="text-muted italic">{t("certificates.titlePart2")}</span>
            </h2>
            <p className="mt-3.5 text-16 text-muted leading-relaxed">
              {t("certificates.subtitle")}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {categories.map((cat) => {
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
          </div>
        </div>

        {/* Certificates Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayItems.map((cert) => (
            <div
              key={cert.id}
              role="button"
              tabIndex={0}
              onClick={(e) => handleOpenModal(cert, e)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenModal(cert, e);
                }
              }}
              className="group bg-surface rounded-24 border border-border p-4 sm:p-5 shadow-none hover:border-text/30 transition-all duration-200 cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
              aria-label={`Buka pratinjau ${cert.title}`}
            >
              <div>
                {/* Thumbnail Preview with PlaceholderImage */}
                <div className="overflow-hidden rounded-16 border border-border/80 mb-4 bg-surface-2">
                  <PlaceholderImage
                    src={cert.image}
                    alt={cert.title}
                    aspectRatio="video"
                    category={cert.category}
                    label={cert.title}
                    className="w-full group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-12 font-mono text-muted mb-2">
                  <span className="px-2 py-0.5 rounded-6 bg-surface-2 border border-border/80">
                    {cert.category}
                  </span>
                  <span>{cert.date}</span>
                </div>

                {/* Certificate Title */}
                <h3 className="font-sans font-bold text-16 text-text leading-snug group-hover:text-muted transition-colors mb-1.5">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="font-mono text-12 text-muted line-clamp-1">
                  {cert.issuer}
                </p>
              </div>

              {/* Action Hint */}
              <div className="pt-4 mt-2 border-t border-border/60 flex items-center justify-between text-12 font-medium text-text">
                <span className="group-hover:underline">Pratinjau sertifikat</span>
                <span className="text-14 font-mono group-hover:translate-x-0.5 transition-transform">↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/experience"
              className="inline-flex items-center justify-center h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
            >
              {t("certificates.viewAll")}
            </Link>
          </div>
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
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-2xl bg-surface-2 rounded-24 border border-border p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-12 text-muted uppercase tracking-wider px-2 py-0.5 rounded-6 bg-surface border border-border">
                    {selectedCert.category}
                  </span>
                  <h3 id="modal-cert-title" className="font-sans font-bold text-20 text-text mt-2">
                    {selectedCert.title}
                  </h3>
                  <p className="font-mono text-14 text-muted">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={handleCloseModal}
                  aria-label={t("certificates.closeLightbox")}
                  className="w-8 h-8 rounded-10 bg-surface border border-border flex items-center justify-center text-text hover:bg-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                >
                  ✕
                </button>
              </div>

              {/* Large Certificate Preview */}
              <div className="overflow-hidden rounded-16 border border-border bg-surface">
                <PlaceholderImage
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  aspectRatio="video"
                  category={selectedCert.category}
                  label={selectedCert.title}
                  className="w-full"
                />
              </div>

              {/* Footer Links in Modal */}
              <div className="flex items-center justify-between pt-2">
                {selectedCert.credentialUrl ? (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-14 font-medium text-text hover:underline"
                  >
                    <span>{t("certificates.viewCredential")}</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <span className="text-12 font-mono text-muted">Kredensial terverifikasi</span>
                )}

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-10 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

