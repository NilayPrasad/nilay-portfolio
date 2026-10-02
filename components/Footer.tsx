"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, SplitText } from "./motion";
import ShaderField from "./ShaderField";
import Logo from "./Logo";
import { Arrow } from "./Monogram";
import Clock from "./Clock";
import { nav, site } from "@/lib/site";

/**
 * §4.9 — exactly one viewport tall. The content is a 100dvh flex column
 * so nothing here can ever push the page past the fold, and the field
 * holds still while the page above slides off it.
 */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "0%"]);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative h-[100dvh] overflow-hidden bg-black text-white">
      <ShaderField opacity={0.5} />
      <div className="absolute inset-0 bg-black/55" />

      <motion.div style={{ y }} className="relative flex h-full flex-col">
        <div className="shell flex flex-1 flex-col justify-center pt-24">
          <div className="grid12 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-8">
              <span className="t-meta text-white/60 mb-5 block">Next</span>
              <h2 className="t-section">
                <SplitText stagger={0.022}>Let&rsquo;s Work</SplitText>
                <br />
                <SplitText stagger={0.022} delay={0.12}>
                  Together
                </SplitText>
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:pb-3">
              <p className="t-body max-w-md">
                Available for select projects from Q1 {year + 1}. Tell me what you are building and
                where it is stuck.
              </p>
              <Link href="/contact" className="pill t-meta mt-7 inline-flex text-white">
                Start a project <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <div className="shell">
          <div className="rule grid12 gap-y-7 py-8">
            <div className="col-span-6 lg:col-span-3">
              <span className="t-meta muted-2 mb-3 block">Contact</span>
              <a href={`mailto:${site.email}`} className="t-meta edge-link text-white">
                {site.email}
              </a>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <span className="t-meta muted-2 mb-3 block">Menu</span>
              <ul className="space-y-1.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="t-meta edge-link text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <span className="t-meta muted-2 mb-3 block">Elsewhere</span>
              <ul className="space-y-1.5">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="t-meta edge-link text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <span className="t-meta muted-2 mb-3 block">Local</span>
              <p className="t-meta text-white">
                <Clock />
              </p>
              <p className="t-meta muted-2 mt-1.5">{site.hours}</p>
            </div>
          </div>
        </div>

        <div className="shell rule flex items-center justify-between gap-4 py-5">
          <span className="flex items-center gap-3">
<Logo height={16} />
          </span>
          <span className="t-meta muted-2 hidden md:block">
            &copy; {year} {site.fullName}
          </span>
          <span className="t-meta muted-2">All rights reserved</span>
        </div>
      </motion.div>
    </footer>
  );
}
