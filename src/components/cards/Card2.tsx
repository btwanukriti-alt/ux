"use client";

import { motion } from "framer-motion";
import { Footprint } from "./Footprint";
import { FOOTPRINTS } from "./footprint-data";
import { GradientBorder } from "./GradientBorder";

// Fixed to the exact Figma frame size (358.23 x 340.45), matching Card 1's
// canvas. See node 2351:22179.
export function Card2() {
  return (
    <div className="relative h-[340px] w-[358px] overflow-hidden rounded-[22px] bg-[rgba(86,79,154,0.04)] backdrop-blur-[4.65px]">
      <GradientBorder color="167,191,255" duration={4.2} baseOpacity={0.14} sweepOpacity={0.42} />

      <h3 className="absolute left-[24px] top-[28px] text-lg font-semibold leading-6 text-[#f3f4ff]">
        Inside the Candle
      </h3>
      <p className="absolute left-[24px] top-[56px] w-[219px] text-sm font-medium leading-5 text-[#a8aac7]">
        See bid and ask volume at every price level.
      </p>

      <div className="absolute left-[15.63px] top-[120px] h-[244px] w-[327px]">
        <div className="absolute inset-0 rounded-[17px]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />
        </div>

        <div className="absolute left-[12px] top-[12px] h-[227px] w-[303px] overflow-hidden rounded-[13px] bg-[rgba(4,1,58,0.14)]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />

          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: "50% 50%" }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.8 }}
            transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {FOOTPRINTS.map((fp, i) => (
              <Footprint key={i} data={fp} delay={1.0 + i * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
