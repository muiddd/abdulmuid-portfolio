"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { projects, Project } from "../../../content/projects";

// Canvas layout positions for each scattered frame on the desktop 2D canvas
const canvasPositions = [
  {
    top: 100,
    left: 120,
    width: 440,
    aspect: "video" as const,
  },
  {
    top: 60,
    left: 640,
    width: 320,
    aspect: "portrait" as const,
  },
  {
    top: 480,
    left: 280,
    width: 460,
    aspect: "video" as const,
  },
  {
    top: 360,
    left: 1020,
    width: 380,
    aspect: "square" as const,
  },
];

export function SelectedWork() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // View mode: 'canvas' or 'list'
  const [viewMode, setViewMode] = useState<"canvas" | "list">("canvas");

  // Zoom control: range 60% (0.6) to 140% (1.4)
  const [zoom, setZoom] = useState(1);

  // Drag hint visibility: disappears after user's first drag
  const [hasDragged, setHasDragged] = useState(false);

  // Canvas bounds ref
  const containerRef = useRef<HTMLDivElement>(null);
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  // Zoom helpers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(1.4, Number((prev + 0.1).toFixed(1))));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.6, Number((prev - 0.1).toFixed(1))));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  // Safe navigation that distinguishes drag from click
  const handlePointerDown = (e: React.PointerEvent) => {
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const dist = Math.hypot(
      e.clientX - dragOriginRef.current.x,
      e.clientY - dragOriginRef.current.y
    );
    if (dist > 6) {
      isDraggingRef.current = true;
    }
  };

  const handleCardClick = (slug: string) => {
    if (!isDraggingRef.current) {
      router.push(`/projects/${slug}`);
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, slug: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/projects/${slug}`);
    }
  };

  return (
    <section id="projects" className="relative w-full py-16 md:py-24 border-t border-border scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Sevora label + Instrument Serif with muted emphasis */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-2.5">
            <h2 className="font-serif text-28 sm:text-40 tracking-[-0.01em] text-text leading-[1.12]">
              {t("projects.titlePart1")}{" "}
              <span className="text-muted italic">{t("projects.titlePart2")}</span>
            </h2>
            <p className="text-16 text-muted max-w-xl leading-relaxed">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* Controls: Zoom & View as list/canvas toggle */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            {/* Zoom Controls (Active in canvas view on desktop) */}
            {viewMode === "canvas" && (
              <div className="hidden md:flex items-center bg-surface-2 border border-border rounded-12 p-1 text-12 font-mono shadow-sm">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.6}
                  className="w-7 h-7 flex items-center justify-center rounded-8 text-text hover:bg-surface disabled:opacity-40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                  aria-label={t("selectedWork.zoomOut")}
                  title={t("selectedWork.zoomOut")}
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2 py-1 text-muted hover:text-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                  title={t("selectedWork.resetZoom")}
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 1.4}
                  className="w-7 h-7 flex items-center justify-center rounded-8 text-text hover:bg-surface disabled:opacity-40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                  aria-label={t("selectedWork.zoomIn")}
                  title={t("selectedWork.zoomIn")}
                >
                  +
                </button>
              </div>
            )}

            {/* Toggle View Button: List vs Canvas */}
            <button
              type="button"
              onClick={() => setViewMode((prev) => (prev === "canvas" ? "list" : "canvas"))}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-12 bg-surface-2 border border-border text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
              aria-label={viewMode === "canvas" ? t("selectedWork.viewAsList") : t("selectedWork.viewAsCanvas")}
            >
              {viewMode === "canvas" ? (
                <>
                  {/* List / Grid icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-muted"
                    aria-hidden="true"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  <span>{t("selectedWork.viewAsList")}</span>
                </>
              ) : (
                <>
                  {/* Canvas icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-muted"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M9 21H3v-6" />
                    <path d="M21 3l-7 7" />
                    <path d="M3 21l7-7" />
                  </svg>
                  <span>{t("selectedWork.viewAsCanvas")}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Content: Either Drag Canvas or List Grid */}
        {viewMode === "canvas" ? (
          <div>
            {/* Desktop Draggable 2D Canvas (Hidden on mobile) */}
            <div
              ref={containerRef}
              className="relative hidden md:block w-full h-[620px] lg:h-[700px] overflow-hidden rounded-24 border border-border bg-surface cursor-grab active:cursor-grabbing select-none"
              style={{
                backgroundImage: "radial-gradient(var(--dot-color) 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* Drag Hint (Fades out after first drag) */}
              <AnimatePresence>
                {!hasDragged && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-4 z-30 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-999 bg-surface-2/95 border border-border text-12 font-mono text-muted shadow-sm backdrop-blur-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span>{t("selectedWork.dragInstruction")}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Framer Motion Draggable Plane */}
              <motion.div
                drag={!shouldReduceMotion}
                dragConstraints={containerRef}
                dragElastic={0.08}
                onDragStart={() => setHasDragged(true)}
                className="relative w-[1600px] h-[950px]"
                style={{
                  scale: zoom,
                  transformOrigin: "center center",
                }}
              >
                {projects.map((project, idx) => {
                  const pos = canvasPositions[idx % canvasPositions.length];
                  return (
                    <motion.div
                      key={project.slug}
                      role="button"
                      tabIndex={0}
                      aria-label={`${project.title[lang]} · ${project.category[lang]}`}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onClick={() => handleCardClick(project.slug)}
                      onKeyDown={(e) => handleCardKeyDown(e, project.slug)}
                      className="absolute group focus:outline-none focus-visible:ring-2 focus-visible:ring-text rounded-24 p-3 bg-surface-2/95 hover:bg-surface-2 border border-border shadow-sm hover:shadow-md transition-all duration-200"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        width: pos.width,
                      }}
                      whileHover={shouldReduceMotion ? {} : { y: -4 }}
                    >
                      {/* Frame Mono Label (Ilse style: "Title · Category") */}
                      <div className="flex items-center justify-between gap-2 pb-2 px-1 text-12 font-mono text-muted">
                        <span className="truncate">
                          {project.title[lang]} · {project.category[lang]}
                        </span>
                        <span className="shrink-0 text-12 opacity-60 font-mono">
                          {project.year}
                        </span>
                      </div>

                      {/* Visual Thumbnail */}
                      <div className="overflow-hidden rounded-16 border border-border/80">
                        <PlaceholderImage
                          aspectRatio={pos.aspect}
                          label={project.title[lang]}
                          category={project.category[lang]}
                          className="w-full"
                        />
                      </div>

                      {/* Card Info Details */}
                      <div className="pt-3 px-1 space-y-1">
                        <h3 className="font-sans font-bold text-16 text-text group-hover:text-muted transition-colors truncate">
                          {project.title[lang]}
                        </h3>
                        <p className="text-12 text-muted line-clamp-1">
                          {project.summary[lang]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Mobile Fallback (< 768px): Horizontal Swipe Carousel with Snap */}
            <div className="block md:hidden space-y-4">
              <div className="flex items-center justify-between text-12 font-mono text-muted px-1">
                <span>{t("selectedWork.dragInstruction")}</span>
                <span>{projects.length} Proyek</span>
              </div>

              <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {projects.map((project) => (
                  <div
                    key={project.slug}
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/projects/${project.slug}`)}
                    onKeyDown={(e) => handleCardKeyDown(e, project.slug)}
                    className="snap-center shrink-0 w-[84vw] max-w-[340px] rounded-24 p-3.5 bg-surface-2 border border-border shadow-sm flex flex-col gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
                  >
                    <div className="flex items-center justify-between text-12 font-mono text-muted">
                      <span className="truncate">{project.category[lang]}</span>
                      <span>{project.year}</span>
                    </div>

                    <PlaceholderImage
                      aspectRatio="video"
                      label={project.title[lang]}
                      category={project.category[lang]}
                      className="w-full rounded-16"
                    />

                    <div className="space-y-1">
                      <h3 className="font-sans font-bold text-16 text-text">
                        {project.title[lang]}
                      </h3>
                      <p className="text-14 text-muted line-clamp-2 leading-relaxed">
                        {project.summary[lang]}
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-12 font-medium">
                      <span className="text-text group-hover:underline">
                        {t("selectedWork.viewDetails")} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* List / Grid View (Active when user clicks "View as list") */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/projects/${project.slug}`)}
                onKeyDown={(e) => handleCardKeyDown(e, project.slug)}
                className="group rounded-24 p-5 sm:p-6 bg-surface-2 border border-border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-text"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-12 font-mono text-muted">
                    <span className="px-2.5 py-0.5 rounded-999 bg-surface border border-border">
                      {project.category[lang]}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-sans font-bold text-20 text-text group-hover:text-muted transition-colors">
                    {project.title[lang]}
                  </h3>

                  <p className="text-14 text-muted line-clamp-2 leading-relaxed">
                    {project.summary[lang]}
                  </p>
                </div>

                <div className="space-y-4">
                  <PlaceholderImage
                    aspectRatio="video"
                    label={project.title[lang]}
                    category={project.category[lang]}
                    className="w-full rounded-16"
                  />

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-8 bg-surface text-12 font-mono text-muted border border-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center text-14 font-medium text-text group-hover:underline">
                    <span>{t("selectedWork.viewDetails")}</span>
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA to View All Projects */}
        <div className="pt-10 sm:pt-14 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center h-11 px-6 rounded-12 border border-border bg-surface-2 text-text text-14 font-medium hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text shadow-sm"
          >
            {t("projects.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export const Projects = SelectedWork;

