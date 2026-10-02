"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, SplitText, EASE } from "./motion";
import MediaSlot from "./MediaSlot";
import { projects, workCategories, type Project } from "@/lib/site";

/**
 * Work index, built to match the reference layout exactly:
 *
 *   20px page gutter on a pure-black ground
 *   Hero: 6-column grid, the count and the title each spanning 2 columns
 *   Body: 3-column grid — cards span 2, the filter rail holds the third
 *         and sticks at 60px
 *   Cards: 2-up at a 5px gap, each a square cover carrying a rounded
 *         pill overlay with the title, its tags, and a plus that
 *         assembles on hover
 */
export default function WorkIndex() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-black">
      <header className="shell pt-36 md:pt-44">
        <div className="grid12 items-end gap-y-8">
          <h1 className="t-wordmark col-span-12 lg:col-span-8">
            <SplitText stagger={0.035}>Works</SplitText>
          </h1>
        </div>
      </header>

      <div className="h-[10svh] lg:h-[16svh]" />

      {/* ── Body ────────────────────────────────────────────────────── */}
      <section className="shell grid grid-cols-2 gap-x-2.5 gap-y-5 pb-16 lg:grid-cols-3 lg:gap-2.5 lg:pb-[200px]">
        {/* Filter rail. Above the cards once the layout narrows. */}
        <aside className="order-0 col-span-2 flex flex-col gap-5 self-start lg:order-1 lg:col-span-1 lg:sticky lg:top-[116px]">
          <div className="flex w-full flex-col gap-0.5">
            {workCategories.map((c) => {
              const on = c.label === active;
              return (
                <button
                  key={c.label}
                  onClick={() => setActive(c.label)}
                  className="flex w-full items-center justify-between py-1.5 transition-opacity duration-500"
                  style={{ opacity: on ? 1 : 0.5 }}
                >
                  <span className="t-card">{c.label}</span>
                  <span className="t-card">{String(c.count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Cards */}
        <div className="order-1 col-span-2 flex flex-col gap-10 lg:order-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-1 gap-x-[5px] gap-y-2.5 md:grid-cols-2 md:gap-[5px]"
            >
              {list.map((p, i) => (
                <WorkCard key={p.slug} project={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <p className="t-card py-24 text-center opacity-50">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const tags = project.roles.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 4) * 0.06 }}
    >
      <Link href={`/work/${project.slug}`} className="group relative block w-full overflow-hidden">
        {/* Square cover */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#0f0f0f]">
          <MediaSlot
            slot={project.slots[0]}
            className="h-full w-full"
            range={0}
            labelPosition="corner"
          />

          {/* Pill overlay. Geometry is the reference's: 90% wide, 45% tall,
              inset 5% from the left and 27% from the top. */}
          <div className="absolute left-[5%] top-[27.07%] z-[1] flex h-[45%] w-[90%] items-center justify-between overflow-hidden rounded-[200px] bg-black/45 px-5 backdrop-blur-[2px] transition-[backdrop-filter,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-black/60 group-hover:backdrop-blur-md lg:px-10">
            <div className="flex w-min flex-col gap-1">
              <p className="t-card m-0 whitespace-pre text-white">{project.title}</p>
              <div className="flex w-min flex-col gap-0 md:flex-row md:gap-2.5">
                {tags.map((t: string) => (
                  <span key={t} className="t-tag whitespace-pre text-white/75">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <PlusIcon />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Two bars that rotate into a plus on hover. They start rotated a quarter
 * and a half turn out and at zero opacity, so the mark assembles rather
 * than fading in.
 */
function PlusIcon() {
  return (
    <div className="relative aspect-square w-[34px] shrink-0 overflow-hidden lg:w-[40px]">
      <span className="absolute left-0 right-0 top-1/2 block h-px -translate-y-1/2 rotate-180 bg-white opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:opacity-100" />
      <span className="absolute bottom-0 left-1/2 top-0 block w-px -translate-x-1/2 -rotate-90 bg-white opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:opacity-100" />
    </div>
  );
}
