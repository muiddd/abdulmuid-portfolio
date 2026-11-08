"use client";

import React, { useEffect, useRef, useState } from "react";

interface PlaceholderImageProps {
  src?: string;
  alt?: string;
  label?: string;
  category?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  className?: string;
}

export function PlaceholderImage({
  src,
  alt,
  label = "[PLACEHOLDER] Visual Asset",
  category,
  aspectRatio = "video",
  className = "",
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Images rendered during SSR can fail before React hydrates, in which case
  // the onError handler never fires. Detect that case once mounted so the
  // graceful placeholder is shown instead of a broken image.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      if (img.naturalWidth === 0) {
        setHasError(true);
      } else {
        setIsLoaded(true);
      }
    }
  }, [src]);

  const aspectClass = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  if (src && !hasError) {
    return (
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-24 border border-border bg-surface ${className}`}
      >
        {/* Real image rendered in full natural color. Hidden until it has
            successfully loaded so a missing asset never flashes a broken icon. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt || label}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
        {category && (
          <span className="absolute top-3 left-3 z-10 font-mono text-12 text-muted px-2.5 py-0.5 rounded-999 bg-surface-2/90 backdrop-blur-sm border border-border shadow-sm">
            {category}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-24 border border-border bg-surface flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      aria-label={label}
      role="img"
    >
      {/* Decorative subtle blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-2.5 max-w-[85%]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 text-muted"
          style={{ width: "28px", height: "28px" }}
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>

        {category && category !== label && (
          <span className="font-mono text-12 text-muted px-2.5 py-0.5 rounded-999 bg-surface-2 border border-border">
            {category}
          </span>
        )}

        <span className="text-12 font-medium text-muted line-clamp-2">
          {label}
        </span>
      </div>
    </div>
  );
}
