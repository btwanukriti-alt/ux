"use client";

import { motion } from "framer-motion";
import { CountUp, ShuffleNumber } from "../AnimatedNumbers";
import { DiagonalGlow } from "../DiagonalGlow";

// Figma node 2664:226972 — "Paper Trade"
// Fixed to the exact Figma frame size (600 x 364). The stats/checks panel is
// intentionally wider than the card and bleeds off its right and bottom
// edges — only clipped by the card's own overflow-hidden, matching Figma's
// overflow-clip. Do not shrink content to fit.

// --- Timeline -----------------------------------------------------------------
const HEADER_APPEAR_DURATION = 0.3;
const ROW_DELAY = 0.15;
const ROW_APPEAR_DURATION = 0.3;

const RING_LOOP_DURATION = 0.9;
const RING_LOOPS = 2;
const RING_STOP_DELAY = ROW_DELAY + RING_LOOP_DURATION * RING_LOOPS;

const PANEL_DELAY = ROW_DELAY + 0.3;
const PANEL_APPEAR_DURATION = 0.3;

const STAT_LABELS_DELAY = PANEL_DELAY + 0.15;
const WIN_RATE_COUNT_DELAY = STAT_LABELS_DELAY + 0.1;
const WIN_RATE_COUNT_DURATION = 0.9;
const PL_SHUFFLE_DELAY = STAT_LABELS_DELAY + 0.1;
const PL_SHUFFLE_DURATION = 1.0;

const DIVIDER_DELAY = PANEL_DELAY + 0.25;

const CHECKS_LABEL_DELAY = DIVIDER_DELAY + 0.15;
const CHECKS_START = CHECKS_LABEL_DELAY + 0.15;
const CHECK_STAGGER = 0.05;
const CHECK_COUNT = 12;
const CHECKS_END = CHECKS_START + (CHECK_COUNT - 1) * CHECK_STAGGER + 0.25;

const GLOW_DELAY =
  Math.max(WIN_RATE_COUNT_DELAY + WIN_RATE_COUNT_DURATION, PL_SHUFFLE_DELAY + PL_SHUFFLE_DURATION, CHECKS_END) + 0.3;
const GLOW_DURATION = 1.3;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// The "Ongoing Paper Trade" status icon: an outer ring spinning clockwise and
// an inner ring spinning anti-clockwise, both easing to a stop, then
// crossfading into a checkmark once the trade analysis is "done".
function SpinningStatusIcon() {
  const spinDuration = RING_LOOP_DURATION * RING_LOOPS;
  return (
    <div className="relative size-[24px] shrink-0">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: RING_STOP_DELAY, ease: "easeOut" }}
      >
        <motion.svg
          className="absolute inset-0"
          width="24"
          height="24"
          viewBox="0 0 21 21"
          fill="none"
          animate={{ rotate: 360 * RING_LOOPS }}
          transition={{ duration: spinDuration, ease: "easeInOut" }}
        >
          <path
            d="M0.5 10.5C0.5 16.0229 4.97715 20.5 10.5 20.5C16.0229 20.5 20.5 16.0229 20.5 10.5C20.5 4.97715 16.0229 0.5 10.5 0.5"
            stroke="#5985FF"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <motion.svg
          className="absolute inset-0"
          width="24"
          height="24"
          viewBox="0 0 21 21"
          fill="none"
          animate={{ rotate: -360 * RING_LOOPS }}
          transition={{ duration: spinDuration, ease: "easeInOut" }}
        >
          <path
            d="M16.5 10.5C16.5 7.1863 13.8137 4.5 10.5 4.5C7.1863 4.5 4.5 7.1863 4.5 10.5C4.5 13.8137 7.1863 16.5 10.5 16.5"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, delay: RING_STOP_DELAY, ease: "easeOut" }}
      >
        <img alt="" className="block size-[14px]" src="/figma/paper-trade/check.svg" />
      </motion.div>
    </div>
  );
}

