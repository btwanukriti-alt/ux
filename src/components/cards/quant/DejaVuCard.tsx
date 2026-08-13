"use client";

import { motion } from "framer-motion";
import { ClickCursor } from "../ClickCursor";
import { GradientBorder } from "../GradientBorder";
import { DiagonalGlow } from "../DiagonalGlow";

// Figma node 2664:226910 — "Deja Vu"

// --- Timeline -----------------------------------------------------------------
const TITLE_APPEAR_DURATION = 0.3;

const DROPDOWN_START = 0.2;
const DROPDOWN_STAGGER = 0.15;
const DROPDOWN_APPEAR_DURATION = 0.3;

const BUTTON_DELAY = DROPDOWN_START + 3 * DROPDOWN_STAGGER;
const BUTTON_APPEAR_DURATION = 0.3;

const CURSOR_ARRIVE = BUTTON_DELAY + 0.4;
const CURSOR_CLICK = CURSOR_ARRIVE + 0.35;
const CURSOR_FADE_OUT_DELAY = CURSOR_CLICK + 0.25;
const CURSOR_FADE_OUT_DURATION = 0.25;

const BUTTON_GLOW_DELAY = CURSOR_CLICK + 0.05;
const BUTTON_GLOW_DURATION = 0.7;

const BORDER_DRAW_DELAY = BUTTON_GLOW_DELAY + BUTTON_GLOW_DURATION + 0.05;
const BORDER_DRAW_DURATION = 1.0;

const PANEL_CONTENT_DELAY = BORDER_DRAW_DELAY + BORDER_DRAW_DURATION - 0.15;
const PANEL_CONTENT_DURATION = 0.3;

const RESULTS_START = BORDER_DRAW_DELAY + BORDER_DRAW_DURATION + 0.15;
const RESULT_STAGGER = 0.22;

const OUTCOME_TEXT_DELAY = RESULTS_START + 0.1;

const CHART_DELAY = RESULTS_START + 2 * RESULT_STAGGER + 0.3;
const CHART_BAR_STAGGER = 0.04;
const CHART_BAR_COUNT = 12;

const GLOW_DELAY = CHART_DELAY + CHART_BAR_COUNT * CHART_BAR_STAGGER + 0.35;
const GLOW_DURATION = 1.3;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

function Dropdown({ left, width, placeholderWidth, delay }: { left: number; width: number; placeholderWidth: number; delay: number }) {
  return (
    <motion.div
      className="absolute flex h-[27.887px] items-center justify-between overflow-hidden rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(31,60,139,0.1)] px-[12px] py-[8px] top-[72.74px]"
      style={{ left, width }}
      {...fadeOnly(delay, DROPDOWN_APPEAR_DURATION)}
    >
      <div className="h-[9px] shrink-0 rounded-[2px] bg-[rgba(167,191,255,0.3)]" style={{ width: placeholderWidth }} />
      <div className="flex size-[24px] shrink-0 items-center justify-center rounded-full p-[3px]">
        <img alt="" className="w-[12.75px] h-[7.125px] rotate-180" src="/figma/deja-vu/chevron-down.svg" />
      </div>
    </motion.div>
  );
}

