"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, EASE } from "./motion";
import SectionHead from "./SectionHead";
import { reviews, img } from "@/lib/site";

const DWELL = 7000;

/**
 * 06 / Reviews — §4.8.
 *
 * Left rail stacks the client names with hairline separators and marks
 * the active one. Right carries the pull-quote, which leaves upward and
 * arrives from below through the same mask, so the two never cross-fade
 * — they cut. Bottom right holds the index and a progress hairline that
 * doubles as the auto-advance timer.
 */
export default function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const r = reviews[i];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % reviews.length), DWELL);
    return () => clearTimeout(id);
  }, [i, paused]);

  return (
    <section
      className="section shell"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <SectionHead label="Reviews" />

      <div className="grid12 mt-16 gap-y-12 md:mt-24">
        {/* ── Client rail ─────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-3">
          <span className="t-meta muted-2 block pb-4">Clients</span>
          <ul>
            {reviews.map((rev, n) => (
              <li key={rev.client} className="rule-b">
                <button
                  onClick={() => setI(n)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <motion.span
                    className="t-row"
                    animate={{ opacity: n === i ? 1 : 0.35, x: n === i ? 6 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {rev.client}
                  </motion.span>
                  <motion.span
                    className="block h-px bg-current"
                    animate={{ width: n === i ? 22 : 8, opacity: n === i ? 1 : 0.4 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Quote ───────────────────────────────────────────────── */}
        <div className="rail col-span-12 lg:col-span-8 lg:col-start-5 lg:pl-10">
          <span className="t-section block leading-none" aria-hidden>
            &ldquo;
          </span>

          <div className="relative min-h-[16rem] md:min-h-[14rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={r.name}
                className="m-0"
                initial={{ clipPath: "inset(0 0 100% 0)", y: 28 }}
                animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                exit={{ clipPath: "inset(100% 0 0 0)", y: -28 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="t-lede max-w-3xl">{r.quote}</p>

                <footer className="mt-8 flex items-center gap-4">
                  <span className="media h-11 w-11 shrink-0 rounded-full">
                    <img src={img(r.seed, 200, 200)} alt="" />
                  </span>
                  <span>
                    <span className="t-row block">{r.name}</span>
                    <span className="t-meta muted-2 mt-1 block">
                      {r.role}, {r.client}
                    </span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Index + progress hairline. */}
          <div className="mt-10 flex items-center justify-end gap-4">
            <span className="t-meta">
              {String(i + 1).padStart(2, "0")} &ndash; {String(reviews.length).padStart(2, "0")}
            </span>
            <div className="h-px w-28 overflow-hidden bg-current opacity-25">
              <motion.div
                key={`${i}-${paused}`}
                className="h-px w-full origin-left bg-current"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0.001 : 1 }}
                transition={{ duration: paused ? 0 : DWELL / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
