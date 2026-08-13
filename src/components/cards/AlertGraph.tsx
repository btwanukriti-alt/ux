"use client";

import { motion } from "framer-motion";

const LINE_DELAY = 0.6; // starts as the button's glow is tailing off
const LINE_DURATION = 1.5;
// Fraction of the path's total length reached at the point (134.381, 38.9482),
// where the trend line crosses the dashed threshold line — computed from the
// polyline's segment lengths so the circle pops in exactly when the drawing
// line reaches it, not on a guessed delay.
const CIRCLE_PROGRESS = 0.564;

// Inline (not <img>) so the line can be drawn on with framer-motion instead
// of just appearing. Same path data as the original Figma export.
export function AlertGraph() {
  return (
    <svg width="245.275" height="90.3768" viewBox="0 0 245.275 90.3768" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.115099" y1="38.6216" x2="245.275" y2="38.6216" stroke="#8779AA" strokeDasharray="4 4" />
      <motion.path
        d="M0.115099 89.8902L40.7423 80.2798L71.9938 83.2047L105.589 64.8196L134.381 38.9482L243.878 0.471724"
        stroke="#CFC9FF"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: LINE_DURATION, delay: LINE_DELAY, ease: "easeInOut" }}
      />
      <motion.circle
        cx="134.922"
        cy="38.4439"
        r="3.5"
        fill="#6C98EC"
        stroke="#94CDFF"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: [0, 1.6, 1] }}
        transition={{
          duration: 0.5,
          delay: LINE_DELAY + CIRCLE_PROGRESS * LINE_DURATION,
          times: [0, 0.6, 1],
          ease: "easeOut",
        }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%", filter: "drop-shadow(0 0 4px #94CDFF)" }}
      />
    </svg>
  );
}
