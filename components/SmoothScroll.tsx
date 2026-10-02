"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

/**
 * Lenis drives every scroll-linked animation on the site. Framer Motion's
 * `useScroll` reads `window.scrollY`, which Lenis keeps authoritative, so the
 * two cooperate without a ScrollTrigger-style proxy.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices keep native scrolling. iOS momentum and Lenis's own rAF
    // loop fight each other, and the scroll-linked timelines read far more
    // reliably straight off the platform scroller.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Same curve as --ease, so scroll momentum matches element motion.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Route changes must land at the top before the new page's reveals measure.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
