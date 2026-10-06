"use client";

import { ParallaxMedia } from "./motion";
import { Plus } from "./Monogram";
import type { Slot } from "@/lib/projects";

/**
 * A labelled image placeholder.
 *
 * Case-study imagery is client-confidential, so nothing real ships until
 * it has been cleared. Each slot states what belongs there and flags
 * itself for white-labelling. Give the slot a `src` and it renders the
 * real thing with the same parallax the rest of the site uses — no other
 * change needed.
 */
export default function MediaSlot({
  slot,
  className = "",
  range = 10,
  priority = false,
  /** Corner keeps the label clear of anything centred over the slot;
   *  none is for slots that carry their own caption. */
  labelPosition = "center",
}: {
  slot: Slot;
  className?: string;
  range?: number;
  priority?: boolean;
  labelPosition?: "center" | "corner" | "none";
}) {
  if (slot.src) {
    return (
      <ParallaxMedia
        src={slot.src}
        alt={slot.label}
        className={className}
        range={range}
        scaleFrom={1.12}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={`grain relative flex items-center justify-center overflow-hidden bg-[#0d0f12] ${className}`}
      role="img"
      aria-label={`${slot.label}, image placeholder`}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 100% at 30% 0%, rgba(255,255,255,0.07), transparent 60%)",
        }}
      />
      <div className="hairline absolute inset-3 md:inset-4" />

      <Plus size={9} className="absolute left-2 top-2 text-white/25" />
      <Plus size={9} className="absolute right-2 top-2 text-white/25" />
      <Plus size={9} className="absolute bottom-2 left-2 text-white/25" />
      <Plus size={9} className="absolute bottom-2 right-2 text-white/25" />

      {labelPosition === "none" ? null : labelPosition === "center" ? (
        <div className="relative max-w-sm px-8 text-center">
          <span className="t-meta block text-white/75">{slot.label}</span>
          <span className="t-meta muted-2 mt-2 block">
            Placeholder: white-label before use
          </span>
        </div>
      ) : (
        <div className="absolute bottom-5 left-5 right-5">
          <span className="t-meta block text-white/75">{slot.label}</span>
          <span className="t-meta muted mt-1 block">Placeholder</span>
        </div>
      )}
    </div>
  );
}
