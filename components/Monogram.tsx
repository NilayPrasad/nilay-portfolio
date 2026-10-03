/**
 * NNP mark — the initials inside a rotated square, standing in for the
 * reference's diamond logotype until a real mark exists.
 */
export default function Monogram({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="NNP"
      role="img"
    >
      <rect
        x="16"
        y="1.5"
        width="20.5"
        height="20.5"
        transform="rotate(45 16 1.5)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M11.4 20V12l4.3 5.4V12M17.9 20V12l4.3 5.4V12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  );
}

/** §2.2 — the small plus marks that sit at block corners. */
export function Plus({ size = 12, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      aria-hidden
    >
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** A block framed by plus marks at all four corners. */
export function PlusFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Plus className="muted-2 absolute -left-1.5 -top-1.5" />
      <Plus className="muted-2 absolute -right-1.5 -top-1.5" />
      <Plus className="muted-2 absolute -bottom-1.5 -left-1.5" />
      <Plus className="muted-2 absolute -bottom-1.5 -right-1.5" />
      {children}
    </div>
  );
}

export function Arrow({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1 6h10M6.5 1.5 11 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* ── Case-study block icons ───────────────────────────────────────────
   Hairline geometry on a 24 box, stroked in currentColor so each one
   inherits whatever the card is doing. Deliberately flat and diagram-like
   rather than illustrative, to sit with the rest of the line-work. */
const ICONS: Record<string, React.ReactNode> = {
  research: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5 L20 20" />
    </>
  ),
  ideation: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
    </>
  ),
  system: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" />
    </>
  ),
  brief: (
    <>
      <path d="M5 3h9l5 5v13H5z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h7" />
    </>
  ),
  structure: (
    <>
      <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
      <path d="M3 12l9 4.5 9-4.5" />
      <path d="M3 16.5L12 21l9-4.5" />
    </>
  ),
  story: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M7 6h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h0" />
    </>
  ),
  moments: (
    <>
      <path d="M12 2.5l2.6 6.3 6.9.5-5.3 4.4 1.7 6.7L12 16.8 6.1 20.4l1.7-6.7L2.5 9.3l6.9-.5z" />
    </>
  ),
  motion: (
    <>
      <path d="M2.5 16c5-11 14-11 19 0" />
      <circle cx="16" cy="9.5" r="2.5" />
      <path d="M2.5 20h19" />
    </>
  ),
};

/** Maps a block label onto an icon. Falls back to the plus mark. */
export function BlockIcon({ label, size = 22 }: { label: string; size?: number }) {
  const k = label.toLowerCase();
  const key = k.includes("research")
    ? "research"
    : k.includes("ideat")
      ? "ideation"
      : k.includes("feature")
        ? "system"
        : k.includes("brief")
          ? "brief"
          : k.includes("structure") || k.includes("architecture")
            ? "structure"
            : k.includes("story") || k.includes("narrative")
              ? "story"
              : k.includes("moment")
                ? "moments"
                : k.includes("motion") || k.includes("craft")
                  ? "motion"
                  : null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {key ? ICONS[key] : <path d="M12 4v16M4 12h16" />}
    </svg>
  );
}
