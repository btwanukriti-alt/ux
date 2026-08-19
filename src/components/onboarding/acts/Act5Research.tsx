"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GradientBorder } from "../../cards/GradientBorder";
import { TypedText } from "../../cards/TypedText";

// Act 5 of the onboarding storyboard — Figma node 2999:53604, "Research any
// market question, in real depth" (Screen09ResearchAnyMarketQuestion.tsx is
// the pixel-verified static reference this must land on at rest). Ported
// from src/components/cards/quant/ResearchCard.tsx's sequence — same beats,
// same constants/technique (TypedPrompt, GradientBorder glow, 4-step
// progress row with WaveDots->checkmark crossfade, PENDING/ACTIVE colors,
// staggered bar chart, skeleton rows) — re-anchored to Screen09's own exact
// geometry, which turns out to be a uniform ~0.69x scale of ResearchCard's
// results-box layout (368.126/533.643 = 130.026/188.489 = 0.69), confirmed
// by comparing the two files directly rather than assumed.
//
// All 4 steps (including "Rendering") complete identically — checkmark,
// green label — per the user's explicit correction. Screen09's own static
// frame actually shows Rendering stuck active/blue with a 5-icon "sources"
// cluster instead of a checkmark, but the user wants every step to visibly
// finish before the results panel appears, so this intentionally departs
// from that literal frame. The unused source-icon-1..5.svg assets in
// public/figma/onboarding/09-research-any-market-question/ are the leftover
// of that earlier, now-reverted behavior.

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — this box has plenty
// of surrounding empty space in the 678x829 card (155px margin each side
// horizontally, 120px+ above/below) to grow without clipping or touching
// the headline. Headline stays at its own already-legible 28px.
const GRAPHIC_SCALE = 1.2;

const HEADLINE_LINE1 = "Research any market question, ";
const HEADLINE_LINE2 = "in real depth";
// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT5_DURATION below, which the
// sequencer now waits for exactly), so "fast paced" comes from tightening
// this act's own choreography, not truncating it.
const CHAR_DELAY = 0.018;
const HEADLINE_START = 0.15;
const HEADLINE_DURATION = (HEADLINE_LINE1.length + HEADLINE_LINE2.length) * CHAR_DELAY;

const TOOLBAR_DELAY = HEADLINE_START + HEADLINE_DURATION + 0.22;
const TOOLBAR_DURATION = 0.25;

const PROMPT_TEXT = "Correlate BTC Regime shifts with ETH price on 4h";
// Waits for the toolbar's own fade-in to actually finish before appearing,
// so the nav panel always visibly leads, per the user's explicit
// "nav panel should appear before the line or card below it" correction.
const PROMPT_START = TOOLBAR_DELAY + TOOLBAR_DURATION + 0.05;
const PROMPT_TYPE_DURATION = PROMPT_TEXT.length * CHAR_DELAY;

const PROMPT_GLOW_DELAY = PROMPT_START + PROMPT_TYPE_DURATION + 0.1;
const PROMPT_GLOW_DURATION = 0.4;

const PROCESS_BOX_DELAY = PROMPT_GLOW_DELAY + PROMPT_GLOW_DURATION + 0.06;
const PROCESS_BOX_DURATION = 0.18;

const STEPS_START = PROCESS_BOX_DELAY + PROCESS_BOX_DURATION + 0.06;
const STEP_DURATION = 0.6;
const STEP_LABELS = ["Fetching Data", "Shaping", "Running Sandbox", "Rendering"];

const PENDING_COLOR = "#5c6a96";
const ACTIVE_COLOR = "#5985ff";

const RESULTS_DELAY = STEPS_START + STEP_DURATION * STEP_LABELS.length + 0.1;
const RESULTS_GLOW_DURATION = 0.55;

const BAR_STAGGER = 0.025;
const BAR_DURATION = 0.18;

