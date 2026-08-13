"use client";

import { animate, useMotionTemplate, useMotionValue, useReducedMotion, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GradientBorderProps {
  className?: string;
  /** "r,g,b" e.g. "191,236,255" */
  color: string;
  width?: number;
  /** seconds per full sweep revolution */
  duration?: number;
  /** seconds to hold at the resting gradient before the sweep starts */
  delay?: number;
  /** opacity of the ring when the sweep highlight isn't passing over it */
  baseOpacity?: number;
  /** peak opacity of the moving highlight */
  sweepOpacity?: number;
  /** "r,g,b" for the flat border to settle into once the sweep finishes — the
   * original, subtle static Figma color, not the bright sweep gradient. When
   * omitted, the ring just stays at the resting sweep gradient (prior behavior). */
  restColor?: string;
  /** opacity of that flat resting border */
  restOpacity?: number;
}

// The single 1px ring (via the mask-composite technique, since CSS `border`
// can't take a gradient) with a highlight that sweeps around it once — a
// "loading" pass. If `restColor` is given, it then crossfades from the
// bright sweep gradient into that flat, subtle color and stays there,
// instead of remaining at the sweep's resting brightness forever. The glow
// comes from a `drop-shadow` filter on this same element — drop-shadow
// follows the ring's actual rendered alpha shape, so it glows without
// drawing a second stroke on top of the original two rectangles.
export function GradientBorder({
  className = "",
  color,
  width = 1,
  duration = 3.5,
  delay = 0,
  baseOpacity = 0.12,
  sweepOpacity = 0.45,
  restColor,
  restOpacity = 0.3,
}: GradientBorderProps) {
  const angle = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSettled(true);
      return;
    }
    const controls = animate(angle, 360, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        if (restColor) setSettled(true);
      },
    });
    return () => controls.stop();
  }, [angle, duration, delay, prefersReducedMotion, restColor]);

  // Symmetric top→bottom fade: at angle 0 (and 360, which looks identical),
  // the brightest point sits at the top and the dimmest at the bottom — the
  // resting position the sweep starts from and returns to. The bright stop
  // only holds briefly (0–12% / 88–100%) before dropping to baseOpacity,
  // which then holds flat across the middle — a narrow hot spot against a
  // wide dim ring reads as a glowing sweep, not a smooth half-and-half fade.
  const background = useMotionTemplate`conic-gradient(from ${angle}deg, rgba(${color},${sweepOpacity}) 0%, rgba(${color},${baseOpacity}) 12%, rgba(${color},${baseOpacity}) 88%, rgba(${color},${sweepOpacity}) 100%)`;
  const restingBackground = `linear-gradient(180deg, rgba(${color},${sweepOpacity}), rgba(${color},${baseOpacity}))`;

  const ringStyle = {
    padding: width,
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  } as const;

  return (
    <>
      <motion.div
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
        style={{
          ...ringStyle,
          background: prefersReducedMotion ? restingBackground : background,
          filter: `drop-shadow(0 0 4px rgba(${color},0.55))`,
        }}
        animate={{ opacity: settled && restColor ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      {restColor && (
        <motion.div
          className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
          style={{ ...ringStyle, background: `rgba(${restColor},${restOpacity})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: settled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </>
  );
}
