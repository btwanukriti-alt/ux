"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GradientBorder } from "../GradientBorder";

// Figma node 2664:227161 — "Research"

// --- Timeline (~9s total, no hard cap on this card) -------------------------
const PROMPT_TEXT = "Correlate BTC Regime shifts with ETH price on 4h";
const CHAR_DELAY = 0.028;
const PROMPT_TYPE_DURATION = PROMPT_TEXT.length * CHAR_DELAY;

const PROMPT_GLOW_DELAY = PROMPT_TYPE_DURATION + 0.15;
const PROMPT_GLOW_DURATION = 0.7;

const PROCESS_BOX_DELAY = PROMPT_GLOW_DELAY + PROMPT_GLOW_DURATION + 0.1;
const PROCESS_BOX_APPEAR_DURATION = 0.3;

const STEPS_START = PROCESS_BOX_DELAY + PROCESS_BOX_APPEAR_DURATION + 0.1;
const STEP_DURATION = 1.2;
const STEP_LABELS = ["Fetching Data", "Shaping", "Running Sandbox", "Rendering"];

const RESULTS_DELAY = STEPS_START + STEP_DURATION * STEP_LABELS.length + 0.15;
const RESULTS_GLOW_DURATION = 1.0;

const PENDING_COLOR = "#5c6a96";
const ACTIVE_COLOR = "#5985ff";

