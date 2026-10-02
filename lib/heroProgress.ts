import { motionValue } from "motion/react";

/**
 * §4 — the fixed nav fades against the hero's own scroll progress, so the
 * two have to share one value. A module-scoped MotionValue is simpler here
 * than context: the nav is mounted once in the layout, the hero exists on
 * one route, and MotionValues propagate without re-rendering either.
 *
 * `heroMounted` lets the nav fall back to always-visible on every page
 * that has no hero.
 */
export const heroProgress = motionValue(0);
export const heroMounted = motionValue(0);
