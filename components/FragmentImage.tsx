"use client";

import { motion } from "motion/react";
import { EASE } from "./motion";

/**
 * Swaps an image in as vertical slices that arrive from alternating
 * directions — the "fragmentation" transition. Each slice paints a portion
 * of the same bitmap via background-position, so the seams close into one
 * continuous photograph once every slice has landed.
 */
export default function FragmentImage({
  src,
  active,
  slices = 7,
  alt = "",
}: {
  src: string;
  active: boolean;
  slices?: number;
  alt?: string;
}) {
  return (
    <div className="absolute inset-0" role="img" aria-label={alt}>
      {Array.from({ length: slices }, (_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full overflow-hidden"
          style={{ left: `${(i * 100) / slices}%`, width: `${100 / slices + 0.15}%` }}
          initial={false}
          animate={{ y: active ? "0%" : i % 2 === 0 ? "-101%" : "101%" }}
          transition={{
            duration: active ? 0.95 : 0.7,
            ease: EASE,
            // Leading edge staggers in; trailing edge staggers out the other way.
            delay: active ? i * 0.045 : (slices - 1 - i) * 0.025,
          }}
        >
          <div
            className="slice absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${slices * 100}% 100%`,
              backgroundPosition: `${slices > 1 ? (i / (slices - 1)) * 100 : 50}% center`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
