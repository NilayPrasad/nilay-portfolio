"use client";

import Link from "next/link";
import { SplitText, Reveal, RuleDraw, Counter } from "./motion";
import MediaSlot from "./MediaSlot";
import { Plus, Arrow } from "./Monogram";
import type { Project, ProjectBlock } from "@/lib/projects";

/**
 * The case-study template. One page per project, driven entirely by the
 * project object, so a new case study is a data edit and nothing else.
 *
 * Order: title and lede, the outcomes up front as a figures band, then
 * the project details, the numbered blocks, and finally every screen.
 * Leading with the result means a reader who stops after ten seconds
 * still leaves with the point.
 */
export default function ProjectView({ project, next }: { project: Project; next: Project }) {
  const soon = project.status === "soon";

  // The trailing outcomes block is promoted out of the sequence and
  // rendered at the top; the rest keep their numbering, which stays
  // contiguous because it was always the last block.
  const last = project.blocks[project.blocks.length - 1];
  const outcomes = !soon && last?.label.startsWith("Outcome") ? last : undefined;
  const blocks = outcomes ? project.blocks.slice(0, -1) : project.blocks;

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

        <h1 className="t-section mt-10 max-w-5xl">
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

      {/* ── Outcomes, up front ─────────────────────────────────────── */}
      {outcomes && <Outcomes block={outcomes} stats={project.stats} />}

      {/* ── Project details ────────────────────────────────────────── */}
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
      </section>

      {soon ? <ComingSoon project={project} /> : <FullCase project={project} blocks={blocks} />}

      {/* ── Next ───────────────────────────────────────────────────── */}
      <section className="border-t border-[color:var(--line)]">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="shell py-20 md:py-28">
            <div className="grid12 items-center gap-y-8">
              <div className="col-span-12 lg:col-span-7">
                <span className="t-meta muted-2">Next</span>
                <h2 className="t-section mt-4">
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

/* ── Outcomes band ────────────────────────────────────────────────────
   Figures at display size, one per cell over its own hairline, with the
   written outcome beneath. Where a project has no disclosed numbers the
   band still runs — it just carries the prose. */
function Outcomes({
  block,
  stats,
}: {
  block: ProjectBlock;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="shell mt-16 md:mt-24">
      <RuleDraw />
      <div className="mt-4 flex items-baseline justify-between gap-6">
        <span className="t-meta">{block.label}</span>
        {stats && (
          <span className="t-meta muted-2">{String(stats.length).padStart(2, "0")}</span>
        )}
      </div>

      {stats && (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="rule pt-4">
                <span className="t-numeral block leading-none">
                  <Figure value={s.value} />
                </span>
                <span className="t-body mt-5 block max-w-xs">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {block.body && (
        <div className="grid12 mt-14">
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {block.body.map((para, i) => (
              <p key={i} className="t-body mb-4 max-w-2xl last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Figures arrive as strings — "$70M", "95%+", "3×", "-64%", "AAA" — so the
 * digits are split out and rolled on the site's counter while whatever
 * wraps them stays put. A value with no digits renders as written.
 */
function Figure({ value }: { value: string }) {
  const m = value.match(/^(\D*?)(\d+)(.*)$/);
  if (!m) return <>{value}</>;
  const [, prefix, digits, suffix] = m;

  return (
    <span className="inline-flex items-baseline">
      {prefix && <span className="opacity-50">{prefix}</span>}
      <Counter value={Number(digits)} duration={1.8} />
      {suffix && <span className="opacity-40">{suffix}</span>}
    </span>
  );
}

/* ── Full case study ──────────────────────────────────────────────── */
function FullCase({ project, blocks }: { project: Project; blocks: ProjectBlock[] }) {
  return (
    <>
      <section className="section shell">
        {blocks.map((block) => (
          <Reveal key={block.n} y={22}>
            <div className="tick-rule grid12 gap-y-5 py-10 md:py-14">
              <div className="col-span-12 flex items-baseline gap-4 lg:col-span-4">
                <span className="t-meta muted-2 text-[10px]">({block.n})</span>
                <h2 className="t-lede">
                  <SplitText stagger={0.012}>{block.label}</SplitText>
                </h2>
              </div>

              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                {block.body?.map((para, n) => (
                  <p key={n} className="t-body mb-4 max-w-2xl last:mb-0">
                    {para}
                  </p>
                ))}

                {block.items && (
                  <ul className="mt-5 space-y-2">
                    {block.items.map((it) => (
                      <li key={it} className="t-body flex items-start gap-3">
                        <Plus size={9} className="mt-2 shrink-0 opacity-50" />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}

                {(block.label === "Feature system" || block.label === "Signature moments") &&
                  project.features && (
                    <FeatureGrid label={project.featuresLabel} items={project.features} />
                  )}

                {block.label === "How it was solved" && project.tokens && (
                  <Tokens tokens={project.tokens} typeface={project.typeface} />
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {project.personas && (
        <Personas
          label={project.n === "04" ? "Journey pillars" : "Personas"}
          items={project.personas}
        />
      )}

      <Gallery project={project} />
    </>
  );
}

/* ── Coming soon ──────────────────────────────────────────────────── */
function ComingSoon({ project }: { project: Project }) {
  return (
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

      <Gallery project={project} className="mt-20 md:mt-28" />
    </section>
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

function Tokens({
  tokens,
  typeface,
}: {
  tokens: { name: string; value: string }[];
  typeface?: string;
}) {
  return (
    <div className="mt-10">
      <span className="t-meta muted-2 block">Design tokens</span>
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-5">
        {tokens.map((t) => (
          <div key={t.name} className="flex items-center gap-3">
            <span
              className="hairline block h-7 w-7 shrink-0"
              style={{ background: t.value }}
              aria-hidden
            />
            <span>
              <span className="t-meta block">{t.name}</span>
              <span className="t-meta muted-2 mt-0.5 block">{t.value}</span>
            </span>
          </div>
        ))}
      </div>
      {typeface && (
        <p className="t-meta muted-2 mt-6">
          Typeface: <span className="text-[color:var(--fg)]">{typeface}</span>
        </p>
      )}
    </div>
  );
}

function Personas({ label, items }: { label: string; items: string[] }) {
  return (
    <section className="shell py-16 md:py-24">
      <RuleDraw />
      <span className="t-meta mt-4 block">{label}</span>
      <div className="mt-8 flex flex-wrap gap-2.5">
        {items.map((p) => (
          <span key={p} className="pill t-meta">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
