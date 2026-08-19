"use client";

import { motion } from "framer-motion";
import { TypedText } from "../../cards/TypedText";
import { GradientBorder } from "../../cards/GradientBorder";
import { DiagonalGlow } from "../../cards/DiagonalGlow";
import { ClickCursor } from "../../cards/ClickCursor";

// Act 6 — "Save every strategy, compare them side by side" — animates
// Figma frames 3004:73997 (Screen12, 4-card grid, no selection),
// 3004:260422 (Screen13, same grid with 3 cards gaining a checkbox + a
// Compare button), and 3004:261683 (Screen14, cards gone, full-width
// line-chart result).
//
// Per the user's explicit correction, Screen11 (the 3-card list + small
// dashed results skeleton that used to open this act) has been removed
// entirely — the animation now opens directly on the 4-card grid. The
// beats are: (1) all 4 cards stack in one by one, (2) 3 of the 4 get a
// checkbox one by one — sequential, not simultaneous — (3) the Compare
// button appears and gets clicked with no connector-line effect between
// the cards and the button, (4) the backtest results panel appears next.
//
// Screen13's real markup gives exactly 3 of the 4 grid cards a checkbox
// (not 2), and its 4th card is named "ReversalFade-4h" even though
// Screen12's same grid slot is named "MeanRev-VAL" — kept exactly as
// coded, per the user's earlier decision not to silently "fix" this
// apparent Figma authoring slip.
//
// Motion techniques ported from src/components/cards/quant/LibraryCard.tsx
// (fadeSlide/fadeScale/fadeOnly helpers, GradientBorder+ClickCursor click
// convention, DiagonalGlow), re-anchored to each screen's own
// geometry since Library's own layout differs from these. Panel 14's chart
// draws from public/figma/onboarding/14-save-strategy-lines-only/strategy-
// line-chart.svg — the real exported asset for this exact screen, sized
// natively at 310.587x55.708 (no distortion needed) — rather than reusing
// LibraryCard's ResultsGraph (authored for a ~2:1 box) stretched
// anisotropically to fit this much flatter box, which is what was
// producing the "totally disrupted" scribbled-looking lines the user
// flagged. Panel 14's border/title/background were also brought up to the
// same finished-panel treatment used in Act5bBuildBacktest.tsx (solid
// #67d1ff border + real gradient + real "Backtest Results" title, instead
// of a near-invisible 0.05-opacity border and two decorative placeholder
// bars) per the user's "make the colors pop out more" request.

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — this act has a single
// common inner wrapper (368.126x287.337) that every panel-beat's content
// lives inside, so one scale transform on that one wrapper enlarges the
// toolbar, cards, grid, connector lines, and Compare button all together in
// lockstep (the connector-line geometry math is computed from card
// positions inside that SAME wrapper, so it stays correct automatically).
// Headline stays at its own already-legible 28px.
const GRAPHIC_SCALE = 1.25;

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

const fadeOnly = (delay: number, duration = 0.35) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

// --- Timeline ----------------------------------------------------------
// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT6_DURATION below, which the
// sequencer now waits for exactly), so "fast paced" comes from tightening
// this act's own choreography, not truncating it.
const HEADLINE_TEXT1 = "Save every strategy, ";
const HEADLINE_TEXT2 = "compare them side by side";
const CHAR_DELAY = 0.018;
const HEADLINE_START = 0.15;
const HEADLINE_DURATION = (HEADLINE_TEXT1.length + HEADLINE_TEXT2.length) * CHAR_DELAY;

const TOOLBAR_DELAY = HEADLINE_START + HEADLINE_DURATION + 0.22;
const TOOLBAR_DURATION = 0.25;

// --- Panel 12/13: 4-card grid — now the FIRST beat of the act -------------
const CARD_STAGGER = 0.12;
const CARDS12_START = TOOLBAR_DELAY + TOOLBAR_DURATION + 0.15;
const CARD12_DELAYS = [0, 1, 2, 3].map((i) => CARDS12_START + i * CARD_STAGGER);

