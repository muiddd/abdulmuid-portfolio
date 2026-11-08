"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type CursorMode = "default" | "pointer" | "text";

/**
 * Anything that behaves like a click target gets the hand cursor. Keep this
 * list generous: cards and chips in this project are often plain elements with
 * `role="button"` or Tailwind's `cursor-pointer` rather than real buttons.
 */
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "label",
  "select",
  '[role="button"]',
  '[role="link"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[role="option"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="treeitem"]',
  'input[type="submit"]',
  'input[type="button"]',
  'input[type="reset"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  'input[type="range"]',
  'input[type="file"]',
  'input[type="color"]',
  "video[controls]",
  "audio[controls]",
  ".cursor-pointer",
].join(",");

const TEXT_SELECTOR =
  'input:not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]), textarea, [contenteditable="true"], [contenteditable=""]';

/* Lucide "mouse-pointer-2": a clean single-shape pointer, tip at (4, 4). */
const ARROW_PATH =
  "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z";

/* Bootstrap "hand-index-fill": solid silhouette, fingertip at (6.75, 0) of 16. */
const HAND_PATH =
  "M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046z";

/**
 * Multiplayer-style cursor: a yellow arrow with a dark outline plus a small
 * name pill. Over anything clickable it turns into a pointing hand so the
 * affordance still reads even though the native cursor is hidden.
 *
 * Position is written straight to the DOM inside a rAF callback, so pointer
 * movement never triggers a React render — only mode changes do. Touch
 * devices and reduced-motion users keep the native cursor.
 */
export function CustomCursor() {
  const { t } = useLanguage();
  const cursorRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<CursorMode>("default");

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let frame = 0;
    let x = -100;
    let y = -100;
    let lastTarget: EventTarget | null = null;

    const paint = () => {
      frame = 0;
      const el = cursorRef.current;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const resolveMode = (target: EventTarget | null): CursorMode => {
      const element = target instanceof Element ? target : null;
      if (element?.closest(TEXT_SELECTOR)) return "text";
      if (element?.closest(INTERACTIVE_SELECTOR)) return "pointer";
      return "default";
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);

      setVisible(true);

      if (event.target === lastTarget) return;
      lastTarget = event.target;

      const next = resolveMode(event.target);
      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerenter", show);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", show);
      document.documentElement.classList.remove("has-custom-cursor");
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  const isText = mode === "text";
  const isPointer = mode === "pointer";
  const scale = pressed ? 0.9 : 1;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 140ms ease" }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          transition: "transform 120ms ease",
        }}
      >
        {isText ? (
          /* I-beam for text fields */
          <span
            className="absolute block w-[2px] rounded-full bg-[#FFD84D]"
            style={{
              left: "-1px",
              top: "-10px",
              height: "20px",
              boxShadow: "0 0 0 1px rgba(17,17,17,0.9)",
            }}
          />
        ) : isPointer ? (
          /* Pointing hand over anything clickable; hotspot = fingertip */
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            className="absolute block"
            style={{
              left: "-10.1px",
              top: "-0.4px",
              filter: "drop-shadow(0 1px 1.5px rgba(17,17,17,0.28))",
            }}
          >
            <path
              d={HAND_PATH}
              fill="#FFD84D"
              stroke="#111111"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* Default arrow; hotspot = tip at (4, 4) of the 24px viewBox */
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="absolute block"
            style={{
              left: "-3.7px",
              top: "-3.7px",
              filter: "drop-shadow(0 1px 1.5px rgba(17,17,17,0.28))",
            }}
          >
            <path
              d={ARROW_PATH}
              fill="#FFD84D"
              stroke="#111111"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Name tag, mirrors the Figma multiplayer cursor */}
        {!isText && (
          <span
            className="absolute whitespace-nowrap rounded-full bg-[#FFD84D] font-sans text-[10px] font-semibold leading-[14px] text-[#111111]"
            style={{
              left: "13px",
              top: isPointer ? "21px" : "17px",
              padding: "1px 7px",
              boxShadow: "0 1px 2px rgba(17,17,17,0.18)",
            }}
          >
            {t("cursor.label", "You")}
          </span>
        )}
      </div>
    </div>
  );
}
