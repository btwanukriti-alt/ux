"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypedText } from "../../cards/TypedText";
import { GradientBorder } from "../../cards/GradientBorder";
import { DiagonalGlow } from "../../cards/DiagonalGlow";
import { ClickCursor } from "../../cards/ClickCursor";

// Act 5b — "Build and backtest a strategy, from one prompt" (Screen10,
// Figma node 2999:54133). Ported from src/components/cards/quant/BuildBacktestCard.tsx
// per the plan: same beats/constants/technique, re-anchored to Screen10's own
// exact geometry (368.126 x 287.337 "Baactest" canvas, not the standalone
// card's 600x364 layout).
//
// Screen10's static end-state has exactly ONE bordered panel (the Backtest
// Results panel — bars + skeleton columns), not a separate earlier "Strategy
// Definition Card" skeleton panel like the standalone card has. Per the
// plan's explicit sequence (skeleton rows -> button -> click -> results), the
// skeleton-rows beat is kept as a TRANSIENT stage that occupies the exact
// same panel box Screen10's real results panel sits in, then crossfades into
// that real content once the button is clicked — so the animation passes
// through the beat the plan describes without inventing a second panel that
// Screen10 doesn't actually have at rest.

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — this box has plenty
// of surrounding empty space in the 679x287 Graphic region to grow without
// clipping or touching the headline. Headline stays at its own already-
// legible 28px.
const GRAPHIC_SCALE = 1.2;

const HEADLINE = "Build and backtest a strategy, from one prompt";
// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT5B_DURATION below, which the
// sequencer now waits for exactly), so "fast paced" comes from tightening
// this act's own choreography, not truncating it.
const HEADLINE_CHAR_DELAY = 0.018;
const HEADLINE_START = 0.12;

// --- Prompt typewriter scheduling (ported verbatim from BuildBacktestCard) ---
type Segment = { kind: "text"; text: string; className: string } | { kind: "chip"; text: string };

const CHAR_DELAY = 0.014;
const CHIP_POP_DURATION = 0.14;
const LINE_GAP = 0.05;

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
  { kind: "text", text: "under 0.5, take profit 2%, stop 1%", className: "shrink-0 whitespace-nowrap text-[10.025px] font-medium leading-[13.367px] text-[#f1f6ff]" },
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

const AVATAR_DURATION = 0.18;
const PROMPT_START = HEADLINE_START + HEADLINE.length * HEADLINE_CHAR_DELAY + 0.22;
const line1Scheduled = scheduleSegments(line1, PROMPT_START);
const line1End = line1Scheduled.length ? line1Scheduled[line1Scheduled.length - 1].delay + line1Scheduled[line1Scheduled.length - 1].duration : PROMPT_START;
const line2Scheduled = scheduleSegments(line2, line1End + LINE_GAP);
const PROMPT_END = line2Scheduled[line2Scheduled.length - 1].delay + line2Scheduled[line2Scheduled.length - 1].duration;

// --- Rest of the timeline ----------------------------------------------
// Per the user's explicit correction: nothing below the prompt exists until
// AFTER Run Backtest is clicked. Order is strictly prompt -> button ->
// cursor click -> (only then) the results panel appears at all.
const BUTTON_DELAY = PROMPT_END + 0.18;
const BUTTON_APPEAR_DURATION = 0.15;

const CURSOR_DELAY = BUTTON_DELAY + 0.2;
const CURSOR_CLICK_DELAY = CURSOR_DELAY + 0.18;
const CURSOR_FADE_OUT_DELAY = CURSOR_CLICK_DELAY + 0.2;
const CURSOR_FADE_OUT_DURATION = 0.15;

const GLOW_DELAY = CURSOR_CLICK_DELAY + 0.05;
const GLOW_DURATION = 0.45;

// Panel (and its transient "building strategy" skeleton) only starts
// appearing once the click has registered — shortly after the glow starts,
// not waiting for it to fully finish, so it reads as a direct result of
// the click rather than an unrelated later event.
const PANEL_DELAY = GLOW_DELAY + 0.12;
const PANEL_APPEAR_DURATION = 0.18;