// --- Panel 12 -> 13: checkboxes + Compare button ----------------------------
const CHECKBOX_START = CARDS12_START + 3 * CARD_STAGGER + 0.28;
// Deliberately much slower than CARD_STAGGER so each of the 3 selections
// reads as its own distinct click rather than a near-simultaneous batch,
// per the user's explicit "selected one by one" instruction.
const CHECKBOX_STAGGER = 0.18;
// The 3 cards that gain a checkbox in the real Screen13 markup: index 0
// (FundingSkew-1h), 1 (TurboMOVE-vol), 3 (ReversalFade-4h) — index 2
// (MeanRev-VAL/Sideways) keeps its plain Screen12 styling untouched.
const CHECKBOX_CARD_INDICES = [0, 1, 3];
const CHECKBOX_DELAYS: Record<number, number> = Object.fromEntries(CHECKBOX_CARD_INDICES.map((idx, i) => [idx, CHECKBOX_START + i * CHECKBOX_STAGGER]));

// Compare appears right after the last selection lands — no connector-line
// effect gates it anymore, per the user's explicit "without any leading
// lines" instruction (the lines-growing-toward-Compare effect that used to
// live here has been removed).
const COMPARE13_DELAY = CHECKBOX_START + CHECKBOX_CARD_INDICES.length * CHECKBOX_STAGGER + 0.12;
const COMPARE13_APPEAR_DURATION = 0.18;
const COMPARE13_GLOW_DURATION = 0.5;

const CURSOR_ARRIVE = COMPARE13_DELAY + COMPARE13_APPEAR_DURATION + 0.15;
const CURSOR_CLICK = CURSOR_ARRIVE + 0.18;
const CURSOR_FADE_OUT_DELAY = CURSOR_CLICK + 0.18;
const CURSOR_FADE_OUT_DURATION = 0.15;
// The click is what triggers the glow, per the standing +0.05s convention.
const COMPARE_GLOW_DELAY = CURSOR_CLICK + 0.05;

const PANEL13_FADEOUT_DELAY = COMPARE_GLOW_DELAY + COMPARE13_GLOW_DURATION * 0.5 + 0.18;
const PANEL13_FADEOUT_DURATION = 0.2;

// --- Panel 14: full-width results, line chart -------------------------------
const RESULTS14_BORDER_DELAY = PANEL13_FADEOUT_DELAY + 0.12;
const RESULTS14_LINES_DELAY = RESULTS14_BORDER_DELAY + 0.08;
const GRAPH_DELAY = RESULTS14_LINES_DELAY + 0.12;
const GRAPH_PATH_DURATION = 0.5;
const GRAPH_PATH_STAGGER = 0.05;
const GRAPH_TOTAL = GRAPH_PATH_DURATION + GRAPH_PATH_STAGGER * 2;

const ROW1_14_DELAY = GRAPH_DELAY + GRAPH_TOTAL + 0.08;
const ROW2_14_DELAY = ROW1_14_DELAY + 0.12;

const GLOW_DELAY = ROW2_14_DELAY + 0.35;
const GLOW_DURATION = 0.75;

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion, not an arbitrary
// padded number.
export const ACT6_DURATION = GLOW_DELAY + GLOW_DURATION;

// --- Panels 12/13: the 4-card grid (same elements persist, style morphs) ---
type Card12 = { name: string; regimeLabel: string; regimeText: string; avatar: string; hasCheckbox: boolean };

const CARDS12: Card12[] = [
  { name: "FundingSkew-1h", regimeLabel: "Sideways", regimeText: "#0ff", avatar: "strategy-avatar-1.svg", hasCheckbox: true },
  { name: "TurboMOVE-vol", regimeLabel: "Sideways", regimeText: "#0ff", avatar: "strategy-avatar-2.svg", hasCheckbox: true },
  { name: "MeanRev-VAL", regimeLabel: "Sideways", regimeText: "#0ff", avatar: "strategy-avatar-3.svg", hasCheckbox: false },
  // Named "ReversalFade-4h" once selectable (Screen13), matching the real
  // markup exactly rather than Screen12's "MeanRev-VAL" for this same slot.
  { name: "ReversalFade-4h", regimeLabel: "Reversal", regimeText: "#5985ff", avatar: "strategy-avatar-4.svg", hasCheckbox: true },
];

