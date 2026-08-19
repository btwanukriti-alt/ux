"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TypedText } from "../cards/TypedText";

// Onboarding storyboard node 2909:263327, panels 1-2 ("Professional trading,
// with AI built into every tool"). This storyboard is a single flattened
// reference image (no live Figma sub-nodes), so colors below were sampled
// directly from the reference PNG rather than pulled from design tokens —
// they match the app's existing palette (#00022b bg, #f1f6ff text, #5985ff
// accent) exactly where sampled.

const HEADLINE = "Professional trading, with AI built into every tool";
const CHAR_DELAY = 0.038;
const HEADLINE_START = 0.3;

type Coin = { ticker: string; icon: React.ReactNode };

function BtcIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#F7931A" />
      <text x="8" y="11.2" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="sans-serif">
        ₿
      </text>
    </svg>
  );
}

function SolIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#1C2333" />
      <g fill="none" stroke="#14F195" strokeWidth="1.3" strokeLinecap="round">
        <line x1="4.5" y1="6" x2="11.5" y2="6" />
        <line x1="4.5" y1="8" x2="11.5" y2="8" />
        <line x1="4.5" y1="10" x2="11.5" y2="10" />
      </g>
    </svg>
  );
}

function EthIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#5985FF" />
      <path d="M8 3L4.7 8.4 8 10.2 11.3 8.4 8 3Z" fill="#fff" opacity="0.9" />
      <path d="M8 11 4.7 9.2 8 13.4 11.3 9.2 8 11Z" fill="#fff" opacity="0.7" />
    </svg>
  );
}

function XrpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#12161F" />
      <g stroke="#fff" strokeWidth="1.2" strokeLinecap="round">
        <line x1="5" y1="5" x2="11" y2="11" />
        <line x1="11" y1="5" x2="5" y2="11" />
      </g>
    </svg>
  );
}

function BnbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#F0B90B" />
      <path d="M8 4L9.4 5.4 8 6.8 6.6 5.4 8 4Z" fill="#fff" />
      <path d="M5.4 6.6 6.8 8 5.4 9.4 4 8 5.4 6.6Z" fill="#fff" />
      <path d="M10.6 6.6 12 8 10.6 9.4 9.2 8 10.6 6.6Z" fill="#fff" />
      <path d="M8 9.2L9.4 10.6 8 12 6.6 10.6 8 9.2Z" fill="#fff" />
    </svg>
  );
}

const COINS: Coin[] = [
  { ticker: "BTC", icon: <BtcIcon /> },
  { ticker: "SOL", icon: <SolIcon /> },
  { ticker: "ETHUSDT", icon: <EthIcon /> },
  { ticker: "XRP", icon: <XrpIcon /> },
  { ticker: "BNB", icon: <BnbIcon /> },
];

// --- The wheel: like an alarm-clock time picker. One continuous strip of
// coins (several loops of the list, ending on the real final sequence)
// scrolls as a single unit behind a fixed window. Each row's size/opacity is
// driven by its live distance from the window's center line — not by which
// coin it is — so whichever row happens to be centered when the strip
// decelerates to a stop just IS the selection. ---
const ROW_H = 40;
const VISIBLE_ROWS = 5;
const VIEWPORT_H = ROW_H * VISIBLE_ROWS;

const RUNWAY_LOOPS = 4; // full loops scrolled through before landing
const STRIP: Coin[] = [...Array(RUNWAY_LOOPS)].flatMap(() => COINS).concat(COINS);
const LANDING_INDEX = STRIP.length - COINS.length + 2; // ETHUSDT's slot in the final segment

function centerYFor(index: number) {
  // The strip's translateY at which row `index` sits centered in the viewport.
  return VIEWPORT_H / 2 - (index * ROW_H + ROW_H / 2);
}

const START_Y = centerYFor(0);
const TARGET_Y = centerYFor(LANDING_INDEX);

// --- Timeline ---
const WHEEL_APPEAR = 0.6;
const WHEEL_APPEAR_DURATION = 0.4;
const SPIN_START = WHEEL_APPEAR + 0.3;
const SPIN_DURATION = 3.6;
const SPIN_END = SPIN_START + SPIN_DURATION;