function ResultRow({
  top,
  width,
  date,
  score,
  tag,
  highlighted,
  delay,
}: {
  top: number;
  width: number;
  date: string;
  score: string;
  tag: string;
  highlighted?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className={
        "absolute flex flex-col items-start gap-[3.975px] overflow-hidden rounded-[8px] p-[9.539px] backdrop-blur-[7.949px] left-[58.85px]" +
        (highlighted ? " border-[0.795px] border-[rgba(128,197,255,0.05)]" : "")
      }
      style={{
        top,
        width,
        ...(highlighted
          ? {
              backgroundImage:
                "linear-gradient(180.00000211963686deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 155.9 55.233' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-1.4516e-7 -0.66563 5.9789 -2.327e-7 79.553 7.7751e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 155.9 55.233' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.9683e-7 -1.8243 13.238 -3.6995e-7 77.949 2.9583)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
            }
          : {}),
      }}
      {...fadeOnly(delay, 0.35)}
    >
      <div className="flex w-full shrink-0 items-center justify-between">
        <div className="flex shrink-0 items-center gap-[3.975px]">
          <p className="shrink-0 whitespace-nowrap text-[9.54px] font-medium leading-[12.719px] text-white">BTC</p>
          <div className="flex shrink-0 items-center px-[0.861px] py-[1.722px]">
            <img alt="" className="block size-[3.445px]" src="/figma/deja-vu/dot.svg" />
          </div>
          <p className="shrink-0 whitespace-nowrap text-[9.54px] font-medium leading-[12.719px] text-white">{date}</p>
        </div>
        <p className="shrink-0 whitespace-nowrap text-[8.85px] font-medium leading-[12.639px] text-[#4da3ff]">{score}</p>
      </div>
      <div className="flex shrink-0 items-center gap-[6.36px]">
        <div className="flex items-start overflow-hidden rounded-[4px] border-[0.397px] border-[rgba(255,255,255,0.1)] px-[6.36px] py-[1.59px]">
          <p className="shrink-0 whitespace-nowrap text-[9.54px] font-normal leading-[12.719px] text-[#5985ff]">{tag}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Bar({ height, highlight, delay }: { height: number; highlight?: boolean; delay: number }) {
  return (
    <motion.div
      className={"w-[28.949px] shrink-0 rounded-[1.379px] " + (highlight ? "bg-[#4261b4]" : "bg-[#25345c]")}
      style={{ height, transformOrigin: "bottom" }}
      initial={{ opacity: 0, scaleY: 0.25 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    />
  );
}

const barHeights = [4.082, 10.496, 13.412, 32.969, 32.969, 48.737, 73.822, 53.037, 59.488, 40.853, 22.158, 16.327];
const highlightedBars = new Set([6, 7]);

// The panel outline redrawn as two real stroke paths (left half + right
// half), both starting at the button's notch and meeting at bottom-center,
// so they can draw themselves downward with pathLength — matching the
// original panel-border.svg's box (569.658 × 232.58, r=16, gap 210.943–361.396)
// but as live vector paths instead of a flattened image.
const R = 16;
const BOX_W = 569.658;
const BOX_H = 232.58;
const NOTCH_LEFT = 210.943;
const NOTCH_RIGHT = 361.396;
const BOTTOM_CENTER_X = BOX_W / 2;

const leftBorderPath = `M ${NOTCH_LEFT} 0.75 L ${R} 0.75 A ${R} ${R} 0 0 0 0.75 ${R} L 0.75 ${BOX_H - R} A ${R} ${R} 0 0 0 ${R} ${BOX_H - 0.75} L ${BOTTOM_CENTER_X} ${BOX_H - 0.75}`;
const rightBorderPath = `M ${NOTCH_RIGHT} 0.75 L ${BOX_W - R} 0.75 A ${R} ${R} 0 0 1 ${BOX_W - 0.75} ${R} L ${BOX_W - 0.75} ${BOX_H - R} A ${R} ${R} 0 0 1 ${BOX_W - R} ${BOX_H - 0.75} L ${BOTTOM_CENTER_X} ${BOX_H - 0.75}`;

function PanelBorder() {
  return (
    <svg
      className="absolute left-[19.17px] top-[144.59px] block"
      width={BOX_W}
      height={BOX_H}
      viewBox={`0 0 ${BOX_W} ${BOX_H}`}
      fill="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="dejaVuBorderGradient" x1="23.5533" y1="6.6652" x2="502.434" y2="199.728" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5985FF" />
          <stop offset="1" stopColor="#00FFFF" />
        </linearGradient>
      </defs>
      <motion.path
        d={leftBorderPath}
        stroke="url(#dejaVuBorderGradient)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: BORDER_DRAW_DURATION, delay: BORDER_DRAW_DELAY, ease: "easeInOut" }}
      />
      <motion.path
        d={rightBorderPath}
        stroke="url(#dejaVuBorderGradient)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: BORDER_DRAW_DURATION, delay: BORDER_DRAW_DELAY, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function DejaVuCard() {
  return (
    <div className="relative h-[364px] w-[600px] overflow-hidden rounded-[19px] border border-[rgba(167,191,255,0.25)] bg-[rgba(143,133,186,0.02)] backdrop-blur-[2.7px]">
      {/* Title pill */}
      <motion.div
        className="absolute left-1/2 top-[20.07px] flex -translate-x-1/2 items-center gap-[6px] rounded-[8px] border border-[rgba(167,191,255,0.3)] bg-[rgba(98,115,163,0.1)] px-[12px] py-[5px]"
        {...fadeOnly(0, TITLE_APPEAR_DURATION)}
      >
        <div className="relative size-[16px] shrink-0">
          <div className="absolute inset-[9.37%_9.37%_9.38%_9.38%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma/deja-vu/clock-icon.svg" />
          </div>
        </div>
        <p className="shrink-0 whitespace-nowrap text-[12px] font-semibold leading-[16px] text-[#f1f6ff]">Deja Vu</p>
      </motion.div>

      {/* Dropdown selects — one by one */}
      <Dropdown left={31.56} width={169.928} placeholderWidth={60} delay={DROPDOWN_START} />
      <Dropdown left={211.31} width={168.946} placeholderWidth={65} delay={DROPDOWN_START + DROPDOWN_STAGGER} />
      <Dropdown left={390.08} width={169.928} placeholderWidth={63} delay={DROPDOWN_START + DROPDOWN_STAGGER * 2} />

      {/* Find Look-alikes button — cursor clicks it, then its border glows once */}
      <motion.div
        className="absolute left-[235.69px] top-[129.59px] flex items-center justify-center gap-[4px] rounded-[8px] px-[16px] py-[7px]"
        style={{
          border: "1px solid transparent",
          backgroundImage: "linear-gradient(#03052e, #03052e), linear-gradient(90deg, #b259ff 0%, #00ffff 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        {...fadeOnly(BUTTON_DELAY, BUTTON_APPEAR_DURATION)}
      >
        <GradientBorder
          color="255,255,255"
          duration={BUTTON_GLOW_DURATION}
          delay={BUTTON_GLOW_DELAY}
          baseOpacity={0.1}
          sweepOpacity={0.7}
          restColor="255,255,255"
          restOpacity={0}
        />
        <img alt="" className="size-[13px]" src="/figma/deja-vu/search-icon.svg" />
        <p className="shrink-0 whitespace-nowrap text-[12px] font-medium leading-[16px] text-[#5cb5ff]">Find Look-alikes</p>
      </motion.div>

      <ClickCursor
        left={335}
        top={144}
        arriveDelay={CURSOR_ARRIVE}
        clickDelay={CURSOR_CLICK}
        fadeOutDelay={CURSOR_FADE_OUT_DELAY}
        fadeOutDuration={CURSOR_FADE_OUT_DURATION}
      />

      {/* Outer panel border — draws itself down from the button, both sides, meeting at bottom-center */}
      <PanelBorder />

      {/* Panel content tint/border */}
      <motion.div
        className="absolute left-[39px] top-[177.5px] h-[177.06px] w-[533.983px] rounded-[6px] border border-[rgba(167,191,255,0.3)] bg-[rgba(111,114,186,0.04)]"
        {...fadeOnly(PANEL_CONTENT_DELAY, PANEL_CONTENT_DURATION)}
      />

      {/* Result rows (left column) — appear one by one */}
      <ResultRow top={189.95} width={155.897} date="19-01-2026" score="0.91" tag="coiled-spring" highlighted delay={RESULTS_START} />
      <ResultRow top={250.95} width={155.897} date="07-10-2024" score="0.86" tag="hidden-accumulation" delay={RESULTS_START + RESULT_STAGGER} />
      <ResultRow top={311.95} width={156.878} date="07-10-2024" score="0.86" tag="hidden-accumulation" delay={RESULTS_START + RESULT_STAGGER * 2} />

      {/* Outcome (right column) */}
      <motion.div
        className="absolute left-[233.27px] top-[198.94px] flex h-[19.784px] w-[55.414px] flex-col items-start whitespace-nowrap px-[2.419px] font-medium"
        {...fadeOnly(OUTCOME_TEXT_DELAY, 0.35)}
      >
        <p className="shrink-0 text-[8.467px] leading-[12.096px] text-[#f1f6ff]">Outcome</p>
        <p className="shrink-0 text-[6.048px] leading-[7.258px] text-[#a7bce4]">7 matches found</p>
      </motion.div>
      <motion.p
        className="absolute left-[233.27px] top-[230.89px] w-[162.325px] text-[0px] leading-[0] text-[#f1f6ff]"
        {...fadeOnly(OUTCOME_TEXT_DELAY + 0.1, 0.35)}
      >
        <span className="text-[7.258px] font-normal leading-[9.677px] text-[#a7bce4]">Of 7 matches</span>
        <span className="text-[7.258px] leading-[9.677px]">{`, `}</span>
        <span className="text-[7.258px] font-semibold leading-[9.677px]">6 broke out</span>
        <span className="text-[7.258px] leading-[9.677px]">{` `}</span>
        <span className="text-[7.258px] font-normal leading-[9.677px] text-[#a7bce4]">within 2-7 days</span>
        <span className="text-[7.258px] leading-[9.677px]">{` `}</span>
        <span className="text-[7.258px] font-normal leading-[9.677px] text-[#45ffb5]">(+8% avg),</span>
        <span className="text-[7.258px] font-normal leading-[9.677px] text-[#a7bce4]">{` 1 reversed`}</span>
      </motion.p>

      {/* Outcome bar chart */}
      <div className="absolute left-[233.46px] top-[260.5px] flex h-[81px] w-[324.541px] items-end justify-center gap-[4.136px] overflow-hidden">
        {barHeights.map((height, i) => (
          <Bar key={i} height={height} highlight={highlightedBars.has(i)} delay={CHART_DELAY + i * CHART_BAR_STAGGER} />
        ))}
      </div>

      {/* Subtle diagonal glow once everything has settled */}
      <DiagonalGlow left={39} top={177.5} width={533.983} height={177.06} borderRadius={6} delay={GLOW_DELAY} duration={GLOW_DURATION} />
    </div>
  );
}
