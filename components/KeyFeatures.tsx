"use client";

import { useRef } from "react";
import { motion, useInView, SplitText, Reveal, Counter, EASE } from "./motion";
import SectionHead from "./SectionHead";
import ShaderField from "./ShaderField";
import { keyFeatures } from "@/lib/site";

/**
 * Key Features, the emphatic moment of the page, and the only section
 * besides the hero and footer that sits on the shader field.
 *
 * Left rail holds the label and the written context; the figures run as
 * hairline rows on the right, each with its bar and digits on one curve
 * so the number and the length always agree.
 */
export default function KeyFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative overflow-hidden">
      <ShaderField opacity={0.55} />
      <div className="absolute inset-0 bg-black/55" />

      <div className="section shell relative">
        <SectionHead
          label={keyFeatures.label}
          title={keyFeatures.title}
          intro={keyFeatures.intro}
        />

        <div ref={ref} className="grid12 mt-16 gap-y-14 md:mt-24">
          <div className="col-span-12 lg:col-span-3">
            <span className="t-meta block">{keyFeatures.notesLabel}</span>
            <div className="mt-8 space-y-9">
              {keyFeatures.notes.map((n, i) => (
                <Reveal key={n.title} delay={i * 0.08}>
                  <h3 className="t-sub">
                    <SplitText stagger={0.012}>{n.title}</SplitText>
                  </h3>
                  <p className="t-body mt-3">{n.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="rail col-span-12 lg:col-span-8 lg:col-start-5 lg:pl-10">
            {keyFeatures.figures.map((f, i) => (
              <div key={f.label} className="py-8 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                  <span className="t-numeral flex items-baseline leading-none">
                    <Counter value={f.value} duration={1.8} />
                    <span className="opacity-40">%</span>
                  </span>
                  <span className="t-body max-w-sm text-left md:text-right">{f.label}</span>
                </div>

                <div className="mt-7 h-px w-full overflow-hidden bg-[color:var(--line)]">
                  <motion.div
                    className="h-px w-full origin-left bg-current"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: f.value / 100 } : { scaleX: 0 }}
                    transition={{ duration: 1.8, ease: EASE, delay: i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
