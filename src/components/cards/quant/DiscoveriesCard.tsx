"use client";

import { motion } from "framer-motion";
import { ClickCursor } from "../ClickCursor";
import { ShuffleNumber, CountUp } from "../AnimatedNumbers";

// Figma node 2664:227010 — "Visual Overnight Discoveries"

// --- Timeline -----------------------------------------------------------------
const BUTTON_APPEAR_DURATION = 0.3;

const CURSOR_ARRIVE = 0.6;
const CURSOR_CLICK = 1.1;
const CURSOR_FADE_OUT_DELAY = 1.35;
const CURSOR_FADE_OUT_DURATION = 0.25;

const BUTTON_FADE_OUT_DELAY = CURSOR_CLICK + 0.05;
const BUTTON_FADE_OUT_DURATION = 0.25;
const BUTTON_TOTAL_SPAN = BUTTON_FADE_OUT_DELAY + BUTTON_FADE_OUT_DURATION;

const POPOVER_DELAY = BUTTON_FADE_OUT_DELAY + 0.15;
const POPOVER_APPEAR_DURATION = 0.3;

const PANEL_DELAY = POPOVER_DELAY + 0.1;
const PANEL_APPEAR_DURATION = 0.3;

const SHUFFLE_DELAY = POPOVER_DELAY + POPOVER_APPEAR_DURATION + 0.1;
const SHUFFLE_DURATION = 1.1;

const SURVIVED_DELAY = SHUFFLE_DELAY + SHUFFLE_DURATION + 0.1;
const SURVIVED_APPEAR_DURATION = 0.3;

// The funnel + its column numbers animate concurrently with the popover's
// number shuffle, not after it.
const FUNNEL_WIPE_DELAY = SHUFFLE_DELAY;
const FUNNEL_WIPE_DURATION = 1.4;

const STRATEGIES_START = Math.max(SURVIVED_DELAY + SURVIVED_APPEAR_DURATION, FUNNEL_WIPE_DELAY + FUNNEL_WIPE_DURATION) + 0.3;
const STRATEGY_STAGGER = 0.28;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

const fadeSlide = (delay: number, y = 10, duration = 0.4) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: "easeOut" as const },
});

function ColumnLabel({
  left,
  width,
  label,
  value,
  valueColor,
  countDelay,
}: {
  left: number;
  width: number;
  label: string;
  value: number;
  valueColor?: string;
  countDelay: number;
}) {
  return (
    <div className="absolute top-0 flex flex-col gap-[1.852px] items-start" style={{ left, width }}>
      <p className="font-normal leading-[11.113px] text-[9.261px] text-[#f1f6ff] w-full">{label}</p>
      <p className="font-semibold leading-[14.817px] text-[11.113px] w-full" style={{ color: valueColor ?? "#f1f6ff" }}>
        <CountUp value={value} startDelay={countDelay} duration={0.35} className="" />
      </p>
    </div>
  );
}

function StrategyCard({
  top,
  delay,
  dotSrc,
  name,
  regimeLabel,
  regimeBg,
  regimeText,
  typeLabel,
}: {
  top: number;
  delay: number;
  dotSrc: string;
  name: string;
  regimeLabel: string;
  regimeBg: string;
  regimeText: string;
  typeLabel: string;
}) {
  return (
    <motion.div
      className="absolute border border-[rgba(167,191,255,0.3)] border-solid flex flex-col items-start justify-center left-[396px] overflow-hidden px-[8px] py-[12px] rounded-[12px] w-[212px]"
      style={{ top }}
      {...fadeSlide(delay)}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-[6px] items-start">
          <div className="flex gap-[6px] items-start w-full">
            <div className="flex items-center px-[2px] py-[6px]">
              <img alt="" className="block size-[8px]" src={dotSrc} />
            </div>
            <p className="font-medium leading-[20px] text-[14px] text-[#f1f6ff] whitespace-nowrap">{name}</p>
          </div>
          <div className="flex gap-[8px] items-start">
            <div className="flex items-start overflow-hidden px-[8px] py-[2px] rounded-[16px]" style={{ backgroundColor: regimeBg }}>
              <p className="font-normal leading-[12px] text-[10px] whitespace-nowrap" style={{ color: regimeText }}>
                {regimeLabel}
              </p>
            </div>
            <div className="bg-[rgba(0,85,209,0.1)] flex items-start overflow-hidden px-[8px] py-[2px] rounded-[16px]">
              <p className="font-normal leading-[12px] text-[10px] text-[#a7bce4] whitespace-nowrap">{typeLabel}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[3px] h-[37px] items-end justify-center w-[48px] whitespace-nowrap">
          <p className="font-semibold leading-[16px] text-[12px] text-[#f1f6ff]">58%</p>
          <p className="font-normal leading-[12px] text-[10px] text-[#a7bce4]">Win Rate</p>
        </div>
      </div>
    </motion.div>
  );
}

