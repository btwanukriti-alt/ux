"use client";

import { motion } from "framer-motion";
import { ClickCursor } from "../../cards/ClickCursor";
import { CountUp, ShuffleNumber } from "../../cards/AnimatedNumbers";
import { TypedText } from "../../cards/TypedText";

// Act 7 — "Runs overnight / Discoveries" (Screen 16, Figma node 2999:55781).
// Screen16RunsOvernightFunnel.tsx is the settled END state (no button — the
// button-appear-and-click beat below is transient, happening entirely
// before what that static file shows). Sequence/timings ported from
// src/components/cards/quant/DiscoveriesCard.tsx, re-anchored to Screen16's
// real geometry and its real funnel-mini-chart.svg asset.

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — the box has enough
// surrounding empty space in the 678x829 card to grow without clipping.
// Headline stays at its own already-legible 28px. Note: the funnel column
// CountUp delays (below) are computed as *fractions* of the funnel's own
// unscaled width, so they stay correct regardless of this scale factor.
// Bumped again per the user's explicit follow-up that the first pass was
// still "extremely small to the point it's not even readable."
const GRAPHIC_SCALE = 1.5;

// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT7_DURATION below, which the
// sequencer now waits for exactly), so "fast paced" comes from tightening
// this act's own choreography, not truncating it.
const CHAR_DELAY = 0.02;
const HEADLINE_START = 0.15;
const HEADLINE_LINE1 = "Runs overnight.";
const HEADLINE_LINE2 = " Wake up to a shortlist.";
const HEADLINE_LINE2_START = HEADLINE_START + HEADLINE_LINE1.length * CHAR_DELAY;
const HEADLINE_DONE = HEADLINE_LINE2_START + HEADLINE_LINE2.length * CHAR_DELAY;

// The graphic beat starts once the headline has typed out and held briefly.
// The toolbar always leads — everything else in the graphic region waits
// until its own fade-in (TOOLBAR_DURATION below) has actually finished
// before appearing, per the user's explicit "nav panel should appear
// before the line or card below it" correction.
const GRAPHIC_START = HEADLINE_DONE + 0.28;
const TOOLBAR_DURATION = 0.22;
const BUTTON_DELAY = GRAPHIC_START + TOOLBAR_DURATION + 0.05;

const BUTTON_APPEAR_DURATION = 0.18;
const CURSOR_ARRIVE = BUTTON_DELAY + 0.35;
const CURSOR_CLICK = BUTTON_DELAY + 0.6;
const CURSOR_FADE_OUT_DELAY = BUTTON_DELAY + 0.75;
const CURSOR_FADE_OUT_DURATION = 0.15;

const BUTTON_FADE_OUT_DELAY = CURSOR_CLICK + 0.05;
const BUTTON_FADE_OUT_DURATION = 0.15;
const BUTTON_TOTAL_SPAN = BUTTON_FADE_OUT_DELAY - BUTTON_DELAY + BUTTON_FADE_OUT_DURATION;

const POPOVER_DELAY = BUTTON_FADE_OUT_DELAY + 0.08;
const POPOVER_APPEAR_DURATION = 0.18;

const PANEL_DELAY = POPOVER_DELAY + 0.06;
const PANEL_APPEAR_DURATION = 0.18;

const SHUFFLE_DELAY = POPOVER_DELAY + POPOVER_APPEAR_DURATION + 0.06;
const SHUFFLE_DURATION = 0.6;

const SURVIVED_DELAY = SHUFFLE_DELAY + SHUFFLE_DURATION + 0.06;
const SURVIVED_APPEAR_DURATION = 0.18;

// Funnel + its column numbers animate concurrently with the popover's shuffle.
const FUNNEL_WIPE_DELAY = SHUFFLE_DELAY;
const FUNNEL_WIPE_DURATION = 0.75;