export function PaperTradeCard() {
  return (
    <div className="relative h-[364px] w-[600px] overflow-hidden rounded-[19px] border border-[rgba(167,191,255,0.25)] bg-[rgba(143,133,186,0.02)] backdrop-blur-[2.7px]">
      {/* Header: Paper Trading */}
      <motion.div className="absolute left-[24.75px] top-[25.5px] flex w-[136px] items-start gap-[6px]" {...fadeOnly(0, HEADER_APPEAR_DURATION)}>
        <div className="relative size-[24px] shrink-0">
          <div className="absolute inset-[8.33%_8.33%_12.29%_12.5%]">
            <img alt="" className="absolute block size-full max-w-none" src="/figma/paper-trade/finance-mode-icon.svg" />
          </div>
        </div>
        <p className="relative shrink-0 whitespace-nowrap text-[16px] font-semibold leading-[22px] text-[#f1f6ff]">Paper Trading</p>
      </motion.div>

      {/* Ongoing Paper Trade row */}
      <motion.div className="absolute left-[27.75px] top-[70.5px] flex w-[478px] items-center gap-[8px]" {...fadeOnly(ROW_DELAY, ROW_APPEAR_DURATION)}>
        <SpinningStatusIcon />
        <div className="relative flex min-w-px flex-[1_0_0] items-start">
          <p className="relative shrink-0 whitespace-nowrap text-[14px] font-medium leading-[20px] text-[#a7bce4]">Ongoing Paper Trade</p>
        </div>
      </motion.div>

      {/* Stat panel + veto checks */}
      <div className="absolute left-[-0.77px] top-[116px] h-[247px] w-[600px]">
        <motion.div
          className="absolute left-[38px] top-0 flex w-[893px] flex-col items-start gap-[16px] overflow-clip rounded-[16px] border border-[#5cb5ff] bg-[rgba(28,29,63,0.09)] px-[20px] py-[18px]"
          {...fadeOnly(PANEL_DELAY, PANEL_APPEAR_DURATION)}
        >
          {/* Win Rate / Notional P&L / Drawdown */}
          <motion.div className="flex h-[62px] w-[863px] shrink-0 items-center gap-[13px] [word-break:break-word]" {...fadeOnly(STAT_LABELS_DELAY, 0.25)}>
            <div className="relative flex min-w-px flex-[1_0_0] shrink-0 flex-col items-center justify-center gap-[4px] rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(214,214,214,0.05)] px-[12px] py-[8px] backdrop-blur-[10px]">
              <p className="relative w-full shrink-0 text-[10px] font-normal leading-[12px] text-[#a7bce4]">WIN RATE</p>
              <p className="relative w-full shrink-0 text-[16px] font-semibold leading-[22px] text-[#f1f6ff]">
                <CountUp value={76} startDelay={WIN_RATE_COUNT_DELAY} duration={WIN_RATE_COUNT_DURATION} format={(n) => `${n}%`} />
              </p>
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] shrink-0 flex-col items-center justify-center gap-[4px] rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(214,214,214,0.05)] px-[12px] py-[8px] backdrop-blur-[10px]">
              <p className="relative w-full shrink-0 text-[10px] font-normal leading-[12px] text-[#a7bce4]">NOTIONAL P&amp;L</p>
              <p className="relative w-full shrink-0 text-[16px] font-semibold leading-[22px] text-[#f1f6ff]">
                <ShuffleNumber value={1204} startDelay={PL_SHUFFLE_DELAY} duration={PL_SHUFFLE_DURATION} format={(n) => `+$${n.toLocaleString()}`} />
              </p>
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] shrink-0 flex-col items-center justify-center gap-[4px] rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(0,85,209,0.1)] px-[12px] py-[8px] backdrop-blur-[10px]">
              <p className="relative w-full shrink-0 text-[10px] font-normal leading-[12px] text-[#a7bce4]">DRAWDOWN</p>
              <p className="relative w-full shrink-0 text-[16px] font-semibold leading-[22px] text-[#f1f6ff]">-4.1%</p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div className="relative h-0 w-full shrink-0" {...fadeOnly(DIVIDER_DELAY, 0.25)}>
            <div className="absolute inset-[-0.5px_0_0_0]">
              <img alt="" className="block size-full max-w-none" src="/figma/paper-trade/divider.svg" />
            </div>
          </motion.div>

          {/* Veto checks label */}
          <motion.div className="relative flex w-full shrink-0 items-start [word-break:break-word]" {...fadeOnly(CHECKS_LABEL_DELAY, 0.25)}>
            <p className="relative shrink-0 whitespace-nowrap text-[12px] font-normal leading-[16px] text-[#a7bce4]">13 VETO CHECKS</p>
          </motion.div>

          {/* Checks list — every item fades in, staggered row by row */}
          <div className="relative flex w-full shrink-0 items-start justify-between">
            <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-[8px]">
              <CheckItem label="Stale Data" delay={CHECKS_START + 0 * CHECK_STAGGER} />
              <CheckItem label="Drawdown" delay={CHECKS_START + 3 * CHECK_STAGGER} />
              <CheckItem label="Liquidation Cascade" delay={CHECKS_START + 6 * CHECK_STAGGER} />
              <CheckItem label="Manual Override" delay={CHECKS_START + 9 * CHECK_STAGGER} />
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-[8px]">
              <CheckItem label="Source Disagreement" delay={CHECKS_START + 1 * CHECK_STAGGER} />
              <CheckItem label="Time-of-day" delay={CHECKS_START + 4 * CHECK_STAGGER} />
              <CheckItem label="Anomaly" delay={CHECKS_START + 7 * CHECK_STAGGER} />
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-[8px]">
              <CheckItem label="Fragility " highlight="VETO" delay={CHECKS_START + 2 * CHECK_STAGGER} />
              <CheckItem label="News Blackout" delay={CHECKS_START + 5 * CHECK_STAGGER} />
              <CheckItem label="Calibration Drift" delay={CHECKS_START + 8 * CHECK_STAGGER} />
            </div>
            <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-[8px]">
              <CheckItem label="Concentration " delay={CHECKS_START + 10 * CHECK_STAGGER} />
              <CheckItem label="Funding Extreme" delay={CHECKS_START + 11 * CHECK_STAGGER} />
              <CheckItem label="Paper-graduation Gate  " highlight="WATCH" wrap="pre" delay={CHECKS_START + 12 * CHECK_STAGGER} />
            </div>
          </div>

          {/* Subtle diagonal glow once the panel has fully settled */}
          <DiagonalGlow left={0} top={0} width={893} height={247} borderRadius={16} delay={GLOW_DELAY} duration={GLOW_DURATION} />
        </motion.div>
      </div>
    </div>
  );
}

function CheckItem({
  label,
  highlight,
  wrap = "nowrap",
  delay,
}: {
  label: string;
  highlight?: string;
  wrap?: "nowrap" | "pre";
  delay: number;
}) {
  return (
    <motion.div className="relative flex shrink-0 items-center gap-[4px] py-[2px]" {...fadeOnly(delay, 0.3)}>
      <div className="relative flex h-[12px] shrink-0 items-center px-[2px] py-[4px]">
        <div className="relative size-[8px] shrink-0">
          <img alt="" className="absolute block size-full max-w-none" src="/figma/paper-trade/check-dot.svg" />
        </div>
      </div>
      <p
        className={`relative shrink-0 text-[12px] font-medium text-[#f1f6ff] ${
          highlight ? "leading-[0]" : "leading-[16px]"
        } ${wrap === "pre" ? "whitespace-pre" : "whitespace-nowrap"} [word-break:break-word]`}
      >
        {highlight ? (
          <>
            <span className="leading-[16px]">{label}</span>
            <span className="leading-[16px] text-[#45ffb5]">{highlight}</span>
          </>
        ) : (
          label
        )}
      </p>
    </motion.div>
  );
}
