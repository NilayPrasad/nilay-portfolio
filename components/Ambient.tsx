"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, EASE } from "./motion";

const SRC = "/ambient.mp3";
const VOLUME = 0.5;
const KEY = "nnp-ambient";

/**
 * Looping background audio, on by default, with a visible control.
 *
 * It cannot literally autoplay: browsers reject audible playback until
 * the visitor has interacted with the page. So this wants to play from
 * the start, tries immediately, and if the browser refuses it waits and
 * takes the first real interaction instead. In practice sound arrives on
 * the first click, tap, or key press.
 *
 * Two states are tracked separately on purpose. `wanted` is the visitor's
 * intent and `playing` is the truth from the element, so the control can
 * never claim sound is on while the browser is still holding it back.
 *
 * An explicit opt-out persists, because someone who turned this off once
 * should not have to do it again. WCAG 1.4.2 wants a stop mechanism for
 * anything running past three seconds; the toggle is it.
 */
export default function Ambient() {
  const ref = useRef<HTMLAudioElement>(null);
  const [wanted, setWanted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Truth comes from the element, not from what we asked it to do.
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = VOLUME;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onReady = () => setReady(true);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("canplay", onReady);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("canplay", onReady);
    };
  }, []);

  // A previous opt-out wins over the default.
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "off") setWanted(false);
    } catch {
      /* storage can be unavailable; the default stands */
    }
  }, []);

  const start = useCallback(async () => {
    const a = ref.current;
    if (!a) return false;
    try {
      a.volume = VOLUME;
      await a.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  // Try now; if the browser refuses, take the first interaction instead.
  useEffect(() => {
    if (!wanted || playing) return;
    let cancelled = false;
    let cleanup = () => {};

    void start().then((ok) => {
      if (ok || cancelled) return;
      const arm = async () => {
        if (await start()) off();
      };
      const off = () => {
        window.removeEventListener("pointerdown", arm);
        window.removeEventListener("keydown", arm);
        window.removeEventListener("touchstart", arm);
      };
      window.addEventListener("pointerdown", arm);
      window.addEventListener("keydown", arm);
      window.addEventListener("touchstart", arm);
      cleanup = off;
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [wanted, playing, start]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (wanted) {
      a.pause();
      setWanted(false);
      try {
        localStorage.setItem(KEY, "off");
      } catch {
        /* no storage, the choice holds for this page only */
      }
    } else {
      setWanted(true);
      try {
        localStorage.setItem(KEY, "on");
      } catch {
        /* as above */
      }
      void start();
    }
  };

  return (
    <>
      <audio ref={ref} src={SRC} loop preload="auto" aria-hidden />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={wanted}
        aria-label={wanted ? "Turn background sound off" : "Turn background sound on"}
        className="t-meta fixed bottom-6 left-6 z-[70] flex items-center gap-2.5 px-2 py-2 text-white mix-blend-difference md:bottom-8 md:left-8"
        style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none" }}
      >
        {/* Four bars: lifting while it plays, flat when it is not. */}
        <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="block w-[2px] bg-current"
              animate={playing ? { height: [3, 14, 6, 11, 3] } : { height: 3 }}
              transition={
                playing
                  ? { duration: 1.1 + i * 0.22, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4, ease: EASE }
              }
            />
          ))}
        </span>
        {/* Text follows intent so it always matches what a click will do;
            the bars follow reality, which is still silent until the browser
            lets the first note through. */}
        <span>{wanted ? "Sound on" : "Sound off"}</span>
      </button>
    </>
  );
}