// Column centers (within the 359.319px-wide funnel content area) mapped to a
// fraction of the wipe's travel — each number counts up roughly when the
// wipe visually passes it.
const FUNNEL_CONTENT_WIDTH = 359.319;
const columns = [
  { left: 0, width: 44.452, label: "Generated", value: 642, center: 22.2 },
  { left: 91.68, width: 86.126, label: "passed FAST filter", value: 128, center: 134.7 },
  { left: 179.66, width: 86.126, label: "passed regime test", value: 31, center: 222.7 },
  { left: 272.27, width: 86.126, label: "passed CPCV +PBO + DSR", value: 3, valueColor: "#5cb5ff", center: 315.3 },
];

export function DiscoveriesCard() {
  return (
    <div className="relative h-[364px] w-[600px] overflow-hidden rounded-[19px] backdrop-blur-[2.7px] bg-[rgba(143,133,186,0.02)] border border-[rgba(167,191,255,0.25)]">
      {/* Icon badge — static, no animation */}
      <div className="-translate-x-1/2 absolute bg-[rgba(31,60,139,0.1)] border border-[rgba(255,255,255,0.1)] border-solid flex items-center left-1/2 p-[8px] rounded-[8px] top-[18px]">
        <div className="relative shrink-0 size-[24px]">
          <div className="absolute inset-[8.33%_16.67%_0.77%_16.67%]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/discoveries/bulb-icon.svg" />
          </div>
        </div>
      </div>

      {/* "Start Discovery" button — clicked by a simulated cursor, then swapped for the popover */}
      <motion.div
        className="absolute left-1/2 top-[82.5px] -translate-x-1/2 flex items-center justify-center rounded-[12px] border border-[#5985ff] bg-[rgba(31,60,139,0.25)] backdrop-blur-[10px] px-[20px] py-[10px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 1] }}
        transition={{
          duration: BUTTON_TOTAL_SPAN,
          times: [0, BUTTON_APPEAR_DURATION / BUTTON_TOTAL_SPAN, BUTTON_FADE_OUT_DELAY / BUTTON_TOTAL_SPAN, 1],
          ease: "easeOut",
        }}
      >
        <span className="text-[12px] font-medium leading-[16px] text-[#f1f6ff] whitespace-nowrap">Start Discovery</span>
      </motion.div>

      <ClickCursor left={352} top={90} arriveDelay={CURSOR_ARRIVE} clickDelay={CURSOR_CLICK} fadeOutDelay={CURSOR_FADE_OUT_DELAY} fadeOutDuration={CURSOR_FADE_OUT_DURATION} />

      {/* Popover: "Last Night: 642 candidates generated ↓ 3 survived the gauntlet" */}
      <motion.div
        className="-translate-x-1/2 absolute backdrop-blur-[10px] bg-[rgba(31,60,139,0.1)] border-[0.5px] border-[#5985ff] border-solid flex gap-[11px] items-center left-[calc(50%+10.98px)] overflow-hidden px-[16px] py-[10px] rounded-[7px] top-[82.5px] w-[426px]"
        {...fadeOnly(POPOVER_DELAY, POPOVER_APPEAR_DURATION)}
      >
        <div className="flex gap-[5px] items-center justify-center w-[410px]">
          <p className="font-medium leading-[16px] text-[12px] text-[#f1f6ff] whitespace-nowrap">
            Last Night: <ShuffleNumber value={642} startDelay={SHUFFLE_DELAY} duration={SHUFFLE_DURATION} className="" /> candidates generated
          </p>
          <motion.div className="flex items-center justify-center shrink-0 size-[16px]" {...fadeOnly(SURVIVED_DELAY, SURVIVED_APPEAR_DURATION)}>
            <div className="flex-none rotate-90">
              <div className="overflow-hidden relative size-[16px]">
                <div className="absolute inset-[26.43%_13.72%]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/discoveries/arrow-right.svg" />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.p
            className="font-medium leading-[0] text-[0px] text-[#f1f6ff] whitespace-nowrap"
            {...fadeOnly(SURVIVED_DELAY, SURVIVED_APPEAR_DURATION)}
          >
            <span className="leading-[16px] text-[#5cb5ff] text-[12px]">3</span>
            <span className="leading-[16px] text-[12px]">{` survived the gauntlet`}</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom section: funnel chart (left) + strategy list (right) */}
      <div className="absolute h-[214px] left-[-0.77px] top-[143px] w-[600px]">
        {/* Funnel chart table */}
        <motion.div
          className="absolute border-[0.926px] border-[rgba(167,191,255,0.3)] border-solid flex flex-col h-[213px] items-start left-0 overflow-hidden px-[11.113px] py-[16.669px] rounded-[14.817px] top-[0.5px] w-[387px]"
          {...fadeOnly(PANEL_DELAY, PANEL_APPEAR_DURATION)}
        >
          <div className="flex flex-col items-start w-[359.319px]">
            <div className="relative shrink-0 h-[27.782px] w-full">
              {columns.map((col) => (
                <ColumnLabel
                  key={col.label}
                  left={col.left}
                  width={col.width}
                  label={col.label}
                  value={col.value}
                  valueColor={col.valueColor}
                  countDelay={FUNNEL_WIPE_DELAY + (col.center / FUNNEL_CONTENT_WIDTH) * FUNNEL_WIPE_DURATION}
                />
              ))}
            </div>
            <div className="h-[127px] relative shrink-0 w-[358.856px] overflow-hidden">
              <motion.div
                className="absolute inset-[-5.05%_0]"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: FUNNEL_WIPE_DURATION, delay: FUNNEL_WIPE_DELAY, ease: "easeInOut" }}
              >
                <img alt="" className="block max-w-none size-full" src="/figma/discoveries/funnel-chart.svg" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Strategy list — appear one by one */}
        <StrategyCard
          top={0}
          delay={STRATEGIES_START}
          dotSrc="/figma/discoveries/dot-red.svg"
          name="MeanRev-VAL"
          regimeLabel="Breakout"
          regimeBg="rgba(255,89,113,0.1)"
          regimeText="#ff5971"
          typeLabel="Long Spot"
        />
        <StrategyCard
          top={73}
          delay={STRATEGIES_START + STRATEGY_STAGGER}
          dotSrc="/figma/discoveries/dot-blue.svg"
          name="ReversalFade-4h"
          regimeLabel="Sideways"
          regimeBg="rgba(0,255,255,0.1)"
          regimeText="#00ffff"
          typeLabel="Long Spot"
        />
        <StrategyCard
          top={147}
          delay={STRATEGIES_START + STRATEGY_STAGGER * 2}
          dotSrc="/figma/discoveries/dot-yellow.svg"
          name="MeanRev-VAL"
          regimeLabel="Sideways"
          regimeBg="rgba(0,255,255,0.1)"
          regimeText="#00ffff"
          typeLabel="Short Spot"
        />
      </div>
    </div>
  );
}