const skeletonRowTops = [12, 30, 48, 66]; // relative to the panel's own 353x124 box
const ROW_STAGGER = 0.07;
const ROWS_START = PANEL_DELAY + 0.15;
const ROWS_END = ROWS_START + (skeletonRowTops.length * 2 - 1) * ROW_STAGGER + 0.12;

// Transient skeleton content crossfades into the real results content here.
const RESULTS_CONTENT_DELAY = ROWS_END + 0.18;
const CROSSFADE_DURATION = 0.2;

const CARD_STAGGER = 0.16;
const CHART1_DELAY = RESULTS_CONTENT_DELAY + 0.15;
const CHART2_DELAY = CHART1_DELAY + CARD_STAGGER;
const SKELETON_BLOCK_DELAY = CHART2_DELAY + CARD_STAGGER;

const DIAGONAL_GLOW_DELAY = SKELETON_BLOCK_DELAY + 0.4;
const DIAGONAL_GLOW_DURATION = 0.75;

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion, not an arbitrary
// padded number.
export const ACT5B_DURATION = DIAGONAL_GLOW_DELAY + DIAGONAL_GLOW_DURATION;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

function useAfter(delay: number) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

// Chips pop in as a whole token once the typewriter reaches them, staying
// unmounted (zero layout footprint) until then — same convention as
// BuildBacktestCard's ChipSegment.
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
  return (
    <p className={seg.className}>
      <TypedText text={seg.text} startDelay={delay} charDelay={CHAR_DELAY} />
    </p>
  );
}

// --- Bars (Screen10's exact values) -----------------------------------------
const chart1Bars = [
  { height: 21.685, width: 12.523, color: "#183585" },
  { height: 9.163, width: 12.217, color: "#0ff" },
  { height: 7.33, width: 12.523, color: "#183585" },
  { height: 4.887, width: 12.217, color: "#183585" },
  { height: 15.882, width: 12.523, color: "#183585" },
  { height: 18.02, width: 12.523, color: "#183585" },
];
const chart2Bars = [
  { height: 9.163, width: 12.217, color: "#0ff" },
  { height: 15.882, width: 12.523, color: "#183585" },
  { height: 4.887, width: 12.523, color: "#183585" },
  { height: 9.163, width: 12.217, color: "#183585" },
  { height: 15.882, width: 12.523, color: "#183585" },
];

