"use client";

import { useEffect, useRef, useState } from "react";

const defaultFormat = (n: number) => String(n);

interface AnimatedNumberProps {
  value: number;
  startDelay: number;
  duration: number;
  className?: string;
  format?: (n: number) => string;
}

// Rapid random flicker that lands exactly on `value` once `duration` has
// elapsed — driven by elapsed wall-clock time so a throttled/backgrounded tab
// still lands correctly instead of getting stuck mid-shuffle.
export function ShuffleNumber({ value, startDelay, duration, className, format = defaultFormat }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const lastTick = useRef(0);

  useEffect(() => {
    let raf: number;
    let cancelled = false;
    const startAt = performance.now() + startDelay * 1000;
    const maxVal = Math.pow(10, String(value).length) - 1;

    function tick(now: number) {
      if (cancelled) return;
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startAt;
      if (elapsed >= duration * 1000) {
        setDisplay(value);
        return;
      }
      if (now - lastTick.current > 55) {
        setDisplay(Math.floor(Math.random() * (maxVal + 1)));
        lastTick.current = now;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [value, startDelay, duration]);

  return <span className={className}>{format(display)}</span>;
}

// Quick linear ascend from 0 to `value`.
export function CountUp({ value, startDelay, duration, className, format = defaultFormat }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);

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
      const elapsed = (now - startAt) / 1000;
      const next = Math.min(value, Math.round((elapsed / duration) * value));
      setDisplay(next);
      if (next < value) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [value, startDelay, duration]);

  return <span className={className}>{format(display)}</span>;
}