const STRATEGIES_START = Math.max(SURVIVED_DELAY + SURVIVED_APPEAR_DURATION, FUNNEL_WIPE_DELAY + FUNNEL_WIPE_DURATION) + 0.18;
const STRATEGY_STAGGER = 0.16;
const STRATEGY_CARD_DURATION = 0.25; // must match fadeSlide's default duration below

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion (the last strategy
// card landing is the last thing to finish), not an arbitrary padded
// number.
export const ACT7_DURATION = STRATEGIES_START + STRATEGY_STAGGER * 2 + STRATEGY_CARD_DURATION;

const fadeOnly = (delay: number, duration = 0.18) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

const fadeSlide = (delay: number, y = 6, duration = 0.25) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// Column geometry copied verbatim from Screen16RunsOvernightFunnel.tsx's own
// stat row (left-40/top-20.5/w-267, four labels at ml 0/66.87/131.05/198.6).
// FUNNEL_CONTENT_WIDTH matches the funnel image's own w-261.418 wrapper,
// which the four columns' extents (0 -> 198.6+62.822=261.42) line up with.
const FUNNEL_CONTENT_WIDTH = 261.418;
const columns = [
  { ml: 0, w: 32.424, label: "Generated", value: 642 },
  { ml: 66.87, w: 62.822, label: "passed FAST filter", value: 128 },
  { ml: 131.05, w: 62.822, label: "passed regime test", value: 31 },
  { ml: 198.6, w: 62.822, label: "passed CPCV +PBO + DSR", value: 3, valueColor: "#5cb5ff" },
];

function ColumnLabel({ ml, w, label, value, valueColor, countDelay }: { ml: number; w: number; label: string; value: number; valueColor?: string; countDelay: number }) {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[0.981px] items-start relative row-1 w-full" style={{ marginLeft: ml, width: w }}>
      <p className="font-normal leading-[5.883px] relative shrink-0 text-[4.903px] text-[color:#f1f6ff] w-full">{label}</p>
      <p className="font-semibold leading-[7.844px] relative shrink-0 text-[5.883px] w-full" style={{ color: valueColor ?? "#f1f6ff" }}>
        <CountUp value={value} startDelay={countDelay} duration={0.35} />
      </p>
    </div>
  );
}

