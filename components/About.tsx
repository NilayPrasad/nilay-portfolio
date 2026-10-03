"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  SplitText,
  Reveal,
  RuleDraw,
  Counter,
} from "./motion";
import SectionHead from "./SectionHead";
import KeyFeatures from "./KeyFeatures";
import Method from "./Method";
import MediaSlot from "./MediaSlot";
import { Plus } from "./Monogram";
import {
  site,
  profile,
  aboutStats,
  experience,
  awards,
  certifications,
  education,
  capabilities,
} from "@/lib/site";

/**
 * The about page is the credentials view, so it is the one surface where
 * real employer and client names appear. Case studies stay white-labelled.
 * Order follows the CV: profile, experience, how the practice
 * works, recognition, certifications, education, capabilities.
 */
export default function About() {
  return (
    <>
      <AboutHero />
      <Profile />
      <Experience />
      <KeyFeatures />
      <Method />
      <Awards />
      <Certifications />
      <Education />
      <Capabilities />
    </>
  );
}

function AboutHero() {
  return (
    <header className="shell pt-36 md:pt-44">
      <div className="grid12 items-end gap-y-8">
        <h1 className="t-wordmark col-span-12 lg:col-span-9">
          <SplitText stagger={0.03}>About</SplitText>
        </h1>
        <div className="col-span-12 lg:col-span-3 lg:pb-5">
          <Reveal delay={0.15}>
            <span className="t-meta muted-2 block">Working since</span>
            <span className="t-lede mt-2 block">2020</span>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.2} className="mt-14 md:mt-20">
        <p className="t-lede max-w-4xl">
          I am {site.fullName}. I spend most of my time on the part of the work nobody
          photographs: deciding what a thing is for, and framing the information so a person, or a
          model, can act on it.
        </p>
      </Reveal>
    </header>
  );
}

