"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, Reveal, EASE } from "./motion";
import SectionHead from "./SectionHead";
import { reviews, reviewGroups, reviewsIntro, reviewsGrowth } from "@/lib/site";

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
 * The rail lists each position once. Several people can sit under one,
 * so the quote keeps advancing through that group before moving on, and
 * the rail shows how many reviews a position holds.
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
            {reviewGroups.map((g) => {
              const on = reviews[i].group === g.group;
              // which of this group's reviews is showing, 1-based
              const within = on ? i - g.first + 1 : 0;
              return (
                <li key={g.group} className="rule-b">
                  <button
                    onClick={() => setI(g.first)}
                    aria-current={on ? "true" : undefined}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <motion.span
                      className="t-card"
                      animate={{ opacity: on ? 1 : 0.35, x: on ? 6 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      {g.group}
                    </motion.span>

                    <span className="flex shrink-0 items-center gap-3">
                      {g.count > 1 && (
                        <motion.span
                          className="t-meta muted-2"
                          animate={{ opacity: on ? 1 : 0.4 }}
                          transition={{ duration: 0.6, ease: EASE }}
                        >
                          {on ? `${within}/${g.count}` : g.count}
                        </motion.span>
                      )}
                      <motion.span
                        className="block h-px bg-current"
                        animate={{ width: on ? 22 : 8, opacity: on ? 1 : 0.4 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
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

                <footer className="mt-8">
                  <span className="t-row block">{r.name}</span>
                  <span className="t-meta muted-2 mt-2 block">{r.role}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* What the same reviewers said to work on. */}
          <Reveal delay={0.1} className="mt-12">
            <p className="t-body muted-2 max-w-2xl border-t border-[color:var(--line)] pt-6">
              {reviewsGrowth}
            </p>
          </Reveal>

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