const GRID_POS = [
  { left: 0, top: 0 }, // col1 row1
  { left: 184.87, top: 0 }, // col2 row1
  { left: 0, top: 72.81 }, // col1 row2
  { left: 184.87, top: 72.81 }, // col2 row2
];

function GridCard({ card, index, delay }: { card: Card12; index: number; delay: number }) {
  const checkboxDelay = CHECKBOX_DELAYS[index];
  return (
    <motion.div
      className="absolute border-[0.372px] border-solid content-stretch flex flex-col gap-[11.898px] items-start overflow-clip px-[8.924px] py-[11.898px] rounded-[8.87px]"
      style={{ left: GRID_POS[index].left, top: GRID_POS[index].top, width: 172.07, height: 63.453 }}
      initial={{ opacity: 0, y: 10, borderColor: "#67d1ff", backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: checkboxDelay ? "#80c5ff" : "#67d1ff",
        backgroundColor: checkboxDelay ? "rgba(31,60,139,0.1)" : "rgba(0,0,0,0)",
      }}
      transition={{
        opacity: { duration: 0.45, delay, ease: "easeOut" },
        y: { duration: 0.45, delay, ease: "easeOut" },
        borderColor: checkboxDelay ? { duration: 0.3, delay: checkboxDelay, ease: "easeOut" } : { duration: 0 },
        backgroundColor: checkboxDelay ? { duration: 0.3, delay: checkboxDelay, ease: "easeOut" } : { duration: 0 },
      }}
    >
      <div className="content-stretch flex gap-[18.591px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[7.436px] items-start relative shrink-0">
          <div className="content-stretch flex gap-[5.949px] items-center relative shrink-0 w-full">
            {checkboxDelay && (
              <motion.button
                className="block cursor-pointer relative shrink-0 size-[16.36px]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: checkboxDelay, ease: "easeOut" }}
              >
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/13-save-strategy-compare-button/checkbox-icon-1.svg" />
                <img alt="" className="absolute block max-w-none size-full" style={{ inset: "33.33% 27.21% 35% 29.17%" }} src="/figma/onboarding/13-save-strategy-compare-button/checkbox-icon-2.svg" />
              </motion.button>
            )}
            <div className="content-stretch flex gap-[2.975px] items-center relative shrink-0">
              <div className="content-stretch flex items-center px-[1.487px] py-[4.462px] relative shrink-0">
                <img alt="" src={`/figma/onboarding/shared/${card.avatar}`} style={{ width: 5.949, height: 5.949 }} />
              </div>
              <p className="[word-break:break-word] font-semibold leading-[16.36px] relative shrink-0 text-[11.9px] text-[color:#f1f6ff] whitespace-nowrap">{card.name}</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[5.949px] items-start relative shrink-0">
            <div className="bg-[rgba(0,85,209,0.1)] content-stretch flex items-start overflow-clip px-[5.949px] py-[1.487px] relative rounded-[16px] shrink-0">
              <p className="[word-break:break-word] font-normal leading-[11.898px] relative shrink-0 text-[8.92px] whitespace-nowrap" style={{ color: card.regimeText }}>{card.regimeLabel}</p>
            </div>
            <div className="bg-[rgba(0,85,209,0.1)] content-stretch flex items-start overflow-clip px-[5.949px] py-[1.487px] relative rounded-[16px] shrink-0">
              <p className="[word-break:break-word] font-normal leading-[11.898px] relative shrink-0 text-[8.92px] text-[color:#a7bce4] whitespace-nowrap">Short Spot</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Act6SaveStrategy() {
  return (
    <>
      {/* Headline — persists unchanged across all 4 panels */}
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-semibold leading-[0] left-[calc(50%-41.48px)] text-[28px] text-[color:#f1f6ff] text-center top-[130px] w-[390.847px]">
        <span className="leading-[36px]">
          <TypedText text={HEADLINE_TEXT1} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
        </span>
        <span className="leading-[36px] text-[#5985ff]">
          <TypedText text={HEADLINE_TEXT2} startDelay={HEADLINE_START + HEADLINE_TEXT1.length * CHAR_DELAY} charDelay={CHAR_DELAY} />
        </span>
      </p>

      {/* Graphic region — same 368.126x287.337 box every screen positions
          its content in. Shifted up 27.51px from its literal Figma top
          (333.43px) so its content still lines up right below the toolbar
          now that the toolbar is a persistent element rendered by the
          sequencer (see OnboardingScreens.tsx) instead of living inside
          this act's own scaled wrapper, per the user's explicit "the nav
          panel should just be a fixed frame, only the highlight slides"
          correction. */}
      <div className="absolute h-[287px] left-[-1.73px] top-[305.92px] w-[678px]">
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-[287.337px] left-[calc(50%+0.06px)] top-[calc(50%+0.17px)] w-[368.126px]"
          style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
        >
          {/* --- Panels 12/13 grid: the FIRST beat now — 4 cards stack in one
              by one, then 3 of them get a checkbox one by one, then Compare
              appears and gets clicked (no connector-line effect). Fades out
              once the click has registered so Panel 14 can take over.
              left:5.56 centers this 357px-wide block in the 368.126px inner
              wrapper (same convention the Toolbar above uses) — the original
              160.5 was sized for the outer 678px box and, nested one level
              deeper than the real Figma structure, left this sitting almost
              flush against the card's right edge even at 1x scale; scaling
              it up turned that into real clipping (found via the graphic-
              scale verification below), so this is a real position fix, not
              just a scale-factor tweak. */}
          <motion.div
            className="absolute"
            style={{ left: 5.56, top: 65, width: 357 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{
              duration: PANEL13_FADEOUT_DELAY + PANEL13_FADEOUT_DURATION,
              times: [0, PANEL13_FADEOUT_DELAY / (PANEL13_FADEOUT_DELAY + PANEL13_FADEOUT_DURATION), 1],
              ease: "easeOut",
            }}
          >
            {CARDS12.map((c, i) => (
              <GridCard key={c.name + i} card={c} index={i} delay={CARD12_DELAYS[i]} />
            ))}

            <motion.div className="absolute bg-[rgba(0,255,255,0.05)] content-stretch flex gap-[3.983px] h-[23.896px] items-center px-[5.974px] py-[3.983px] rounded-[4.978px]" style={{ left: 142.74 - 17.76, top: 154 }} {...fadeScale(COMPARE13_DELAY, COMPARE13_APPEAR_DURATION, 0.85)}>
              <GradientBorder color="0,255,255" duration={COMPARE13_GLOW_DURATION} delay={COMPARE_GLOW_DELAY} baseOpacity={0.14} sweepOpacity={0.55} restColor="0,255,255" restOpacity={0.22} />
              <div className="relative shrink-0 size-[14.943px]">
                {["compare-icon-1.svg", "compare-icon-2.svg", "compare-icon-3.svg"].map((src, i) => (
                  <div key={src} className="absolute" style={i === 0 ? { inset: "8.33% 54.17% 54.17% 8.33%" } : i === 1 ? { inset: "54.17% 8.33% 8.33% 54.17%" } : { inset: "8.33%" }}>
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={`/figma/onboarding/13-save-strategy-compare-button/${src}`} />
                  </div>
                ))}
              </div>
              <p className="[word-break:break-word] font-medium leading-[15.931px] relative shrink-0 text-[11.948px] text-[color:#0ff] whitespace-nowrap">Compare</p>
            </motion.div>

            <ClickCursor left={200} top={165} arriveDelay={CURSOR_ARRIVE} clickDelay={CURSOR_CLICK} fadeOutDelay={CURSOR_FADE_OUT_DELAY} fadeOutDuration={CURSOR_FADE_OUT_DURATION} />
          </motion.div>

          {/* --- Panel 14: full-width results, next frame after the click ---
              Brought up to the same "finished panel" treatment as
              Act5bBuildBacktest.tsx's results card (solid #67d1ff border,
              real gradient background, real "Backtest Results" title) and
              using the real exported strategy-line-chart.svg asset (native
              310.587x55.708, matching this box exactly) instead of the
              generic ResultsGraph stretched anisotropically to fit — that
              distortion was what made the chart read as scribbled/broken. */}
          <motion.div className="absolute" style={{ left: 5.56, top: 63.97, width: 357 }} {...fadeOnly(RESULTS14_BORDER_DELAY, 0.01)}>
            <motion.div
              className="absolute backdrop-blur-[4px] border-[#67d1ff] border-[0.732px] border-solid rounded-[11.707px]"
              style={{
                left: 0,
                top: 0,
                width: 357,
                height: 195,
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.16) 100%), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
              }}
              {...fadeScale(RESULTS14_BORDER_DELAY, 0.35, 0.96)}
            />

            <motion.div className="absolute contents" {...fadeOnly(RESULTS14_LINES_DELAY, 0.3)}>
              <div className="absolute" style={{ left: 12, top: 11.5, width: 10, height: 10 }}>
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/shared/icon-stack.svg" />
              </div>
              <p className="absolute font-semibold leading-[10px] text-[7.5px] text-[color:#f1f6ff] whitespace-nowrap" style={{ left: 27, top: 13 }}>Backtest Results</p>
            </motion.div>

            <motion.div
              className="absolute overflow-hidden border-[0.5px] border-[rgba(103,209,255,0.35)] border-solid rounded-[6px]"
              style={{ left: 12, top: 30, width: 333, height: 90, backgroundColor: "rgba(74,59,112,0.14)" }}
              {...fadeScale(GRAPH_DELAY - 0.1, 0.3, 0.96)}
            >
              <div className="absolute" style={{ left: 0, top: -37.53, width: 177.79, height: 88.1377, transform: "scale(1.8732)", transformOrigin: "top left" }}>
                <StrategyLineChart delay={GRAPH_DELAY} />
              </div>
            </motion.div>

            <ResultsSkeletonRow14 top={130.15} height={27.445} delay={ROW1_14_DELAY} />
            <ResultsSkeletonRow14 top={165} height={17.42} delay={ROW2_14_DELAY} />

            <DiagonalGlow left={0} top={0} width={357} height={195} borderRadius={11.707} delay={GLOW_DELAY} duration={GLOW_DURATION} />
          </motion.div>
        </div>
      </div>
    </>
  );
}

// Panel 14's self-drawing line chart — same 3-color story as LibraryCard's
// ResultsGraph (purple/blue/light-blue), but traced from the real exported
// asset for THIS screen (14-save-strategy-lines-only/strategy-line-
// chart.svg), which is natively sized 310.587x55.708 — already the right,
// flat aspect ratio for this box, so no distortion is needed. Stroke width
// and group opacity are bumped up from the raw export (0.618551 / 0.66) so
// the lines read as bold, saturated results rather than a faint sketch,
// per the user's "make the colors pop out more" request.
function StrategyLineChart({ delay = 0 }: { delay?: number }) {
  const PATH_DURATION = 0.9;
  const PATH_STAGGER = 0.09;
  return (
    <svg width="177.79" height="88.1377" viewBox="0 0 310.587 55.7082" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", overflow: "hidden" }} preserveAspectRatio="none">
      <g opacity={0.95}>
        <motion.path
          d="M-3.87501e-06 36.0368L46.1767 32.7865C47.2751 32.7092 48.3425 32.3885 49.3016 31.8477L77.8727 15.7355C78.9855 15.108 80.2413 14.7783 81.5188 14.7783H111.965L139.525 18.4921C140.181 18.5805 140.845 18.5808 141.501 18.493L168.356 14.8997C168.959 14.819 169.569 14.8127 170.173 14.8809L187.047 16.7853C187.474 16.8335 187.904 16.8445 188.332 16.8183L221.005 14.8209C221.469 14.7925 221.935 14.8079 222.397 14.8667L251.871 18.6252L276.029 22.8257C277.055 23.0039 278.106 22.9646 279.115 22.7103L310.587 14.7783"
          stroke="#C567FF"
          strokeWidth={1.1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: PATH_DURATION, delay, ease: "easeInOut" }}
        />
        <motion.path
          d="M-3.87501e-06 31.6171L25.1156 28.0819C25.6501 28.0067 26.1913 27.99 26.7294 28.0321L35.6965 28.734C36.2393 28.7765 36.785 28.7591 37.3239 28.6822L57.451 25.8112C58.2132 25.7024 58.9877 25.7129 59.7466 25.8423L76.4639 28.6923C76.876 28.7626 77.2933 28.7979 77.7114 28.7979H109.196C110.167 28.7979 111.128 28.6075 112.025 28.2376L122.012 24.1203C123.145 23.6529 124.377 23.4737 125.597 23.5986L145.602 25.6471L163.219 26.4472C163.644 26.4665 164.07 26.4492 164.493 26.3955L187.156 23.5125C187.7 23.4432 188.25 23.4345 188.796 23.4865L220.205 26.4762L241.654 27.9256C242.08 27.9543 242.507 27.9463 242.931 27.9018L256.493 26.4762L275.242 24.3108C275.664 24.262 276.09 24.2496 276.515 24.2738L299.136 25.5599C300.148 25.6174 301.137 25.8815 302.043 26.3359L310.587 30.6221"
          stroke="#2653CF"
          strokeWidth={1.1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: PATH_DURATION, delay: delay + PATH_STAGGER, ease: "easeInOut" }}
        />
        <motion.path
          d="M0.405479 38.5628L15.7057 31.5008C16.0472 31.3432 16.3761 31.1599 16.6898 30.9524L41.3083 14.6699C43.4778 13.235 46.24 13.0404 48.5892 14.1569L67.7128 23.2458L88.4345 30.4203C90.0129 30.9668 91.7295 30.9649 93.3066 30.415L118.278 21.7086C119.549 21.2655 120.917 21.1763 122.235 21.4506L165.43 30.443L195.075 35.0094C195.449 35.067 195.827 35.0959 196.205 35.0959H220.371H235.736C236.49 35.0959 237.24 34.981 237.959 34.7553L262.138 27.1675C263.202 26.8334 264.329 26.7436 265.433 26.9049L294.654 31.1734C295.067 31.2337 295.474 31.3288 295.871 31.4576L310.181 36.0995"
          stroke="#5CB5FF"
          strokeWidth={1.1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: PATH_DURATION, delay: delay + PATH_STAGGER * 2, ease: "easeInOut" }}
        />
      </g>
    </svg>
  );
}

// Panel 14's 5-column skeleton row (thinner/wider than Screen11's 3-column
// version, per Screen14's own real geometry). Colors bumped up from the
// original near-invisible opacities so the "finished" panel doesn't still
// read as a loading skeleton, per the user's "make the colors pop out
// more" request.
function ResultsSkeletonRow14({ top, height, delay }: { top: number; height: number; delay: number }) {
  const cols = [11.77, 141.21, 186.39, 231.57, 276.76];
  return (
    <motion.div className="absolute" style={{ left: 0, top }} {...fadeOnly(delay)}>
      <div className="absolute bg-[rgba(103,209,255,0.08)] border-[0.316px] border-[rgba(167,191,255,0.35)] border-solid rounded-[2.528px]" style={{ left: 0, top: 0, width: 331.635, height }} />
      {cols.map((left, ci) =>
        [0, 1, 2].map((r) => (
          <div key={`${left}-${r}`} className="absolute bg-[rgba(236,238,255,0.5)] rounded-[0.632px]" style={{ left: left + 5.77, top: 5.94 + r * 7.27, width: ci === 0 ? 95.131 : 32.394, height: 2.5 }} />
        )),
      )}
    </motion.div>
  );
}
