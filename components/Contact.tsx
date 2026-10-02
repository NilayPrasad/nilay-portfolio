"use client";

import { useState } from "react";
import { motion, SplitText, Reveal, RuleDraw, EASE } from "./motion";
import { Arrow } from "./Monogram";
import Clock from "./Clock";
import { site } from "@/lib/site";

const BUDGETS = ["< 5k", "5–15k", "15–40k", "40k +"];
const SUBJECTS = ["New project", "Collaboration", "Speaking", "Something else"];

/** §9 — contact, rebranded. No FAQ. */
export default function Contact() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <>
      <header className="shell pt-36 md:pt-44">
        <div className="grid12 items-end gap-y-8">
          <h1 className="t-wordmark col-span-12 lg:col-span-8">
            <SplitText stagger={0.035}>Contact</SplitText>
          </h1>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:pb-5">
            <Reveal delay={0.15}>
              <p className="t-body">
                Tell me what you are building and where it is stuck. I reply to everything within
                two working days.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="section shell">
        <div className="grid12 gap-y-14">
          {/* ── Details ─────────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-3">
            <RuleDraw />
            <span className="t-meta muted-2 mt-4 block">Details</span>

            <dl className="mt-9 space-y-7">
              <div>
                <dt className="t-meta muted-2">Email</dt>
                <dd className="t-row m-0 mt-2">
                  <a href={`mailto:${site.email}`} className="edge-link">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-meta muted-2">Location</dt>
                <dd className="t-row m-0 mt-2">{site.place}</dd>
              </div>
              <div>
                <dt className="t-meta muted-2">Local time</dt>
                <dd className="t-row m-0 mt-2">
                  <Clock />
                </dd>
              </div>
              <div>
                <dt className="t-meta muted-2">Hours</dt>
                <dd className="t-row m-0 mt-2">{site.hours}</dd>
              </div>
            </dl>

            <div className="mt-11">
              <span className="t-meta muted-2 block">Elsewhere</span>
              <ul className="mt-4 space-y-1.5">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="t-meta edge-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Form ────────────────────────────────────────────────── */}
          <div className="rail col-span-12 lg:col-span-8 lg:col-start-5 lg:pl-10">
            <RuleDraw />
            <span className="t-meta muted-2 mt-4 block">Enquiry</span>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="py-20"
              >
                <p className="t-lede max-w-xl">Thank you. Your message is on its way.</p>
                <p className="t-body mt-5">I&rsquo;ll come back to you within two working days.</p>
              </motion.div>
            ) : (
              <form
                className="mt-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  // No backend wired yet — point this at your endpoint.
                  setSent(true);
                }}
              >
                <Field label="Name" name="name" placeholder="Your name" required />
                <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                <Field label="Company" name="company" placeholder="Optional" />

                <Choice label="Subject" options={SUBJECTS} value={subject} onChange={setSubject} />
                <Choice label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />

                <div className="tick-rule py-6">
                  <label htmlFor="message" className="t-meta muted-2 mb-3 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="What are you building?"
                    className="t-lede w-full resize-none bg-transparent outline-none placeholder:opacity-25"
                  />
                </div>

                <label className="mt-8 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden
                    className="hairline-ctl mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center"
                  >
                    <motion.span
                      className="block h-2 w-2 bg-current"
                      initial={false}
                      animate={{ scale: agreed ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  </span>
                  <span className="t-meta muted-2">
                    I agree to the Terms &amp; Conditions and Privacy Policy
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="pill t-meta mt-11 flex w-full items-center justify-between disabled:opacity-30"
                >
                  Send enquiry <Arrow />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="tick-rule py-6">
      <label htmlFor={name} className="t-meta muted-2 mb-3 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="t-lede w-full bg-transparent outline-none placeholder:opacity-25"
      />
    </div>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="tick-rule py-6">
      <legend className="t-meta muted-2 mb-4">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className="t-meta hairline-ctl rounded-full px-4 py-2.5 transition-all duration-500"
              style={{ background: on ? "rgba(255,255,255,0.14)" : "transparent", opacity: on ? 1 : 0.5 }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
