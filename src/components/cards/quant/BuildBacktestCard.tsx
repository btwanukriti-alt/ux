"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GradientBorder } from "../GradientBorder";
import { DiagonalGlow } from "../DiagonalGlow";
import { ClickCursor } from "../ClickCursor";

// Figma node 2664:227088 — "Build&Bactest"

// --- Prompt typewriter scheduling --------------------------------------------
type Segment = { kind: "text"; text: string; className: string } | { kind: "chip"; text: string };

const CHAR_DELAY = 0.022;
const CHIP_POP_DURATION = 0.22;
const LINE_GAP = 0.08;

const textClass = "shrink-0 whitespace-nowrap text-[10.025px] font-medium leading-[13.367px] text-[#f1f6ff]";
const textClassLight = "shrink-0 whitespace-nowrap text-[10.025px] font-normal leading-[18.38px] text-[#f1f6ff]";

const line1: Segment[] = [
  { kind: "text", text: "Buy when", className: textClass },
  { kind: "chip", text: "Regime" },
  { kind: "text", text: "flips to breakout and price is above", className: textClassLight },
  { kind: "chip", text: "value-area-high" },
  { kind: "text", text: "with", className: textClassLight },
  { kind: "chip", text: "fragility" },
];
const line2: Segment[] = [
  { kind: "text", text: "under 0.5, take profit 2%, stop 1%", className: "w-full shrink-0 text-[10.025px] font-medium leading-[13.367px] text-[#f1f6ff]" },
];

function scheduleSegments(segments: Segment[], start: number) {
  let t = start;
  return segments.map((seg) => {
    const delay = t;
    const duration = seg.kind === "text" ? seg.text.length * CHAR_DELAY : CHIP_POP_DURATION;
    t += duration;
    return { seg, delay, duration };
  });
}

const AVATAR_DURATION = 0.3;
const PROMPT_START = 0.2;
const line1Scheduled = scheduleSegments(line1, PROMPT_START);
const line1End = line1Scheduled.length
  ? line1Scheduled[line1Scheduled.length - 1].delay + line1Scheduled[line1Scheduled.length - 1].duration
  : PROMPT_START;
const line2Scheduled = scheduleSegments(line2, line1End + LINE_GAP);
const PROMPT_END = line2Scheduled[line2Scheduled.length - 1].delay + line2Scheduled[line2Scheduled.length - 1].duration;

// --- Rest of the timeline -----------------------------------------------------
const PANEL_DELAY = PROMPT_END + 0.3;
const PANEL_APPEAR_DURATION = 0.3;

const ROWS_START = PANEL_DELAY + 0.3;
const ROW_STAGGER = 0.12;
const ROW_COUNT = 8; // 4 rows × (short label bar, long value bar)
const ROWS_END = ROWS_START + (ROW_COUNT - 1) * ROW_STAGGER + 0.2;

const BUTTON_DELAY = ROWS_END + 0.15;
const BUTTON_APPEAR_DURATION = 0.25;

const CURSOR_DELAY = BUTTON_DELAY + 0.35;
const CURSOR_CLICK_DELAY = CURSOR_DELAY + 0.3;
const CURSOR_FADE_OUT_DELAY = CURSOR_CLICK_DELAY + 0.35;
const CURSOR_FADE_OUT_DURATION = 0.25;

const GLOW_DELAY = CURSOR_CLICK_DELAY + 0.05;
const GLOW_DURATION = 0.8;

const RESULTS_PANEL_DELAY = GLOW_DELAY + GLOW_DURATION + 0.2;
const RESULTS_PANEL_APPEAR_DURATION = 0.3;

const CARD_STAGGER = 0.28;
const CARD1_DELAY = RESULTS_PANEL_DELAY + 0.25; // chart thumbnail 1
const CARD2_DELAY = CARD1_DELAY + CARD_STAGGER; // chart thumbnail 2
const CARD3_DELAY = CARD2_DELAY + CARD_STAGGER; // right-side skeleton columns

