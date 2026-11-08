"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LuMail, LuPhone, LuCopy, LuCheck, LuLinkedin } from "react-icons/lu";
import { SiGithub, SiInstagram } from "react-icons/si";
import { HiHeart } from "react-icons/hi2";

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = t("contact.emailAddress") || "muidabdulmuid99@gmail.com";
  const phone = t("contact.phoneNumber") || "+62 857 3001 3648";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is blocked
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const socials = [
    {
      name: "Instagram",
      href: t("contact.socials.instagram") || "https://www.instagram.com/muiddd__/",
      icon: SiInstagram,
    },
    {
      name: "GitHub",
      href: t("contact.socials.github") || "https://github.com/muiddd",
      icon: SiGithub,
    },
    {
      name: "LinkedIn",
      href: t("contact.socials.linkedin") || "https://www.linkedin.com/in/abdul-muid-67531b335",
      icon: LuLinkedin,
    },
  ];

  const cleanPhone = phone.replace(/[^0-9]/g, "");

  return (
    <footer id="contact" className="relative w-full py-16 md:py-24 border-t border-border/70 scroll-mt-28 bg-bg transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: sama dengan section lain (serif + muted italic) */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <h2 className="font-serif text-28 sm:text-40 leading-[1.12] text-text tracking-[-0.01em]">
            {t("contact.titlePart1")}{" "}
            <span className="text-muted italic">{t("contact.titlePart2")}</span>
          </h2>
          <p className="mt-3.5 text-16 text-muted leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* 2 Contact Cards: Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

          {/* Email Card */}
          <div className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-24 bg-surface border border-border hover:border-text/30 transition-colors">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-12 bg-surface-2 border border-border/80 flex items-center justify-center shrink-0 text-muted group-hover:text-text transition-colors">
                <LuMail className="text-20" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-12 uppercase tracking-wider text-muted">
                  {t("contact.emailLabel")}
                </span>
                <a
                  href={`mailto:${email}`}
                  className="block mt-0.5 text-14 sm:text-16 font-medium text-text break-all hover:text-muted transition-colors focus:outline-none focus-visible:underline"
                >
                  {email}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-12 font-mono text-12 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text ${
                copied
                  ? "bg-text text-bg border border-text font-semibold"
                  : "bg-surface-2 text-muted hover:text-text border border-border"
              }`}
              aria-label={copied ? t("contact.copiedEmail") : t("contact.copyEmail")}
            >
              {copied ? (
                <>
                  <LuCheck className="text-14" aria-hidden="true" />
                  <span>{t("contact.copiedEmail")}</span>
                </>
              ) : (
                <>
                  <LuCopy className="text-12" aria-hidden="true" />
                  <span>{t("contact.copyEmail")}</span>
                </>
              )}
            </button>
          </div>

          {/* Phone Card */}
          <div className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-24 bg-surface border border-border hover:border-text/30 transition-colors">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-12 bg-surface-2 border border-border/80 flex items-center justify-center shrink-0 text-muted group-hover:text-text transition-colors">
                <LuPhone className="text-20" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-12 uppercase tracking-wider text-muted">
                  {t("contact.phoneLabel")}
                </span>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="block mt-0.5 text-14 sm:text-16 font-medium text-text truncate hover:text-muted transition-colors focus:outline-none focus-visible:underline"
                >
                  {phone}
                </a>
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center h-9 px-3 rounded-12 font-mono text-12 bg-surface-2 hover:text-text text-muted border border-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
              aria-label="WhatsApp"
            >
              {t("contact.phoneAction")}
            </a>
          </div>

        </div>

        {/* Follow me on */}
        <div className="mt-8 sm:mt-10 flex items-center gap-3.5 flex-wrap">
          <span className="text-14 text-muted">
            {t("contact.followMe")}
          </span>
          <div className="flex items-center gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-12 bg-surface border border-border flex items-center justify-center text-muted hover:text-text hover:border-text/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                >
                  <Icon className="text-16" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Start Your Project CTA Button */}
        <div className="mt-8 sm:mt-10">
          <a
            href={`mailto:${email}?subject=Project%20Inquiry%20-%20Abdul%20Muid`}
            className="inline-flex items-center justify-center gap-2.5 h-11 px-6 rounded-12 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
          >
            <LuMail className="text-16" aria-hidden="true" />
            <span>{t("contact.startProject")}</span>
          </a>
        </div>

        {/* Bottom Bar: Copyright & Built with Next.js */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-14 text-muted">
          <p>{t("contact.copyright")}</p>
          <p className="inline-flex items-center gap-1.5">
            <span>{t("contact.builtWithPrefix")}</span>
            <HiHeart className="text-red-500 inline text-14 shrink-0" aria-label="love" />
            <span>{t("contact.builtWithSuffix")}</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