// Once landed, the non-selected rows fade away (handled per-row); the act
// just holds on the lone selected coin after that — nothing else happens.
const ROW_FADE_OUT_DURATION = 0.5;
const HOLD_AFTER = 0.8;

export const ACT1_DURATION = SPIN_END + ROW_FADE_OUT_DURATION + HOLD_AFTER;

// --- Act 2 (storyboard panel 3, "Live candlestick charts, with regime
// detection"): the same selected-coin pill — not a new element — travels
// upward to become the header chip (avoiding the earlier overlap bug), the
// headline retypes, and a candle chart draws in below. ---
const WHEEL_TOP = 200;
// The landed pill's on-screen center sits at WHEEL_TOP + VIEWPORT_H/2 (300px)
// during Act 1. This is how far (as a pure y transform on an outer wrapper,
// not by touching the viewport's own internal geometry) it travels to become
// the ~172px-centered header chip.
const ACT1_PILL_CENTER_Y = WHEEL_TOP + VIEWPORT_H / 2;
// These were measured directly off the actual Figma storyboard reference
// (panel 3), not eyeballed: cropped the panel to a known pixel region,
// pixel-scanned it with sharp to find the headline/chip/chart-box bounds,
// then scaled those fractions onto this 480x600 canvas.
// 275 is the pixel-measured Figma value; the -35 is an explicit user
// adjustment on top of it (requested directly, not a guess).
const FIGMA_MEASURED_PILL_CENTER_Y = 275;
const USER_UP_OFFSET = 35;
const HEADER_PILL_CENTER_Y = FIGMA_MEASURED_PILL_CENTER_Y - USER_UP_OFFSET;
const HEADER_MOVE_UP_PX = HEADER_PILL_CENTER_Y - ACT1_PILL_CENTER_Y;
const MOVE_UP_DELAY = ROW_FADE_OUT_DURATION + HOLD_AFTER; // relative to `landed` (SPIN_END)
const MOVE_UP_DURATION = 0.8;
const MOVE_UP_ABS = SPIN_END + MOVE_UP_DELAY;

const OLD_HEADLINE_FADE_DELAY = MOVE_UP_ABS;
const OLD_HEADLINE_FADE_DURATION = 0.3;

const HEADLINE_2 = "Live candlestick charts, with regime detection";
const HEADLINE_2_START = OLD_HEADLINE_FADE_DELAY + OLD_HEADLINE_FADE_DURATION + 0.4;

// 324 is the pixel-measured Figma value; the -35 is the same explicit user
// adjustment applied to the pill above, kept consistent between the two.
const FIGMA_MEASURED_CHART_TOP = 324;
const CHART_TOP = FIGMA_MEASURED_CHART_TOP - USER_UP_OFFSET;
// This is the coordinate space all the pixel-extracted candle/footprint data
// below is measured in — never change these two, everything is relative to
// them. To make the chart bigger on screen, CHART_SCALE stretches a wrapper
// around that same untouched coordinate space instead.
const CHART_BOX_W = 258;
const CHART_BOX_H = 182;
const CHART_SCALE = 1.15;
const DISPLAY_CHART_W = CHART_BOX_W * CHART_SCALE;
const DISPLAY_CHART_H = CHART_BOX_H * CHART_SCALE;
const CHART_BOX_CENTER_Y = CHART_TOP + DISPLAY_CHART_H / 2;
// Chart draws in alongside the headline typing, not after it — both start
// together (once the pill has settled into its header position).
const CHART_BOX_DELAY = Math.max(HEADLINE_2_START, MOVE_UP_ABS + MOVE_UP_DURATION + 0.2);
const CHART_BOX_APPEAR_DURATION = 0.4;

const CANDLES_START = CHART_BOX_DELAY + 0.2;
const CANDLE_STAGGER = 0.05;
const CANDLE_GROW_DURATION = 0.35;