const DIAGONAL_GLOW_DELAY = CARD3_DELAY + 0.5;
const DIAGONAL_GLOW_DURATION = 1.3;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// --- Typewriter pieces --------------------------------------------------------
// Driven by elapsed wall-clock time (via requestAnimationFrame) rather than
// counting setInterval ticks, so a throttled/backgrounded tab catches up
// instantly to the correct character count on the next frame instead of
// lagging or appearing stuck when the tab regains focus.
function TypedSegment({ text, className, delay, charDelay }: { text: string; className: string; delay: number; charDelay: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let raf: number;
    let cancelled = false;
    const startAt = performance.now() + delay * 1000;

    function tick(now: number) {
      if (cancelled) return;
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setStarted(true);
      const elapsed = (now - startAt) / 1000;
      const next = Math.min(text.length, Math.floor(elapsed / charDelay));
      setCount(next);
      if (next < text.length) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [text, delay, charDelay]);

  const done = count >= text.length;

  return (
    <p className={className}>
      {text.slice(0, count)}
      {started && !done && (
        <motion.span
          className="ml-[1px] inline-block h-[9px] w-[1.2px] align-middle bg-[#f1f6ff]"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      )}
    </p>
  );
}

function useAfter(delay: number) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

// Chips don't type — they pop in as a whole token once the typewriter reaches
// them, and stay unmounted (zero layout footprint) until then so the
// sentence around them doesn't reflow early.
function ChipSegment({ text, delay }: { text: string; delay: number }) {
  const ready = useAfter(delay);
  if (!ready) return null;
  return (
    <motion.div
      className="flex shrink-0 items-start overflow-hidden rounded-[16px] bg-[rgba(0,85,209,0.1)] px-[6.684px] py-[1.671px]"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <p className="shrink-0 whitespace-nowrap text-[10.03px] font-normal leading-[13.367px] text-[#80c5ff]">{text}</p>
    </motion.div>
  );
}

function RenderedSegment({ scheduled }: { scheduled: { seg: Segment; delay: number; duration: number } }) {
  const { seg, delay } = scheduled;
  if (seg.kind === "chip") return <ChipSegment text={seg.text} delay={delay} />;
  return <TypedSegment text={seg.text} className={seg.className} delay={delay} charDelay={CHAR_DELAY} />;
}

// --- Bars ----------------------------------------------------------------------
const chart1Bars = [
  { height: 29.637, width: 17.114, color: "#183585" },
  { height: 12.522, width: 16.697, color: "#0ff" },
  { height: 10.018, width: 17.114, color: "#183585" },
  { height: 6.679, width: 16.697, color: "#183585" },
  { height: 21.706, width: 17.114, color: "#183585" },
  { height: 24.628, width: 17.114, color: "#183585" },
];
const chart2Bars = [
  { height: 12.522, width: 16.697, color: "#0ff" },
  { height: 21.706, width: 17.114, color: "#183585" },
  { height: 6.679, width: 17.114, color: "#183585" },
  { height: 12.522, width: 16.697, color: "#183585" },
  { height: 21.706, width: 17.114, color: "#183585" },
];

function BarGroup({ bars, gap, startDelay }: { bars: typeof chart1Bars; gap: number; startDelay: number }) {
  return (
    <div className="relative flex h-[29.219px] shrink-0 items-end overflow-hidden px-[5.009px]" style={{ gap }}>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="shrink-0 rounded-[1.67px]"
          style={{ height: bar.height, width: bar.width, backgroundColor: bar.color, transformOrigin: "bottom" }}
          initial={{ opacity: 0, scaleY: 0.25 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: startDelay + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// --- Skeleton rows (Strategy Definition Card body) ------------------------------
const skeletonRows = [143.81, 157.65, 171.48, 185.31];

const skeletonColumnLines = [
  { left: 317.26, width: 61.296 },
  { left: 400.66, width: 20.872 },
  { left: 429.77, width: 20.872 },
  { left: 458.88, width: 20.872 },
  { left: 487.99, width: 20.872 },
];
const skeletonColumnTops = [53.32, 68.28, 83.24];

export function BuildBacktestCard() {
  return (
    <div className="relative h-[364px] w-[600px] overflow-hidden rounded-[19px] border border-[rgba(167,191,255,0.25)] bg-[rgba(143,133,186,0.02)] backdrop-blur-[2.7px]">
      {/* Prompt row */}
      <div className="absolute left-[32.75px] top-[34.5px] flex items-start gap-[8px]">
        <motion.div
          className="flex size-[18.5px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[34.154px] bg-[#5985ff] px-[7.4px] py-[4.554px]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: AVATAR_DURATION, ease: "easeOut" }}
        >
          <p className="w-[7.115px] shrink-0 text-[9.962px] font-medium leading-[normal] text-[#f1f6ff]">A</p>
        </motion.div>
        <div className="flex w-[447.796px] shrink-0 flex-col items-start gap-[1.258px]">
          <div className="flex w-full shrink-0 items-center gap-[3.342px]">
            {line1Scheduled.map((scheduled, i) => (
              <RenderedSegment key={i} scheduled={scheduled} />
            ))}
          </div>
          {line2Scheduled.map((scheduled, i) => (
            <RenderedSegment key={i} scheduled={scheduled} />
          ))}
        </div>
      </div>

      {/* Strategy Definition Card panel */}
      <motion.div
        className="absolute left-[87.54px] top-[105.53px] h-[98.013px] w-[395.614px] rounded-[8px] border border-[rgba(167,191,255,0.3)] bg-[rgba(111,114,186,0.04)]"
        {...fadeOnly(PANEL_DELAY, PANEL_APPEAR_DURATION)}
      />
      <motion.p
        className="absolute left-[99.25px] top-[116.46px] w-[119.306px] text-[8px] font-semibold leading-[12px] text-[#f1f6ff]"
        {...fadeOnly(PANEL_DELAY + 0.05, PANEL_APPEAR_DURATION)}
      >
        Strategy Definition Card
      </motion.p>

      {/* Skeleton rows — left to right within a row, then row by row */}
      {skeletonRows.map((top, rowIndex) => (
        <motion.div
          key={`short-${top}`}
          className="absolute left-[100.01px] h-[3.832px] w-[70.473px] rounded-[1px] bg-[#666fa0]"
          style={{ top }}
          {...fadeOnly(ROWS_START + rowIndex * 2 * ROW_STAGGER, 0.2)}
        />
      ))}
      {skeletonRows.map((top, rowIndex) => (
        <motion.div
          key={`long-${top}`}
          className="absolute left-[189.54px] h-[3.832px] w-[281.092px] rounded-[1px] bg-[#363f6b]"
          style={{ top }}
          {...fadeOnly(ROWS_START + (rowIndex * 2 + 1) * ROW_STAGGER, 0.2)}
        />
      ))}

      {/* Run Backtest button — cursor clicks it, then its border glows */}
      <motion.div
        className="absolute left-[397.75px] top-[118px] flex w-[73px] items-center justify-center gap-[2.457px] rounded-[2.457px] border-[0.614px] border-[rgba(255,255,255,0.1)] bg-[#5985ff] px-[4.915px] py-[2.457px]"
        {...fadeOnly(BUTTON_DELAY, BUTTON_APPEAR_DURATION)}
      >
        <GradientBorder
          color="255,255,255"
          duration={GLOW_DURATION}
          delay={GLOW_DELAY}
          baseOpacity={0.15}
          sweepOpacity={0.6}
          restColor="255,255,255"
          restOpacity={0.15}
        />
        <div className="relative size-[7.987px] shrink-0">
          <div className="absolute inset-[12.12%_15.15%_12.12%_21.21%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma/build-backtest/play-icon.svg" />
          </div>
        </div>
        <p className="shrink-0 whitespace-nowrap text-[7.37px] font-medium leading-[9.83px] text-[#f1f6ff]">Run Backtest</p>
      </motion.div>

      <ClickCursor
        left={449}
        top={121}
        arriveDelay={CURSOR_DELAY}
        clickDelay={CURSOR_CLICK_DELAY}
        fadeOutDelay={CURSOR_FADE_OUT_DELAY}
        fadeOutDuration={CURSOR_FADE_OUT_DURATION}
      />

      {/* Backtest Results panel */}
      <motion.div
        className="absolute left-[28.55px] top-[224.63px] h-[117.872px] w-[542.903px] rounded-[16px] border border-[#67d1ff]"
        {...fadeOnly(RESULTS_PANEL_DELAY, RESULTS_PANEL_APPEAR_DURATION)}
      >
        <div className="absolute left-0 top-0 h-[117.872px] w-[542.903px] rounded-[8px] bg-[rgba(111,114,186,0.04)]" />

        <p className="absolute left-[32.2px] top-[13.94px] h-[11.206px] w-[66px] text-[8px] font-semibold leading-[12px] text-[#f1f6ff]">
          Backtest Results
        </p>
        <div className="absolute left-[14.2px] top-[13.94px] size-[12.14px]">
          <div className="absolute inset-[9.38%_1.54%_12.5%_1.53%]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src="/figma/build-backtest/stack-icon.svg" />
          </div>
        </div>

        {/* Chart thumbnail 1 */}
        <motion.div
          className="absolute left-[10.89px] top-[41.13px] flex h-[57.897px] w-[148px] flex-col items-center justify-end overflow-hidden rounded-[6.679px] bg-[rgba(74,59,112,0.09)] px-[7.096px] py-[7.931px]"
          {...fadeOnly(CARD1_DELAY, 0.3)}
        >
          <BarGroup bars={chart1Bars} gap={5} startDelay={CARD1_DELAY + 0.15} />
        </motion.div>

        {/* Chart thumbnail 2 */}
        <motion.div
          className="absolute left-[166.89px] top-[42.06px] flex h-[57.897px] w-[132px] flex-col items-center justify-end overflow-hidden rounded-[6.679px] bg-[rgba(74,59,112,0.09)] px-[7.096px] py-[7.931px]"
          {...fadeOnly(CARD2_DELAY, 0.3)}
        >
          <BarGroup bars={chart2Bars} gap={7} startDelay={CARD2_DELAY + 0.15} />
        </motion.div>

        {/* Right-side skeleton columns */}
        <motion.div
          className="absolute left-[308.38px] top-[42.52px] h-[56.511px] w-[213.682px] rounded-[4px] bg-[rgba(74,59,112,0.09)]"
          {...fadeOnly(CARD3_DELAY, 0.3)}
        />
        <motion.div {...fadeOnly(CARD3_DELAY + 0.15, 0.3)}>
          {skeletonColumnLines.map((col) =>
            skeletonColumnTops.map((top) => (
              <div
                key={`${col.left}-${top}`}
                className="absolute h-[4.987px] rounded-[1px] bg-[#666fa0]"
                style={{ left: col.left, top, width: col.width }}
              />
            )),
          )}
        </motion.div>

        {/* Subtle diagonal glow once the results have all formed */}
        <DiagonalGlow left={0} top={0} width={542.903} height={117.872} borderRadius={16} delay={DIAGONAL_GLOW_DELAY} duration={DIAGONAL_GLOW_DURATION} />
      </motion.div>
    </div>
  );
}
