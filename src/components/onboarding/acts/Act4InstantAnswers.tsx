"use client";

import { motion } from "framer-motion";
import { TypedText } from "../../cards/TypedText";
import { CountUp } from "../../cards/AnimatedNumbers";

// Act 4 of the onboarding storyboard — animates Figma frames 2999:66830
// (headline only) -> 2999:52592 (Analysing Data loading card) -> 2999:53091
// (full ETH answer card), reusing their exact markup/positions/assets (see
// the static Screen06/07/08 components for the pixel-verified reference)
// with motion layered on top:
//   1) headline types in, centered, holds
//   2) headline docks up to its Screen07/08 position; chat panel fades in;
//      the user's "/thesis" prompt types in; the Analysing Data card fades
//      in and its progress bar grows to Screen07's exact partial-fill mark
//   3) crossfade into Screen08's full answer card: its border draws itself
//      in (DejaVuCard's two-mirrored-path technique), the user's full
//      question and the AI's answer fade in, then the Key Stats grid counts
//      up (CountUp, matching PaperTradeCard's Win Rate convention)

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — the panels have
// enough surrounding empty space in the 678x829 card to grow without
// clipping. Headline stays at its own already-legible 28px.
const GRAPHIC_SCALE = 1.2;

const HEADLINE_LINE1 = "Instant answers,";
const HEADLINE_LINE2 = " backed by live market data";
// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT4_DURATION at the bottom, which
// the sequencer now waits for exactly), so "fast paced" comes from
// tightening this act's own choreography, not truncating it.
const CHAR_DELAY = 0.02;
const HEADLINE_START = 0.15;
const HEADLINE_LINE1_DURATION = HEADLINE_LINE1.length * CHAR_DELAY;
const HEADLINE_LINE2_DURATION = HEADLINE_LINE2.length * CHAR_DELAY;
const HEADLINE_TYPE_DONE = HEADLINE_START + HEADLINE_LINE1_DURATION + HEADLINE_LINE2_DURATION;

// --- Beat 2: headline docks up, Screen07 chat panel builds ---------------
const DOCK_DELAY = HEADLINE_TYPE_DONE + 0.3;
const DOCK_DURATION = 0.35;
// Screen06's headline is true-centered on the 829px-tall card (top-1/2,
// -translate-y-1/2); this is that block's actual rendered top edge in
// pixels, matched the same way Act1CoinIntro measured its own headline's
// centered starting position — only the transient start point of a
// continuous move, not a state anyone will see at rest.
const HEADLINE_CENTERED_TOP = 376;
const HEADLINE_DOCKED_TOP = 141;

const PANEL_DELAY = DOCK_DELAY + 0.08;
const PANEL_DURATION = 0.25;

const USER_PROMPT_CHIP_DELAY = PANEL_DELAY + PANEL_DURATION + 0.08;
const USER_PROMPT_CHIP_DURATION = 0.18;
const PROMPT_TEXT = "/thesis ETH breaks $4,000 this month on accelerating ETF inflows and the upcoming network upgrade";
const PROMPT_CHAR_DELAY = 0.012;
const PROMPT_TEXT_START = USER_PROMPT_CHIP_DELAY + USER_PROMPT_CHIP_DURATION;
const PROMPT_TEXT_DURATION = PROMPT_TEXT.length * PROMPT_CHAR_DELAY;

const ANALYSING_CARD_DELAY = PROMPT_TEXT_START + PROMPT_TEXT_DURATION + 0.12;
const ANALYSING_CARD_DURATION = 0.18;

const PROGRESS_BAR_DELAY = ANALYSING_CARD_DELAY + ANALYSING_CARD_DURATION + 0.06;
const PROGRESS_BAR_DURATION = 0.35;
// Screen07's own static end-state: the fill is 101.242px of a 262.29px
// track — a mid-sequence beat, not a full 0-100% fill.
const PROGRESS_FRACTION = 101.242 / 262.29;

// --- Beat 3: crossfade into Screen08's full answer ------------------------
const HOLD_AFTER_PROGRESS = 0.25;
const SCREEN07_FADE_OUT_DELAY = PROGRESS_BAR_DELAY + PROGRESS_BAR_DURATION + HOLD_AFTER_PROGRESS;
const SCREEN07_FADE_OUT_DURATION = 0.2;

const SCREEN08_PANEL_DELAY = SCREEN07_FADE_OUT_DELAY + SCREEN07_FADE_OUT_DURATION + 0.08;
const SCREEN08_PANEL_DURATION = 0.25;

const BORDER_DRAW_DELAY = SCREEN08_PANEL_DELAY + 0.06;
const BORDER_DRAW_DURATION = 0.6;

