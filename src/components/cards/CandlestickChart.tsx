"use client";

import { motion } from "framer-motion";
import { CANDLESTICK_DATA } from "./candlestick-data";

export function CandlestickChart() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ transformOrigin: "100% 50%" }}
      initial={{ scale: 0.6, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {CANDLESTICK_DATA.map((s, i) => (
        <div key={i}>
          <div
            className="absolute w-[7.043px]"
            style={{ backgroundColor: s.color, left: s.left, top: s.candleTop, height: s.candleH }}
          />
          <div
            className="absolute w-[1.409px]"
            style={{ backgroundColor: s.color, left: s.wickLeft, top: s.wickTop, height: s.wickH }}
          />
        </div>
      ))}
    </motion.div>
  );
}
