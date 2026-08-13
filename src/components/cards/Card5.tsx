"use client";

import { motion } from "framer-motion";
import { GradientBorder } from "./GradientBorder";

const TOOLS = [
  { icon: "bold-icon", pad: 2.77 },
  { icon: "italic-icon", pad: 2.77 },
  { icon: "underline-icon", pad: 2.77 },
  { icon: "highlight-icon", pad: 2.77 },
  { icon: "list-icon", pad: 3.435 },
  { icon: "link-icon", pad: 3.435 },
];

const SKELETON_LINES = [
  { top: 101.09, width: 218.139 },
  { top: 109.74, width: 218.139 },
  { top: 118.74, width: 123.122 },
  { top: 130.21, width: 218.139 },
  { top: 139.21, width: 70.571 },
];

const FRAME_APPEAR = 0.5; // "trading journal" frame fades/scales in
const FRAME_BORDER_DELAY = 0.4; // border sweep starts as the frame is finishing appearing
const LINE_FADE_DURATION = 0.25;
const LINE_STAGGER = 0.15;
const LINES_START = 0.85;
const LINES_MIDDLE = LINES_START + 2 * LINE_STAGGER; // toolbar appears alongside the middle (3rd) line
const LINES_END = LINES_START + (SKELETON_LINES.length - 1) * LINE_STAGGER + LINE_FADE_DURATION;

// Fixed to the exact Figma frame size (358.23 x 340.45), matching Card 1's
// canvas. See node 2358:237375.
export function Card5() {
  return (
    <div className="relative h-[340px] w-[358px] overflow-hidden rounded-[22px] bg-[rgba(86,79,154,0.04)] backdrop-blur-[4.65px]">
      <GradientBorder color="167,191,255" duration={4.2} baseOpacity={0.14} sweepOpacity={0.42} />

      <h3 className="absolute left-[24px] top-[28px] text-lg font-semibold leading-6 text-[#f3f4ff]">
        Journal That Answers
      </h3>
      <p className="absolute left-[24px] top-[56px] w-[299px] text-sm font-medium leading-5 text-[#a8aac7]">
        Every entry comes with an AI that knows the trade.
      </p>

      <div className="absolute left-0 top-[131.59px] h-[209px] w-[358px]">
        {/* trading journal frame — appears first, then its border starts the glow sweep */}
        <motion.div
          className="absolute left-[34.56px] top-[12.64px] h-[166.066px] w-[299.363px] rounded-[12px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: FRAME_APPEAR, ease: "easeOut" }}
        >
          <GradientBorder color="191,236,255" duration={3.6} delay={FRAME_BORDER_DELAY} baseOpacity={0.05} sweepOpacity={1} />
        </motion.div>

        {/* masks the frame's border where the book icon cluster sits on top of it */}
        <div className="absolute left-[81.94px] top-[147.01px] size-[45.748px] rounded-[7.038px] bg-[#0a0b1a]" />

        <motion.div
          className="absolute left-[81.94px] top-[147.01px] size-[45.748px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FRAME_APPEAR, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-[7.038px] border-[0.704px] border-[rgba(191,195,255,0.6)] opacity-38" />
          <img
            src="/figma/card5/book-icon.svg"
            alt=""
            className="absolute left-[11.87px] top-[11.87px] size-[22px]"
          />
          <div className="absolute inset-0 rounded-[7.038px] border-[0.704px] border-[rgba(191,203,255,0.3)] opacity-40" />
        </motion.div>

        <motion.div
          className="absolute left-[49.81px] top-[30.41px] flex h-[16px] items-center justify-center rounded-[16px] bg-[rgba(69,255,181,0.1)] px-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        >
          <span className="whitespace-nowrap text-[10px] font-medium leading-none text-[#45ffb5]">
            BTCUSDT
          </span>
        </motion.div>

        <motion.p
          className="absolute left-[51.89px] top-[60px] w-[160.345px] text-[12px] font-medium leading-[16px] text-[#f1f6ff]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65, ease: "easeOut" }}
        >
          Missed the BTCUSDT breakout
        </motion.p>

        {SKELETON_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute left-[51.89px] h-[4px] rounded-[5px] bg-[rgba(78,87,111,0.4)]"
            style={{ top: line.top, width: line.width }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: LINE_FADE_DURATION, delay: LINES_START + i * LINE_STAGGER, ease: "easeOut" }}
          />
        ))}

        <motion.div
          className="absolute left-[302.81px] top-[23.32px] flex w-[22px] flex-col items-center gap-[6px] rounded-[4.357px] border-[0.545px] border-[rgba(255,255,255,0.1)] bg-[rgba(139,154,175,0.1)] px-1 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: LINES_MIDDLE, ease: "easeOut" }}
        >
          {TOOLS.map((tool) => (
            <div
              key={tool.icon}
              className="flex size-[14.161px] shrink-0 items-center justify-center"
              style={{ padding: tool.pad }}
            >
              <img src={`/figma/card5/${tool.icon}.svg`} alt="" className="size-full" />
            </div>
          ))}
        </motion.div>

        <motion.div
          className="absolute left-[208.81px] top-[5.32px] flex w-[78px] items-center justify-center gap-[3.168px] rounded-[17.427px] border-[0.792px] border-[rgba(255,255,255,0.1)] bg-[#141D4A] py-[3.168px] backdrop-blur-[20px]"
          style={{ boxShadow: "0px 0px 12.753px 0px rgba(0,7,156,0.12)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: LINES_END, ease: "easeOut" }}
        >
          <GradientBorder color="92,181,255" duration={3.6} delay={LINES_END} baseOpacity={0.15} sweepOpacity={1} />
          <img src="/figma/card5/ai-icon.svg" alt="" className="size-[14.258px]" />
          <span className="whitespace-nowrap text-[7.921px] font-medium leading-[9.505px] text-[#f1f6ff]">
            Chat with AI
          </span>
        </motion.div>
      </div>
    </div>
  );
}
