"use client";

import { motion } from "framer-motion";

function CursorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}>
      <path
        d="M2 1.2L2 13.3L5.3 10.2L7.3 14.6L9.3 13.7L7.3 9.3L11.6 9.2L2 1.2Z"
        fill="#f1f6ff"
        stroke="#0a0e2e"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ClickCursorProps {
  left: number;
  top: number;
  /** when the cursor fades in and starts settling toward its resting position */
  arriveDelay: number;
  /** when the click-pulse (brief scale dip) plays, relative to card mount */
  clickDelay: number;
  /** when the whole cursor fades out again, relative to card mount */
  fadeOutDelay: number;
  fadeOutDuration?: number;
}

// A simulated pointer that fades in near a target, does a quick click-pulse,
// then fades out — used to sell "the UI is clicking this for you" moments.
export function ClickCursor({ left, top, arriveDelay, clickDelay, fadeOutDelay, fadeOutDuration = 0.25 }: ClickCursorProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: fadeOutDuration, delay: fadeOutDelay, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -6, y: -6, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.28, delay: arriveDelay, ease: "easeOut" }}
      >
        <motion.div animate={{ scale: [1, 0.78, 1] }} transition={{ duration: 0.22, delay: clickDelay, ease: "easeInOut" }}>
          <CursorIcon />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