interface Candle {
  color: string;
  left: number;
  width: number;
  bodyTop: number;
  bodyH: number;
  wickLeftOffset: number;
  wickTop: number;
  wickH: number;
}
// Pixel-extracted directly from the actual Figma storyboard reference for
// THIS panel (not a different card's data, not invented) — cropped panel 3
// to its known region, pixel-scanned it column-by-column with sharp to find
// every candle's body/wick bounds and color, then proportionally rescaled
// from the detected 306x200 chart box onto this component's 258x182 box.
const CANDLE_DATA: Candle[] = [
  { color: "#ff3e88", left: 0, width: 2.5, bodyTop: 79.17, bodyH: 15.47, wickLeftOffset: 0, wickTop: 79.17, wickH: 15.47 },
  { color: "#2ac3ff", left: 2.53, width: 4.22, bodyTop: 93.73, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 84.63, wickH: 15.47 },
  { color: "#ff3e88", left: 8.43, width: 4.22, bodyTop: 93.73, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 91.91, wickH: 24.57 },
  { color: "#2ac3ff", left: 13.49, width: 5.06, bodyTop: 88.27, bodyH: 5.46, wickLeftOffset: 2.53, wickTop: 86.45, wickH: 9.1 },
  { color: "#2ac3ff", left: 19.39, width: 5.06, bodyTop: 57.33, bodyH: 30.03, wickLeftOffset: 1.69, wickTop: 54.6, wickH: 36.4 },
  { color: "#ff3e88", left: 25.29, width: 4.22, bodyTop: 58.24, bodyH: 28.21, wickLeftOffset: 1.69, wickTop: 57.33, wickH: 33.67 },
  { color: "#2ac3ff", left: 31.2, width: 4.22, bodyTop: 83.72, bodyH: 2.73, wickLeftOffset: 1.69, wickTop: 77.35, wickH: 27.3 },
  { color: "#2ac3ff", left: 36.25, width: 5.06, bodyTop: 70.98, bodyH: 11.83, wickLeftOffset: 2.53, wickTop: 70.07, wickH: 16.38 },
  { color: "#ff3e88", left: 42.16, width: 5.06, bodyTop: 70.98, bodyH: 1.82, wickLeftOffset: 0.84, wickTop: 70.98, wickH: 1.82 },
  { color: "#ff3e88", left: 48.06, width: 4.22, bodyTop: 73.71, bodyH: 10.92, wickLeftOffset: 1.69, wickTop: 69.16, wickH: 22.75 },
  { color: "#ff3e88", left: 53.96, width: 4.22, bodyTop: 85.54, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 85.54, wickH: 4.55 },
  { color: "#ff3e88", left: 59.86, width: 4.22, bodyTop: 88.27, bodyH: 18.2, wickLeftOffset: 1.69, wickTop: 86.45, wickH: 22.75 },
  { color: "#ff3e88", left: 64.92, width: 5.06, bodyTop: 108.29, bodyH: 6.37, wickLeftOffset: 1.69, wickTop: 107.38, wickH: 8.19 },
  { color: "#2ac3ff", left: 70.82, width: 5.06, bodyTop: 100.1, bodyH: 15.47, wickLeftOffset: 1.69, wickTop: 97.37, wickH: 24.57 },
  { color: "#2ac3ff", left: 76.73, width: 4.22, bodyTop: 97.37, bodyH: 1.82, wickLeftOffset: 1.69, wickTop: 91.91, wickH: 15.47 },
  { color: "#ff3e88", left: 82.63, width: 4.22, bodyTop: 97.37, bodyH: 8.19, wickLeftOffset: 1.69, wickTop: 94.64, wickH: 14.56 },
  { color: "#2ac3ff", left: 87.69, width: 5.06, bodyTop: 95.55, bodyH: 10.01, wickLeftOffset: 2.53, wickTop: 91, wickH: 15.47 },
  { color: "#2ac3ff", left: 93.59, width: 5.06, bodyTop: 94.64, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 92.82, wickH: 3.64 },
  { color: "#ff3e88", left: 99.49, width: 4.22, bodyTop: 94.64, bodyH: 5.46, wickLeftOffset: 1.69, wickTop: 91.91, wickH: 10.01 },
  { color: "#2ac3ff", left: 105.39, width: 4.22, bodyTop: 95.55, bodyH: 4.55, wickLeftOffset: 1.69, wickTop: 92.82, wickH: 8.19 },
  { color: "#ff3e88", left: 111.29, width: 4.22, bodyTop: 95.55, bodyH: 4.55, wickLeftOffset: 1.69, wickTop: 95.55, wickH: 9.1 },
  { color: "#2ac3ff", left: 116.35, width: 5.06, bodyTop: 85.54, bodyH: 14.56, wickLeftOffset: 1.69, wickTop: 84.63, wickH: 15.47 },
  { color: "#ff3e88", left: 122.25, width: 4.22, bodyTop: 85.54, bodyH: 8.19, wickLeftOffset: 1.69, wickTop: 82.81, wickH: 13.65 },
  { color: "#ff3e88", left: 129.84, width: 2.5, bodyTop: 92.82, bodyH: 5.46, wickLeftOffset: 0, wickTop: 92.82, wickH: 5.46 },
  { color: "#ff3e88", left: 134.06, width: 4.22, bodyTop: 95.55, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 93.73, wickH: 1.82 },
  { color: "#2ac3ff", left: 139.12, width: 5.06, bodyTop: 88.27, bodyH: 7.28, wickLeftOffset: 0, wickTop: 88.27, wickH: 7.28 },
  { color: "#2ac3ff", left: 145.02, width: 5.06, bodyTop: 82.81, bodyH: 4.55, wickLeftOffset: 1.69, wickTop: 78.26, wickH: 10.92 },
  { color: "#ff3e88", left: 152.61, width: 2.5, bodyTop: 79.17, bodyH: 7.28, wickLeftOffset: 0, wickTop: 79.17, wickH: 7.28 },
  { color: "#ff3e88", left: 156.82, width: 4.22, bodyTop: 82.81, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 80.08, wickH: 7.28 },
  { color: "#2ac3ff", left: 161.88, width: 5.06, bodyTop: 83.72, bodyH: 1.5, wickLeftOffset: 2.53, wickTop: 81.9, wickH: 6.37 },
  { color: "#ff3e88", left: 167.78, width: 4.22, bodyTop: 83.72, bodyH: 10.01, wickLeftOffset: 1.69, wickTop: 82.81, wickH: 13.65 },
  { color: "#ff3e88", left: 173.69, width: 4.22, bodyTop: 94.64, bodyH: 5.46, wickLeftOffset: 1.69, wickTop: 93.73, wickH: 10.01 },
  { color: "#ff3e88", left: 179.59, width: 4.22, bodyTop: 101.01, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 97.37, wickH: 6.37 },
  { color: "#2ac3ff", left: 184.65, width: 5.06, bodyTop: 101.01, bodyH: 1.5, wickLeftOffset: 2.53, wickTop: 96.46, wickH: 8.19 },
  { color: "#2ac3ff", left: 190.55, width: 5.06, bodyTop: 91.91, bodyH: 8.19, wickLeftOffset: 1.69, wickTop: 90.09, wickH: 10.92 },
  { color: "#ff3e88", left: 196.45, width: 4.22, bodyTop: 91, bodyH: 9.1, wickLeftOffset: 1.69, wickTop: 79.17, wickH: 21.84 },
  { color: "#2ac3ff", left: 202.35, width: 4.22, bodyTop: 99.19, bodyH: 1.5, wickLeftOffset: 1.69, wickTop: 96.46, wickH: 9.1 },
  { color: "#2ac3ff", left: 207.41, width: 5.06, bodyTop: 96.46, bodyH: 1.82, wickLeftOffset: 2.53, wickTop: 92.82, wickH: 10.92 },
  { color: "#ff3e88", left: 213.31, width: 5.06, bodyTop: 96.46, bodyH: 1.5, wickLeftOffset: 0, wickTop: 96.46, wickH: 1.5 },
  { color: "#ff3e88", left: 219.22, width: 4.22, bodyTop: 97.37, bodyH: 18.2, wickLeftOffset: 1.69, wickTop: 96.46, wickH: 23.66 },
  { color: "#2ac3ff", left: 225.12, width: 4.22, bodyTop: 113.75, bodyH: 1.82, wickLeftOffset: 1.69, wickTop: 105.56, wickH: 25.48 },
  { color: "#ff3e88", left: 231.02, width: 4.22, bodyTop: 113.75, bodyH: 10.01, wickLeftOffset: 1.69, wickTop: 108.29, wickH: 15.47 },
  { color: "#2ac3ff", left: 236.08, width: 5.06, bodyTop: 101.01, bodyH: 22.75, wickLeftOffset: 2.53, wickTop: 97.37, wickH: 32.76 },
  { color: "#ff3e88", left: 241.98, width: 4.22, bodyTop: 101.01, bodyH: 10.01, wickLeftOffset: 1.69, wickTop: 101.01, wickH: 14.56 },
  { color: "#2ac3ff", left: 247.88, width: 4.22, bodyTop: 98.28, bodyH: 12.74, wickLeftOffset: 1.69, wickTop: 94.64, wickH: 19.11 },
  { color: "#2ac3ff", left: 253.78, width: 4.22, bodyTop: 91, bodyH: 6.37, wickLeftOffset: 1.69, wickTop: 88.27, wickH: 10.92 },
];

