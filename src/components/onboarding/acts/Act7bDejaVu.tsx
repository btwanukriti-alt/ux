"use client";

import { motion } from "framer-motion";
import { TypedText } from "../../cards/TypedText";
import { GradientBorder } from "../../cards/GradientBorder";
import { ClickCursor } from "../../cards/ClickCursor";
import { DiagonalGlow } from "../../cards/DiagonalGlow";

// Act 7b of the onboarding storyboard — animates Figma frame 2999:56346
// ("Find every time this pattern played out before"), reusing Screen17's
// exact markup/positions/assets (see
// src/components/onboarding/screens/Screen17FindEveryPatternTable.tsx for
// the pixel-verified reference) with motion layered on top, porting
// DejaVuCard.tsx's sequence: headline -> dropdowns appear one by one ->
// button appears -> cursor clicks it -> button glows -> panel reveals ->
// result rows stagger in -> outcome text -> bar chart grows in -> diagonal
// glow to close.
//
// One deliberate deviation from DejaVuCard, confirmed by reading Screen17's
// real markup: DejaVuCard's PanelBorder draws two mirrored gradient-stroke
// SVG paths as a crisp animated box outline. Screen17 has no equivalent
// crisp-outline asset — its actual decoration is a large, soft, pre-exported
// "search-icon-inner.svg" watermark (a giant faint magnifying-glass shape)
// spanning the whole panel, paired with the small search icon inside the
// button itself. Reproducing that as two clean path halves would not match
// what's actually there, so this uses the real asset with a fade-in instead
// of the PanelBorder path-draw technique.
//
// Also per Screen17's real markup (unlike a typical "click hides button"
// flow): the "Find Look-alikes" button stays visible at rest — it is not
// removed/replaced after the click, it just settles there.

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — the box has enough
// surrounding empty space in the 678x829 card to grow without clipping.
// Headline stays at its own already-legible 28px. The watermark image and
// the button/results panel it frames are all descendants of the SAME
// scaled container below, so their alignment stays intact automatically.
// Bumped again per the user's explicit follow-up that the first pass was
// still "extremely small to the point it's not even readable."
const GRAPHIC_SCALE = 1.5;

// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT7B_DURATION below, which the
// sequencer now waits for exactly), so "fast paced" comes from tightening
// this act's own choreography, not truncating it.
const HEADLINE_LINE1 = "Find every time this ";
const HEADLINE_LINE2 = "pattern played out before";
const CHAR_DELAY = 0.02;
const HEADLINE_START = 0.15;
const HEADLINE_LINE2_START = HEADLINE_START + HEADLINE_LINE1.length * CHAR_DELAY;
const HEADLINE_LINE2_DURATION = HEADLINE_LINE2.length * CHAR_DELAY;

const TOOLBAR_DELAY = HEADLINE_LINE2_START + HEADLINE_LINE2_DURATION + 0.18;
const TOOLBAR_DURATION = 0.22;

const DROPDOWN_START = TOOLBAR_DELAY + TOOLBAR_DURATION + 0.08;
const DROPDOWN_STAGGER = 0.1;
const DROPDOWN_DURATION = 0.18;

const BUTTON_DELAY = DROPDOWN_START + 3 * DROPDOWN_STAGGER + 0.12;
const BUTTON_DURATION = 0.18;

const CURSOR_ARRIVE = BUTTON_DELAY + 0.22;
const CURSOR_CLICK = CURSOR_ARRIVE + 0.2;
const CURSOR_FADE_OUT_DELAY = CURSOR_CLICK + 0.15;
const CURSOR_FADE_OUT_DURATION = 0.15;

const BUTTON_GLOW_DELAY = CURSOR_CLICK + 0.05;
const BUTTON_GLOW_DURATION = 0.4;

const PANEL_REVEAL_DELAY = BUTTON_GLOW_DELAY + BUTTON_GLOW_DURATION + 0.05;
const PANEL_REVEAL_DURATION = 0.3;

const RESULTS_START = PANEL_REVEAL_DELAY + PANEL_REVEAL_DURATION + 0.08;
const RESULT_STAGGER = 0.14;
const RESULT_DURATION = 0.2;

