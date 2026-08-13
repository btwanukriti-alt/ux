"use client";

import { motion } from "framer-motion";
import { GradientBorder } from "../GradientBorder";
import { ResultsGraph } from "../ResultsGraph";
import { DiagonalGlow } from "../DiagonalGlow";
import { ClickCursor } from "../ClickCursor";

// Figma node 2664:227204 — "Library"

// --- Timeline (all of it settles well under the 10s budget) -----------------
const CARD_STAGGER = 0.18;
const CARD_DURATION = 0.5;

const LINES_DELAY = 0.95; // after the 3rd strategy card has landed
const LINES_DURATION = 0.5;
const LINES_STAGGER = 0.08;

const COMPARE_DELAY = LINES_DELAY + LINES_DURATION + 0.05;
const COMPARE_APPEAR_DURATION = 0.3;
const COMPARE_GLOW_DURATION = 0.9;

const CURSOR_ARRIVE = COMPARE_DELAY + COMPARE_APPEAR_DURATION + 0.25;
const CURSOR_CLICK = CURSOR_ARRIVE + 0.3;
const CURSOR_FADE_OUT_DELAY = CURSOR_CLICK + 0.3;
const CURSOR_FADE_OUT_DURATION = 0.25;

// The click is what triggers the glow — and everything downstream (the
// connector, the results panel, its contents) follows from there.
const COMPARE_GLOW_DELAY = CURSOR_CLICK + 0.05;

const CONNECT_DELAY = COMPARE_GLOW_DELAY + COMPARE_GLOW_DURATION + 0.05;
const CONNECT_DURATION = 0.3;

const BORDER_DELAY = CONNECT_DELAY + CONNECT_DURATION - 0.05;
const BORDER_DURATION = 0.3;

const RECT1_DELAY = BORDER_DELAY + 0.15;
const RECT2_DELAY = RECT1_DELAY + 0.15;
const RECT_DURATION = 0.25;

const TABLE_DELAY = RECT2_DELAY + RECT_DURATION + 0.1;
const TABLE_DURATION = 0.35;

const GRAPH_BORDER_DELAY = TABLE_DELAY + TABLE_DURATION + 0.1;
const GRAPH_LINES_DELAY = GRAPH_BORDER_DELAY + 0.1;
const GRAPH_TOTAL = 0.9 + 0.09 * 2 + 0.1; // path duration + stagger + border head start

const BOTTOM_TABLE_DELAY = GRAPH_BORDER_DELAY + GRAPH_TOTAL + 0.1;
const BOTTOM_TABLE_DURATION = 0.35;

const GLOW_DELAY = BOTTOM_TABLE_DELAY + BOTTOM_TABLE_DURATION + 0.3;
const GLOW_DURATION = 1.3;
// Full sequence lands around ~6.9s, comfortably inside the 10s budget.

const fadeSlide = (delay: number, y = 10, duration = 0.45) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: "easeOut" as const },
});