// --- Act 3 (storyboard panel 4, "Drill into every order and see where size
// accumulates"): the candle chart zooms in until the footprint chart takes
// over in the exact same box, the nav panel fades in partway through (chat
// icon pre-highlighted, per the reference), and the headline retypes. ---
const CANDLES_END = CANDLES_START + (CANDLE_DATA.length - 1) * CANDLE_STAGGER + CANDLE_GROW_DURATION;
const CANDLE_HOLD = 0.6;
const ZOOM_START = CANDLES_END + CANDLE_HOLD;
const ZOOM_DURATION = 1.0;

const NAV_APPEAR = ZOOM_START + ZOOM_DURATION * 0.5;
const NAV_APPEAR_DURATION = 0.4;

const HEADLINE_3 = "Drill into every order and see where size accumulates";
const OLD_HEADLINE_2_FADE_DELAY = ZOOM_START;
const OLD_HEADLINE_2_FADE_DURATION = 0.3; // quicker fade, so it's fully gone sooner
const HEADLINE_3_START = OLD_HEADLINE_2_FADE_DELAY + OLD_HEADLINE_2_FADE_DURATION + 0.4; // bigger gap before the new one starts typing

// Cells start growing in the moment the footprint content itself becomes
// visible (see the footprint content's own opacity transition), not before.
const FOOTPRINT_CELLS_START = ZOOM_START + ZOOM_DURATION * 0.8;
const FOOTPRINT_CELL_STAGGER = 0.03;
const FOOTPRINT_CELL_DURATION = 0.25;
const FOOTPRINT_WICK_STAGGER = 0.15;
const FOOTPRINT_WICK_DURATION = 0.4;