const OUTCOME_TEXT_DELAY = RESULTS_START + 0.06;

const CHART_DELAY = RESULTS_START + 2 * RESULT_STAGGER + 0.18;
const CHART_BAR_STAGGER = 0.025;

const barHeights = [2.509, 6.452, 8.244, 20.266, 20.266, 29.958, 45.378, 32.601, 36.567, 25.112, 13.62, 10.036];
const highlightedBars = new Set([6, 7]);

const GLOW_DELAY = CHART_DELAY + barHeights.length * CHART_BAR_STAGGER + 0.2;
const GLOW_DURATION = 0.75;

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion, not an arbitrary
// padded number.
export const ACT7B_DURATION = GLOW_DELAY + GLOW_DURATION;

const fadeOnly = (delay: number, duration = 0.18) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

function Dropdown({ left, width, placeholderWidth, delay }: { left: number; width: number; placeholderWidth: number; delay: number }) {
  return (
    <motion.div
      className="absolute backdrop-blur-[4px] bg-[rgba(31,60,139,0.1)] border-[0.681px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex h-[18.987px] items-center justify-between overflow-clip px-[8.17px] py-[5.447px] rounded-[5.447px] top-[64.12px]"
      style={{ left, width }}
      {...fadeOnly(delay, DROPDOWN_DURATION)}
    >
      <div className="bg-[rgba(167,191,255,0.3)] content-stretch flex h-[6.128px] items-center relative rounded-[1.362px] shrink-0" style={{ width: placeholderWidth }} />
      <div className="content-stretch flex items-center justify-center p-[2.043px] relative rounded-[50px] shrink-0 size-[16.34px]">
        <div className="relative shrink-0 size-[18.383px]">
          <div className="absolute flex inset-[37.5%_29.17%_41.66%_29.16%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-13.33%_-6.67%]">
                  <img alt="" className="block max-w-none size-full" src="/figma/onboarding/17-find-every-pattern-table/trend-chevron.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
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
        "absolute backdrop-blur-[4px] content-stretch flex flex-col gap-[2.443px] items-start left-[12.2px] overflow-clip p-[5.864px] rounded-[8px]" +
        (highlighted ? " border-[0.489px] border-[rgba(128,197,255,0.05)]" : "")
      }
      style={{
        top,
        width,
        ...(highlighted
          ? {
              backgroundImage:
                "linear-gradient(180.00000213050293deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 95.828 34.125' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-8.9229e-8 -0.41125 3.6752 -1.4377e-7 48.901 4.8038e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 95.828 34.125' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-2.4392e-7 -1.1271 8.1371 -2.2857e-7 47.914 1.8278)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
            }
          : {}),
      }}
      {...fadeOnly(delay, RESULT_DURATION)}
    >
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <div className="content-stretch flex gap-[2.443px] items-center relative shrink-0">
          <p className="[word-break:break-word] font-medium leading-[7.818px] relative shrink-0 text-[5.86px] text-white whitespace-nowrap">BTC</p>
          <div className="content-stretch flex items-center px-[0.529px] py-[1.059px] relative shrink-0">
            <div className="relative shrink-0 size-[2.117px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/17-find-every-pattern-table/coin-avatar.svg" />
            </div>
          </div>
          <p className="[word-break:break-word] font-medium leading-[7.818px] relative shrink-0 text-[5.86px] text-white whitespace-nowrap">{date}</p>
        </div>
        <p className="[word-break:break-word] font-medium leading-[4.775px] relative shrink-0 text-[3.34px] text-[color:#4da3ff] whitespace-nowrap">{score}</p>
      </div>
      <div className="content-stretch flex gap-[3.909px] items-center relative shrink-0">
        <div className="border-[0.244px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-start overflow-clip px-[3.909px] py-[0.977px] relative rounded-[4px] shrink-0">
          <p className="[word-break:break-word] font-normal leading-[7.818px] relative shrink-0 text-[5.86px] text-[color:#5985ff] whitespace-nowrap">{tag}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Bar({ height, highlight, delay }: { height: number; highlight?: boolean; delay: number }) {
  return (
    <motion.div
      className={"rounded-[0.847px] shrink-0 w-[17.795px] " + (highlight ? "bg-[#4261b4]" : "bg-[#25345c]")}
      style={{ height, transformOrigin: "bottom" }}
      initial={{ opacity: 0, scaleY: 0.25 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    />
  );
}

export function Act7bDejaVu() {
  return (
    <>
      {/* Headline — same TypedText treatment as every other act, held static
          afterward since this is a single-panel screen. */}
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[0] left-1/2 text-[28px] text-[color:#f1f6ff] text-center top-[130px] w-[341.26px]">
        <span className="leading-[36px]">
          <TypedText text={HEADLINE_LINE1} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
        </span>
        <span className="leading-[36px] text-[#5985ff]">
          <TypedText text={HEADLINE_LINE2} startDelay={HEADLINE_LINE2_START} charDelay={CHAR_DELAY} />
        </span>
      </p>

      {/* Graphic — Screen17 geometry, offset center+55.0 (shifted +1.67px
          from the literal Figma 53.33px) so its content still lines up
          right below the toolbar now that the toolbar is a persistent
          element rendered by the sequencer (see OnboardingScreens.tsx)
          instead of living inside this act's own scaled wrapper, per the
          user's explicit "the nav panel should just be a fixed frame, only
          the highlight slides" correction. */}
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[266px] left-[calc(50%+0.1px)] top-[calc(50%+55px)] w-[368px]"
        style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
      >
        {/* 3 dropdown/filter chips — appear one by one */}
        <div className="absolute contents left-[4.17px] top-[64.12px]">
          <Dropdown left={4.17} width={115.694} placeholderWidth={40.85} delay={DROPDOWN_START} />
          <Dropdown left={126.55} width={115.025} placeholderWidth={44.255} delay={DROPDOWN_START + DROPDOWN_STAGGER} />
          <Dropdown left={248.26} width={115.694} placeholderWidth={42.893} delay={DROPDOWN_START + DROPDOWN_STAGGER * 2} />
        </div>

        {/* Content group: results panel (left) + outcome/chart (right), and
            the button + big search-glow watermark sharing the same origin. */}
        <div className="absolute contents left-[6.65px] top-[97.31px]">
          <div className="absolute h-[144.088px] left-[6.65px] top-[97.31px] w-[350.162px]">
            <div className="absolute h-[108.185px] left-[12.19px] top-[29.45px] w-[325.784px]">
              <div className="absolute contents left-0 top-0">
                {/* Glass panel background — reveals once the button has
                    glowed, standing in for DejaVuCard's "panel content tint"
                    beat. */}
                <motion.div
                  className="absolute backdrop-blur-[4px] border-[0.5px] border-[#4c6aa5] border-solid h-[108.837px] left-0 rounded-[3.688px] top-0 w-[328.233px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(179.99998916481505deg, rgba(0, 117, 255, 0) 91.538%, rgba(121, 183, 255, 0.118) 111.87%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 328.23 108.84' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000010249 -0.82525 10.305 0.0000048191 167.82 -1.196)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 328.23 108.84' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.30000001192092896'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-6.9215e-7 -1.6744 15.147 -0.0000023575 164.12 4.0527e-7)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
                  }}
                  {...fadeOnly(PANEL_REVEAL_DELAY, PANEL_REVEAL_DURATION)}
                />

                <ResultRow top={7.65} width={95.828} date="19-01-2026" score="0.91" tag="coiled-spring" highlighted delay={RESULTS_START} />
                <ResultRow top={45.15} width={95.828} date="07-10-2024" score="0.86" tag="hidden-accumulation" delay={RESULTS_START + RESULT_STAGGER} />
                <ResultRow top={82.65} width={96.431} date="07-10-2024" score="0.86" tag="hidden-accumulation" delay={RESULTS_START + RESULT_STAGGER * 2} />

                <div className="[word-break:break-word] absolute contents font-medium left-[119.42px] top-[13.18px]">
                  <motion.div className="absolute content-stretch flex flex-col h-[12.161px] items-start left-[119.42px] px-[1.487px] top-[13.18px] w-[34.062px] whitespace-nowrap" {...fadeOnly(OUTCOME_TEXT_DELAY, 0.35)}>
                    <p className="leading-[7.436px] relative shrink-0 text-[5.205px] text-[color:#f1f6ff]">Outcome</p>
                    <p className="leading-[4.461px] relative shrink-0 text-[3.718px] text-[color:#a7bce4]">7 matches found</p>
                  </motion.div>
                  <motion.p
                    className="absolute leading-[0] left-[119.42px] text-[0px] text-[color:#f1f6ff] top-[32.82px] w-[99.779px]"
                    {...fadeOnly(OUTCOME_TEXT_DELAY + 0.1, 0.35)}
                  >
                    <span className="font-normal leading-[5.948px] text-[#a7bce4] text-[4.461px]">Of 7 matches</span>
                    <span className="leading-[5.948px] text-[4.461px]">{`, `}</span>
                    <span className="font-semibold leading-[5.948px] text-[4.461px]">6 broke out</span>
                    <span className="leading-[5.948px] text-[4.461px]">{` `}</span>
                    <span className="font-normal leading-[5.948px] text-[#a7bce4] text-[4.461px]">within 2-7 days</span>
                    <span className="leading-[5.948px] text-[4.461px]">{` `}</span>
                    <span className="font-normal leading-[5.948px] text-[#45ffb5] text-[4.461px]">(+8% avg),</span>
                    <span className="font-normal leading-[5.948px] text-[#a7bce4] text-[4.461px]">{` 1 reversed`}</span>
                  </motion.p>
                </div>

                <div className="absolute content-stretch flex gap-[2.542px] h-[49.79px] items-end justify-center left-[119.53px] overflow-clip top-[51.02px] w-[199.491px]">
                  {barHeights.map((height, i) => (
                    <Bar key={i} height={height} highlight={highlightedBars.has(i)} delay={CHART_DELAY + i * CHART_BAR_STAGGER} />
                  ))}
                </div>

                <DiagonalGlow left={0} top={0} width={326.859} height={108.837} borderRadius={3.688} delay={GLOW_DELAY} duration={GLOW_DURATION} />
              </div>
            </div>

            {/* Button + big search-glow watermark — same coordinate origin
                as the panel above (both are direct children of the
                144.088-tall content group). */}
            <div className="absolute contents left-0 top-0">
              <motion.div
                className="absolute bg-[rgba(31,60,139,0.1)] border-[#b259ff] border-[0.615px] border-solid content-stretch flex gap-[2.459px] items-center justify-center left-[133.09px] px-[9.835px] py-[4.303px] rounded-[4.918px] top-0"
                {...fadeOnly(BUTTON_DELAY, BUTTON_DURATION)}
              >
                <GradientBorder color="255,255,255" duration={BUTTON_GLOW_DURATION} delay={BUTTON_GLOW_DELAY} baseOpacity={0.1} sweepOpacity={0.7} restColor="255,255,255" restOpacity={0} />
                <div className="relative shrink-0 size-[7.991px]">
                  <div className="absolute inset-[12.74%_12.06%_12.05%_12.26%]">
                    <div className="absolute inset-[-5.11%_-7.19%_-7.23%_-5.08%]">
                      <img alt="" className="block max-w-none size-full" src="/figma/onboarding/17-find-every-pattern-table/search-icon-outer.svg" />
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-medium leading-[9.835px] relative shrink-0 text-[7.38px] text-[color:#5cb5ff] whitespace-nowrap">Find Look-alikes</p>
              </motion.div>

              <ClickCursor left={200} top={10} arriveDelay={CURSOR_ARRIVE} clickDelay={CURSOR_CLICK} fadeOutDelay={CURSOR_FADE_OUT_DELAY} fadeOutDuration={CURSOR_FADE_OUT_DURATION} />

              {/* The big soft search-icon watermark — the real exported
                  asset, faded in rather than hand-drawn as a border path
                  (see the top-of-file note on why). */}
              <motion.div className="absolute h-[142.964px] left-0 top-[9.22px] w-[350.162px]" {...fadeOnly(PANEL_REVEAL_DELAY, PANEL_REVEAL_DURATION)}>
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/17-find-every-pattern-table/search-icon-inner.svg" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
