"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, Reveal, EASE } from "./motion";
import SectionHead from "./SectionHead";
import { Plus } from "./Monogram";
import { reviews, reviewsIntro, reviewsLead } from "@/lib/site";

/**
 * 06 / Reviews.
 *
 * Real feedback, attributed by role rather than by name. A two-up grid of
 * quotes on a hairline, stacking to one column on small screens. Only the
 * first few show at rest, because eleven at once reads as a wall and the
 * section is meant to be scanned, not waded through.
 */
export default function Reviews() {
  const [open, setOpen] = useState(false);
  const rest = reviews.length - reviewsLead;

  return (
    <section className="section shell">
      <SectionHead label="Reviews" intro={reviewsIntro} />

      {/* SectionHead already contributes its own top padding, and with no
          title filling the left column the usual mt-16/mt-24 left a hole. */}
      <div className="grid12 mt-8 gap-y-10 md:mt-12">
        {reviews.slice(0, reviewsLead).map((r, i) => (
          <Quote key={r.quote} quote={r.quote} role={r.role} index={i} delay={i * 0.05} />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="rest"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid12 gap-y-10 pt-10">
              {reviews.slice(reviewsLead).map((r, i) => (
                <Quote
                  key={r.quote}
                  quote={r.quote}
                  role={r.role}
                  index={reviewsLead + i}
                  delay={i * 0.04}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {rest > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="pill t-meta mt-14 inline-flex items-center"
        >
          {open ? "Show fewer" : `Read ${rest} more`}
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="ml-3 inline-flex"
          >
            <Plus size={10} />
          </motion.span>
        </button>
      )}
    </section>
  );
}

function Quote({
  quote,
  role,
  index,
  delay,
}: {
  quote: string;
  role: string;
  index: number;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={18} className="col-span-12 md:col-span-6 lg:col-span-5 lg:even:col-start-8">
      <figure className="rule m-0 flex h-full flex-col pt-5">
        <span className="t-meta muted-2">{String(index + 1).padStart(2, "0")}</span>
        <blockquote className="m-0 mt-5">
          <p className="t-body m-0 max-w-xl text-[color:var(--fg)]">{quote}</p>
        </blockquote>
        <figcaption className="t-meta muted-2 mt-6">{role}</figcaption>
      </figure>
    </Reveal>
  );
}
