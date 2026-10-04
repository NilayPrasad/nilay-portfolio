"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { SplitText, Reveal, RuleDraw, Counter, useInView, useRef } from "./motion";
import MediaSlot from "./MediaSlot";
import { Plus, Arrow, BlockIcon } from "./Monogram";
import type { Evidence, Metric, Project, ProjectBlock } from "@/lib/projects";

/**
 * The case-study template. One page per project, driven entirely by the
 * project object, so a new case study is a data edit and nothing else.
 *
 * Order: title and lede, the project details with its personas, any
 * context figures, then the groundwork as a three-up card grid, how it was
 * solved, the personal contribution, and the evidence. Screens close it out.
 *
 * Evidence is deliberately not uniform: KPIs only where results are
 * verified, outcomes elsewhere. Context figures sit up top, away from the
 * evidence, so the scale of a problem never reads as a result.
 *
 * The groundwork blocks sit in cards rather than stacked full-width rows
 * because they are scanned, not read: three across gives the shape of the
 * research in one look instead of three screens of scrolling.
 */
export default function ProjectView({ project, next }: { project: Project; next: Project }) {
  const soon = project.status === "soon";

  // Two blocks get their own treatment; whatever is left is groundwork
  // and goes in the card grid. Matching on label rather than index keeps
  // this working for project 04, which has a different block sequence.
  const find = (label: string) =>
    soon ? undefined : project.blocks.find((b) => b.label === label);
  const solved = find("How it was solved");
  const contribution = find("My Contribution");
  const cards = soon ? [] : project.blocks.filter((b) => b !== solved && b !== contribution);

  return (
    <article>
      {/* ── Head ───────────────────────────────────────────────────── */}
      <header className="shell pt-36 md:pt-44">
        <Reveal y={0}>
          <Link href="/work" className="t-meta edge-link inline-flex items-center gap-2">
            <span className="rotate-180">
              <Arrow />
            </span>
            All work
          </Link>
        </Reveal>

        {/* Sized and measured to hold the longest title in two lines.
            t-section's own clamp at a 4xl measure put every three-word
            title on three lines, one word each. */}
        <h1 className="t-section mt-10 text-balance text-[clamp(2.1rem,6.4vw,5.6rem)]">
          <SplitText stagger={0.02}>{project.title}</SplitText>
        </h1>

        <Reveal delay={0.15} className="mt-12 md:mt-16">
          <p className="t-lede max-w-4xl">{project.lede}</p>
        </Reveal>

        {project.note && (
          <Reveal delay={0.2} className="mt-8">
            <p className="t-meta muted-2 max-w-2xl">{project.note}</p>
          </Reveal>
        )}
      </header>

      {/* ── Project details, with the personas alongside ───────────── */}
      <section className="shell mt-16 md:mt-24">
        <RuleDraw />
        <span className="t-meta mt-4 block">Project details</span>
        <div className="grid12 gap-y-6 pt-8">
          {project.facts.map((f, i) => (
            <Reveal key={f} delay={0.06 * i} className="col-span-6 lg:col-span-3">
              <span className="t-row block">{f}</span>
            </Reveal>
          ))}
        </div>

        {!soon && project.personas && (
          <Personas
            label={project.n === "04" ? "Journey pillars" : "Personas"}
            items={project.personas}
          />
        )}
      </section>

      {project.context && <EvidenceBand evidence={project.context} />}

      {soon ? (
        <ComingSoon project={project} />
      ) : (
        <FullCase project={project} cards={cards} solved={solved} contribution={contribution} />
      )}

      {/* ── Next ───────────────────────────────────────────────────── */}
      <section className="border-t border-[color:var(--line)]">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="shell py-20 md:py-28">
            <div className="grid12 items-center gap-y-8">
              <div className="col-span-12 lg:col-span-7">
                <span className="t-meta muted-2">Next</span>
                {/* t-section's 3rem floor puts "Management" past a 375px
                    screen, so the floor drops for small phones only. */}
                <h2 className="t-section mt-4 text-[clamp(2.1rem,8vw,7.5rem)]">
                  <span className="edge-underline">{next.title}</span>
                </h2>
                <p className="t-body mt-5 max-w-md">{next.blurb}</p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                <MediaSlot slot={next.slots[0]} className="aspect-[4/3] w-full" range={8} />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}

/* ── Evidence band ────────────────────────────────────────────────────
   Takeaway, figures, written outcomes, and a source line, each only when
   the project has it. Figures sit at display size, one per cell over its
   own hairline. */
function EvidenceBand({ evidence }: { evidence: Evidence }) {
  const { label, takeaway, metrics, points, note } = evidence;

  return (
    <section className="shell mt-16 md:mt-24">
      <RuleDraw />
      <div className="mt-4 flex items-baseline justify-between gap-6">
        <span className="t-meta">{label}</span>
        <span className="t-meta muted-2">
          {String((metrics ?? points ?? []).length).padStart(2, "0")}
        </span>
      </div>

      {takeaway && (
        <Reveal y={18}>
          <p className="t-statement mt-10 max-w-4xl text-balance md:mt-12">{takeaway}</p>
        </Reveal>
      )}

      {metrics && (
        <div
          className={`mt-12 grid grid-cols-2 gap-x-6 gap-y-12 ${
            metrics.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <MetricCell metric={m} narrow={metrics.length === 4} />
            </Reveal>
          ))}
        </div>
      )}

      {points && (
        <ul className="mt-10 grid gap-x-8 gap-y-4 md:mt-12 md:grid-cols-2">
          {points.map((p, i) => (
            <li key={p}>
              <Reveal delay={i * 0.05} y={14}>
                <div className="t-body flex items-start gap-3 text-[color:var(--fg)]">
                  <Plus size={9} className="mt-2 shrink-0 opacity-50" />
                  {p}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      )}

      {note && <p className="t-body muted-2 mt-12 max-w-2xl text-[13px] md:text-[14px]">{note}</p>}
    </section>
  );
}

/* Numbers roll on the counter at display size, scaled down in a four-up
   row so "$70M" clears its cell on a laptop. A worded value ("End to end")
   would overrun a cell at that size, so it drops to statement size. */
function MetricCell({ metric, narrow }: { metric: Metric; narrow: boolean }) {
  const numeric = /\d/.test(metric.value);
  const size = narrow ? "text-[clamp(2rem,6.5vw,6rem)]" : "text-[clamp(2rem,8vw,7.5rem)]";
  return (
    <div className="rule pt-4">
      <span className={`block leading-none ${numeric ? `t-numeral ${size}` : "t-statement"}`}>
        {numeric ? <Figure value={metric.value} /> : metric.value}
      </span>
      <span className="t-body mt-5 block max-w-xs">{metric.label}</span>
    </div>
  );
}

/**
 * Figures arrive as strings — "$70M", "95%+", "1.14M+", "-64%" — so the
 * whole digits are split out and rolled on the site's counter, any decimal
 * part stays at full strength beside them, and whatever wraps the number
 * is dimmed.
 */
function Figure({ value }: { value: string }) {
  const m = value.match(/^(\D*?)(\d+)(\.\d+)?(.*)$/);
  if (!m) return <>{value}</>;
  const [, prefix, digits, decimals, suffix] = m;

  return (
    <span className="inline-flex items-baseline">
      {prefix && <span className="opacity-50">{prefix}</span>}
      <Counter value={Number(digits)} duration={1.8} />
      {decimals}
      {suffix && <span className="opacity-40">{suffix}</span>}
    </span>
  );
}

/* ── Full case study ──────────────────────────────────────────────── */
function FullCase({
  project,
  cards,
  solved,
  contribution,
}: {
  project: Project;
  cards: ProjectBlock[];
  solved?: ProjectBlock;
  contribution?: ProjectBlock;
}) {
  return (
    <>
      {/* ── Groundwork, three across ───────────────────────────────── */}
      {cards.length > 0 && (
        <section className="shell mt-20 md:mt-28">
          {/* items-start so each card ends where its content does. Forced to
              equal height, the shortest block sat in a half-empty frame. */}
          <div className="grid12 items-start gap-y-6">
            {cards.map((block, i) => (
              <Reveal
                key={block.n}
                delay={i * 0.06}
                y={20}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div className="hairline flex flex-col p-7 md:p-8">
                  <div className="flex items-start justify-between">
                    <span className="text-[color:var(--fg)] opacity-70">
                      <BlockIcon label={block.label} />
                    </span>
                    <span className="t-meta muted-2 text-[10px]">({block.n})</span>
                  </div>

                  <h2 className="t-sub mt-8">{block.label}</h2>

                  {block.body?.map((para, n) => (
                    <p key={n} className="t-body mt-3 first:mt-4">
                      <Copy text={para} />
                    </p>
                  ))}

                  {block.items && (
                    <ul className="mt-5 space-y-2">
                      {block.items.map((it) => (
                        <li key={it} className="t-meta flex items-start gap-2.5">
                          <Plus size={8} className="mt-1 shrink-0 opacity-50" />
                          <Copy text={it} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {project.features && (
            <FeatureGrid label={project.featuresLabel} items={project.features} />
          )}
        </section>
      )}

      {/* ── How it was solved ──────────────────────────────────────── */}
      {solved && <Statement block={solved} />}

      {/* ── My Contribution, on its own ────────────────────────────── */}
      {contribution && <Statement block={contribution} />}

      {/* ── Evidence, after the contribution ───────────────────────── */}
      {project.evidence && <EvidenceBand evidence={project.evidence} />}

      <Gallery project={project} className="mt-20 md:mt-28" />
    </>
  );
}

/* ── A full-width prose block: label left, argument right ─────────── */
function Statement({ block }: { block: ProjectBlock }) {
  return (
    <section className="shell mt-20 md:mt-28">
      <Reveal y={22}>
        <div className="tick-rule grid12 gap-y-5 pb-10 md:pb-14">
          <div className="col-span-12 flex items-baseline gap-4 lg:col-span-4">
            <span className="t-meta muted-2 text-[10px]">({block.n})</span>
            <h2 className="t-lede">
              <SplitText stagger={0.012}>{block.label}</SplitText>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {/* The summary leads, so a skim gets the shape of the work
                before committing to the long-form account under it. */}
            {block.items && (
              <div className="mb-8 border-b border-[color:var(--line)] pb-8 md:mb-10 md:pb-10">
                <span className="t-meta muted-2 block">At a glance</span>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {block.items.map((it) => (
                    <li key={it} className="t-body flex items-start gap-3 text-[color:var(--fg)]">
                      <Plus size={9} className="mt-2 shrink-0 opacity-50" />
                      <Copy text={it} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {block.body?.map((para, n) => (
              <p key={n} className="t-body mb-4 max-w-2xl last:mb-0">
                <Copy text={para} />
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Coming soon ──────────────────────────────────────────────────── */
function ComingSoon({ project }: { project: Project }) {
  return (
    <>
      <section className="section shell">
        <RuleDraw />
        <div className="grid12 gap-y-8 pt-5">
          <div className="col-span-12 lg:col-span-4">
            <span className="t-meta">Coming soon</span>
            <p className="t-body mt-4 max-w-sm">
              This case study is being written up. Here is what the page will cover.
            </p>
          </div>

          <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
            {project.willCover?.map((w, i) => (
              <li key={w}>
                <Reveal delay={i * 0.05}>
                  <div className="tick-rule flex items-center gap-4 py-5">
                    <span className="t-meta muted-2 text-[10px]">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <span className="t-row">{w}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.evidence && <EvidenceBand evidence={project.evidence} />}

      <Gallery project={project} className="mt-20 md:mt-28" />
    </>
  );
}

/* ── Gallery ──────────────────────────────────────────────────────── */
function Gallery({ project, className = "" }: { project: Project; className?: string }) {
  if (!project.slots.length) return null;

  return (
    <section className={`shell pb-20 md:pb-28 ${className}`}>
      <RuleDraw />
      <div className="mt-4 flex items-baseline justify-between">
        <span className="t-meta">Screens</span>
        <span className="t-meta muted-2">
          {String(project.slots.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid12 mt-10 gap-y-6">
        {project.slots.map((slot, i) => {
          const lead = i % 3 === 0;
          return (
            <div key={slot.label} className={lead ? "col-span-12" : "col-span-12 md:col-span-6"}>
              <MediaSlot
                slot={slot}
                className={`w-full ${lead ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                range={lead ? 9 : 12}
                priority={i === 0}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Emphasis inside the copy ─────────────────────────────────────────
   Body strings carry **markers** around the phrases worth catching on a
   skim. They stay in their sentence, and their marker bands sweep in, in
   reading order, once the passage is on screen. */
function Copy({ text }: { text: string }) {
  if (!text.includes("**")) return <>{text}</>;
  return <Marked parts={text.split("**")} />;
}

function Marked({ parts }: { parts: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const lit = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref} data-lit={lit || undefined}>
      {parts.map((part, i) =>
        i % 2 ? (
          <strong key={i} className="mark" style={{ "--i": (i - 1) / 2 } as CSSProperties}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </span>
  );
}

/* ── Shared blocks ────────────────────────────────────────────────── */
function FeatureGrid({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className="mt-10">
      {label && <span className="t-meta muted-2 block">{label}</span>}
      <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {items.map((f, i) => (
          <div key={f} className="tick-rule flex items-baseline gap-3 py-3.5">
            <span className="t-meta muted-2">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-row">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/** Sits inside Project details rather than banding the page on its own. */
function Personas({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-12 border-t border-[color:var(--line)] pt-8">
      <span className="t-meta muted-2 block">{label}</span>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((p) => (
          <span key={p} className="pill t-meta">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
