"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "./motion";
import ScrollSplit from "./ScrollSplit";
import ShaderField from "./ShaderField";
import FitText from "./FitText";
import { heroProgress, heroMounted } from "@/lib/heroProgress";
import { site, heroLabel, heroStatements } from "@/lib/site";

/**
 * Hero and Statement as one pinned, scroll-scrubbed timeline.
 *
 *   0.00–0.40  black block translateY 0 → -100%
 *   0.15–0.30  label rises in
 *   0.20–0.42  statement 1 rises word-by-word out of its masks
 *   0.56–0.74  statement 1 travels up and out — the cut
 *   0.62–0.86  statement 2 rises into the same position
 *
 * The 25% vertical rule runs the full height of the stage and is the
 * alignment spine for the whole section: the nav email, the right meta
 * label, the statement label, and the statement itself all start on it.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(p, "change", (v) => heroProgress.set(v));
  useEffect(() => {
    heroMounted.set(1);
    return () => {
      heroMounted.set(0);
      heroProgress.set(0);
    };
  }, []);

  const blockY = useTransform(p, [0, 0.4], ["0%", "-100%"]);

  const labelOpacity = useTransform(p, [0.15, 0.3, 0.56, 0.74], [0, 1, 1, 0]);
  const labelY = useTransform(p, [0.15, 0.3], [16, 0]);

  if (reduce) return <HeroStatic />;

  return (
    <section ref={ref} className="relative h-[320svh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        <ShaderField />
        <div className="absolute inset-0 bg-black/45" />

        {/* The spine. Sits above the field, below the block, and runs the
            full height of the stage rather than stopping with the block. */}
        <div className="absolute bottom-0 left-1/4 top-0 z-[15] w-px bg-white/14" />

        {/* ── Statements, left-aligned to the spine ───────────────── */}
        <div className="absolute inset-0 z-10 text-white">
          <motion.p
            className="t-body absolute left-6 top-28 m-0 max-w-[11rem] text-white/85 md:left-[calc(25%+12px)] md:top-32 md:max-w-[13rem]"
            style={{ opacity: labelOpacity, y: labelY }}
          >
            {heroLabel}
          </motion.p>

          {/* Both statements share one box so the second lands exactly
              where the first left. */}
          <div className="absolute inset-y-0 left-6 right-6 flex items-center md:left-[calc(25%+12px)] md:right-8">
            <div className="relative w-full">
              <p className="t-statement m-0 max-w-[27ch]">
                <ScrollSplit
                  text={heroStatements[0]}
                  progress={p}
                  by="word"
                  enter={[0.2, 0.42]}
                  exit={[0.56, 0.74]}
                  spread={0.5}
                />
              </p>

              <p className="t-statement absolute inset-x-0 top-0 m-0 max-w-[27ch]">
                <ScrollSplit
                  text={heroStatements[1]}
                  progress={p}
                  by="word"
                  enter={[0.62, 0.86]}
                  exit={[0.97, 1]}
                  spread={0.5}
                />
              </p>
            </div>
          </div>
        </div>

        {/* Black block: 66% of the pinned frame, not 66vh. The frame is sized
            in dvh so it always covers the visible viewport; a vh-based child
            would drift out of step with it as the iOS bar collapses. */}
        <motion.div
          className="absolute inset-x-0 top-0 z-20 h-[66%] bg-black"
          style={{ y: blockY }}
        >
          <div className="absolute bottom-0 left-1/4 top-0 w-px bg-white/14" />

          <div className="flex h-full flex-col justify-center">
            <div className="hero-gutter">
              <FitText as="h1" className="font-medium text-white">
                {site.wordmark.toUpperCase()}
              </FitText>
              <div className="mt-6 h-px w-full bg-white/14" />
            </div>

            {/* The right label sits on the 25% spine from md up. Below that
                there is not enough room for both, so the row becomes a
                simple flex and the label goes to the right edge. */}
            <div className="relative mt-5 flex h-4 items-start justify-between px-6 md:block md:px-0">
              <span className="t-meta md:absolute md:left-8 md:top-0">
                {site.heroMetaLeft}
              </span>
              <span className="t-meta md:absolute md:left-1/4 md:top-0 md:pl-3">
                {site.heroMetaRight}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Reduced-motion fallback: same content, no scrub, no pin. */
function HeroStatic() {
  return (
    <section className="relative">
      <div className="relative h-[100dvh] overflow-hidden bg-black">
        <ShaderField />
        <div className="absolute bottom-0 left-1/4 top-0 z-[15] w-px bg-white/14" />
        <div className="relative z-20 flex h-[66%] flex-col justify-center bg-black">
          <div className="absolute bottom-0 left-1/4 top-0 w-px bg-white/14" />
          <div className="hero-gutter">
            <FitText as="h1" className="font-medium text-white">
              {site.wordmark.toUpperCase()}
            </FitText>
            <div className="mt-6 h-px w-full bg-white/14" />
          </div>
          <div className="relative mt-5 flex h-4 items-start justify-between px-6 md:block md:px-0">
            <span className="t-meta md:absolute md:left-8 md:top-0">{site.heroMetaLeft}</span>
            <span className="t-meta md:absolute md:left-1/4 md:top-0 md:pl-3">
              {site.heroMetaRight}
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-[100dvh] overflow-hidden bg-black text-white">
        <ShaderField />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-0 left-1/4 top-0 w-px bg-white/14" />
        <p className="t-body absolute left-6 top-28 m-0 max-w-[11rem] text-white/85 md:left-[calc(25%+12px)] md:top-32 md:max-w-[13rem]">
          {heroLabel}
        </p>
        <div className="absolute inset-y-0 left-6 right-6 flex items-center md:left-[calc(25%+12px)] md:right-8">
          <p className="t-statement m-0 max-w-[27ch]">{heroStatements[1]}</p>
        </div>
      </div>
    </section>
  );
}