function StrategyCard({
  left,
  top,
  delay,
  badgeSrc,
  name,
  regimeLabel,
  regimeBg,
  regimeText,
  typeLabel,
}: {
  left: number;
  top: number;
  delay: number;
  badgeSrc: string;
  name: string;
  regimeLabel: string;
  regimeBg: string;
  regimeText: string;
  typeLabel: string;
}) {
  return (
    <motion.div
      className="absolute border-[0.458px] border-[rgba(167,191,255,0.3)] border-solid content-stretch flex flex-col items-start justify-center overflow-clip px-[3.661px] py-[5.491px] rounded-[5.491px] w-[97.014px]"
      style={{ left, top }}
      {...fadeSlide(delay)}
      data-name="Strategy Card"
    >
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[2.746px] items-start relative shrink-0">
          <div className="content-stretch flex gap-[2.746px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center px-[0.915px] py-[2.746px] relative shrink-0">
              <div className="relative shrink-0 size-[3.661px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={badgeSrc} />
              </div>
            </div>
            <p className="[word-break:break-word] font-medium leading-[9.152px] relative shrink-0 text-[6.407px] text-[color:#f1f6ff] whitespace-nowrap">{name}</p>
          </div>
          <div className="content-stretch flex gap-[3.661px] items-start relative shrink-0">
            <div className="content-stretch flex items-start overflow-clip px-[3.661px] py-[0.915px] relative rounded-[16px] shrink-0" style={{ backgroundColor: regimeBg }}>
              <p className="[word-break:break-word] font-normal leading-[2.513px] relative shrink-0 text-[2.09px] whitespace-nowrap" style={{ color: regimeText }}>
                {regimeLabel}
              </p>
            </div>
            <div className="bg-[rgba(0,85,209,0.1)] content-stretch flex items-start overflow-clip px-[3.661px] py-[0.915px] relative rounded-[16px] shrink-0">
              <p className="[word-break:break-word] font-normal leading-[2.513px] relative shrink-0 text-[2.09px] text-[color:#a7bce4] whitespace-nowrap">{typeLabel}</p>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[1.373px] h-[16.932px] items-end justify-center relative shrink-0 w-[21.965px] whitespace-nowrap">
          <p className="font-semibold leading-[7.322px] relative shrink-0 text-[5.491px] text-[color:#f1f6ff]">58%</p>
          <p className="font-normal leading-[5.491px] relative shrink-0 text-[4.576px] text-[color:#a7bce4]">Win Rate</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Act7Discoveries() {
  return (
    <>
      {/* Headline — typed in, two lines, matching every other act. */}
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[0] left-[calc(50%+0.1px)] text-[28px] text-[color:#f1f6ff] text-center top-[130px] w-[474px] whitespace-pre-wrap">
        <p className="leading-[36px] mb-0">
          <TypedText text={HEADLINE_LINE1} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
        </p>
        <p className="leading-[36px] text-[#5985ff]">
          <TypedText text={HEADLINE_LINE2} startDelay={HEADLINE_LINE2_START} charDelay={CHAR_DELAY} />
        </p>
      </div>

      {/* Graphic region — Screen16 geometry (368x266), offset center+55.0
          (shifted +1.67px from the literal Figma 53.33px) so its content
          still lines up right below the toolbar now that the toolbar is a
          persistent element rendered by the sequencer (see
          OnboardingScreens.tsx) instead of living inside this act's own
          scaled wrapper, per the user's explicit "the nav panel should just
          be a fixed frame, only the highlight slides" correction. */}
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[266px] left-[calc(50%+0.1px)] top-[calc(50%+55px)] w-[368px]"
        style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
      >
        {/* "Start Discovery" button — transient, sits where the popover will
            land, gets clicked by the simulated cursor, then fades away. */}
        <motion.div
          className="-translate-x-1/2 absolute backdrop-blur-[4px] border-[0.7px] border-[#5985ff] border-solid content-stretch flex items-center justify-center left-[calc(50%-7.91px)] rounded-[4.5px] top-[69px] px-[10px] py-[5px] pointer-events-none"
          style={{ backgroundColor: "rgba(31,60,139,0.25)" }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 1] }}
          transition={{
            duration: BUTTON_TOTAL_SPAN,
            delay: BUTTON_DELAY,
            times: [0, BUTTON_APPEAR_DURATION / BUTTON_TOTAL_SPAN, (BUTTON_FADE_OUT_DELAY - BUTTON_DELAY) / BUTTON_TOTAL_SPAN, 1],
            ease: "easeOut",
          }}
        >
          <span className="text-[7px] font-medium leading-[9px] text-[#f1f6ff] whitespace-nowrap">Start Discovery</span>
        </motion.div>

        <ClickCursor left={190} top={75} arriveDelay={CURSOR_ARRIVE} clickDelay={CURSOR_CLICK} fadeOutDelay={CURSOR_FADE_OUT_DELAY} fadeOutDuration={CURSOR_FADE_OUT_DURATION} />

        {/* Popover — exact Screen16 markup, real numbers shuffle/fade in. */}
        <motion.div
          className="-translate-x-1/2 absolute backdrop-blur-[4px] border-[0.265px] border-[#4c6aa5] border-solid content-stretch flex gap-[5.823px] items-center left-[calc(50%-7.91px)] overflow-clip px-[8.47px] py-[5.294px] rounded-[3.706px] top-[69px] w-[225.517px]"
          {...fadeOnly(POPOVER_DELAY, POPOVER_APPEAR_DURATION)}
        >
          <div className="content-stretch flex gap-[2.647px] items-center justify-center relative shrink-0 w-[217.047px]">
            <p className="[word-break:break-word] font-medium leading-[8.47px] relative shrink-0 text-[6.353px] text-[color:#f1f6ff] whitespace-nowrap">
              Last Night: <ShuffleNumber value={642} startDelay={SHUFFLE_DELAY} duration={SHUFFLE_DURATION} /> candidates generated
            </p>
            <motion.div className="flex items-center justify-center relative shrink-0 size-[8.47px]" {...fadeOnly(SURVIVED_DELAY, SURVIVED_APPEAR_DURATION)}>
              <div className="flex-none rotate-90">
                <div className="overflow-clip relative size-[8.47px]">
                  <div className="absolute inset-[26.43%_13.72%]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/16-runs-overnight-funnel/arrow-right.svg" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.p className="[word-break:break-word] font-medium leading-[0] relative shrink-0 text-[0px] text-[color:#f1f6ff] whitespace-nowrap" {...fadeOnly(SURVIVED_DELAY, SURVIVED_APPEAR_DURATION)}>
              <span className="leading-[8.47px] text-[#5cb5ff] text-[6.353px]">3</span>
              <span className="leading-[8.47px] text-[6.353px]">{` survived the gauntlet`}</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Table panel — funnel stats + wipe-in chart + 3 strategy cards. */}
        <div className="absolute h-[113.288px] left-[11.59px] top-[101.03px] w-[317.629px]">
          <motion.div
            className="absolute backdrop-blur-[4px] border-[0.5px] border-[#4c6aa5] border-solid h-[165px] left-[0.61px] overflow-clip rounded-[7.844px] top-[0.03px] w-[348px]"
            {...fadeOnly(PANEL_DELAY, PANEL_APPEAR_DURATION)}
          >
            <div className="absolute content-stretch flex flex-col items-start left-[40px] top-[20.5px] w-[267px]">
              <div className="[word-break:break-word] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                {columns.map((col) => (
                  <ColumnLabel key={col.label} ml={col.ml} w={col.w} label={col.label} value={col.value} valueColor={col.valueColor} countDelay={FUNNEL_WIPE_DELAY + ((col.ml + col.w / 2) / FUNNEL_CONTENT_WIDTH) * FUNNEL_WIPE_DURATION} />
                ))}
              </div>
              <div className="h-[67.231px] relative shrink-0 w-[261.418px]">
                <motion.div
                  className="absolute inset-[-5.05%_0]"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: FUNNEL_WIPE_DURATION, delay: FUNNEL_WIPE_DELAY, ease: "easeInOut" }}
                >
                  <img alt="" className="block max-w-none size-full" src="/figma/onboarding/16-runs-overnight-funnel/funnel-mini-chart.svg" />
                </motion.div>
              </div>
            </div>

            <StrategyCard
              left={21.56}
              top={118.98}
              delay={STRATEGIES_START}
              badgeSrc="/figma/onboarding/16-runs-overnight-funnel/funnel-stage-badge-1.svg"
              name="MeanRev-VAL"
              regimeLabel="Breakout"
              regimeBg="rgba(255,89,113,0.1)"
              regimeText="#ff5971"
              typeLabel="Long Spot"
            />
            <StrategyCard
              left={229.42}
              top={119.53}
              delay={STRATEGIES_START + STRATEGY_STAGGER}
              badgeSrc="/figma/onboarding/16-runs-overnight-funnel/funnel-stage-badge-2.svg"
              name="MeanRev-VAL"
              regimeLabel="Sideways"
              regimeBg="rgba(0,255,255,0.1)"
              regimeText="#0ff"
              typeLabel="Short Spot"
            />
            <StrategyCard
              left={126.57}
              top={119.66}
              delay={STRATEGIES_START + STRATEGY_STAGGER * 2}
              badgeSrc="/figma/onboarding/16-runs-overnight-funnel/funnel-stage-badge-3.svg"
              name="ReversalFade-4h"
              regimeLabel="Sideways"
              regimeBg="rgba(0,255,255,0.1)"
              regimeText="#0ff"
              typeLabel="Long Spot"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
