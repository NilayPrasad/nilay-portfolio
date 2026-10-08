"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, Reveal, useInView } from "./motion";
import type { MotionValue } from "./motion";
import { useReducedMotion } from "motion/react";
import { Plus } from "./Monogram";
import FitText from "./FitText";
import { method } from "@/lib/site";

type Step = (typeof method)[number];

/**
 * Method: the title, then the four steps as small cards that share one
 * shape: clip on top, then the step's title, then its description.
 *
 * On a large screen the section pins for a short stretch of vertical
 * scroll. METHOD starts full width and centred, rises and shrinks to the
 * top, and the four cards rise into a single row beneath it before the
 * page carries on into Awards. Tablets, phones, short laptop screens, and
 * reduced motion get the same cards in an ordinary grid, two up or stacked.
 */
const STAGE = "(min-width: 1200px) and (min-height: 700px)";
const SHRUNK = 0.34;
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Method() {
  const reduce = useReducedMotion();
  const [staged, setStaged] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(STAGE);
    const sync = () => setStaged(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return staged && !reduce ? <MethodStage /> : <MethodGrid />;
}

function MethodStage() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  /* `drop` is how far below its resting place the title sits when centred;
     `rest` is where the shrunk title ends, so the card row can centre in
     the space beneath it. Both measured, because the title's height follows
     the fitted font size. */
  const [drop, setDrop] = useState(0);
  const [rest, setRest] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!stage.current || !head.current || !title.current) return;
      const h = title.current.offsetHeight;
      setDrop(stage.current.clientHeight / 2 - h / 2 - head.current.offsetTop);
      setRest(head.current.offsetTop + h * SHRUNK);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    if (title.current) ro.observe(title.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rise = useTransform(p, [0, 0.4], [0, 1], { ease: smooth });
  const y = useTransform(rise, (v) => (1 - v) * drop);
  const scale = useTransform(rise, [0, 1], [1, SHRUNK]);

  return (
    <section ref={ref} aria-label="Method" className="on-light grain relative h-[240svh]">
      <div ref={stage} className="sticky top-0 h-[100lvh] overflow-hidden">
        <div ref={head} className="shell absolute inset-x-0 top-[13vh]">
          <motion.div ref={title} style={{ y, scale, transformOrigin: "0 0" }}>
            <FitText as="h2" className="font-semibold">
              METHOD
            </FitText>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center" style={{ top: rest }}>
          <div className="shell grid grid-cols-4 gap-6">
            {method.map((m, i) => (
              <StageCard key={m.n} step={m} index={i} progress={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Cards rise in left to right while the title is still settling, and are
   all in place with a stretch of scroll to spare before the pin lets go. */
function StageCard({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.28 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.2], [0, 1]);
  const y = useTransform(progress, [start, start + 0.25], [70, 0], { ease: smooth });

  return (
    <motion.div style={{ opacity, y }}>
      <StepCard step={step} />
    </motion.div>
  );
}

function MethodGrid() {
  return (
    <section aria-label="Method" className="on-light grain relative">
      <div className="section shell">
        <FitText as="h2" className="font-semibold">
          METHOD
        </FitText>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {method.map((m, i) => (
            <Reveal key={m.n} delay={(i % 2) * 0.08} y={28}>
              <StepCard step={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <article>
      <div className="media aspect-[16/10] w-full">
        {step.video ? <StackedClip src={step.video} /> : <PendingClip />}
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="t-meta muted-2">{step.n}</span>
        <h3 className="t-row m-0">{step.title}</h3>
      </div>

      <p className="t-body m-0 mt-3">{step.body}</p>
    </article>
  );
}

/* Steps still waiting on footage keep the clip's frame, so the four cards
   hold one shape and the gap reads as pending rather than broken. */
function PendingClip() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Plus size={9} className="absolute left-3 top-3 text-white/30" />
      <Plus size={9} className="absolute right-3 top-3 text-white/30" />
      <Plus size={9} className="absolute bottom-3 left-3 text-white/30" />
      <Plus size={9} className="absolute bottom-3 right-3 text-white/30" />
      <span className="t-meta absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/60">
        Video pending
      </span>
    </div>
  );
}

/* Plays while on screen, pauses once scrolled past. iOS paints nothing for
   a metadata-only video until it plays, so the #t fragment asks for the
   frame at 0.1s up front: a still instead of a black box before playback,
   and for anyone who has asked for reduced motion. */
function StackedClip({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && !reduce) void v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={`${src}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
