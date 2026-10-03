"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  SplitText,
  Reveal,
  EASE,
} from "./motion";
import { useReducedMotion } from "motion/react";
import { Plus } from "./Monogram";
import FitText from "./FitText";
import { method, methodIntroVideo } from "@/lib/site";

/**
 * Method as a side-scrolling track: METHOD, then one full-bleed panel per
 * step, scrubbed horizontally by vertical scroll.
 *
 * Each panel's clip is a real background, edge to edge, `object-cover` so
 * it fills both sides without distorting. The copy rides in a glass band
 * across the foot of the panel rather than in a card, so the footage is
 * never boxed in.
 */
type Panel = { n: string; title: string; video: string; body?: string; items?: string[] };

const PANELS: Panel[] = [
  { n: "", title: "Method", video: methodIntroVideo },
  ...method,
];
const TOTAL = PANELS.length;
const HOLD = 0.12; // the title panel's share before the track starts moving

export default function Method() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* Linear travel left every panel mid-flight for half its segment. Each
     one now dwells full-frame for most of its range, then hands off fast. */
  /* TOTAL segments, not TOTAL-1: dividing by the number of transitions
     left the last panel arriving exactly at progress 1, so it never got a
     dwell and the final keyframe was a duplicate. */
  const SPAN = (1 - HOLD) / TOTAL;
  const stops: number[] = [0, HOLD];
  const xKeys: string[] = ["0vw", "0vw"];
  const iKeys: number[] = [0, 0];
  for (let i = 0; i < TOTAL - 1; i++) {
    const end = HOLD + (i + 1) * SPAN;
    stops.push(end - SPAN * 0.45, end);
    xKeys.push(`-${i * 100}vw`, `-${(i + 1) * 100}vw`);
    iKeys.push(i, i + 1);
  }
  stops.push(1);
  xKeys.push(`-${(TOTAL - 1) * 100}vw`);
  iKeys.push(TOTAL - 1);

  const x = useTransform(scrollYProgress, stops, xKeys);
  const cursor = useTransform(scrollYProgress, stops, iKeys);
  const bar = useTransform(scrollYProgress, [HOLD, 1], [1 / TOTAL, 1]);

  useMotionValueEvent(cursor, "change", (v) => setActive(Math.round(v)));

  if (reduce) return <MethodStatic />;

  return (
    <>
      {/* A pinned horizontal scrub fights the browser's own gestures on
          touch, so small screens keep the stacked list. */}
      <div className="md:hidden">
        <MethodStatic />
      </div>

      <section
        ref={ref}
        aria-label="Method"
        className="on-light relative hidden h-[620svh] md:block"
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ x, width: `${TOTAL * 100}vw`, willChange: "transform" }}
          >
            {PANELS.map((panel, i) => (
              <Panel key={panel.title} panel={panel} active={active === i} intro={i === 0} />
            ))}
          </motion.div>

          {/* Progress only. The number and the name are on the panel. */}
          <div className="safe-b pointer-events-none absolute inset-x-0 bottom-0 z-20">
            <div className="shell pb-10">
              <span className="relative block h-px w-full bg-black/15">
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-black"
                  style={{ scaleX: bar }}
                />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Panel({
  panel,
  active,
  intro,
}: {
  panel: Panel;
  active: boolean;
  intro: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);

  /* Only the panel on screen decodes. Five loops at once on a pinned
     section is a lot of work for frames nobody can see. */
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <div className="relative h-full w-screen shrink-0 overflow-hidden">
      {/* Graded as shot, no veil. The glass band is what holds the copy
          legible, so the footage does not need lifting. */}
      {panel.video && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          src={panel.video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      )}

      {/* Steps still waiting on footage get the site's placeholder marks
          rather than a bare field, so the gap reads as pending. */}
      {!panel.video && !intro && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="hairline absolute inset-10 border-black/15" />
          <Plus size={10} className="absolute left-9 top-9 text-black/25" />
          <Plus size={10} className="absolute right-9 top-9 text-black/25" />
          <Plus size={10} className="absolute bottom-9 left-9 text-black/25" />
          <Plus size={10} className="absolute bottom-9 right-9 text-black/25" />
          <span className="t-meta muted-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            Background pending
          </span>
        </div>
      )}

      {intro ? (
        <div className="absolute inset-0 flex items-center">
          <div className="shell w-full">
            <FitText as="h2" className="font-semibold">
              METHOD
            </FitText>
          </div>
        </div>
      ) : (
        /* A band across the foot of the panel, not a card: no border, no
           radius, full width, so the clip stays the background. 75% white
           holds the copy at AA even over a fully black frame. */
        <div className="absolute inset-x-0 bottom-0 backdrop-blur-[28px] bg-white/75">
          <div className="shell grid12 gap-y-6 py-9 pb-20">
            <div className="col-span-12 flex items-baseline gap-4 lg:col-span-4">
              <span className="t-meta shrink-0 text-black/60">{panel.n}</span>
              <h3 className="t-lede m-0 text-black">
                <SplitText stagger={0.014}>{panel.title}</SplitText>
              </h3>
            </div>

            <p className="t-body col-span-12 m-0 max-w-md text-black/75 lg:col-span-4">
              {panel.body}
            </p>

            <ul className="col-span-12 space-y-2.5 lg:col-span-3 lg:col-start-10">
              {panel.items?.map((it) => (
                <li key={it} className="t-meta flex items-center gap-2 text-black/65">
                  <Plus size={8} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/** Stacked fallback: small screens and reduced motion. */
function MethodStatic() {
  return (
    <div className="on-light grain">
      <div className="section shell">
        <FitText as="h2" className="font-semibold">
          METHOD
        </FitText>

        <div className="mt-16 md:mt-24">
          {method.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.06} y={24}>
              <div className="tick-rule py-10 md:py-14">
                {m.video && (
                  <div className="media mb-8 aspect-[16/9] w-full">
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={m.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden
                    />
                  </div>
                )}

                <div className="grid12 gap-y-5">
                  <div className="col-span-12 flex items-baseline gap-4 lg:col-span-4">
                    <span className="t-meta muted-2">{m.n}</span>
                    <h3 className="t-lede m-0">{m.title}</h3>
                  </div>

                  <p className="t-body col-span-12 max-w-md lg:col-span-4 lg:col-start-6">
                    {m.body}
                  </p>

                  <ul className="col-span-12 space-y-2.5 lg:col-span-3 lg:col-start-10">
                    {m.items.map((it) => (
                      <li key={it} className="t-meta flex items-center gap-2">
                        <Plus size={8} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
