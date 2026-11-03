"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const profilePhotoSrc = "/images/profile.png";

  const [isPointerInside, setIsPointerInside] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(0, { stiffness: 70, damping: 18, mass: 0.6 });
  const parallaxY = useSpring(0, { stiffness: 70, damping: 18, mass: 0.6 });

  const spotlightX = useSpring(pointerX, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const spotlightY = useSpring(pointerY, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const spotlightLeft = useTransform(spotlightX, (value) => value - 320);
  const spotlightTop = useTransform(spotlightY, (value) => value - 320);

  const photoX = useTransform(parallaxX, (value) => value * -0.6);
  const photoY = useTransform(parallaxY, (value) => value * -0.6);
  const nameX = useTransform(parallaxX, (value) => value * 1.15);
  const nameY = useTransform(parallaxY, (value) => value * 1.15);
  const orbX = useTransform(parallaxX, (value) => value * -2.4);
  const orbY = useTransform(parallaxY, (value) => value * -1.6);
  const orb2X = useTransform(parallaxX, (value) => value * 1.6);
  const orb2Y = useTransform(parallaxY, (value) => value * 1.2);

  const updatePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    pointerX.set(x);
    pointerY.set(y);
    parallaxX.set((x / rect.width - 0.5) * 12);
    parallaxY.set((y / rect.height - 0.5) * 12);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    setIsPointerInside(true);
  };

  const handlePointerLeave = () => {
    setIsPointerInside(false);
    parallaxX.set(0);
    parallaxY.set(0);
  };

  return (
    <section
      id="hero"
      onPointerMove={updatePointer}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative isolate w-full pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28 overflow-visible scroll-mt-16"
    >
      {/* Interactive hero backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-60 dark:opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 72% 62% at 42% 38%, black 18%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 62% at 42% 38%, black 18%, transparent 78%)",
          }}
        />

        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute -left-40 top-8 h-[440px] w-[440px] rounded-full bg-accent/[0.07] blur-[90px] dark:bg-accent/[0.12]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-text/[0.04] blur-[100px] dark:bg-text/[0.07]"
        />

        <div className="absolute left-1/2 top-[46%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/80 lg:left-[32%]" />
        <div className="absolute left-1/2 top-[46%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/50 lg:left-[32%]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPointerInside && !shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ x: spotlightLeft, y: spotlightTop }}
          className="absolute left-0 top-0 h-[640px] w-[640px] rounded-full bg-accent/[0.10] blur-[90px] dark:bg-accent/[0.16]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left side for Photo + Overlapping Card, Right side for Info & CTAs */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (lg:col-span-6): Photo Frame with Canvas Outlines & Floating Name Card */}
          <div className="lg:col-span-6 relative w-full max-w-sm sm:max-w-md mx-auto lg:max-w-[430px]">
            {/* Portrait Frame Container */}
            <motion.div style={{ x: photoX, y: photoY }} className="relative pt-6 group/photo">
              {/* Attached Purple Tag on top-left of photo */}
              <div className="absolute top-0 left-0 bg-accent text-white font-mono text-12 font-semibold px-2 py-0.5 select-none z-20">
                {t("hero.portraitBadge")}
              </div>

              {/* Photo Box with Canvas Outline & 4 Corner Handles */}
              <div className="relative border border-accent bg-surface select-none transition-shadow duration-300 group-hover/photo:shadow-[0_24px_80px_-36px_rgba(0,0,0,0.45)]">
                {/* Framer Canvas Handles (HANYA 4 SUDUT: Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
                <span className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/photo:scale-125 group-hover/photo:bg-accent" />
                <span className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/photo:scale-125 group-hover/photo:bg-accent" />
                <span className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/photo:scale-125 group-hover/photo:bg-accent" />
                <span className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/photo:scale-125 group-hover/photo:bg-accent" />

                {/* Actual Image or Placeholder (Sharp corners, border-none) */}
                <PlaceholderImage
                  src={profilePhotoSrc}
                  alt="Abdul Muid - Portrait"
                  aspectRatio="portrait"
                  category=""
                  label={t("hero.portraitBadge")}
                  className="w-full border-none rounded-none shadow-none"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                style={{ x: nameX, y: nameY }}
                className="group/name relative mt-6 lg:mt-0 lg:absolute lg:top-[16%] lg:left-[90%] z-30 inline-block"
              >
                {/* Purple Tag on top-left of name card */}
                <div className="absolute -top-[21px] left-0 bg-accent text-white font-mono text-12 font-semibold px-2 py-0.5 select-none z-20 transition-transform duration-300 group-hover/name:translate-x-0.5">
                  {t("hero.roleBadge")}
                </div>

                {/* Name Box with Canvas Outline & 4 Corner Handles */}
                <div className="relative border border-accent bg-surface-2 shadow-lg px-6 py-4 sm:px-8 sm:py-5 lg:px-9 lg:py-5 select-none transition-all duration-300 group-hover/name:-translate-y-1 group-hover/name:shadow-xl">
                  {/* Framer Canvas Handles (HANYA 4 SUDUT: Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
                  <span className="absolute -top-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/name:scale-125 group-hover/name:bg-accent" />
                  <span className="absolute -top-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/name:scale-125 group-hover/name:bg-accent" />
                  <span className="absolute -bottom-[3.5px] -left-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/name:scale-125 group-hover/name:bg-accent" />
                  <span className="absolute -bottom-[3.5px] -right-[3.5px] w-[7px] h-[7px] bg-white border border-accent z-20 pointer-events-none transition-all duration-300 group-hover/name:scale-125 group-hover/name:bg-accent" />

                  <h1 className="font-sans font-bold text-40 lg:text-64 tracking-[-0.035em] leading-none text-text whitespace-nowrap">
                    {t("hero.name")}
                  </h1>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column (lg:col-span-6): Position Statement, Status & CTAs */}
          {/* Diposisikan di paruh bawah (lg:pt-60 xl:pt-64) agar tidak sejajar/bertabrakan dengan kartu nama */}
          <div className="lg:col-span-6 flex flex-col justify-end pt-8 lg:pt-60 xl:pt-64 lg:pl-12 space-y-6">
            {/* Bio / Position Statement */}
            <p className="text-16 text-text leading-relaxed max-w-md">
              {t("hero.statement")}
            </p>

            {/* Status with purple dot (Ilse Moreno clean style) */}
            <div className="flex items-center gap-2.5 text-14 text-text">
              <span
                className="relative flex h-2 w-2 shrink-0"
                style={{ width: "8px", height: "8px" }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>{t("hero.badge")}</span>
            </div>

            {/* Two CTA Buttons: Say hello (Black) & See the work (Light) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/contact"
                className="group/cta inline-flex items-center justify-center h-10 px-5 rounded-8 bg-text text-bg text-14 font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
              >
                <span>{t("hero.ctaContact")}</span>
                <span className="ml-1.5 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                  ↗
                </span>
              </Link>

              <Link
                href="#projects"
                className="group/cta inline-flex items-center justify-center h-10 px-5 rounded-8 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
              >
                <span>{t("hero.ctaWork")}</span>
                <span className="ml-1.5 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
