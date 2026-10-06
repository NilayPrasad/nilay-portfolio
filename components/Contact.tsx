"use client";

import { useState } from "react";
import { motion, SplitText, Reveal, RuleDraw, EASE } from "./motion";
import { Arrow } from "./Monogram";
import Clock from "./Clock";
import { site } from "@/lib/site";

const BUDGETS = ["< 5k", "5-15k", "15-40k", "40k +"];
const SUBJECTS = ["New project", "Collaboration", "Speaking", "Something else"];

/** §9 — contact, rebranded. No FAQ. */
export default function Contact() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  /* If the server has no mail credentials it says so rather than pretending,
     and we hand the message to the visitor's own mail client. Better than a
     success screen over a message that went nowhere. */
  const handoff = (d: Record<string, string>) => {
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Company: ${d.company || "—"}`,
      `Subject: ${d.subject}`,
      `Budget: ${d.budget || "—"}`,
      "",
      d.message,
    ].join("\n");
    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent(`${d.subject} — ${d.name}`)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      message: String(form.get("message") || ""),
      website: String(form.get("website") || ""),
      subject,
      budget,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));

      if (res.ok && out.ok) {
        setSent(true);
      } else if (out.configured === false) {
        handoff(data);
        setSent(true);
      } else {
        setError(out.error || "Something went wrong. Please email me directly.");
      }
    } catch {
      setError("Network error. Please email me directly.");
    } finally {
      setBusy(false);
    }
  }

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
                  <a href={`mailto:${site.email}`} className="edge-link inline-block py-1">
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
                    <a href={s.href} target="_blank" rel="noreferrer" className="t-meta edge-link inline-block py-1.5">
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
              <form className="mt-10" onSubmit={onSubmit}>
                {/* Honeypot: off-screen for sighted users, hidden from the
                    a11y tree, and never autofilled. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                />
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
                    className="t-lede w-full resize-none bg-transparent outline-none placeholder:opacity-45"
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

                {error && (
                  <p role="alert" className="t-body mt-8 text-white">
                    {error}{" "}
                    <a href={`mailto:${site.email}`} className="edge-link inline-block py-1">
                      {site.email}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!agreed || busy}
                  aria-busy={busy}
                  className="pill t-meta mt-11 flex w-full items-center justify-between disabled:opacity-30"
                >
                  {busy ? "Sending…" : "Send enquiry"} <Arrow />
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
        className="t-lede w-full bg-transparent outline-none placeholder:opacity-45"
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
