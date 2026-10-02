"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { EASE } from "./motion";

/**
 * §4.4 — fragmentation → resolve → fragment.
 *
 * The frame is skewed into a parallelogram and relaxes to a true rectangle
 * as it reaches the centre of the viewport, then re-skews on the way out.
 * The image inside carries the opposite skew, so the photograph itself
 * stays upright while its container changes shape — the frame fragments,
 * the content does not.
 *
 * On top of that the image parallaxes against the frame and zooms from
 * 1.1 to 1.0 as it settles, so the shot is still moving when it lands.
 */
export default function SkewMedia({
  src,
  alt = "",
  className = "",
  skew = 4,
  drift = 12,
  zoom = 1.12,
  overlay,
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  /** Peak skew in degrees at the edges of the viewport. */
  skew?: number;
  /** Parallax travel as a percentage of frame height. */
  drift?: number;
  zoom?: number;
  overlay?: ReactNode;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Springs take the mechanical edge off the scrub without decoupling it
  // from the scroll position.
  const p = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.6 });

  const frameSkew = useTransform(p, [0, 0.5, 1], [skew, 0, -skew]);
  const imageSkew = useTransform(p, [0, 0.5, 1], [-skew, 0, skew]);
  const y = useTransform(p, [0, 1], [`${-drift}%`, `${drift}%`]);
  const scale = useTransform(p, [0, 0.5, 1], [zoom, 1, zoom]);

  return (
    <motion.div
      ref={ref}
      className={`media group/skew ${className}`}
      style={{ skewY: reduce ? 0 : frameSkew }}
    >
      {/* Oversized so neither the skew nor the drift can expose a corner. */}
      <motion.div
        className="absolute"
        style={{
          skewY: reduce ? 0 : imageSkew,
          y: reduce ? 0 : y,
          scale: reduce ? 1 : scale,
          top: `${-drift - 6}%`,
          bottom: `${-drift - 6}%`,
          left: "-6%",
          right: "-6%",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {overlay}
    </motion.div>
  );
}

/** §4.4 — the frosted "View Project" pill that appears on hover. */
export function ViewProjectPill({ label = "View Project" }: { label?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.span
        className="pill t-meta text-white"
        initial={false}
        variants={{
          rest: { opacity: 0, scale: 0.9, y: 8 },
          hover: { opacity: 1, scale: 1, y: 0 },
        }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {label}
      </motion.span>
    </div>
  );
}
