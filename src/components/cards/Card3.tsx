"use client";

import { motion } from "framer-motion";
import { AlertGraph } from "./AlertGraph";
import { GradientBorder } from "./GradientBorder";

// Fixed to the exact Figma frame size (358.23 x 340.45), matching Card 1's
// canvas. See node 2358:236009.
export function Card3() {
  return (
    <div className="relative h-[340px] w-[358px] overflow-hidden rounded-[22px] bg-[rgba(86,79,154,0.04)] backdrop-blur-[4.65px]">
      <GradientBorder color="167,191,255" duration={4.2} baseOpacity={0.14} sweepOpacity={0.42} />

      <h3 className="absolute left-[24px] top-[28px] text-lg font-semibold leading-6 text-[#f3f4ff]">
        Never Miss It
      </h3>
      <p className="absolute left-[24px] top-[56px] w-[299px] text-sm font-medium leading-5 text-[#a8aac7]">
        Set a condition once. Jaadu watches the market for you.
      </p>

      <div className="absolute left-[15.5px] top-[126.5px] h-[244px] w-[327px]">
        <div className="absolute inset-0 rounded-[17px]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />
        </div>

        <div className="absolute left-[12px] top-[12px] h-[184px] w-[303px] overflow-hidden rounded-[13px] bg-[rgba(4,1,58,0.14)]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />

          <div className="absolute left-[14px] top-[53px] flex h-[108px] w-[267px] items-center justify-center rounded-[10px] bg-[rgba(110,110,199,0.09)] px-[10px] py-[8px]">
            <AlertGraph />
          </div>

          <motion.div
            className="absolute left-[14.09px] top-[13px] flex items-center gap-1 rounded-[6.59px] border-[0.824px] border-[rgba(255,255,255,0.2)] bg-[rgba(55,81,118,0.15)] px-3 py-1"
            initial={{ boxShadow: "0 0 0px 0px rgba(92,181,255,0)" }}
            animate={{
              boxShadow: [
                "0 0 0px 0px rgba(92,181,255,0)",
                "0 0 14px 1px rgba(92,181,255,0.65)",
                "0 0 0px 0px rgba(92,181,255,0)",
              ],
            }}
            transition={{ duration: 0.9, times: [0, 0.5, 1], ease: "easeInOut" }}
          >
            <img src="/figma/card3/alarm-icon.svg" alt="" className="size-[15.652px]" />
            <span className="whitespace-nowrap text-[9.5px] font-medium text-[#f1f6ff]">Add Alert</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
