"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SiGithub, SiInstagram, SiDribbble } from "react-icons/si";
import { LuLinkedin } from "react-icons/lu";

export function Contact() {
  const { t } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailToCopy = "abdulmuid.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Semua kolom wajib diisi.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || t("contact.form.error"));
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("contact.form.error"));
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 md:py-24 border-t border-border/70 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="font-serif text-28 sm:text-40 leading-[1.12] text-text tracking-[-0.01em]">
            {t("contact.titlePart1")}{" "}
            <span className="text-muted italic">{t("contact.titlePart2")}</span>
          </h2>
          <p className="mt-3.5 text-16 text-muted leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (5 cols): Email, Social Links, and Status */}
          <div className="lg:col-span-5 flex flex-col space-y-7">
            
            {/* Direct Email Card */}
            <div className="bg-surface rounded-24 border border-border p-6 shadow-none space-y-3">
              <span className="font-mono text-12 text-muted uppercase tracking-wider select-none">
                {t("contact.emailLabel")}
              </span>
              <p className="font-sans font-bold text-20 text-text break-all">
                {emailToCopy}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center h-9 px-4 rounded-10 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text select-none"
                >
                  {copied ? `✓ ${t("contact.copiedEmail")}` : t("contact.copyEmail")}
                </button>
                <a
                  href={`mailto:${emailToCopy}`}
                  className="inline-flex items-center justify-center h-9 px-4 rounded-10 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity select-none"
                >
                  Kirim Email ↗
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <span className="font-mono text-12 text-muted uppercase tracking-wider select-none">
                {t("contact.socialsTitle")}
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-12 bg-surface-2 border border-border text-14 font-mono text-muted hover:text-text hover:bg-surface transition-colors select-none"
                >
                  <SiGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-12 bg-surface-2 border border-border text-14 font-mono text-muted hover:text-text hover:bg-surface transition-colors select-none"
                >
                  <LuLinkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-12 bg-surface-2 border border-border text-14 font-mono text-muted hover:text-text hover:bg-surface transition-colors select-none"
                >
                  <SiInstagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-12 bg-surface-2 border border-border text-14 font-mono text-muted hover:text-text hover:bg-surface transition-colors select-none"
                >
                  <SiDribbble className="w-4 h-4" />
                  <span>Dribbble</span>
                </a>
              </div>
            </div>

            {/* Status Dot */}
            <div className="flex items-center gap-2.5 text-14 font-mono text-text pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span>{t("footer.status")}</span>
            </div>

          </div>

          {/* Right Column (7 cols): Contact Form */}
          <div className="lg:col-span-7 bg-surface rounded-24 border border-border p-6 sm:p-8 shadow-none">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Anti-spam honeypot (hidden from human users) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-12 font-mono text-muted">
                  {t("contact.form.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.form.namePlaceholder")}
                  className="w-full h-11 px-4 rounded-12 bg-surface-2 border border-border text-14 text-text placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-text transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-12 font-mono text-muted">
                  {t("contact.form.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="w-full h-11 px-4 rounded-12 bg-surface-2 border border-border text-14 text-text placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-text transition-colors"
                />
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-12 font-mono text-muted">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="w-full p-4 rounded-12 bg-surface-2 border border-border text-14 text-text placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-text transition-colors resize-y min-h-[110px]"
                />
              </div>

              {/* Feedback Alert Status */}
              {status === "success" && (
                <div className="p-3.5 rounded-12 bg-surface-2 border border-border text-14 text-text font-medium">
                  ✓ {t("contact.form.success")}
                </div>
              )}

              {status === "error" && (
                <div className="p-3.5 rounded-12 bg-surface-2 border border-red-300 dark:border-red-800 text-14 text-red-600 dark:text-red-400">
                  ✕ {errorMessage || t("contact.form.error")}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-7 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
              >
                {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
