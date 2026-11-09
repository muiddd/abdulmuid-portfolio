"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variant,
  type Variants,
} from "framer-motion";
import { useEntrance } from "@/context/EntranceContext";

type RevealTag =
  | "div"
  | "section"
  | "header"
  | "footer"
  | "article"
  | "aside"
  | "li"
  | "span"
  | "p"
  | "ul"
  | "nav"
  | "figure"
  | "h1"
  | "h2"
  | "h3";

type RevealRestProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

interface RevealProps extends RevealRestProps {
  children: React.ReactNode;
  as?: RevealTag;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  duration?: number;
  /** Distance travelled on the Y axis (px). */
  y?: number;
  /** Distance travelled on the X axis (px). */
  x?: number;
  /** Starting scale. 1 disables the scale effect. */
  scale?: number;
  /** Starting blur in px. 0 disables the blur effect. */
  blur?: number;
  once?: boolean;
  /** IntersectionObserver root margin, e.g. "-80px". */
  margin?: string;
}

/**
 * Entrance + scroll reveal wrapper.
 *
 * Content stays hidden until both:
 *   1. the page is ready (preloader finished), and
 *   2. the element has scrolled into view.
 *
 * The combination means the first screen animates as the preloader lifts,
 * while everything below the fold animates on scroll. Respects
 * `prefers-reduced-motion`, and the `<noscript>` fallback in the root layout
 * keeps content visible when JavaScript is disabled.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
  scale = 1,
  blur = 0,
  once = true,
  margin = "-70px",
  className,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once,
    margin: margin as UseInViewOptions["margin"],
    amount: 0.12,
  });
  const { ready } = useEntrance();
  const reduceMotion = useReducedMotion();

  const MotionTag = motion[as] as typeof motion.div;

  const hidden: Variant = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 0,
        y,
        x,
        scale,
        ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
      };

  const visible: Variant = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        ...(blur > 0 ? { filter: "blur(0px)" } : {}),
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      };

  const variants: Variants = { hidden, visible };
  const show = ready && inView;

  return (
    <MotionTag
      ref={ref}
      data-reveal=""
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
