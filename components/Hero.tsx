"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion } from "motion/react";
import { motion, useTransform, useMotionValueEvent, EASE } from "./motion";
import ScrollSplit from "./ScrollSplit";
import ShaderField from "./ShaderField";
import FitText from "./FitText";
import { heroProgress, heroMounted } from "@/lib/heroProgress";
import { site, heroLabel, heroStatements } from "@/lib/site";

/**
 * Hero and Statement as one pinned timeline.
 *
 *   0.00–0.40  black block translateY 0 → -100%
 *   0.15–0.30  label rises in
 *   0.20–0.42  statement 1 rises word by word out of its masks
 *   0.56–0.74  statement 1 travels up and out — the cut
 *   0.62–0.86  statement 2 rises into the same position
 *
 * Built to hold still on iOS, where the toolbar grows and shrinks the
 * visible height mid-scroll. The stage is sized in lvh and its copy is
 * centred in an svh box, both fixed units, so nothing resizes or re-centres
 * as the bar moves; and progress is measured from fixed lengths rather than
 * from the live viewport, so it never skips. Sized in dvh, the statement
 * jumped 40px and the timeline lurched when the bar collapsed.
 *
 * On touch the statements play as short timed reveals once their stretch of
 * scroll is reached, so a flick can never leave words half out of their
 * masks. With a mouse or trackpad they scrub with the scroll as before.
 */
const TOUCH = "(hover: none) and (pointer: coarse)";

