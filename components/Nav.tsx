"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion, useTransform, useMotionValueEvent, SplitText, EASE } from "./motion";
import { heroProgress, heroMounted } from "@/lib/heroProgress";
import Logo from "./Logo";
import { Arrow } from "./Monogram";
import { nav, site } from "@/lib/site";

/**
 * Fixed bar: monogram left, email centred, MENU right, full-width
 * hairline beneath. §4.10 — the overlay wipes down from the top edge and
 * the links stagger in behind it, carrying the same L-tick underlines.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      // Never leave the close button parked off-screen.
      setHidden(false);
      return;
    }
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 140 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // §4 — visible at rest, gone while the statement holds the screen, back
  // once the hero releases. Pages with no hero keep it visible throughout.
  const heroFade = useTransform(heroProgress, [0.1, 0.22, 0.9, 1], [1, 0, 0, 1]);
  const navOpacity = useTransform<number, number>(
    [heroMounted, heroFade],
    ([mounted, fade]) => (mounted > 0.5 ? fade : 1)
  );
  const navPointer = useTransform(navOpacity, (v) => (v < 0.05 ? "none" : "auto"));

  // Inside the hero, §4's opacity curve owns the bar's visibility. The
  // hide-on-scroll-down below would otherwise translate it away and swallow
  // the scripted return at the end of the sequence.
  const [inHero, setInHero] = useState(false);
  useMotionValueEvent(heroProgress, "change", (v) => {
    const mounted = heroMounted.get() > 0.5;
    setInHero(mounted && v < 0.999);
    // Reaching the end of the hero means scrolling *down*, which has
    // already latched `hidden`. Clear it once, as the sequence releases,
    // so §4's scripted return actually lands. The value stops emitting at
    // 1, so this fires on the transition only and normal hide-on-scroll
    // resumes for the rest of the page.
    if (mounted && v >= 0.999) setHidden(false);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Frosted panel behind the bar.
          It has to be a sibling at a lower z-index, not a child: the bar
          blends with `mix-blend-difference` so it stays legible over both
          the dark sections and the light Method panel, and an ancestor or
          wrapper would trap that blend inside the header's own stacking
          context. Masked at the bottom so there's no hard edge. */}
      {!open && (
        <motion.div
          aria-hidden
          className="safe-t pointer-events-none fixed inset-x-0 top-0 z-[55] h-32 box-content backdrop-blur-xl"
          animate={{ y: hidden ? "-110%" : "0%" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            opacity: navOpacity,
            WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent)",
            maskImage: "linear-gradient(to bottom, black 55%, transparent)",
          }}
        />
      )}

      <motion.header
        className="fixed inset-x-0 top-0 z-[60] mix-blend-difference"
        animate={{ y: hidden && !open && !inHero ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ opacity: open ? 1 : navOpacity, pointerEvents: open ? "auto" : navPointer }}
      >
        <div className="safe-t relative h-24 box-content text-white">
          <Link
            href="/"
            aria-label={`${site.fullName}, home`}
            className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-3 py-3 md:left-8"
          >
<Logo height={22} />
          </Link>

          {/* The flip needs an 18px clipper, which is under the 24px minimum
              touch target. The clipper moved to an inner span so the button
              itself can carry padding and grow the hit area invisibly. */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="t-meta absolute right-6 top-1/2 -translate-y-1/2 px-2 py-3 text-[15px] text-white md:right-6"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="block h-[18px] overflow-hidden">
              <motion.span
                className="flex flex-col"
                animate={{ y: open ? "-50%" : "0%" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="block h-[18px] leading-[18px]">Menu</span>
                <span className="block h-[18px] leading-[18px]">Close</span>
              </motion.span>
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-black text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="shell flex flex-1 flex-col justify-center pt-28 pb-10">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group tick-rule block">
                      <div className="flex items-baseline gap-5 py-4 md:gap-10 md:py-6">
                        <span className="t-meta w-8 shrink-0">{item.index}</span>
                        <span className="t-section block">
                          <SplitText delay={0.28 + i * 0.07} stagger={0.02}>
                            {item.label}
                          </SplitText>
                        </span>
                        <span className="t-meta ml-auto hidden translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-70 md:flex md:items-center md:gap-2">
                          {pathname === item.href ? "Current" : "View"} <Arrow />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              className="safe-b shell flex flex-wrap items-end justify-between gap-6 pb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            >
              <a href={`mailto:${site.email}`} className="t-meta edge-link text-white">
                {site.email}
              </a>
              <ul className="flex flex-wrap gap-5">
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
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
