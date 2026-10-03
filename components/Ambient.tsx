"use client";

import { useEffect, useRef, useState } from "react";
import { motion, EASE } from "./motion";

const SRC = "/ambient.mp3";
const VOLUME = 0.5;
const KEY = "nnp-ambient";

/**
 * Looping background audio with a visible control.
 *
 * Two constraints shape this. Browsers refuse to start audible playback
 * without a user gesture, so it cannot simply autoplay. And WCAG 1.4.2
 * requires a way to stop anything that plays for more than three
 * seconds, so the toggle is not optional.
 *
 * It therefore starts silent and waits. The first click or key press
 * arms it, and after that the choice is remembered for the session, so
 * moving between pages does not restart the question.
 */
export default function Ambient() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  // Show the control only once the file can actually play, so it never
  // offers sound that is not there.
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = VOLUME;
    const mark = () => setReady(true);
    a.addEventListener("canplay", mark);
    return () => a.removeEventListener("canplay", mark);
  }, []);

  // Resume a session choice, but only on the first gesture, since that is
  // the earliest point the browser will allow it.
  useEffect(() => {
    if (sessionStorage.getItem(KEY) !== "on") return;
    const arm = () => {
      void ref.current?.play().then(() => setOn(true)).catch(() => {});
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
    window.addEventListener("pointerdown", arm, { once: true });
    window.addEventListener("keydown", arm, { once: true });
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
      sessionStorage.setItem(KEY, "off");
      return;
    }
    try {
      a.volume = VOLUME;
      await a.play();
      setOn(true);
      sessionStorage.setItem(KEY, "on");
    } catch {
      // Blocked by the browser. Leave it off rather than pretend.
      setOn(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={SRC} loop preload="auto" aria-hidden />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Turn background sound off" : "Turn background sound on"}
        className="t-meta fixed bottom-6 left-6 z-[70] flex items-center gap-2.5 px-2 py-2 text-white mix-blend-difference md:bottom-8 md:left-8"
        style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none" }}
      >
        {/* Four bars that lift when it plays and lie flat when it does not. */}
        <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="block w-[2px] bg-current"
              animate={on ? { height: [3, 14, 6, 11, 3] } : { height: 3 }}
              transition={
                on
                  ? { duration: 1.1 + i * 0.22, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4, ease: EASE }
              }
            />
          ))}
        </span>
        <span>{on ? "Sound on" : "Sound off"}</span>
      </button>
    </>
  );
}