function BarGroup({ bars, gap, startDelay }: { bars: typeof chart1Bars; gap: number; startDelay: number }) {
  return (
    <div className="relative flex h-[21.38px] shrink-0 items-end overflow-hidden px-[3.665px]" style={{ gap }}>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="shrink-0 rounded-[1.222px]"
          style={{ height: bar.height, width: bar.width, backgroundColor: bar.color, transformOrigin: "bottom" }}
          initial={{ opacity: 0, scaleY: 0.25 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: startDelay + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// --- Skeleton columns (Screen10's exact values) -----------------------------
const skeletonColumnLines = [
  { left: 23.44, width: 94.432 },
  { left: 151.93, width: 32.155 },
  { left: 196.78, width: 32.155 },
  { left: 241.63, width: 32.155 },
  { left: 286.48, width: 32.155 },
];
const skeletonColumnTops = [80.03, 90.98, 101.93];

export function Act5bBuildBacktest() {
  return (
    <>
      {/* Headline — typed in, holds (only one headline in this act, no swap). */}
      <p className="-translate-x-1/2 absolute font-semibold leading-[36px] left-[calc(50%+0.1px)] text-[28px] text-[color:#f1f6ff] text-center top-[130px] w-[474px]">
        <TypedText text={HEADLINE} startDelay={HEADLINE_START} charDelay={HEADLINE_CHAR_DELAY} />
      </p>

      {/* Graphic region — Screen10's exact 368.126x287.337 "Baactest" canvas.
          Shifted down 7.97px from its literal Figma top (290.76px) so its
          content still lines up right below the toolbar now that the
          toolbar is a persistent element rendered by the sequencer (see
          OnboardingScreens.tsx) instead of living inside this act's own
          scaled wrapper, per the user's explicit "the nav panel should just
          be a fixed frame, only the highlight slides" correction. */}
      <div className="absolute h-[287px] left-[-1.93px] top-[298.73px] w-[679px]">
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-[287.337px] left-[calc(50%+0.56px)] top-[calc(50%+0.17px)] w-[368.126px]"
          style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        >

          {/* Prompt row — avatar pop-in + word-by-word typing, chips popping
              in at their turn. Screen10's exact position/classes. */}
          <div className="absolute content-stretch flex gap-[6px] items-start left-[6.47px] top-[68.74px] w-[363px]">
            <motion.div
              className="bg-[#5985ff] content-stretch flex flex-col items-center justify-center overflow-clip px-[7.4px] py-[4.554px] relative rounded-[34.154px] shrink-0 size-[18.5px]"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: AVATAR_DURATION, delay: PROMPT_START - 0.1, ease: "easeOut" }}
            >
              <p className="[word-break:break-word] font-medium leading-[normal] relative shrink-0 text-[9.962px] text-[color:#f1f6ff] w-[7.115px]">A</p>
            </motion.div>
            {/* Single wrapping flow, not two rigid rows: at this box's real
                width, "Buy when Regime flips to breakout and price is above
                value-area-high with fragility" genuinely doesn't fit on one
                line (a real overflow bug, not a scale side-effect — CSS
                transform:scale doesn't affect layout, so this was already
                too wide pre-scale, just less noticeable at the tiny
                original font size). flex-wrap here lets whatever doesn't
                fit flow naturally onto the next line together with the
                line2 text, instead of a hard cut that ran past the card. */}
            <div className="flex w-[363px] shrink-0 flex-wrap items-center gap-x-[3.342px] gap-y-[2px]">
              {line1Scheduled.map((scheduled, i) => (
                <RenderedSegment key={`l1-${i}`} scheduled={scheduled} />
              ))}
              {line2Scheduled.map((scheduled, i) => (
                <RenderedSegment key={`l2-${i}`} scheduled={scheduled} />
              ))}
            </div>
          </div>

          {/* Run Backtest button — Screen10's exact geometry, cursor clicks
              it, then its border glows. */}
          <motion.div
            className="absolute bg-[#5985ff] border-[0.731px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[2.922px] items-center justify-center left-[269.73px] px-[5.844px] py-[2.922px] rounded-[2.922px] top-[125.82px] w-[86.806px]"
            {...fadeOnly(BUTTON_DELAY, BUTTON_APPEAR_DURATION)}
          >
            <GradientBorder color="255,255,255" duration={GLOW_DURATION} delay={GLOW_DELAY} baseOpacity={0.15} sweepOpacity={0.6} restColor="255,255,255" restOpacity={0.15} />
            <div className="relative shrink-0 size-[9.497px]">
              <div className="absolute inset-[12.12%_15.15%_12.12%_21.21%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/10-build-and-backtest/play-icon.svg" />
              </div>
            </div>
            <p className="[word-break:break-word] font-medium leading-[11.689px] relative shrink-0 text-[8.77px] text-[color:#f1f6ff] whitespace-nowrap">Run Backtest</p>
          </motion.div>

          <ClickCursor left={330} top={129} arriveDelay={CURSOR_DELAY} clickDelay={CURSOR_CLICK_DELAY} fadeOutDelay={CURSOR_FADE_OUT_DELAY} fadeOutDuration={CURSOR_FADE_OUT_DURATION} />

          {/* Panel — Screen10's exact box/border/gradient. Fades in once,
              stays; its INNER content crossfades from a transient "building
              strategy" skeleton to the real Backtest Results content. */}
          <motion.div
            className="absolute backdrop-blur-[4px] border-[#67d1ff] border-[0.732px] border-solid h-[124px] left-0 rounded-[11.707px] top-[169.67px] w-[353px]"
            style={{
              backgroundImage:
                "linear-gradient(180.00000210158692deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 353 124' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.2869e-7 -1.4944 13.538 -5.2241e-7 180.13 1.7455e-7)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 353 124' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-8.9854e-7 -4.0956 29.974 -8.3056e-7 176.5 6.6416)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
            }}
            {...fadeOnly(PANEL_DELAY, PANEL_APPEAR_DURATION)}
          >
            {/* Transient skeleton content — "building the strategy" beat,
                per the plan's ROW_STAGGER=0.12 staggered rows — fades out as
                the real content fades in. */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: CROSSFADE_DURATION, delay: RESULTS_CONTENT_DELAY, ease: "easeOut" }}
            >
              {skeletonRowTops.map((top, rowIndex) => (
                <motion.div
                  key={`short-${top}`}
                  className="absolute left-[16px] h-[3.832px] w-[70px] rounded-[1px] bg-[#666fa0]"
                  style={{ top }}
                  {...fadeOnly(ROWS_START + rowIndex * 2 * ROW_STAGGER, 0.2)}
                />
              ))}
              {skeletonRowTops.map((top, rowIndex) => (
                <motion.div
                  key={`long-${top}`}
                  className="absolute left-[100px] h-[3.832px] w-[220px] rounded-[1px] bg-[#363f6b]"
                  style={{ top }}
                  {...fadeOnly(ROWS_START + (rowIndex * 2 + 1) * ROW_STAGGER, 0.2)}
                />
              ))}
            </motion.div>

            {/* Real Backtest Results content — Screen10's exact markup,
                fades in over the transient skeleton and is what remains at
                rest, pixel-matching Screen10. */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: CROSSFADE_DURATION, delay: RESULTS_CONTENT_DELAY, ease: "easeOut" }}
            >
              <div className="absolute contents left-[9.66px] top-[9.47px]">
                <p className="[word-break:break-word] absolute font-semibold h-[8.199px] leading-[8.781px] left-[23.56px] text-[5.854px] text-[color:#f1f6ff] top-[10.2px] w-[48.293px]">{`Backtest Results `}</p>
                <div className="absolute left-[10.39px] size-[8.883px] top-[10.2px]">
                  <div className="absolute inset-[9.38%_1.54%_12.5%_1.53%]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/10-build-and-backtest/stack-icon.svg" />
                  </div>
                </div>
              </div>

              <div className="absolute bg-[rgba(74,59,112,0.09)] content-stretch flex flex-col h-[36px] items-center justify-end left-[7.24px] overflow-clip px-[5.192px] py-[5.803px] rounded-[4.887px] top-[26.38px] w-[169px]">
                <BarGroup bars={chart1Bars} gap={5} startDelay={CHART1_DELAY} />
              </div>

              <div className="absolute bg-[rgba(74,59,112,0.09)] content-stretch flex flex-col h-[37px] items-center justify-end left-[187.24px] overflow-clip px-[5.192px] py-[5.803px] rounded-[4.887px] top-[26.38px] w-[151px]">
                <BarGroup bars={chart2Bars} gap={7} startDelay={CHART2_DELAY} />
              </div>

              <motion.div className="absolute contents left-[9.04px] top-[71.4px]" {...fadeOnly(SKELETON_BLOCK_DELAY, 0.3)}>
                <div className="absolute bg-[rgba(74,59,112,0.09)] h-[41.35px] left-[9.78px] rounded-[2.927px] top-[72.13px] w-[329.196px]" />
                {skeletonColumnLines.map((col) =>
                  skeletonColumnTops.map((top) => (
                    <div key={`${col.left}-${top}`} className="absolute bg-[#666fa0] h-[3.649px] rounded-[0.732px]" style={{ left: col.left, top, width: col.width }} />
                  )),
                )}
              </motion.div>

              <DiagonalGlow left={0} top={0} width={353} height={124} borderRadius={11.707} delay={DIAGONAL_GLOW_DELAY} duration={DIAGONAL_GLOW_DURATION} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