const fadeScale = (delay: number, duration = 0.35, scale = 0.94) => ({
  initial: { opacity: 0, scale },
  animate: { opacity: 1, scale: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// Plain opacity fade — used for wrappers that group several already
// absolutely-positioned children with no size of their own, where a scale
// transform would have no sane transform-origin to pop in around.
const fadeOnly = (delay: number, duration = 0.35) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

const growLine = (delay: number, originX: string, originY: string) => ({
  initial: { opacity: 0, scale: 0.15 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: LINES_DURATION, delay, ease: "easeOut" as const },
  style: { transformOrigin: `${originX} ${originY}` },
});

type Bar = { left: number; width: number };

const barColumns: Bar[] = [
  { left: 378.04, width: 54.456 },
  { left: 452.13, width: 18.543 },
  { left: 478, width: 18.543 },
  { left: 503.86, width: 18.543 },
  { left: 529.73, width: 18.543 },
];

const topPanelRows = [105.66, 117.15, 128.65];
const bottomPanelRows = [267.82, 281.67, 295.52];

function SkeletonBars({ rows, barHeight }: { rows: number[]; barHeight: number }) {
  return (
    <>
      {barColumns.map((col) =>
        rows.map((rowTop) => (
          <div
            key={`${col.left}-${rowTop}`}
            className="absolute bg-[#666fa0] rounded-[1px]"
            style={{ left: col.left, top: rowTop, width: col.width, height: barHeight }}
          />
        )),
      )}
    </>
  );
}

function StrategyCard({
  left,
  top,
  width,
  delay,
  dotSrc,
  name,
  regimeLabel,
  regimeBg,
  regimeText,
  typeLabel,
}: {
  left: number;
  top: number;
  width: number;
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
      className="absolute border border-[rgba(167,191,255,0.3)] border-solid flex flex-col items-start overflow-hidden px-[8px] py-[12px] rounded-[12px]"
      style={{ left, top, width }}
      {...fadeSlide(delay)}
    >
      <div className="flex gap-[25px] items-start justify-center shrink-0 w-full">
        <div className="flex flex-col gap-[6px] items-start shrink-0">
          <div className="flex gap-[6px] items-start shrink-0 w-full">
            <div className="flex items-center px-[2px] py-[6px] shrink-0">
              <img alt="" className="block size-[8px]" src={dotSrc} />
            </div>
            <p className="font-medium leading-[20px] shrink-0 text-[14px] text-[#f1f6ff] whitespace-nowrap">
              {name}
            </p>
          </div>
          <div className="flex gap-[8px] items-start shrink-0">
            <div
              className="flex items-start overflow-hidden px-[8px] py-[2px] rounded-[16px] shrink-0"
              style={{ backgroundColor: regimeBg }}
            >
              <p
                className="font-normal leading-[12px] shrink-0 text-[10px] whitespace-nowrap"
                style={{ color: regimeText }}
              >
                {regimeLabel}
              </p>
            </div>
            <div className="bg-[rgba(0,85,209,0.1)] flex items-start overflow-hidden px-[8px] py-[2px] rounded-[16px] shrink-0">
              <p className="font-normal leading-[12px] shrink-0 text-[10px] text-[#a7bce4] whitespace-nowrap">
                {typeLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LibraryCard() {
  return (
    <div className="relative h-[364px] w-[600px] overflow-hidden rounded-[19px] backdrop-blur-[2.7px] bg-[rgba(143,133,186,0.02)] border border-[rgba(167,191,255,0.25)]">
      {/* Strategy cards (left column) — appear one by one, top to bottom */}
      <StrategyCard
        left={21.77}
        top={38.11}
        width={162}
        delay={0}
        dotSrc="/figma/library/dot-red.svg"
        name="MeanRev-VAL"
        regimeLabel="Breakout"
        regimeBg="rgba(255,89,113,0.1)"
        regimeText="#ff5971"
        typeLabel="Long Spot"
      />
      <StrategyCard
        left={21.77}
        top={146.11}
        width={163}
        delay={CARD_STAGGER}
        dotSrc="/figma/library/dot-blue.svg"
        name="ReversalFade-4h"
        regimeLabel="Sideways"
        regimeBg="rgba(0,255,255,0.1)"
        regimeText="#00ffff"
        typeLabel="Long Spot"
      />
      <StrategyCard
        left={21.77}
        top={254.11}
        width={166}
        delay={CARD_STAGGER * 2}
        dotSrc="/figma/library/dot-yellow.svg"
        name="MeanRev-VAL"
        regimeLabel="Sideways"
        regimeBg="rgba(0,255,255,0.1)"
        regimeText="#00ffff"
        typeLabel="Short Spot"
      />

      {/* Dashed connector lines — emerge from each card, growing toward Compare */}
      <motion.div
        className="absolute h-[102.633px] left-[187.77px] top-[65.11px] w-[58.563px]"
        {...growLine(LINES_DELAY, "0%", "0%")}
      >
        <div className="absolute inset-[-0.49%_-0.85%_0_0]">
          <img alt="" className="block max-w-none size-full" src="/figma/library/connector-line-1.svg" />
        </div>
      </motion.div>
      <motion.div
        className="absolute flex h-[107.236px] items-center justify-center left-[187.77px] top-[168.87px] w-[58.563px]"
        {...growLine(LINES_DELAY + LINES_STAGGER, "0%", "100%")}
      >
        <div className="-scale-y-100 flex-none">
          <div className="h-[107.236px] relative w-[58.563px]">
            <div className="absolute inset-[-0.47%_-0.85%_0_0]">
              <img alt="" className="block max-w-none size-full" src="/figma/library/connector-line-2.svg" />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute flex h-[0.145px] items-center justify-center left-[187.77px] top-[170.66px] w-[70.729px]"
        {...growLine(LINES_DELAY + LINES_STAGGER * 2, "0%", "50%")}
      >
        <div className="flex-none rotate-[-0.12deg]">
          <div className="h-0 relative w-[70.73px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src="/figma/library/connector-line-3.svg" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compare button — pops in, border glows once then settles */}
      <motion.div
        className="absolute bg-[rgba(0,255,255,0.05)] flex gap-[4px] items-center left-[258.5px] px-[6px] py-[4px] rounded-[5px] top-[158px]"
        {...fadeScale(COMPARE_DELAY, COMPARE_APPEAR_DURATION, 0.85)}
      >
        <GradientBorder
          color="0,255,255"
          duration={COMPARE_GLOW_DURATION}
          delay={COMPARE_GLOW_DELAY}
          baseOpacity={0.14}
          sweepOpacity={0.55}
          restColor="0,255,255"
          restOpacity={0.22}
        />
        <div className="h-[16px] relative shrink-0 w-[15px]">
          <div className="absolute inset-[8.33%_54.17%_54.17%_8.33%]">
            <img alt="" className="block size-full" src="/figma/library/compare-icon-1.svg" />
          </div>
          <div className="absolute inset-[54.17%_8.33%_8.33%_54.17%]">
            <img alt="" className="block size-full" src="/figma/library/compare-icon-2.svg" />
          </div>
          <div className="absolute inset-[8.33%]">
            <img alt="" className="block size-full" src="/figma/library/compare-icon-3.svg" />
          </div>
        </div>
        <p className="font-medium leading-[16px] shrink-0 text-[12px] text-[#00ffff] whitespace-nowrap">
          Compare
        </p>
      </motion.div>

      <ClickCursor
        left={300}
        top={170}
        arriveDelay={CURSOR_ARRIVE}
        clickDelay={CURSOR_CLICK}
        fadeOutDelay={CURSOR_FADE_OUT_DELAY}
        fadeOutDuration={CURSOR_FADE_OUT_DURATION}
      />

      {/* Connector — Compare emerges toward the results panel */}
      <motion.div
        className="absolute h-[2px] rounded-full bg-gradient-to-r from-[rgba(0,255,255,0.5)] to-[rgba(191,236,255,0.5)]"
        style={{ left: 340, top: 169, width: 16, transformOrigin: "0% 50%" }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: CONNECT_DURATION, delay: CONNECT_DELAY, ease: "easeOut" }}
      />

      {/* Results panel (right column) */}
      <motion.div
        className="absolute border border-[rgba(167,191,255,0.3)] border-dashed h-[284.071px] left-[354.23px] rounded-[6px] top-[44.07px] w-[221.69px]"
        {...fadeScale(BORDER_DELAY, BORDER_DURATION, 0.96)}
      />

      {/* Top two rectangles — appear one by one */}
      <motion.div
        className="absolute bg-[rgba(217,227,255,0.83)] h-[4.685px] left-[370.16px] rounded-[1px] top-[65.11px] w-[52.811px]"
        {...fadeSlide(RECT1_DELAY, 6, RECT_DURATION)}
      />
      <motion.div
        className="absolute bg-[#505881] h-[3.972px] left-[370.5px] rounded-[1px] top-[74.47px] w-[41.272px]"
        {...fadeSlide(RECT2_DELAY, 6, RECT_DURATION)}
      />

      {/* Table */}
      <motion.div {...fadeOnly(TABLE_DELAY, TABLE_DURATION)}>
        <div className="absolute border-[0.5px] border-[rgba(167,191,255,0.3)] border-solid h-[43.422px] left-[370.16px] rounded-[4px] top-[97.36px] w-[189.839px]" />
        <SkeletonBars rows={topPanelRows} barHeight={3.832} />
      </motion.div>

      {/* Graph */}
      <motion.div
        className="absolute border-[0.5px] border-[rgba(167,191,255,0.3)] border-solid h-[90.177px] left-[370.16px] rounded-[4px] top-[153.22px] w-[189.839px]"
        {...fadeScale(GRAPH_BORDER_DELAY, 0.3, 0.96)}
      />
      <div className="absolute h-[88.138px] left-[376.18px] top-[157.25px] w-[177.79px]">
        <ResultsGraph delay={GRAPH_LINES_DELAY} />
      </div>

      {/* Bottom table */}
      <motion.div {...fadeOnly(BOTTOM_TABLE_DELAY, BOTTOM_TABLE_DURATION)}>
        <div className="absolute border-[0.5px] border-[rgba(167,191,255,0.3)] border-solid h-[52.303px] left-[370.16px] rounded-[4px] top-[257.83px] w-[189.839px]" />
        <SkeletonBars rows={bottomPanelRows} barHeight={4.616} />
      </motion.div>

      {/* Subtle diagonal glow across the finished results panel */}
      <DiagonalGlow left={354.23} top={44.07} width={221.69} height={284.071} borderRadius={6} delay={GLOW_DELAY} duration={GLOW_DURATION} />
    </div>
  );
}
