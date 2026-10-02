"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * §3 — type that fills its container edge to edge.
 *
 * A clamp() can't do this: the right size depends on how many glyphs the
 * string has, so "NNP" and "METHOD" need very different vw values. This
 * measures the rendered text once and solves for the font-size that makes
 * it exactly as wide as the box, then re-solves on resize and after the
 * webfont swaps in (the fallback metrics are always wrong).
 */
export default function FitText({
  children,
  className = "",
  as: Tag = "span",
  maxSize = 900,
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "div";
  maxSize?: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const sizeRef = useRef(120);
  const [size, setSize] = useState(120);

  const fit = useCallback(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const avail = box.clientWidth;
    const current = text.getBoundingClientRect().width;
    if (!avail || !current) return;

    // Trimmed a hair under the exact solve: a fitted line that lands at
    // 100.1% of the box wraps or spills, and iOS resolves fonts.ready before
    // the face is guaranteed to be applied, so the metrics can be off.
    const next = Math.min(maxSize, (sizeRef.current * avail * 0.998) / current);
    // Skip sub-pixel churn, otherwise the observer can trade blows with itself.
    if (Math.abs(next - sizeRef.current) < 0.3) return;
    sizeRef.current = next;
    setSize(next);
  }, [maxSize]);

  useLayoutEffect(() => {
    fit();
    // A second pass lands it exactly — the first measured the old size.
    const raf = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(raf);
  });

  useEffect(() => {
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [fit]);

  const Wrapper = Tag as "span";

  return (
    <div ref={boxRef} className="w-full">
      <Wrapper
        className={`block whitespace-nowrap ${className}`}
        style={{ fontSize: `${size}px`, lineHeight: 0.78, letterSpacing: "-0.03em" }}
      >
        <span ref={textRef} className="inline-block">
          {children}
        </span>
      </Wrapper>
    </div>
  );
}