const SKELETON_DELAY = RESULTS_DELAY + 0.3;
const SKELETON_DURATION = 0.2;

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion (the results glow
// is the last thing to finish), not an arbitrary padded number.
export const ACT5_DURATION = RESULTS_DELAY + 0.1 + RESULTS_GLOW_DURATION;

const fadeOnly = (delay: number, duration = 0.35) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// Same RAF/elapsed-time typewriter technique as TypedText/ResearchCard's own
// TypedPrompt, kept local since the cursor styling here matches the chat
// chip look (thin light cursor), not TypedText's default.
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
        className="ml-[2px] inline-block h-[9px] w-[1.2px] bg-[#f1f6ff] align-middle"
        animate={done ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
        transition={done ? { duration: 0.3, delay: 0.2 } : { duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </>
  );
}

function ChevronSeparator() {
  return (
    <div className="relative shrink-0 size-[10.741px] overflow-clip">
      <div className="absolute flex inset-[20.83%_29.17%_20.83%_37.5%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <div className="relative size-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/09-research-any-market-question/chevron-right-icon.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[9.765px] overflow-clip">
      <div className="absolute bottom-[23.27%] left-[16.67%] right-[14.94%] top-1/4">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/09-research-any-market-question/check-icon.svg" />
      </div>
    </div>
  );
}

// The 5-dot "working" glyph — reusing ResearchCard's DOT_INSETS pattern, but
// this project has no /figma/research/dot-N.svg copy under the onboarding
// asset tree, so the dots are drawn inline instead of as image assets.
const DOT_INSETS = ["44% 78.57% 43.69% 10%", "43.85% 61.43% 43.85% 27.14%", "43.69% 44.29% 44% 44.29%", "43.69% 27.14% 44% 61.43%", "44% 10% 43.69% 78.57%"];

function WaveDots() {
  return (
    <div className="relative h-full w-full">
      {DOT_INSETS.map((inset, i) => (
        <div key={i} className="absolute" style={{ inset }}>
          <motion.div className="size-full rounded-full bg-[#5985ff]" animate={{ y: [0, -2, 0, 2, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }} />
        </div>
      ))}
    </div>
  );
}

// Icon slot for all 4 steps: wave dots while active, crossfades to a
// checkmark the instant the step's time is up — the two never overlap.
function StepIcon({ stepStart, stepDuration }: { stepStart: number; stepDuration: number }) {
  const doneAt = stepStart + stepDuration;
  return (
    <div className="relative shrink-0 size-[9.765px]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[15.869px] w-[17.089px] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: stepDuration, delay: stepStart, times: [0, 0.08, 0.92, 1], ease: "easeInOut" }}
      >
        <WaveDots />
      </motion.div>
      <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, delay: doneAt, ease: "easeOut" }}>
        <CheckIcon />
      </motion.div>
    </div>
  );
}

// Label for all 4 steps: grey while pending, snaps blue the moment its step
// becomes active, then a green "done" copy fades in on top once finished.
function StepLabel({ label, stepStart, stepDuration }: { label: string; stepStart: number; stepDuration: number }) {
  const doneAt = stepStart + stepDuration;
  return (
    <div className="relative shrink-0">
      <motion.p className="[word-break:break-word] font-normal leading-[9.765px] shrink-0 text-[6.84px] whitespace-nowrap" initial={{ color: PENDING_COLOR }} animate={{ color: ACTIVE_COLOR }} transition={{ duration: 0.2, delay: stepStart, ease: "easeOut" }}>
        {label}
      </motion.p>
      <motion.p className="absolute inset-0 [word-break:break-word] font-normal leading-[9.765px] shrink-0 text-[6.84px] whitespace-nowrap text-[#45ffb5]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: doneAt, ease: "easeOut" }}>
        {label}
      </motion.p>
    </div>
  );
}

const barHeights = [3.588, 9.225, 11.788, 23.575, 23.575, 34.85, 52.788, 37.925, 42.538, 29.213, 19.475, 14.35];
const highlightedBarIndices = new Set([6, 7]);

const skeletonGroups = [
  { left: 16.83, width: 104.1 },
  { left: 158.47, width: 35.448 },
  { left: 207.91, width: 35.448 },
  { left: 257.35, width: 35.448 },
  { left: 306.79, width: 35.448 },
];
const skeletonTops = [99.11, 107.04, 114.97];

export function Act5Research() {
  return (
    <>
      {/* Headline — same TypedText treatment as every other act, held
          static afterward since this is a single-panel screen (Screen09's
          own copy/position/color split, not the usual white-then-blue
          split — here the FIRST clause is blue). */}
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[0] left-[calc(50%-19.53px)] text-[28px] text-[color:#f1f6ff] text-center top-[130.82px] w-[415.431px]">
        <span className="leading-[36px] text-[#5985ff]">
          <TypedText text={HEADLINE_LINE1} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
        </span>
        <span className="leading-[36px]">
          <TypedText text={HEADLINE_LINE2} startDelay={HEADLINE_START + HEADLINE_LINE1.length * CHAR_DELAY} charDelay={CHAR_DELAY} />
        </span>
      </p>

      {/* Graphic — Screen09's exact "Research" container, centered exactly
          as the static markup positions it. Shifted down 11.97px from its
          literal Figma top (286.76px) so its content still lines up right
          below the toolbar now that the toolbar is a persistent element
          rendered by the sequencer (see OnboardingScreens.tsx) instead of
          living inside this act's own scaled wrapper, per the user's
          explicit "the nav panel should just be a fixed frame, only the
          highlight slides" correction. */}
      <div className="absolute h-[287px] left-[-1.13px] top-[298.73px] w-[678px]">
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-[287.337px] left-1/2 top-[calc(50%+0.17px)] w-[368.126px]"
          style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
        >
          {/* Prompt chip — types itself out, then its border glows once,
              exactly like ResearchCard's prompt (same PROMPT_TEXT, same
              technique), re-anchored to Screen09's chip geometry. */}
          <div
            className="absolute backdrop-blur-[4px] bg-[rgba(0,85,209,0.1)] border-[0.387px] border-[rgba(167,191,255,0.3)] border-solid content-stretch flex items-center justify-center left-[141px] overflow-hidden px-[12.38px] py-[7.738px] rounded-bl-[6.19px] rounded-tl-[6.19px] rounded-tr-[6.19px] top-[69px] w-[227px]"
          >
            <GradientBorder color="167,191,255" duration={PROMPT_GLOW_DURATION} delay={PROMPT_GLOW_DELAY} baseOpacity={0.12} sweepOpacity={0.45} restColor="167,191,255" restOpacity={0.3} />
            <p className="[word-break:break-word] font-normal leading-[12.38px] relative shrink-0 text-[9.285px] text-[color:#f1f6ff] text-center whitespace-nowrap">
              <TypedPrompt text={PROMPT_TEXT} startDelay={PROMPT_START} charDelay={CHAR_DELAY} />
            </p>
          </div>

          {/* QuantLab Process row */}
          <motion.div
            className="absolute backdrop-blur-[4px] border-[0.488px] border-[#4c6aa5] border-solid content-stretch flex gap-[19.53px] h-[27px] items-center left-0 overflow-clip p-[5.859px] rounded-[8px] top-[116.66px] w-[368px]"
            style={{
              backgroundImage:
                "linear-gradient(180.0000004389512deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 368 27' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.4266e-7 -0.32538 14.113 -1.1375e-7 187.79 3.8008e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 368 27' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-9.3672e-7 -0.89179 31.248 -1.8085e-7 184 1.4461)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
            }}
            {...fadeOnly(PROCESS_BOX_DELAY, PROCESS_BOX_DURATION)}
          >
            <p className="[word-break:break-word] font-semibold leading-[9.765px] relative shrink-0 text-[6.84px] text-[color:#5cb5ff] whitespace-nowrap">AGENT WORKING</p>
            <div className="content-stretch flex gap-[3.906px] items-center relative shrink-0">
              {STEP_LABELS.map((label, i) => {
                const stepStart = STEPS_START + i * STEP_DURATION;
                const isLast = i === STEP_LABELS.length - 1;
                return (
                  <div key={label} className="content-stretch flex gap-[3.906px] items-center relative shrink-0">
                    <div className="content-stretch flex gap-[2.929px] items-center relative shrink-0">
                      {/* Per the user's explicit correction, Rendering now
                          completes exactly like steps 1-3 (checkmark, green
                          label) — this intentionally departs from Screen09's
                          literal static frame (which shows Rendering stuck
                          active/blue forever), because the user wants every
                          step to visibly finish before the results panel
                          appears. See RESULTS_DELAY below, which already
                          waits for all 4 steps' durations including this
                          one, so gating naturally falls out of this change. */}
                      <StepIcon stepStart={stepStart} stepDuration={STEP_DURATION} />
                      <StepLabel label={label} stepStart={stepStart} stepDuration={STEP_DURATION} />
                    </div>
                    {!isLast && <ChevronSeparator />}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Results box — chart + skeleton rows, GradientBorder glow */}
          <motion.div
            className="absolute backdrop-blur-[4px] border-[0.5px] border-[#4c6aa5] border-solid h-[130.026px] left-0 rounded-[12px] top-[157.31px] w-[368.126px]"
            style={{
              backgroundImage:
                "linear-gradient(179.99998845807923deg, rgba(0, 117, 255, 0) 91.538%, rgba(121, 183, 255, 0.118) 111.87%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 368.13 130.03' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000011495 -0.98591 11.558 0.0000057573 188.22 -1.4289)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 368.13 130.03' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.30000001192092896'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-7.7627e-7 -2.0004 16.988 -0.0000028165 184.06 4.8417e-7)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
            }}
            {...fadeOnly(RESULTS_DELAY, 0.3)}
          >
            <GradientBorder color="92,181,255" duration={RESULTS_GLOW_DURATION} delay={RESULTS_DELAY + 0.1} baseOpacity={0.12} sweepOpacity={0.5} restColor="167,191,255" restOpacity={0.3} />

            <div className="absolute bg-[rgba(111,114,186,0.04)] blur-[2px] h-[130.026px] left-0 rounded-[4.139px] top-0 w-[368.125px]" />

            {/* Chart */}
            <div className="absolute content-stretch flex gap-[3.635px] h-[52.788px] items-end justify-center left-0 min-w-[354.396px] top-[23.8px] w-[354.396px]">
              {barHeights.map((height, i) => (
                <motion.div
                  key={i}
                  className={highlightedBarIndices.has(i) ? "relative shrink-0 rounded-[1.212px] w-[25.444px] bg-[#45ffb5]" : "relative shrink-0 rounded-[1.212px] w-[25.444px] bg-[#414d6f]"}
                  style={{ height, transformOrigin: "bottom" }}
                  initial={{ opacity: 0, scaleY: 0.3 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: BAR_DURATION, delay: RESULTS_DELAY + 0.15 + i * BAR_STAGGER, ease: "easeOut" }}
                />
              ))}
            </div>

            {/* Skeleton placeholder rows */}
            <motion.div {...fadeOnly(SKELETON_DELAY, SKELETON_DURATION)}>
              <div className="absolute h-[29.954px] left-[6.36px] rounded-[2.759px] top-[93.38px] w-[345.309px]" />
              {skeletonGroups.map((group) =>
                skeletonTops.map((top) => (
                  <div key={`${group.left}-${top}`} className="absolute bg-[#666fa0] rounded-[0.69px]" style={{ left: group.left, top, width: group.width, height: 2.643 }} />
                )),
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
