"use client";

import { motion } from "framer-motion";
import { GradientBorder } from "./GradientBorder";

const WIDGET_BOXES = [
  { left: 48.55, top: 76.99, color: "rgba(107,134,210,0.24)" }, // 1: top-left
  { left: 182.49, top: 76.99, color: "rgba(76,211,193,0.24)" }, // 2: top-right
  { left: 48.86, top: 121.17, color: "rgba(76,211,193,0.24)" }, // 3: bottom-left
  { left: 182.49, top: 121.17, color: "rgba(107,134,210,0.24)" }, // 4: bottom-right
];

const glowPulse = {
  initial: { boxShadow: "0 0 0px 0px rgba(191,195,255,0)" },
  animate: {
    boxShadow: [
      "0 0 0px 0px rgba(191,195,255,0)",
      "0 0 12px 1px rgba(191,195,255,0.7)",
      "0 0 0px 0px rgba(191,195,255,0)",
    ],
  },
  transition: { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" as const },
};

// Fixed to the exact Figma frame size (358.23 x 340.45), matching Card 1's
// canvas. See node 2358:236826.
export function Card4() {
  return (
    <div className="relative h-[340px] w-[358px] overflow-hidden rounded-[22px] bg-[rgba(86,79,154,0.04)] backdrop-blur-[4.65px]">
      <GradientBorder color="167,191,255" duration={4.2} baseOpacity={0.14} sweepOpacity={0.42} />

      <h3 className="absolute left-[24px] top-[28px] text-lg font-semibold leading-6 text-[#f3f4ff]">
        Answers That Update
      </h3>
      <p className="absolute left-[24px] top-[56px] w-[299px] text-sm font-medium leading-5 text-[#a8aac7]">
        Ask about any asset. The answer comes back live, and stays live.
      </p>

      <div className="absolute left-0 top-[109.59px] h-[202px] w-[358px]">
        {/* skeleton widget bars — first two thin bars, then the four boxes, one by one */}
        <motion.div
          className="absolute left-[48.55px] top-[54.86px] h-[6px] w-[76.201px] rounded-[2px] bg-[rgba(159,175,219,0.7)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="absolute left-[48.55px] top-[65.67px] h-[4px] w-[76.201px] rounded-[1px] bg-[rgba(103,118,160,0.65)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75, ease: "easeOut" }}
        />
        {WIDGET_BOXES.map((box, i) => (
          <motion.div
            key={i}
            className="absolute h-[35.118px] w-[124.627px] rounded-[6px]"
            style={{ left: box.left, top: box.top, backgroundColor: box.color }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.15, ease: "easeOut" }}
          />
        ))}

        {/* chat bubble outline — single animated stroke, replacing the flat static export */}
        <div className="absolute left-[29.32px] top-[23.42px] h-[166.066px] w-[299.363px] rounded-[12px]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />
        </div>

        {/* masks the outline's border where the chat icon cluster sits on top of it —
            needs to be opaque to actually hide the line beneath, not just tinted */}
        <div className="absolute left-[157.19px] top-[0.55px] size-[45.748px] rounded-[7.038px] bg-[#0a0b1a]" />

        {/* chatbot visual */}
        <div className="absolute left-[157.19px] top-[0.55px]">
          <motion.div
            className="absolute left-[6.69px] top-[6.68px] flex size-[32.375px] items-center justify-center rounded-[8px] border-[0.704px] border-[rgba(191,195,255,0.6)] p-[5.63px]"
            {...glowPulse}
          >
            <img src="/figma/card4/chat-ai-icon.svg" alt="" className="size-[18.299px]" />
          </motion.div>
          <motion.div
            className="absolute left-[2.8px] top-[3.08px] h-[39.582px] w-[40.144px] rounded-[7.038px] border-[0.704px] border-[rgba(191,195,255,0.6)]"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.38, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-0 top-0 size-[45.748px] rounded-[7.038px] border-[0.704px] border-[rgba(191,203,255,0.3)]"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          />
        </div>

        <div className="absolute left-[85.83px] top-[176.97px] h-[25.026px] w-[188.831px] overflow-hidden rounded-[8px] bg-[#050722] backdrop-blur-[20px]">
          <GradientBorder color="92,181,255" duration={3.6} delay={1.5} baseOpacity={0.15} sweepOpacity={1} />
          <div className="absolute left-[7.39px] top-[6.26px] size-[12.513px]">
            <div className="absolute inset-[9.38%_12.5%]">
              <div className="absolute inset-[-4.2%_-4.55%]">
                <img src="/figma/card4/cube-icon-1.svg" alt="" className="size-full" />
              </div>
            </div>
            <div className="absolute inset-[30.08%_13.48%_9.38%_13.48%]">
              <div className="absolute inset-[-5.63%_-4.67%]">
                <img src="/figma/card4/cube-icon-2.svg" alt="" className="size-full" />
              </div>
            </div>
          </div>
          <span className="absolute left-[25.59px] top-[8.53px] whitespace-nowrap text-[6.825px] text-[#a7bce4]">
            Ask Anything..
          </span>
          <div className="absolute left-[164.37px] top-[2.28px] flex items-center px-[5.119px] py-[4.55px]">
            <img src="/figma/card4/send-icon.svg" alt="" className="size-[11.944px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
