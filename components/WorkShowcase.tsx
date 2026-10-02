"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion, type MotionValue } from "motion/react";
import { motion, useScroll, useTransform, Reveal } from "./motion";
import SectionHead from "./SectionHead";
import { Arrow } from "./Monogram";
import MediaSlot from "./MediaSlot";
import { featuredProjects, type Project } from "@/lib/site";

/**
 * Featured work as a stack of pinned cards.
 *
 * Every card is a sticky sibling of the same parent at the same offset.
 * Sticky is bounded by the parent, not by the element, so card one stays
 * pinned while card two rises from below and paints over it — each
 * project takes the place of the one before rather than scrolling past
 * it. The covered card scales back under perspective, so it reads as
 * receding rather than simply vanishing.
 *
 * Each image keeps its own parallax, driven off the card's window of the
 * section's scroll, so the shot is still travelling while the card is
 * pinned.
 */
export default function WorkShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="section shell">
      <SectionHead
        label="Work"
        title="Selected Projects"
        intro="Projects where a clear brief turned into precise execution, and the result held up after launch."
      />

      <div ref={ref} className="relative mt-16 md:mt-24">
        {featuredProjects.map((project, i) => (
          <StackCard
            key={project.slug}
            project={project}
            index={i}
            total={featuredProjects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <Reveal className="mt-14">
        <Link href="/work" className="pill t-meta inline-flex">
          All Work <Arrow />
        </Link>
      </Reveal>
    </section>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // Each card owns one slice of the section's scroll.
  const start = index / total;
  const end = (index + 1) / total;

  // How far this card recedes once the stack is complete. The last card
  // never recedes — nothing covers it.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  // Parallax runs across the card's own slice, so it keeps moving while
  // the card is pinned.
  const imageY = useTransform(progress, [Math.max(0, start - 1 / total), end], ["-9%", "9%"]);

  return (
    // The sticky block is taller than the card, which is what gives each
    // project a moment to hold before the next one arrives.
    <div className="sticky top-[116px] h-[72vh] md:h-[78vh]">
      <motion.div
        style={{
          scale: reduce ? 1 : scale,
          transformPerspective: 1200,
          transformOrigin: "center top",
        }}
      >
        <Link href={`/work/${project.slug}`} className="group block">
          <div className="relative h-[62vh] max-h-[720px] min-h-[360px] w-full overflow-hidden bg-[#111] p-1.5">
            {/* Labelled slot behind the glass, with its own parallax once
                real artwork replaces it. */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-x-0 h-[118%]"
                style={{ y: reduce ? 0 : imageY, top: "-9%" }}
              >
                <MediaSlot slot={project.slots[0]} className="h-full w-full" range={0} />
              </motion.div>
              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* Glass bar, pinned to the top of the card. Square, to match
                the card frame it sits inside. */}
            <figcaption className="relative flex w-full flex-col gap-3 bg-white/20 px-6 py-5 backdrop-blur-[30px] md:flex-row md:items-center md:justify-between md:gap-12 md:px-10 md:py-6">
              <h3 className="t-card-title m-0 flex items-baseline gap-3 text-white md:shrink-0">
                {project.title}
                {project.status === "soon" && (
                  <span className="t-meta text-white/55">Coming soon</span>
                )}
              </h3>

              <p className="t-body m-0 max-w-xl text-white/80 md:text-right">
                {project.blurb}
              </p>
            </figcaption>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
