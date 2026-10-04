"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  SplitText,
  Reveal,
  EASE,
} from "./motion";
import SectionHead from "./SectionHead";
import { Plus } from "./Monogram";
import { services, serviceIntro } from "@/lib/site";

/**
 * §4.3 — the Service list. Rows reveal top to bottom with their L-tick
 * underlines, and the reel alongside carries a parallax plus a slow scale
 * so the column never sits completely still.
 *
 * The reel is a stack of muted clips, one per service, driven by three
 * inputs in priority order: a hover preview, a clicked selection that
 * holds until you pick another (or click the same row to release it),
 * and failing both an idle cycle that plays the whole set end to end so
 * the column reads as a showreel rather than waiting for a cursor.
 *
 * Only an explicit hover or click opens a row's copy. Letting the idle
 * cycle drive the accordion meant the list re-flowed on its own every
 * ten-odd seconds, which the centred layout turns into a visible drift
 * in both directions.
 *
 * On a phone or tablet held upright the reel would stack under the whole
 * list, out of sight of the row you just opened, so it steps aside and
 * each open row carries its own clip instead. Landscape keeps the reel.
 */
/* Mirrors the `upright` variant in globals.css. */
const UPRIGHT = "(orientation: portrait) and (max-width: 1099.98px)";

export default function Services() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const inline = useRef<(HTMLVideoElement | null)[]>([]);

  const [cursor, setCursor] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [compact, setCompact] = useState(false);

  /* Which clip plays, and which row — if any — has its copy open. */
  const shown = hovered ?? picked ?? cursor;
  const expanded = hovered ?? picked;
  const cycling =
    !compact && !reduce && inView && hovered === null && picked === null;
  /* The clip the reel should be decoding; none while it's hidden. */
  const live = compact ? -1 : shown;

  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  /* Gentler than the old image reel: at 1.12 the zoom cropped the device
     mockups in these clips hard enough to clip the UI text inside them. */
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  /* Clicking holds a clip; clicking it again hands back to the cycle from
     where it left off rather than snapping to wherever the cursor was. */
  const pick = useCallback((i: number) => {
    setPicked((p) => (p === i ? null : i));
    setCursor(i);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(UPRIGHT);
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Only the visible clip is allowed to decode. */
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i !== live) {
        v.pause();
        return;
      }
      if (reduce) return;
      v.currentTime = 0;
      void v.play().catch(() => {});
    });
  }, [live, reduce]);

  /* Compact layout: the open row's own clip plays from the top, the rest
     sit paused. */
  useEffect(() => {
    if (!compact) return;
    inline.current.forEach((v, i) => {
      if (!v) return;
      if (i !== expanded || !inView || reduce) {
        v.pause();
        return;
      }
      if (v.paused) void v.play().catch(() => {});
    });
  }, [compact, expanded, inView, reduce]);

  useEffect(() => {
    if (!compact || expanded === null) return;
    const v = inline.current[expanded];
    if (v) v.currentTime = 0;
  }, [compact, expanded]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Pause the reel outright once the section scrolls away. */
  useEffect(() => {
    if (inView || reduce) return;
    videos.current.forEach((v) => v?.pause());
  }, [inView, reduce]);

  useEffect(() => {
    if (!inView || reduce || live < 0) return;
    const v = videos.current[live];
    if (v?.paused) void v.play().catch(() => {});
  }, [inView, live, reduce]);

  const advance = useCallback(
    (i: number) => {
      if (i !== shown) return;
      if (!cycling) {
        const v = videos.current[i];
        if (v) {
          v.currentTime = 0;
          void v.play().catch(() => {});
        }
        return;
      }
      setCursor((c) => (c + 1) % services.length);
    },
    [cycling, shown],
  );

  return (
    <section id="services" ref={sectionRef} className="section shell">
      <SectionHead label="Service" title="What I Do" intro={serviceIntro} />

      <div className="grid12 mt-16 gap-y-14 md:mt-24 lg:items-center">
        {/* ── List ────────────────────────────────────────────────── */}
        <ul
          className="col-span-12 lg:col-span-7 upright:col-span-12"
          onPointerLeave={() => setHovered(null)}
        >
          {services.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.05} y={18}>
                <div className="group tick-rule">
                  <button
                    type="button"
                    className="block w-full cursor-pointer text-left py-5 md:py-6"
                    aria-expanded={expanded === i}
                    aria-controls={`service-copy-${s.n}`}
                    /* Hover and focus previews are for mouse and keyboard
                       only. A tap also fires both, and on Android the focus
                       sticks, so the preview would hold a row open after a
                       second tap had released it. */
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setHovered(i);
                    }}
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible")) setHovered(i);
                    }}
                    onBlur={() => setHovered(null)}
                    onClick={() => pick(i)}
                  >
                    <div className="flex items-baseline gap-6">
                      <motion.h3
                        className="t-row flex-1"
                        animate={{ x: shown === i ? 10 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <SplitText stagger={0.01}>{s.title}</SplitText>
                      </motion.h3>

                      {/* Rotation tracks the open copy, so the cross never
                          promises a close on a row that isn't open. */}
                      <motion.span
                        animate={{
                          rotate: expanded === i ? 135 : 0,
                          opacity: shown === i ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.6, ease: EASE }}
                        aria-hidden
                      >
                        <Plus size={11} />
                      </motion.span>

                      <span className="t-meta muted-2 w-6 text-right">{s.n}</span>
                    </div>

                    <motion.div
                      id={`service-copy-${s.n}`}
                      initial={false}
                      animate={{
                        height: expanded === i ? "auto" : 0,
                        opacity: expanded === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="t-body max-w-xl pt-4">{s.body}</p>
                      {compact && (
                        <div className="media mt-6 aspect-[3/4] w-full max-w-xs">
                          <video
                            ref={(el) => {
                              inline.current[i] = el;
                            }}
                            src={s.video}
                            muted
                            loop
                            playsInline
                            preload={expanded === i ? "auto" : "none"}
                            aria-hidden
                          />
                        </div>
                      )}
                    </motion.div>
                  </button>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ── Reel ────────────────────────────────────────────────── */}
        <div className="rail col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-10 upright:hidden">
          <div ref={mediaRef} className="media aspect-[3/4] w-full">
            {services.map((s, i) => (
              <motion.video
                key={s.video}
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={s.video}
                muted
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                aria-hidden
                onEnded={() => advance(i)}
                onError={() => advance(i)}
                initial={false}
                animate={{ opacity: shown === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ y, scale, height: "120%", top: "-10%" }}
              />
            ))}
            {/* The clips run light in places, so the caption needs its own
                scrim rather than relying on the footage staying dark. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/35 to-transparent p-4 pt-12">
              <span className="t-meta text-white">{services[shown].title}</span>
              <span className="t-meta text-white">{services[shown].n}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
