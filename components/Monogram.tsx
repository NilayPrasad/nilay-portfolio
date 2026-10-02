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
