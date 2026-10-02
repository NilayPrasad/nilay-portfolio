/**
 * The NNP mark.
 *
 * Drawn as a CSS mask over `currentColor` rather than an <img>: the
 * supplied artwork is a flat silhouette, and masking lets it inherit the
 * text colour wherever it sits. That matters here — the header blends
 * with `mix-blend-difference`, and the Method section is a light panel,
 * so a fixed-colour bitmap would go invisible on one of them.
 */
export default function Logo({
  height = 16,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  // Intrinsic 614 × 354 from the artwork's alpha bounding box.
  const ASPECT = 614 / 354;

  return (
    <span
      role="img"
      aria-label="NNP"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height,
        width: height * ASPECT,
        WebkitMaskImage: "url(/logo.png)",
        maskImage: "url(/logo.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