const fadeOnly = (delay: number, duration = 0.35) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// Typewriter reveal with a blinking cursor that fades out once typing ends.
// Driven by elapsed wall-clock time (via requestAnimationFrame) rather than
// counting setInterval ticks, so a throttled/backgrounded tab catches up
// instantly to the correct character count on the next frame instead of
// lagging or appearing stuck when the tab regains focus.
function TypedPrompt({ text, startDelay, charDelay }: { text: string; startDelay: number; charDelay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf: number;
    let cancelled = false;
    const startAt = performance.now() + startDelay * 1000;

    function tick(now: number) {
      if (cancelled) return;
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
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
  }, [text, startDelay, charDelay]);

  const done = count >= text.length;

  return (
    <>
      {text.slice(0, count)}
      <motion.span
        className="inline-block w-[1.5px] h-[10px] bg-[#f1f6ff] ml-[2px] align-middle"
        animate={done ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
        transition={
          done
            ? { duration: 0.3, delay: 0.2 }
            : { duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }
        }
      />
    </>
  );
}

function ChevronSeparator() {
  return (
    <div className="relative shrink-0 size-[15.427px] overflow-hidden">
      <div
        className="absolute flex inset-[20.83%_29.17%_20.83%_37.5%] items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/research/chevron-right.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[14.025px] overflow-hidden">
      <div className="absolute bottom-[23.27%] left-[16.67%] right-[14.94%] top-1/4">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/research/check.svg" />
      </div>
    </div>
  );
}

// The 5-dot "working" glyph, bouncing in a staggered wave while its step is active.
const DOT_INSETS = [
  "44% 78.57% 43.69% 10%",
  "43.85% 61.43% 43.85% 27.14%",
  "43.69% 44.29% 44% 44.29%",
  "43.69% 27.14% 44% 61.43%",
  "44% 10% 43.69% 78.57%",
];

function WaveDots() {
  return (
    <div className="relative h-full w-full">
      {DOT_INSETS.map((inset, i) => (
        <div key={i} className="absolute" style={{ inset }}>
          <motion.div
            className="h-full w-full"
            animate={{ y: [0, -3, 0, 3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          >
            <img alt="" className="block max-w-none h-full w-full" src={`/figma/research/dot-${i + 1}.svg`} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// Icon slot: wave dots while the step is active, crossfades to a checkmark
// the instant it's done — the two never overlap in time.
function StepIcon({ stepStart, stepDuration }: { stepStart: number; stepDuration: number }) {
  const doneAt = stepStart + stepDuration;
  return (
    // Sized to the checkmark (14.025px) so the row's layout width always
    // matches the original static design — the wider dot cluster is an
    // absolutely-positioned overlay centered on this slot, so it never
    // affects flex sizing even though it visually extends past the slot.
    <div className="relative shrink-0 size-[14.025px]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[22.791px] w-[24.543px] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: stepDuration, delay: stepStart, times: [0, 0.08, 0.92, 1], ease: "easeInOut" }}
      >
        <WaveDots />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: doneAt, ease: "easeOut" }}
      >
        <CheckIcon />
      </motion.div>
    </div>
  );
}

// Label: grey while pending, snaps blue the moment its step becomes active,
// then a green "done" copy fades in on top of it once the step finishes.
function StepLabel({ label, stepStart, stepDuration }: { label: string; stepStart: number; stepDuration: number }) {
  const doneAt = stepStart + stepDuration;
  return (
    <div className="relative shrink-0">
      <motion.p
        className="font-medium leading-[14.025px] shrink-0 text-[9.82px] whitespace-nowrap [word-break:break-word]"
        initial={{ color: PENDING_COLOR }}
        animate={{ color: ACTIVE_COLOR }}
        transition={{ duration: 0.2, delay: stepStart, ease: "easeOut" }}
      >
        {label}
      </motion.p>
      <motion.p
        className="absolute inset-0 font-normal leading-[14.025px] shrink-0 text-[9.82px] text-[#45ffb5] whitespace-nowrap [word-break:break-word]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: doneAt, ease: "easeOut" }}
      >
        {label}
      </motion.p>
    </div>
  );
}

function Step({ label, stepStart, stepDuration }: { label: string; stepStart: number; stepDuration: number }) {
  return (
    <div className="flex gap-[4.207px] items-center shrink-0">
      <StepIcon stepStart={stepStart} stepDuration={stepDuration} />
      <StepLabel label={label} stepStart={stepStart} stepDuration={stepDuration} />
    </div>
  );
}

const barHeights = [5.201, 13.373, 17.088, 34.175, 34.175, 50.52, 76.523, 54.978, 61.664, 42.348, 28.232, 20.802];
// Bars at index 6 and 7 are the highlighted cyan-to-blue gradient bars.
const highlightedBarIndices = new Set([6, 7]);
const BAR_STAGGER = 0.04;
const BAR_DURATION = 0.3;

const skeletonRowGroups = [
  { left: 57.58, width: 150.905 },
  { left: 262.9, width: 51.386 },
  { left: 334.57, width: 51.386 },
  { left: 406.24, width: 51.386 },
  { left: 477.91, width: 51.386 },
];
const skeletonRowTops = [304.16, 315.66, 327.16];

export function ResearchCard() {
  return (
    <div className="relative h-[364px] w-[600px] overflow-hidden rounded-[19px] backdrop-blur-[2.7px] bg-[rgba(143,133,186,0.02)] border border-[rgba(167,191,255,0.25)]">
      {/* Prompt chip — types itself out, then its border glows once */}
      <div className="absolute backdrop-blur-[10px] bg-[rgba(31,60,139,0.21)] border-[0.5px] border-[rgba(167,191,255,0.3)] border-solid flex items-center left-[153px] overflow-hidden px-[16px] py-[10px] rounded-[8px] top-[33.77px] w-[292px]">
        <GradientBorder
          color="167,191,255"
          duration={PROMPT_GLOW_DURATION}
          delay={PROMPT_GLOW_DELAY}
          baseOpacity={0.12}
          sweepOpacity={0.45}
          restColor="167,191,255"
          restOpacity={0.3}
        />
        <p className="font-normal leading-[16px] shrink-0 text-[12px] text-[#f1f6ff] text-center whitespace-nowrap [word-break:break-word]">
          <TypedPrompt text={PROMPT_TEXT} startDelay={0} charDelay={CHAR_DELAY} />
        </p>
      </div>

      {/* QuantLab Process row */}
      <motion.div
        className="absolute bg-[rgba(17,23,83,0.45)] border-[0.701px] border-[rgba(255,255,255,0.1)] border-solid flex gap-[28.05px] h-[39.269px] items-center left-[32.18px] overflow-hidden p-[8.415px] rounded-[8px] top-[95px] w-[533.643px]"
        {...fadeOnly(PROCESS_BOX_DELAY, PROCESS_BOX_APPEAR_DURATION)}
      >
        <p className="font-semibold leading-[14.025px] shrink-0 text-[9.82px] text-[#5cb5ff] whitespace-nowrap [word-break:break-word]">
          AGENT WORKING
        </p>

        <div className="flex gap-[5.61px] items-center shrink-0">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex gap-[5.61px] items-center shrink-0">
              <Step label={label} stepStart={STEPS_START + i * STEP_DURATION} stepDuration={STEP_DURATION} />
              {i < STEP_LABELS.length - 1 && <ChevronSeparator />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rectangle 13 — background box behind both the chart and the table */}
      <motion.div
        className="absolute bg-[rgba(111,114,186,0.04)] border border-[rgba(167,191,255,0.3)] border-solid h-[188.489px] left-[33.18px] rounded-[6px] top-[160.5px] w-[533.643px]"
        {...fadeOnly(RESULTS_DELAY, 0.3)}
      >
        <GradientBorder
          color="92,181,255"
          duration={RESULTS_GLOW_DURATION}
          delay={RESULTS_DELAY + 0.1}
          baseOpacity={0.12}
          sweepOpacity={0.5}
          restColor="167,191,255"
          restOpacity={0.3}
        />
      </motion.div>

      {/* Chart */}
      <div className="absolute flex gap-[5.269px] items-end justify-center left-[33.18px] min-w-[513.741px] top-[195px] w-[513.741px]">
        {barHeights.map((height, i) => (
          <motion.div
            key={i}
            className={
              highlightedBarIndices.has(i)
                ? "relative shrink-0 rounded-[1.756px] w-[36.884px] bg-gradient-to-b from-[9.259%] from-[#0ff] to-[136.11%] to-[#5985ff]"
                : "relative shrink-0 rounded-[1.756px] w-[36.884px] bg-[#021e6b]"
            }
            style={{ height, transformOrigin: "bottom" }}
            initial={{ opacity: 0, scaleY: 0.3 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              duration: BAR_DURATION,
              delay: RESULTS_DELAY + 0.15 + i * BAR_STAGGER,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Skeleton placeholder rows */}
      <motion.div {...fadeOnly(RESULTS_DELAY + 0.55, 0.35)}>
        <div className="absolute border-[0.5px] border-[rgba(167,191,255,0.3)] border-solid h-[43.422px] left-[42.4px] rounded-[4px] top-[295.87px] w-[500.568px]" />
        {skeletonRowGroups.map((group) =>
          skeletonRowTops.map((top) => (
            <div
              key={`${group.left}-${top}`}
              className="absolute bg-[#666fa0] rounded-[1px]"
              style={{ left: group.left, top, width: group.width, height: 3.832 }}
            />
          )),
        )}
      </motion.div>
    </div>
  );
}
