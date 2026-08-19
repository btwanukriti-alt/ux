"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypedTextProps {
  text: string;
  startDelay: number;
  charDelay?: number;
  className?: string;
  cursorClassName?: string;
}

// Typewriter reveal with a blinking cursor that disappears once typing ends.
// Driven by elapsed wall-clock time (via requestAnimationFrame) rather than
// counting setInterval ticks, so a throttled/backgrounded tab catches up
// instantly to the correct character count on the next frame instead of
// lagging or appearing stuck when the tab regains focus.
export function TypedText({ text, startDelay, charDelay = 0.028, className, cursorClassName }: TypedTextProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let raf: number;
    let cancelled = false;
    const startAt = performance.now() + startDelay * 1000;

    function tick(now: number) {
      if (cancelled) return;
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setStarted(true);
      const elapsed = (now - startAt) / 1000;
      const next = Math.min(text.length, Math.floor(elapsed / charDelay));
      setCount(next);
      if (next < text.length) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [text, startDelay, charDelay]);

  const done = count >= text.length;

  return (
    <span className={className}>
      {text.slice(0, count)}
      {started && !done && (
        <motion.span
          className={cursorClassName ?? "ml-[2px] inline-block w-[2px] h-[1em] bg-current align-middle"}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      )}
    </span>
  );
}
