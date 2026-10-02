"use client";

import { SplitText, Reveal, RuleDraw } from "./motion";

/**
 * Section opener: the section word at display size with a single hairline
 * drawn beneath it. No numeral — the number and the word sat at opposite
 * ends of the measure with a wide gap between them, which read as two
 * unrelated elements rather than one label.
 */
export default function SectionHead({
  label,
  title,
  intro,
  className = "",
}: {
  label: string;
  title?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <div className="pb-5">
        <h2 className="t-section block">
          <SplitText stagger={0.026}>{label}</SplitText>
        </h2>
      </div>

      <RuleDraw />

      {(title || intro) && (
        <div className="grid12 pt-14 md:pt-20">
          {title && (
            <h3 className="t-lede col-span-12 lg:col-span-6">
              <SplitText stagger={0.014}>{title}</SplitText>
            </h3>
          )}
          {intro && (
            <Reveal delay={0.1} className="col-span-12 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <p className="t-body max-w-md">{intro}</p>
            </Reveal>
          )}
        </div>
      )}
    </header>
  );
}
