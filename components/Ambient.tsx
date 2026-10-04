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
  //
  // The control shows once the page is live and hides only if the file
  // fails. Waiting for `canplay` instead left it missing in two cases: a
  // cached file can fire `canplay` before this listener exists, and iOS
  // loads no audio before a gesture, so anyone who had opted out never
  // got the control back to opt in again.
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = VOLUME;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setReady(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("error", onError);
    setReady(!a.error);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("error", onError);
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
        /* On a phone, blended text in the corner lands on top of the copy
           it is meant to sit beside, so it becomes a contained icon button
           clear of the home indicator. From md up there is margin to spare
           and it stays a bare, blended label. */
        className="t-meta fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md md:bottom-8 md:left-8 md:right-auto md:h-auto md:w-auto md:gap-2.5 md:rounded-none md:border-0 md:bg-transparent md:p-2 md:mix-blend-difference md:backdrop-blur-none"
        style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none" }}
      >
        {/* Without its label, four flat bars read as a "more" ellipsis, so
            the phone button carries a speaker instead, following intent
            like the label does. */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="md:hidden" aria-hidden>
          <path d="M2.5 6.75h2.75L9 3.5v11l-3.75-3.25H2.5z" fill="currentColor" />
          {wanted ? (
            <path
              d="M11.75 6.5a3.5 3.5 0 0 1 0 5M13.75 4.5a6.25 6.25 0 0 1 0 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          ) : (
            <path d="M11.5 7l4 4M15.5 7l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          )}
        </svg>

        {/* Four bars: lifting while it plays, flat when it is not. */}
        <span className="hidden h-3.5 items-end gap-[2px] md:flex" aria-hidden>
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
        <span className="hidden md:inline">{wanted ? "Sound on" : "Sound off"}</span>
      </button>
    </>
  );
}