type Phase = "before" | "in" | "after";
const phase = (p: number, from: number, to: number): Phase =>
  p < from ? "before" : p < to ? "in" : "after";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(TOUCH);
    const sync = () => setTouch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Section and stage are both in fixed viewport units, so this only
  // re-measures on a real resize or rotation, never as the toolbar moves.
  // Progress is set on load and on every measure as well as on scroll, so a
  // page restored mid-hero opens in the right state.
  const p = useMotionValue(0);
  useEffect(() => {
    const s = ref.current;
    const f = stage.current;
    if (!s || !f) return;
    let start = 0;
    let length = 1;
    const update = () => p.set(Math.min(1, Math.max(0, (window.scrollY - start) / length)));
    const measure = () => {
      start = s.getBoundingClientRect().top + window.scrollY;
      length = Math.max(1, s.offsetHeight - f.offsetHeight);
      update();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(s);
    ro.observe(f);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [reduce, p]);

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

  // Touch: which side of its window each line is on.
  const [phases, setPhases] = useState<[Phase, Phase, Phase]>(["before", "before", "before"]);
  const syncPhases = (v: number) => {
    const next: [Phase, Phase, Phase] = [
      phase(v, 0.18, 0.66),
      phase(v, 0.24, 0.6),
      phase(v, 0.68, 0.97),
    ];
    setPhases((cur) => (cur.every((c, i) => c === next[i]) ? cur : next));
  };
  useMotionValueEvent(p, "change", (v) => touch && syncPhases(v));
  useEffect(() => {
    if (touch) syncPhases(p.get());
  }, [touch]);

  if (reduce) return <HeroStatic />;

  return (
    <section ref={ref} className="relative h-[320svh]">
      <div ref={stage} className="sticky top-0 h-[100lvh] w-full overflow-hidden bg-black">
        <ShaderField />
        <div className="absolute inset-0 bg-black/45" />

        {/* The spine. Sits above the field, below the block, and runs the
            full height of the stage rather than stopping with the block. */}
        <div className="absolute bottom-0 left-1/4 top-0 z-[15] w-px bg-white/14" />

        {/* ── Statements, left-aligned to the spine ───────────────── */}
        <div className="absolute inset-x-0 top-0 z-10 h-[100svh] text-white">
          {touch ? (
            <motion.p
              className={LABEL}
              initial={false}
              animate={phases[0] === "in" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {heroLabel}
            </motion.p>
          ) : (
            <motion.p className={LABEL} style={{ opacity: labelOpacity, y: labelY }}>
              {heroLabel}
            </motion.p>
          )}

          {/* Both statements share one box so the second lands exactly
              where the first left. */}
          <div className="absolute inset-y-0 left-6 right-6 flex items-center md:left-[calc(25%+12px)] md:right-8">
            <div className="relative w-full">
              <p className="t-statement m-0 max-w-[27ch]">
                {touch ? (
                  <TimedSplit text={heroStatements[0]} phase={phases[1]} />
                ) : (
                  <ScrollSplit
                    text={heroStatements[0]}
                    progress={p}
                    by="word"
                    enter={[0.2, 0.42]}
                    exit={[0.56, 0.74]}
                    spread={0.5}
                  />
                )}
              </p>

              <p className="t-statement absolute inset-x-0 top-0 m-0 max-w-[27ch]">
                {touch ? (
                  <TimedSplit text={heroStatements[1]} phase={phases[2]} />
                ) : (
                  <ScrollSplit
                    text={heroStatements[1]}
                    progress={p}
                    by="word"
                    enter={[0.62, 0.86]}
                    exit={[0.97, 1]}
                    spread={0.5}
                  />
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Black block: 66% of the pinned stage, which is itself fixed, so
            the block never resizes under the reader. */}
        <motion.div
          className="absolute inset-x-0 top-0 z-20 h-[66%] bg-black"
          style={{ y: blockY }}
        >
          <div className="absolute bottom-0 left-1/4 top-0 w-px bg-white/14" />
          <NameBlock />
        </motion.div>
      </div>
    </section>
  );
}

const LABEL =
  "t-body absolute left-6 top-28 m-0 max-w-[11rem] text-white/85 md:left-[calc(25%+12px)] md:top-32 md:max-w-[13rem]";

/* On a phone held sideways the block is barely 220px tall, and centred the
   name ran under the logo and MENU. */
function NameBlock() {
  return (
    <div className="flex h-full flex-col justify-center short:pt-16">
      <div className="hero-gutter">
        <FitText as="h1" className="font-medium text-white">
          {site.wordmark.toUpperCase()}
        </FitText>
        <div className="mt-6 h-px w-full bg-white/14" />
      </div>

      {/* The right label sits on the 25% spine from md up. Below that there
          is not enough room for both, so the row becomes a simple flex and
          the label goes to the right edge. */}
      <div className="relative mt-5 flex h-4 items-start justify-between px-6 md:block md:px-0">
        <span className="t-meta md:absolute md:left-8 md:top-0">{site.heroMetaLeft}</span>
        <span className="t-meta md:absolute md:left-1/4 md:top-0 md:pl-3">
          {site.heroMetaRight}
        </span>
      </div>
    </div>
  );
}

/* The same masked word rise as ScrollSplit, driven by time instead of by
   scroll: in from below, out through the top, back down on the way back. */
function TimedSplit({ text, phase }: { text: string; phase: Phase }) {
  const words = text.split(" ");
  const target =
    phase === "in"
      ? { y: "0%", opacity: 1 }
      : phase === "after"
        ? { y: "-118%", opacity: 0 }
        : { y: "115%", opacity: 0 };

  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.16em",
            marginBottom: "-0.16em",
          }}
        >
          <motion.span
            className="split-unit"
            initial={false}
            animate={target}
            transition={{ duration: 0.75, ease: EASE, delay: phase === "in" ? i * 0.035 : i * 0.012 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** Reduced-motion fallback: same content, no scrub, no pin. */
function HeroStatic() {
  return (
    <section className="relative">
      <div className="relative h-[100svh] overflow-hidden bg-black">
        <ShaderField />
        <div className="absolute bottom-0 left-1/4 top-0 z-[15] w-px bg-white/14" />
        <div className="relative z-20 h-[66%] bg-black">
          <div className="absolute bottom-0 left-1/4 top-0 w-px bg-white/14" />
          <NameBlock />
        </div>
      </div>

      <div className="relative h-[100svh] overflow-hidden bg-black text-white">
        <ShaderField />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-0 left-1/4 top-0 w-px bg-white/14" />
        <p className={LABEL}>{heroLabel}</p>
        <div className="absolute inset-y-0 left-6 right-6 flex items-center md:left-[calc(25%+12px)] md:right-8">
          <p className="t-statement m-0 max-w-[27ch]">{heroStatements[1]}</p>
        </div>
      </div>
    </section>
  );
}
