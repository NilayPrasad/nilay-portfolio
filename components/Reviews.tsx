"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, EASE } from "./motion";
import SectionHead from "./SectionHead";
import { reviews, reviewsIntro } from "@/lib/site";

const DWELL = 7000;

/**
 * 06 / Reviews.
 *
 * Left rail stacks the reviewers with hairline separators and marks the
 * active one. Right carries the pull-quote, which leaves upward and
 * arrives from below through the same mask, so the two never cross-fade,
 * they cut. Bottom right holds the index and a progress hairline that
 * doubles as the auto-advance timer.
 *
 * Reviewers are identified by position. The names sit in Nilay's own
 * records and are deliberately absent from this repo.
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
      <SectionHead label="Reviews" intro={reviewsIntro} />

      <div className="grid12 mt-16 gap-y-12 md:mt-24">
        {/* ── Client rail ─────────────────────────────────────────── */}
        {/* Stacked, the quote leads and the rail follows. With eleven
            reviewers the rail is a long list to wade through before
            reaching any actual content. Desktop order is unchanged. */}
        <div className="order-2 col-span-12 lg:order-1 lg:col-span-3">
          <span className="t-meta muted-2 block pb-4">Reviewers</span>
          <ul>
            {reviews.map((rev, n) => (
              <li key={`${rev.role}-${n}`} className="rule-b">
                <button
                  onClick={() => setI(n)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <motion.span
                    className="t-card text-left"
                    animate={{ opacity: n === i ? 1 : 0.35, x: n === i ? 6 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {rev.role}
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
        <div className="rail order-1 col-span-12 lg:order-2 lg:col-span-8 lg:col-start-5 lg:pl-10">
          <span className="t-section block leading-none" aria-hidden>
            &ldquo;
          </span>

          <div className="relative min-h-[16rem] md:min-h-[14rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={r.quote}
                className="m-0"
                initial={{ clipPath: "inset(0 0 100% 0)", y: 28 }}
                animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                exit={{ clipPath: "inset(100% 0 0 0)", y: -28 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="t-lede max-w-3xl">{r.quote}</p>

                {/* No portrait: the reviewers are not named here, and a
                    stock face standing in for a real person would be a lie. */}
                <footer className="mt-8">
                  <span className="t-row block">{r.role}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Index + progress hairline. */}
          <div className="mt-10 flex items-center justify-end gap-4">
            <span className="t-meta">
              {String(i + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
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
