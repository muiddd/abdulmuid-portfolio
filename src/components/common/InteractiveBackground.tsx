"use client";

import React, { useEffect, useRef } from "react";

/**
 * Site-wide interactive backdrop.
 *
 * A fixed canvas paints a subtle dot grid and lights up the dots near the
 * pointer, with a soft accent glow that eases behind the cursor. Kept simple
 * on purpose:
 *
 * - Dots are drawn once into a single path, so only the ~150 dots inside the
 *   influence radius are painted individually.
 * - The animation loop stops as soon as the glow settles, so an idle page
 *   costs nothing.
 * - Touch devices get the static grid; `prefers-reduced-motion` users get the
 *   static grid with no pointer tracking at all.
 */

const SPACING = 26;
const INFLUENCE_RADIUS = 200;

type Palette = {
  dot: [number, number, number];
  dotAlpha: number;
  active: [number, number, number];
  glow: [number, number, number];
  glowAlpha: number;
};

const PALETTES: Record<"light" | "dark", Palette> = {
  light: {
    dot: [17, 17, 17],
    dotAlpha: 0.13,
    active: [91, 61, 245],
    glow: [91, 61, 245],
    glowAlpha: 0.22,
  },
  dark: {
    dot: [242, 242, 240],
    dotAlpha: 0.1,
    active: [122, 98, 247],
    glow: [122, 98, 247],
    glowAlpha: 0.3,
  },
};

const TAU = Math.PI * 2;

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let dots: Array<{ x: number; y: number }> = [];
    let palette = PALETTES.light;

    // Glow position: `t*` is the pointer target, `g*` the eased position.
    let gx = -9999;
    let gy = -9999;
    let tx = -9999;
    let ty = -9999;
    let strength = 0;
    let targetStrength = 0;
    let raf = 0;

    const readPalette = () => {
      palette = document.documentElement.classList.contains("dark")
        ? PALETTES.dark
        : PALETTES.light;
    };

    const draw = (staticOnly = false) => {
      ctx.clearRect(0, 0, width, height);
      const p = palette;

      // Base grid: one path, one fill.
      ctx.fillStyle = `rgba(${p.dot[0]}, ${p.dot[1]}, ${p.dot[2]}, ${p.dotAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.moveTo(dot.x + 1, dot.y);
        ctx.arc(dot.x, dot.y, 1, 0, TAU);
      }
      ctx.fill();

      if (staticOnly || strength <= 0.005) return;

      // Soft accent glow under the cursor.
      const glowRadius = INFLUENCE_RADIUS * 1.5;
      const gradient = ctx.createRadialGradient(
        gx,
        gy,
        0,
        gx,
        gy,
        glowRadius
      );
      gradient.addColorStop(
        0,
        `rgba(${p.glow[0]}, ${p.glow[1]}, ${p.glow[2]}, ${p.glowAlpha * strength})`
      );
      gradient.addColorStop(
        0.45,
        `rgba(${p.glow[0]}, ${p.glow[1]}, ${p.glow[2]}, ${p.glowAlpha * strength * 0.45})`
      );
      gradient.addColorStop(
        1,
        `rgba(${p.glow[0]}, ${p.glow[1]}, ${p.glow[2]}, 0)`
      );
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(gx, gy, glowRadius, 0, TAU);
      ctx.fill();

      // Dots near the cursor grow and pick up the accent color.
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.x - gx;
        const dy = dot.y - gy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > INFLUENCE_RADIUS) continue;

        const falloff = 1 - distance / INFLUENCE_RADIUS;
        const influence = falloff * falloff * strength;
        if (influence < 0.02) continue;

        const r = Math.round(p.dot[0] + (p.active[0] - p.dot[0]) * influence);
        const g = Math.round(p.dot[1] + (p.active[1] - p.dot[1]) * influence);
        const b = Math.round(p.dot[2] + (p.active[2] - p.dot[2]) * influence);
        const alpha = p.dotAlpha + (0.95 - p.dotAlpha) * influence;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1 + influence * 3, 0, TAU);
        ctx.fill();
      }
    };

    const tick = () => {
      raf = 0;

      gx += (tx - gx) * 0.16;
      gy += (ty - gy) * 0.16;
      strength += (targetStrength - strength) * 0.12;

      const settled =
        Math.abs(tx - gx) < 0.5 &&
        Math.abs(ty - gy) < 0.5 &&
        Math.abs(targetStrength - strength) < 0.01;

      if (settled) {
        gx = tx;
        gy = ty;
        strength = targetStrength;
      }

      draw();

      if (!settled) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Centre the grid so it stays balanced at any viewport size.
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;

      dots = [];
      for (let x = offsetX; x <= width + SPACING; x += SPACING) {
        for (let y = offsetY; y <= height + SPACING; y += SPACING) {
          dots.push({ x, y });
        }
      }

      draw(true);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      // Snap on first contact so the glow does not fly in from a corner.
      if (tx < -1000) {
        gx = event.clientX;
        gy = event.clientY;
      }

      tx = event.clientX;
      ty = event.clientY;
      targetStrength = 1;
      start();
    };

    const handlePointerLeave = () => {
      targetStrength = 0;
      start();
    };

    const handleWindowBlur = () => {
      targetStrength = 0;
      start();
    };

    readPalette();
    resize();

    window.addEventListener("resize", resize);

    const themeObserver = new MutationObserver(() => {
      readPalette();
      start();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const interactive = finePointer.matches && !reducedMotion.matches;

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      window.addEventListener("blur", handleWindowBlur);
      document.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("pointerleave", handlePointerLeave);
      themeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