const QUESTION_CHIP_DELAY = SCREEN08_PANEL_DELAY + 0.18;
const QUESTION_CHIP_DURATION = 0.18;

const ANSWER_TEXT_DELAY = QUESTION_CHIP_DELAY + QUESTION_CHIP_DURATION + 0.08;
const ANSWER_TEXT_DURATION = 0.2;

const KEY_STATS_PANEL_DELAY = BORDER_DRAW_DELAY + BORDER_DRAW_DURATION - 0.12;
const KEY_STATS_PANEL_DURATION = 0.18;

const STATS_COUNT_DELAY = KEY_STATS_PANEL_DELAY + KEY_STATS_PANEL_DURATION + 0.06;
const STATS_COUNT_DURATION = 0.55;

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion, not an arbitrary
// padded number.
export const ACT4_DURATION = STATS_COUNT_DELAY + STATS_COUNT_DURATION;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// DejaVuCard's PanelBorder technique: two mirrored SVG path halves, both
// starting at top-center and animating pathLength 0->1 in opposite
// directions around the rounded rect, meeting at bottom-center. No notch
// here (Screen08's answer card border has no header cutout), unlike
// DejaVuCard's own panel.
function AnswerCardBorder() {
  const W = 401.8;
  const H = 355.165;
  const R = 13.647;
  const midX = W / 2;
  const leftPath = `M ${midX} 0.75 L ${R} 0.75 A ${R} ${R} 0 0 0 0.75 ${R} L 0.75 ${H - R} A ${R} ${R} 0 0 0 ${R} ${H - 0.75} L ${midX} ${H - 0.75}`;
  const rightPath = `M ${midX} 0.75 L ${W - R} 0.75 A ${R} ${R} 0 0 1 ${W - 0.75} ${R} L ${W - 0.75} ${H - R} A ${R} ${R} 0 0 1 ${W - R} ${H - 0.75} L ${midX} ${H - 0.75}`;
  return (
    <svg className="absolute left-[138.1px] top-[48.86px] block" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="act4AnswerBorderGradient" x1="16.6" y1="4.7" x2="354" y2="322" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5985FF" />
          <stop offset="1" stopColor="#00FFFF" />
        </linearGradient>
      </defs>
      <motion.path
        d={leftPath}
        stroke="url(#act4AnswerBorderGradient)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: BORDER_DRAW_DURATION, delay: BORDER_DRAW_DELAY, ease: "easeInOut" }}
      />
      <motion.path
        d={rightPath}
        stroke="url(#act4AnswerBorderGradient)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: BORDER_DRAW_DURATION, delay: BORDER_DRAW_DELAY, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Act4InstantAnswers() {
  return (
    <>
      {/* Headline — typed centered (Screen06), then docks up to the fixed
          Screen07/08 position and stays there for the rest of the act. */}
      <motion.div
        className="-translate-x-1/2 [word-break:break-word] absolute content-stretch flex flex-col font-semibold gap-[5px] items-start leading-[36px] left-[calc(50%+6.86px)] text-[28px] text-center top-[141px] w-[368.281px]"
        initial={{ top: HEADLINE_CENTERED_TOP }}
        animate={{ top: HEADLINE_DOCKED_TOP }}
        transition={{ duration: DOCK_DURATION, delay: DOCK_DELAY, ease: "easeInOut" }}
      >
        <p className="relative shrink-0 text-[color:#f1f6ff] w-full">
          <TypedText text={HEADLINE_LINE1} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
        </p>
        <p className="relative shrink-0 text-[color:#5985ff] w-full">
          <TypedText text={HEADLINE_LINE2} startDelay={HEADLINE_START + HEADLINE_LINE1_DURATION} charDelay={CHAR_DELAY} />
        </p>
      </motion.div>

      {/* Screen07's Analysing Data graphic — fades in, holds, fades out
          into Screen08's full answer graphic below. */}
      <motion.div
        className="absolute h-[283px] left-[-1.53px] top-[272px] w-[678px]"
        style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 35%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: SCREEN07_FADE_OUT_DELAY + SCREEN07_FADE_OUT_DURATION - PANEL_DELAY,
          delay: PANEL_DELAY,
          times: [0, PANEL_DURATION / (SCREEN07_FADE_OUT_DELAY + SCREEN07_FADE_OUT_DURATION - PANEL_DELAY), (SCREEN07_FADE_OUT_DELAY - PANEL_DELAY) / (SCREEN07_FADE_OUT_DELAY + SCREEN07_FADE_OUT_DURATION - PANEL_DELAY), 1],
          ease: "easeOut",
        }}
      >
        <div className="absolute contents left-[118.74px] top-[2.71px]">
          <div className="absolute contents left-[118.74px] top-[2.71px]">
            <div
              className="absolute backdrop-blur-[4px] h-[218.691px] left-[118.74px] rounded-[13.647px] top-[42.6px] w-[440.52px]"
              style={{
                backgroundImage:
                  "linear-gradient(179.99998377782924deg, rgba(0, 117, 255, 0) 91.538%, rgba(121, 183, 255, 0.118) 111.87%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 440.52 218.69' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000013755 -1.6582 13.831 0.0000096832 225.23 -2.4032)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 440.52 218.69' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.30000001192092896'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-9.2893e-7 -3.3645 20.329 -0.0000047371 220.26 8.1433e-7)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
              }}
            />
            <div className="absolute h-[218.691px] left-[118.83px] top-[42.6px] w-[440.427px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/instant-answers/analysing-card-bg.svg" />
            </div>
            <div className="absolute contents left-[301px] top-[2.71px]">
              <div className="absolute backdrop-blur-[4px] bg-[rgba(0,2,43,0.74)] border-[0.932px] border-[rgba(191,203,255,0.3)] border-solid h-[79.791px] left-[301px] rounded-[9.323px] top-[2.71px] w-[78.395px]" />
              <div className="absolute border-[0.932px] border-[rgba(191,195,255,0.6)] border-solid h-[69.036px] left-[305.8px] opacity-38 rounded-[9.323px] top-[8.08px] w-[68.791px]" />
              <div className="absolute border-[0.932px] border-[rgba(191,195,255,0.6)] border-solid content-stretch flex h-[56.468px] items-center justify-center left-[312.46px] p-[7.458px] rounded-[8px] top-[14.37px] w-[55.479px]">
                <div className="relative shrink-0 size-[24.24px]">
                  <div className="absolute inset-[4.16%_0_6.25%_8.33%]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/chat-ai-icon.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User's "/thesis" prompt — chip fades in, then its text types. */}
          <motion.div
            className="absolute backdrop-blur-[4px] bg-[rgba(79,110,196,0.1)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-center justify-center left-[291.07px] overflow-clip px-[12px] py-[8px] rounded-bl-[8px] rounded-tl-[8px] rounded-tr-[8px] top-[106px] w-[239px]"
            {...fadeOnly(USER_PROMPT_CHIP_DELAY, USER_PROMPT_CHIP_DURATION)}
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-normal leading-[0] min-w-px relative text-[0px] text-[color:#f1f6ff]">
              <span className="leading-[12px] text-[#5cb5ff] text-[9px]">
                <TypedText text="/thesis" startDelay={PROMPT_TEXT_START} charDelay={PROMPT_CHAR_DELAY} />
              </span>
              <span className="leading-[12px] text-[9px]">
                <TypedText
                  text=" ETH breaks $4,000 this month on accelerating ETF inflows and the upcoming network upgrade"
                  startDelay={PROMPT_TEXT_START + "/thesis".length * PROMPT_CHAR_DELAY}
                  charDelay={PROMPT_CHAR_DELAY}
                />
              </span>
            </p>
          </motion.div>

          {/* Analysing Data card — fades in, then its progress bar grows to
              Screen07's exact partial-fill mark. */}
          <motion.div
            className="absolute bg-[rgba(79,110,196,0.1)] border-[0.703px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[5.625px] items-start left-[148.01px] p-[8.437px] rounded-[5.625px] top-[173.57px] w-[302.548px]"
            {...fadeOnly(ANALYSING_CARD_DELAY, ANALYSING_CARD_DURATION)}
          >
            <div className="relative shrink-0 size-[11.249px]">
              <div className="absolute inset-[29.17%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/instant-answers/analyze-icon.svg" />
              </div>
              <div className="absolute inset-[8.33%_8.29%_8.33%_8.25%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/instant-answers/analyze-icon-glow.svg" />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[5.625px] items-start relative shrink-0 w-[262.29px]">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[1.406px] items-start relative shrink-0 whitespace-nowrap">
                <p className="bg-clip-text bg-gradient-to-r font-semibold from-[#5985ff] leading-[11.249px] relative shrink-0 text-[8.437px] text-[transparent] to-[#0ff]">Analysing Data</p>
                <p className="font-normal leading-[8.437px] relative shrink-0 text-[7.031px] text-[color:#a7bce4]">Pulling live market context..</p>
              </div>
              <div className="bg-[rgba(0,52,194,0.15)] content-stretch flex flex-col h-[2.44px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[262.29px]">
                <motion.div
                  className="bg-gradient-to-r from-[#5cb5ff] h-[4.218px] relative rounded-[8px] shrink-0 to-[#2653cf] via-1/2 via-[#5985ff] w-[262.29px]"
                  style={{ transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: PROGRESS_FRACTION }}
                  transition={{ duration: PROGRESS_BAR_DURATION, delay: PROGRESS_BAR_DELAY, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Screen08's full answer graphic — crossfades in as Screen07's
          panel fades out. */}
      <motion.div
        className="-translate-y-1/2 absolute h-[413px] left-[5.86px] top-[calc(50%+55.59px)] w-[678px]"
        style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
        {...fadeOnly(SCREEN08_PANEL_DELAY, SCREEN08_PANEL_DURATION)}
      >
        <div className="absolute contents left-[138.1px] top-[8.97px]">
          <div className="absolute contents left-[138.1px] top-[8.97px]">
            <div
              className="absolute backdrop-blur-[4px] h-[355.165px] left-[138.1px] rounded-[13.647px] top-[48.86px] w-[401.8px]"
              style={{
                backgroundImage:
                  "linear-gradient(179.99997111561805deg, rgba(0, 117, 255, 0) 91.538%, rgba(121, 183, 255, 0.118) 111.87%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 401.8 355.16' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000012546 -2.693 12.615 0.000015726 205.43 -3.9029)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 401.8 355.16' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.30000001192092896'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-8.4728e-7 -5.4641 18.542 -0.0000076933 200.9 0.0000013225)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
              }}
            />
            <div className="absolute h-[355.164px] left-[138.18px] top-[48.87px] w-[401.715px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/instant-answers/answer-card-bg.svg" />
            </div>
            <AnswerCardBorder />
            <div className="absolute contents left-[300.98px] top-[8.97px]">
              <div className="absolute backdrop-blur-[4px] bg-[rgba(0,2,43,0.74)] border-[0.932px] border-[rgba(191,203,255,0.3)] border-solid h-[79.791px] left-[300.98px] rounded-[9.323px] top-[8.97px] w-[78.395px]" />
              <div className="absolute border-[0.932px] border-[rgba(191,195,255,0.6)] border-solid h-[69.036px] left-[305.78px] opacity-38 rounded-[9.323px] top-[14.35px] w-[68.791px]" />
              <div className="absolute border-[0.932px] border-[rgba(191,195,255,0.6)] border-solid content-stretch flex h-[56.468px] items-center justify-center left-[312.44px] p-[7.458px] rounded-[8px] top-[20.63px] w-[55.479px]">
                <div className="relative shrink-0 size-[24.24px]">
                  <div className="absolute inset-[4.16%_0_6.25%_8.33%]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/chat-ai-icon.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute backdrop-blur-[4px] bg-[rgba(31,60,139,0.1)] border-[0.5px] border-[#4c6aa5] border-solid content-stretch flex items-center justify-center left-[282.78px] overflow-clip px-[12px] py-[8px] rounded-bl-[8px] rounded-tl-[8px] rounded-tr-[8px] top-[111.78px] w-[237px]"
            {...fadeOnly(QUESTION_CHIP_DELAY, QUESTION_CHIP_DURATION)}
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-normal leading-[12px] min-w-px relative text-[9px] text-[color:#a7bce4]">{`Is ETH's current price closer to its all-time high or showing room to run before retesting $4,756?`}</p>
          </motion.div>

          <div className="absolute contents left-[164.6px] top-[169.23px]">
            <motion.div
              className="[word-break:break-word] absolute font-normal leading-[0] left-[187.08px] text-[9px] text-[color:#f1f6ff] top-[275.81px] w-[266.893px] whitespace-pre-wrap"
              {...fadeOnly(ANSWER_TEXT_DELAY, ANSWER_TEXT_DURATION)}
            >
              <p className="leading-[12px] mb-0">{`ETH is trading around $3,428 (Market Cap ÷ Circ. Supply), about 28% below its $4,756 ATH — so more room to run than close to retest territory. `}</p>
              <p className="leading-[12px] mb-0">​</p>
              <p className="leading-[12px]">24h Volume of $18.3B relative to Market Cap shows healthy liquidity, but a fresh ATH would need sustained volume expansion, not just inflows.</p>
            </motion.div>

            <motion.div
              className="absolute bg-[rgba(31,60,139,0.1)] border-[0.5px] border-[#4c6aa5] border-solid content-stretch flex flex-col gap-[11.931px] items-start left-[184.82px] overflow-clip p-[9.545px] rounded-[4.772px] top-[169.23px] w-[263px]"
              {...fadeOnly(KEY_STATS_PANEL_DELAY, KEY_STATS_PANEL_DURATION)}
            >
              <div className="content-stretch flex gap-[2.386px] items-start relative shrink-0">
                <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[7.159px] text-[color:#a7bce4] whitespace-nowrap">
                  <p className="leading-[9.545px]">{`Ethereum `}</p>
                </div>
                <div className="content-stretch flex items-center px-[1.193px] py-[2.386px] relative shrink-0">
                  <div className="relative shrink-0 size-[4.772px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/instant-answers/eth-avatar.svg" />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[7.159px] text-[color:#a7bce4] whitespace-nowrap">
                  <p className="leading-[9.545px]">Key Stats</p>
                </div>
              </div>
              <div className="[word-break:break-word] gap-x-[7.158613204956055px] gap-y-[7.158613204956055px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] leading-[0] relative shrink-0 w-full whitespace-nowrap">
                <div className="col-1 gap-x-[2.386204481124878px] gap-y-[2.386204481124878px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative row-1 self-start shrink-0 w-[52.496px]">
                  <div className="col-1 flex flex-col font-normal justify-center justify-self-start relative row-1 self-start shrink-0 text-[7.159px] text-[color:#a7bce4]">
                    <p className="leading-[9.545px]">Market Cap</p>
                  </div>
                  <div className="col-1 flex flex-col font-medium justify-center justify-self-start relative row-2 self-start shrink-0 text-[8.352px] text-[color:#f1f6ff]">
                    <p className="leading-[11.931px]">
                      <CountUp value={4261} startDelay={STATS_COUNT_DELAY} duration={STATS_COUNT_DURATION} format={(n) => `$${(n / 10).toFixed(1)} B`} />
                    </p>
                  </div>
                </div>
                <div className="col-2 gap-x-[2.386204481124878px] gap-y-[2.386204481124878px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative row-1 self-start shrink-0 w-[52.496px]">
                  <div className="col-1 flex flex-col font-normal justify-center justify-self-start relative row-1 self-start shrink-0 text-[7.159px] text-[color:#a7bce4]">
                    <p className="leading-[9.545px]">24h Volume</p>
                  </div>
                  <div className="col-1 flex flex-col font-medium justify-center justify-self-start relative row-2 self-start shrink-0 text-[8.352px] text-[color:#f1f6ff]">
                    <p className="leading-[11.931px]">
                      <CountUp value={183} startDelay={STATS_COUNT_DELAY} duration={STATS_COUNT_DURATION} format={(n) => `$${(n / 10).toFixed(1)} B`} />
                    </p>
                  </div>
                </div>
                <div className="col-1 gap-x-[2.386204481124878px] gap-y-[2.386204481124878px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative row-2 self-start shrink-0 w-[52.496px]">
                  <div className="col-1 flex flex-col font-normal justify-center justify-self-start relative row-1 self-start shrink-0 text-[7.159px] text-[color:#a7bce4]">
                    <p className="leading-[9.545px]">Circ. Supply</p>
                  </div>
                  <div className="col-1 flex flex-col font-medium justify-center justify-self-start relative row-2 self-start shrink-0 text-[8.352px] text-[color:#f1f6ff]">
                    <p className="leading-[11.931px]">
                      <CountUp value={1243} startDelay={STATS_COUNT_DELAY} duration={STATS_COUNT_DURATION} format={(n) => `$${(n / 10).toFixed(1)} B`} />
                    </p>
                  </div>
                </div>
                <div className="col-2 gap-x-[2.386204481124878px] gap-y-[2.386204481124878px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative row-2 self-start shrink-0 w-[52.496px]">
                  <div className="col-1 flex flex-col font-normal justify-center justify-self-start relative row-1 self-start shrink-0 text-[7.159px] text-[color:#a7bce4]">
                    <p className="leading-[9.545px]">All-Time High</p>
                  </div>
                  <div className="col-1 flex flex-col font-medium justify-center justify-self-start relative row-2 self-start shrink-0 text-[8.352px] text-[color:#f1f6ff]">
                    <p className="leading-[11.931px]">
                      <CountUp value={4756} startDelay={STATS_COUNT_DELAY} duration={STATS_COUNT_DURATION} format={(n) => `$${n.toLocaleString()} B`} />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="absolute left-[164.6px] size-[16px] top-[169.23px]" {...fadeOnly(KEY_STATS_PANEL_DELAY, KEY_STATS_PANEL_DURATION)}>
              <div className="absolute inset-[8.33%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/instant-answers/bolt-circle-icon.svg" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