interface FootprintGroup {
  left: number;
  width: number;
  top: number;
  cellHeight: number;
  rows: string[];
  wickColor: string;
}

// 50% alpha baked into the color itself (not a div-level opacity) so the
// text drawn on top stays fully opaque — CSS opacity on a parent dims its
// children too, which is what made the text look dim last time.
const FP_BLUE = "rgba(26,58,143,0.5)";
const FP_RED = "rgba(180,24,60,0.5)";
const FP_ORANGE = "rgba(216,156,72,0.5)";
const FP_WICK_GREEN = "#48fcb4";
const FP_WICK_RED = "#e43c60";

// Pixel-extracted the same way as the candle chart: cropped panel 4's chart
// box, surveyed its actual color palette, then read off each column-group's
// row colors and vertical extent from a 3x-upscaled crop (5 groups total,
// see git history for the full set). Per request, only the middle 3 groups
// are kept here, and their bounding box is linearly rescaled to fill the
// whole 258x182 canvas — same relative shape/colors/gaps, just further
// zoomed in so the per-cell text is actually legible.
const FOOTPRINT_DATA: FootprintGroup[] = [
  {
    left: 0,
    width: 80.7,
    top: 0,
    cellHeight: 17.2,
    wickColor: FP_WICK_RED,
    rows: [FP_BLUE, FP_RED, FP_RED, FP_RED, FP_BLUE, FP_BLUE, FP_BLUE, FP_RED],
  },
  { left: 88, width: 79.3, top: 93.3, cellHeight: 17.7, wickColor: FP_WICK_GREEN, rows: [FP_BLUE, FP_BLUE, FP_ORANGE, FP_BLUE, FP_BLUE] },
  {
    left: 178.8,
    width: 79.3,
    top: 0,
    cellHeight: 15.9,
    wickColor: FP_WICK_RED,
    rows: [FP_BLUE, FP_BLUE, FP_BLUE, FP_RED, FP_ORANGE, FP_BLUE, FP_BLUE, FP_RED, FP_BLUE],
  },
];