/* ── 01 / Profile — portrait, lead, and the stat block ───────────────── */
function Profile() {
  return (
    <section className="section shell">
      <SectionHead label={profile.label} />

      <div className="grid12 mt-16 gap-y-12 md:mt-24">
        <div className="col-span-12 lg:col-span-5">
          <div className="media aspect-[4/5] w-full">
            <MediaSlot
              slot={profile.photo}
              className="absolute inset-0 h-full w-full"
              labelPosition="none"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4">
              <span className="t-meta text-white/80">{site.initials}</span>
              <span className="t-meta text-white/80">01 / 01</span>
            </div>
          </div>
        </div>

        <div className="rail col-span-12 lg:col-span-6 lg:col-start-7 lg:pl-10">
          <Reveal>
            <span className="t-meta muted-2 block">{profile.role}</span>
            {profile.lead.map((para, n) => (
              <p key={n} className="t-body mt-5 max-w-xl first:mt-6">
                {para}
              </p>
            ))}
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9">
            {aboutStats.map((s, n) => (
              <Reveal key={s.label} delay={n * 0.07}>
                <div className="rule pt-3">
                  <span className="t-numeral flex items-baseline leading-none">
                    <Counter value={s.value} duration={1.6} />
                    <span className="opacity-40">{s.suffix}</span>
                  </span>
                  <span className="t-meta mt-4 block">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 02 / Experience — the CV proper, real names ─────────────────────
   Timeline used to sit below this as its own section, but every beat on
   it belonged to one of these roles. Merged: the beat's name sits with
   the role, its reflection closes the entry, and the drawn rule that
   made the timeline read as a timeline now runs down this list. */
function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="shell">
      <RuleDraw />
      <h2 className="t-meta mt-4 block">Experience</h2>

      <div ref={ref} className="relative mt-10">
        <motion.div
          className="absolute left-0 top-6 hidden w-px origin-top bg-current opacity-20 lg:block"
          style={{ height: "calc(100% - 3rem)", scaleY: line }}
          aria-hidden
        />

        <ul className="lg:pl-10">
          {experience.map((role, n) => (
            <li key={role.org}>
              <Reveal delay={n * 0.05} y={20}>
                <div className="tick-rule grid12 gap-y-4 py-9">
                  <div className="col-span-12 lg:col-span-4">
                    <h3 className="t-row">
                      <SplitText stagger={0.012}>{role.org}</SplitText>
                    </h3>
                    <span className="t-meta mt-3 block">{role.role}</span>
                    <span className="t-meta muted-2 mt-1.5 block">{role.phase}</span>
                  </div>

                  <div className="col-span-12 lg:col-span-6 lg:col-start-5">
                    <p className="t-body m-0 max-w-xl">{role.body}</p>
                    <p className="t-body muted-2 m-0 mt-4 max-w-xl">{role.note}</p>
                  </div>

                  <span className="t-meta muted-2 col-span-12 lg:col-span-2 lg:justify-self-end">
                    {role.year}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 03 / Awards ─────────────────────────────────────────────────────── */
function Awards() {
  return (
    <section className="section shell">
      <SectionHead
        label="Awards"
        title="Recognition"
        intro="Recognition from the teams and clients the work was delivered with."
      />

      <ul className="mt-16 md:mt-24">
        {awards.map((a, n) => (
          <li key={a.title}>
            <Reveal delay={n * 0.05} y={16}>
              <div className="group tick-rule grid12 items-baseline gap-y-2 py-6">
                <span className="t-meta muted-2 col-span-2 lg:col-span-1">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <h3 className="t-row col-span-10 lg:col-span-6">
                  {a.title}
                  {a.note && <span className="t-meta muted-2 ml-3">{a.note}</span>}
                </h3>
                <span className="t-meta muted-2 col-span-6 lg:col-span-3">{a.org}</span>
                <span className="t-meta muted-2 col-span-6 justify-self-end lg:col-span-2">
                  {a.year}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── 04 / Certifications ─────────────────────────────────────────────── */
function Certifications() {
  return (
    <section className="shell">
      <SectionHead
        label="Certified"
        title="Formally Verified"
        intro="Where the learning was structured enough to leave a paper trail."
      />

      <div className="grid12 mt-16 gap-y-9 md:mt-24">
        {certifications.map((c, n) => (
          <Reveal key={c.title} delay={n * 0.05} className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="rule flex h-full flex-col pt-4">
              {/* Issuer and year are blank where the CV did not record
                  them, so the row collapses rather than inventing one. */}
              <div className="t-meta muted-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <Plus size={9} /> {c.org}
                </span>
                <span>{c.year}</span>
              </div>
              <h3 className="t-row mt-9">{c.title}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── 05 / Education ──────────────────────────────────────────────────── */
function Education() {
  return (
    <section className="section shell">
      <RuleDraw />
      <h2 className="t-meta mt-4 block">Education</h2>

      <ul className="mt-8">
        {education.map((e, n) => (
          <li key={e.title}>
            <Reveal delay={n * 0.06}>
              <div className="tick-rule grid12 items-baseline gap-y-2 py-6">
                <span className="t-row col-span-12 lg:col-span-5">{e.title}</span>
                <span className="t-meta muted-2 col-span-12 lg:col-span-3">{e.org}</span>
                <span className="t-meta muted-2 col-span-6 lg:col-span-2">{e.field}</span>
                <span className="t-meta muted-2 col-span-6 justify-self-end lg:col-span-2">
                  {e.year}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── 06 / Capabilities — skills, tools, languages ────────────────────── */
function Capabilities() {
  return (
    <section className="shell pb-24 md:pb-32">
      <RuleDraw />
      <h2 className="t-meta mt-4 block">Capabilities</h2>

      <div className="grid12 mt-10 gap-y-12">
        {capabilities.map((group, n) => (
          <Reveal
            key={group.title}
            delay={n * 0.07}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <span className="t-sub block">{group.title}</span>
            <ul className="mt-5">
              {group.items.map((item) => (
                <li key={item} className="tick-rule py-3">
                  <span className="t-body">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
