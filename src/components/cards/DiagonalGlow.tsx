"use client";

import { motion } from "framer-motion";

interface DiagonalGlowProps {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius?: number;
  delay: number;
  duration?: number;
  /** "r,g,b" */
  color?: string;
  peakOpacity?: number;
}

// A very subtle diagonal light sweep across a finished panel, top-left to
// bottom-right, once, then gone. Scoped to the panel's own bounds via an
// overflow-hidden clipping wrapper so it never touches the rest of the card.
export function DiagonalGlow({
  left,
  top,
  width,
  height,
  borderRadius = 6,
  delay,
  duration = 1.3,
  color = "191,236,255",
  peakOpacity = 0.07,
}: DiagonalGlowProps) {
  const bandLength = Math.hypot(width, height) + 200;
  const angle = (Math.atan2(height, width) * 180) / Math.PI;

  return (
    <div className="absolute overflow-hidden pointer-events-none" style={{ left, top, width, height, borderRadius }}>
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: bandLength,
          height: 70,
          marginLeft: -bandLength / 2,
          marginTop: -35,
          rotate: angle,
          background: `linear-gradient(90deg, transparent, rgba(${color},${peakOpacity}), transparent)`,
          filter: "blur(10px)",
        }}
        initial={{ x: -bandLength / 2 - 60, opacity: 0 }}
        animate={{ x: bandLength / 2 + 60, opacity: [0, 1, 1, 0] }}
        transition={{
          x: { duration, delay, ease: "easeInOut" },
          // Opacity is gated to the same window (not just held at 1 the
          // whole time) so the band is guaranteed invisible before/after
          // its sweep, regardless of how the translate+rotate geometry
          // resolves at the edges — it can never "sit there" distractingly.
          opacity: { duration, delay, times: [0, 0.12, 0.82, 1], ease: "easeInOut" },
        }}
      />
    </div>
  );
}
