"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

/** The one easing curve used site-wide. Matches --ease in globals.css. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ──────────────────────────────────────────────────────────────────────
   SplitText — per-character mask reveal.

   Words are the mask boundary rather than lines: a word can't be split
   across a line break, so `overflow:hidden` per word behaves like per-line
   masking while surviving any wrap point. Characters inside translate up
   from below their own mask on a stagger.
   ────────────────────────────────────────────────────────────────────── */
export function SplitText({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.014,
  duration = 0.9,
  by = "char",
  once = true,
  amount = 0.5,
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  by?: "char" | "word";
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount });
  const words = children.split(" ");
  const MotionTag = motion[Tag] as typeof motion.span;

  let unitIndex = 0;

  return (
    <MotionTag ref={ref} className={className} aria-label={children}>
      {words.map((word, w) => {
        const units = by === "char" ? Array.from(word) : [word];
        return (
          <span
            key={`${word}-${w}`}
            aria-hidden
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              // Descenders and tight leading need a little breathing room or
              // the mask clips the tail of a "g".
              paddingBottom: "0.12em",
              marginBottom: "-0.12em",
            }}
          >
            {units.map((unit, i) => {
              const idx = unitIndex++;
              return (
                <motion.span
                  key={i}
                  className="split-unit"
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : { y: "110%" }}
                  transition={{
                    duration,
                    ease: EASE,
                    delay: delay + idx * stagger,
                  }}
                >
                  {unit}
                </motion.span>
              );
            })}
            {w < words.length - 1 && (
              <motion.span
                className="split-unit"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : { y: "110%" }}
                transition={{
                  duration,
                  ease: EASE,
                  delay: delay + unitIndex++ * stagger,
                }}
              >
                &nbsp;
              </motion.span>
            )}
          </span>
        );
      })}
    </MotionTag>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Reveal — the generic fade-and-rise for anything that isn't display type.
   ────────────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 1,
  amount = 0.3,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   RuleDraw — a hairline that draws in from the left.
   ────────────────────────────────────────────────────────────────────── */
export function RuleDraw({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  return (
    <div ref={ref} className={className} style={{ height: 1, width: "100%", overflow: "hidden" }}>
      <motion.div
        style={{ height: 1, width: "100%", background: "currentColor", opacity: 0.18, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   ParallaxMedia — image drifts against the scroll inside a fixed frame,
   with an optional scale ramp. `range` is the drift in percent of height.
   ────────────────────────────────────────────────────────────────────── */
export function ParallaxMedia({
  src,
  alt = "",
  className = "",
  range = 14,
  scaleFrom = 1.18,
  scaleTo = 1,
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  range?: number;
  scaleFrom?: number;
  scaleTo?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-range}%`, `${range}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom, scaleTo, scaleFrom]);

  return (
    <div ref={ref} className={`media ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        style={{
          y: reduce ? 0 : y,
          scale: reduce ? 1 : scale,
          // Oversized by exactly the drift on each edge, so the travel can
          // never uncover the frame.
          height: `${100 + range * 2}%`,
          top: `${-range}%`,
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Counter — digits roll up to the target value, Framer's odometer effect.
   ────────────────────────────────────────────────────────────────────── */
export function Counter({
  value,
  suffix = "",
  className = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const digits = String(value).split("");

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", alignItems: "baseline" }}>
      {digits.map((d, i) => (
        <Digit key={i} digit={Number(d)} active={inView} duration={duration} delay={i * 0.08} />
      ))}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

function Digit({
  digit,
  active,
  duration,
  delay,
}: {
  digit: number;
  active: boolean;
  duration: number;
  delay: number;
}) {
  // A 0–9 strip translated so the target digit lands in the window.
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1em",
        lineHeight: 1,
        verticalAlign: "baseline",
      }}
    >
      <motion.span
        style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
        initial={{ y: "0%" }}
        animate={active ? { y: `-${digit * 10}%` } : { y: "0%" }}
        transition={{ duration, ease: EASE, delay }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} style={{ height: "1em", display: "block" }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Marquee — seamless horizontal loop used for the wordmark bands.
   ────────────────────────────────────────────────────────────────────── */
export function Marquee({
  children,
  speed = 28,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* Re-exports so sections don't each import from motion/react directly. */
export { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent, useReducedMotion };
export type { MotionValue };
export { useState, useRef };
