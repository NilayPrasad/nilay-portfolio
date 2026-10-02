"use client";

import { useTransform, motion, type MotionValue } from "motion/react";

/**
 * §4.2 — the text reveal primitive, welded to scroll position.
 *
 * Every unit rises out of its own mask on entry and is fade-plus-clipped
 * away on exit, which is what produces the "cut" disappearance rather
 * than a soft dissolve. Because each unit reads directly from a scroll
 * MotionValue, the whole thing scrubs backwards as cleanly as forwards.
 *
 * Masking by word (rather than by line) survives any wrap point, so the
 * same component works from 390px to 2560px without hard-coded breaks.
 * Words on one visual line carry adjacent indices, so the stagger still
 * reads as a line-by-line sweep.
 */
export default function ScrollSplit({
  text,
  progress,
  enter,
  exit,
  spread = 0.35,
  by = "char",
  className = "",
}: {
  text: string;
  progress: MotionValue<number>;
  enter: [number, number];
  exit: [number, number];
  /** How much of the window is spent staggering vs. moving. */
  spread?: number;
  by?: "char" | "word";
  className?: string;
}) {
  const words = text.split(" ");
  const total = by === "char" ? text.replace(/ /g, "").length : words.length;
  let i = 0;

  return (
    <span className={className} aria-label={text}>
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
              // Tight leading clips descenders without a little slack.
              paddingBottom: "0.16em",
              marginBottom: "-0.16em",
            }}
          >
            {units.map((unit) => {
              const t = total > 1 ? i++ / (total - 1) : 0;
              return (
                <Unit
                  key={i}
                  text={unit}
                  t={t}
                  progress={progress}
                  enter={enter}
                  exit={exit}
                  spread={spread}
                />
              );
            })}
            {w < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

function Unit({
  text,
  t,
  progress,
  enter,
  exit,
  spread,
}: {
  text: string;
  t: number;
  progress: MotionValue<number>;
  enter: [number, number];
  exit: [number, number];
  spread: number;
}) {
  const eLen = enter[1] - enter[0];
  const xLen = exit[1] - exit[0];

  // Each unit owns a slice of the window, offset by its position — this
  // is what makes the wipe diagonal instead of a flat block move.
  const e0 = enter[0] + t * eLen * spread;
  const e1 = e0 + eLen * (1 - spread);
  const x0 = exit[0] + t * xLen * spread;
  const x1 = x0 + xLen * (1 - spread);

  const stops = [e0, e1, Math.max(x0, e1 + 0.0001), Math.max(x1, e1 + 0.0002)];

  const y = useTransform(progress, stops, ["115%", "0%", "0%", "-118%"]);
  const opacity = useTransform(progress, stops, [1, 1, 1, 0]);

  return (
    <motion.span className="split-unit" style={{ y, opacity }}>
      {text}
    </motion.span>
  );
}