function ChevronDown() {
  return (
    <svg width="11" height="7" viewBox="0 0 12.75 7.125" fill="none">
      <path d="M0.75 0.75L6.375 6.375L12 0.75" stroke="#9FABC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// One row on the strip — its own scale/opacity track the live scroll
// position, brightening and growing as it passes the center line. The row
// that ends up centered (isLanding) gains a border + chevron once landed;
// every other row simply fades away — no separate overlay element, so
// nothing can ever visually overlap or double up during the handoff.
function WheelRow({
  coin,
  index,
  y,
  isLanding,
  landed,
  tickerOverride,
}: {
  coin: Coin;
  index: number;
  y: ReturnType<typeof useMotionValue<number>>;
  isLanding: boolean;
  landed: boolean;
  tickerOverride?: string;
}) {
  const centerY = centerYFor(index);
  const scale = useTransform(y, [centerY - 2 * ROW_H, centerY - ROW_H, centerY, centerY + ROW_H, centerY + 2 * ROW_H], [0.65, 0.82, 1.15, 0.82, 0.65]);
  const opacity = useTransform(y, [centerY - 2 * ROW_H, centerY - ROW_H, centerY, centerY + ROW_H, centerY + 2 * ROW_H], [0.1, 0.45, 1, 0.45, 0.1]);

  return (
    <motion.div
      style={{ height: ROW_H }}
      className="flex items-center justify-center"
      animate={{ opacity: landed && !isLanding ? 0 : 1 }}
      transition={{ duration: ROW_FADE_OUT_DURATION, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-full border-[1.5px]"
        style={{ scale, opacity, backgroundColor: "rgba(31,60,139,0.15)" }}
        animate={{ borderColor: isLanding && landed ? "#5985ff" : "transparent" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center justify-center gap-[8px] px-[16px] py-[10px]"
          animate={{ scale: isLanding && landed ? [1, 1.08, 1] : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {coin.icon}
          <span className="text-[16px] font-semibold text-[#f1f6ff] whitespace-nowrap">{tickerOverride ?? coin.ticker}</span>
          {isLanding && landed && <ChevronDown />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CandleChart() {
  return (
    <>
      {CANDLE_DATA.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: c.left, top: c.bodyTop, width: c.width, height: c.bodyH, backgroundColor: c.color, transformOrigin: "bottom" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: CANDLE_GROW_DURATION, delay: CANDLES_START + i * CANDLE_STAGGER, ease: "easeOut" }}
        />
      ))}
      {CANDLE_DATA.map((c, i) => (
        <motion.div
          key={`wick-${i}`}
          className="absolute"
          style={{ left: c.left + c.wickLeftOffset, top: c.wickTop, width: 1.1, height: c.wickH, backgroundColor: c.color, transformOrigin: "bottom" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: CANDLE_GROW_DURATION, delay: CANDLES_START + i * CANDLE_STAGGER, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

function FootprintChart() {
  let cellIndex = 0;
  return (
    <>
      {FOOTPRINT_DATA.map((g, gi) => {
        const subW = (g.width - 2) / 2;
        const groupHeight = g.cellHeight * g.rows.length;
        return (
          <div key={gi}>
            {g.rows.map((color, ri) => {
              const delay = FOOTPRINT_CELLS_START + cellIndex * FOOTPRINT_CELL_STAGGER;
              cellIndex++;
              const top = g.top + ri * g.cellHeight;
              return (
                <div key={ri}>
                  <motion.div
                    className="absolute overflow-hidden rounded-[1px] flex items-center justify-center"
                    style={{ left: g.left, top, width: subW, height: g.cellHeight - 0.6, backgroundColor: color }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: FOOTPRINT_CELL_DURATION, delay, ease: "easeOut" }}
                  >
                    <span style={{ fontSize: 6, color: "#f1f6ff", whiteSpace: "nowrap" }}>594.5k</span>
                  </motion.div>
                  <motion.div
                    className="absolute overflow-hidden rounded-[1px] flex items-center justify-center"
                    style={{ left: g.left + subW + 2, top, width: subW, height: g.cellHeight - 0.6, backgroundColor: color }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: FOOTPRINT_CELL_DURATION, delay, ease: "easeOut" }}
                  >
                    <span style={{ fontSize: 6, color: "#f1f6ff", whiteSpace: "nowrap" }}>594.5k</span>
                  </motion.div>
                </div>
              );
            })}
            <motion.div
              className="absolute"
              style={{ left: g.left + subW, top: g.top, width: 1.2, height: groupHeight, backgroundColor: g.wickColor, transformOrigin: "top" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: FOOTPRINT_WICK_DURATION, delay: FOOTPRINT_CELLS_START + gi * FOOTPRINT_WICK_STAGGER, ease: "easeOut" }}
            />
          </div>
        );
      })}
    </>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" fill="#5c78c4" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" fill="#5c78c4" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" fill="#5c78c4" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" fill="#5c78c4" />
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  const c = active ? "#f1f6ff" : "#5c78c4";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2.5A6.2 6.2 0 0 0 3.2 11.4L2.4 15l3.7-1A6.2 6.2 0 1 0 9 2.5Z" fill={c} opacity={active ? 1 : 0.9} />
      <path d="M13.2 3.4 14 5.2l1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8.8-1.8Z" fill={c} />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5a4.5 4.5 0 0 0-2.5 8.25c.4.28.6.7.6 1.15v.6h3.8v-.6c0-.45.2-.87.6-1.15A4.5 4.5 0 0 0 8 1.5Z"
        stroke="#5c78c4"
        strokeWidth="1.1"
      />
      <path d="M6.5 13.5h3" stroke="#5c78c4" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M12.5 2 13.3 2.8 M12.5 2 11.7 2.8 M12.5 2 12.5 3" stroke="#5c78c4" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

// 3 icons × 28px + 2 gaps × 10px + top/bottom padding × 12px
const NAV_HEIGHT = 3 * 28 + 2 * 10 + 2 * 12;

// The 3-icon side nav — fades in partway through the zoom, with the chat
// icon pre-highlighted (matching the reference exactly: it's lit up here,
// before the user ever reaches the chat screen, foreshadowing Act 4).
function NavPanel({ left, top }: { left: number; top: number }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-[10px] rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-[rgba(17,23,83,0.45)] px-[9px] py-[12px]"
      style={{ left, top }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: NAV_APPEAR_DURATION, delay: NAV_APPEAR, ease: "easeOut" }}
    >
      <div className="flex size-[28px] items-center justify-center rounded-[9px]">
        <GridIcon />
      </div>
      <div className="flex size-[28px] items-center justify-center rounded-[9px] bg-[#5985ff]">
        <ChatIcon active />
      </div>
      <div className="flex size-[28px] items-center justify-center rounded-[9px]">
        <LightbulbIcon />
      </div>
    </motion.div>
  );
}

export function CoinIntroAct() {
  const y = useMotionValue(START_Y);
  const [landed, setLanded] = useState(false);
  const [chartLabel, setChartLabel] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChartLabel(true), MOVE_UP_ABS * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-[600px] w-[480px] overflow-hidden rounded-[19px] border border-[rgba(167,191,255,0.25)] bg-[#00022b]">
      {/* Act 1 headline — fades out once the coin starts moving up */}
      <motion.p
        className="absolute left-1/2 top-[64px] w-[340px] -translate-x-1/2 text-center text-[21px] font-semibold leading-[28px] text-[#f1f6ff]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: OLD_HEADLINE_FADE_DURATION, delay: OLD_HEADLINE_FADE_DELAY, ease: "easeOut" }}
      >
        <TypedText text={HEADLINE} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
      </motion.p>

      {/* Act 2 headline — types in after the old one has faded, then fades
          out itself once the zoom into the footprint chart begins */}
      <motion.p
        className="absolute left-1/2 top-[64px] w-[340px] -translate-x-1/2 text-center text-[21px] font-semibold leading-[28px] text-[#f1f6ff]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: OLD_HEADLINE_2_FADE_DURATION, delay: OLD_HEADLINE_2_FADE_DELAY, ease: "easeOut" }}
      >
        <TypedText text={HEADLINE_2} startDelay={HEADLINE_2_START} charDelay={CHAR_DELAY} />
      </motion.p>

      {/* Act 3 headline */}
      <p className="absolute left-1/2 top-[64px] w-[340px] -translate-x-1/2 text-center text-[21px] font-semibold leading-[28px] text-[#f1f6ff]">
        <TypedText text={HEADLINE_3} startDelay={HEADLINE_3_START} charDelay={CHAR_DELAY} />
      </p>

      {/* The wheel — appears once, spins to a stop, and the landed coin just
          stays; nothing else fades it out. Non-landing rows fade themselves
          out (see WheelRow). Once settled, the whole (now nearly-empty)
          viewport travels upward together with its one surviving row — the
          same element becoming the chart header chip, never a second one. */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: WHEEL_TOP }}
        animate={{ y: landed ? HEADER_MOVE_UP_PX : 0 }}
        transition={{ duration: MOVE_UP_DURATION, delay: MOVE_UP_DELAY, ease: "easeInOut" }}
      >
        <motion.div
          className="overflow-hidden"
          style={{
            height: VIEWPORT_H,
            width: 220,
            maskImage: landed ? "none" : "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskImage: landed ? "none" : "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: WHEEL_APPEAR_DURATION, delay: WHEEL_APPEAR, ease: "easeOut" }}
        >
          <motion.div
            style={{ y }}
            animate={{ y: TARGET_Y }}
            transition={{ duration: SPIN_DURATION, delay: SPIN_START, ease: [0.1, 0.7, 0.15, 1] }}
            onAnimationComplete={() => setLanded(true)}
          >
            {STRIP.map((coin, i) => (
              <WheelRow
                key={i}
                coin={coin}
                index={i}
                y={y}
                isLanding={i === LANDING_INDEX}
                landed={landed}
                tickerOverride={i === LANDING_INDEX && chartLabel ? "ETHUSDC" : undefined}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Chart box — ONE static box (fixed position/size/border) for both
          the candle and footprint content. The zoom is the candle CONTENT
          scaling up inside this fixed, clipped box — the box/card itself
          never moves or resizes — until the footprint content (also just
          sitting in this same box) takes over. */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-[12px] border border-[rgba(167,191,255,0.3)] bg-[rgba(111,114,186,0.04)] overflow-hidden"
        style={{ top: CHART_TOP, width: DISPLAY_CHART_W, height: DISPLAY_CHART_H }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: CHART_BOX_APPEAR_DURATION, delay: CHART_BOX_DELAY, ease: "easeOut" }}
      >
        {/* Stretches the untouched 258x182 coordinate space (all the
            pixel-extracted candle/footprint data below) up to the bigger
            display box — content positions/proportions stay exactly as
            measured, only the overall size changes. */}
        <div className="absolute left-0 top-0" style={{ width: CHART_BOX_W, height: CHART_BOX_H, transform: `scale(${CHART_SCALE})`, transformOrigin: "top left" }}>
          {/* Candle content — stays put while candles draw in, then zooms in
              (scales up) continuously, staying fully visible almost the whole
              way and only fading in the last stretch, right as the footprint
              content is revealed underneath it. */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1, 1.9, 2.4], opacity: [1, 1, 1, 0] }}
            transition={{
              duration: ZOOM_START + ZOOM_DURATION - CHART_BOX_DELAY,
              delay: CHART_BOX_DELAY,
              times: [
                0,
                (ZOOM_START - CHART_BOX_DELAY) / (ZOOM_START + ZOOM_DURATION - CHART_BOX_DELAY),
                (ZOOM_START + ZOOM_DURATION * 0.8 - CHART_BOX_DELAY) / (ZOOM_START + ZOOM_DURATION - CHART_BOX_DELAY),
                1,
              ],
              ease: "easeInOut",
            }}
          >
            <CandleChart />
          </motion.div>

          {/* Footprint content — fades in right as the zoomed-in candle fades
              out, so it reads as "zoomed in until this appeared," not a
              crossfade between two independently-moving things. */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ZOOM_DURATION * 0.2, delay: ZOOM_START + ZOOM_DURATION * 0.8, ease: "easeOut" }}
          >
            <FootprintChart />
          </motion.div>
        </div>
      </motion.div>

      <NavPanel left={50} top={CHART_BOX_CENTER_Y - NAV_HEIGHT / 2} />
    </div>
  );
}
