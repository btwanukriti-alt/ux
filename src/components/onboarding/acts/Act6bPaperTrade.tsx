"use client";

import { motion } from "framer-motion";
import { CountUp, ShuffleNumber } from "../../cards/AnimatedNumbers";
import { DiagonalGlow } from "../../cards/DiagonalGlow";
import { TypedText } from "../../cards/TypedText";

// Act 6b — "Trade live markets, risk zero capital" (Screen 15, node
// 2999:55262). Ported from src/components/cards/quant/PaperTradeCard.tsx's
// sequence and timing constants, re-anchored to Screen15's own (much
// smaller, differently-arranged) real geometry — every position/size below
// is copied verbatim from Screen15TradeLiveMarketsDashboard.tsx, not
// computed from the card's 600x364 layout.
//
// One deliberate deviation from the card: PaperTradeCard's SpinningStatusIcon
// spins twice then crossfades to a checkmark. Screen15's own ground-truth
// asset for this exact row is `loading-icon.svg` — literally the same
// dual-ring spinner graphic, not a checkmark — so the static end-state this
// animation must land on pixel-exact is mid-spin, not resolved. Rather than
// contradict that ground truth, this row's rings spin continuously
// (the one intentional loop in this act — everything else settles once).

// Per the user's request, the graphic content (and its text) is scaled up
// from its literal Figma size for better legibility — this act has a single
// common inner wrapper (368x229) holding the toolbar, ongoing-trade row, and
// stat/veto panel, so one scale transform on that wrapper enlarges
// everything together. Headline stays at its own already-legible 28px.
// Bumped again per the user's explicit follow-up that the first pass was
// still "extremely small to the point it's not even readable."
const GRAPHIC_SCALE = 1.55;

// Timing below is compressed for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT6B_DURATION below, which the
// sequencer now waits for exactly), so "fast paced" comes from tightening
// this act's own choreography, not truncating it. The one exception is
// RING_LOOP_DURATION — it drives the ongoing spinner's infinite loop, which
// never "completes" by design (see the note above), so it's just given a
// snappier per-turn speed rather than being part of the completion math.
const HEADLINE_START = 0.15;
const HEADLINE_TEXT_1 = "Trade live markets, ";
const HEADLINE_TEXT_2 = "risk zero capital";
const CHAR_DELAY = 0.02;
const HEADLINE_DURATION = (HEADLINE_TEXT_1.length + HEADLINE_TEXT_2.length) * CHAR_DELAY;

const TOOLBAR_DELAY = HEADLINE_START + HEADLINE_DURATION + 0.22;
const TOOLBAR_DURATION = 0.22;

// Waits for the toolbar's own fade-in to actually finish before appearing,
// so the nav panel always visibly leads, per the user's explicit
// "nav panel should appear before the line or card below it" correction.
const ROW_DELAY = TOOLBAR_DELAY + TOOLBAR_DURATION + 0.05;
const ROW_DURATION = 0.18;
const RING_LOOP_DURATION = 0.6;

const PANEL_DELAY = ROW_DELAY + 0.18;
const PANEL_DURATION = 0.18;

const STAT_LABELS_DELAY = PANEL_DELAY + 0.08;
const WIN_RATE_COUNT_DELAY = STAT_LABELS_DELAY + 0.06;
const WIN_RATE_COUNT_DURATION = 0.55;
const PL_SHUFFLE_DELAY = STAT_LABELS_DELAY + 0.06;
const PL_SHUFFLE_DURATION = 0.6;

const DIVIDER_DELAY = PANEL_DELAY + 0.15;

const CHECKS_LABEL_DELAY = DIVIDER_DELAY + 0.08;
const CHECKS_START = CHECKS_LABEL_DELAY + 0.08;
const CHECK_STAGGER = 0.03;

const GLOW_DELAY = Math.max(WIN_RATE_COUNT_DELAY + WIN_RATE_COUNT_DURATION, PL_SHUFFLE_DELAY + PL_SHUFFLE_DURATION, CHECKS_START + 11 * CHECK_STAGGER + 0.18) + 0.18;
const GLOW_DURATION = 0.75;

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — the act's real completion, not an arbitrary
// padded number.
export const ACT6B_DURATION = GLOW_DELAY + GLOW_DURATION;

const fadeOnly = (delay: number, duration = 0.3) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease: "easeOut" as const },
});

function SpinningStatusIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <motion.svg className="absolute inset-0" width="24" height="24" viewBox="0 0 21 21" fill="none" animate={{ rotate: 360 }} transition={{ duration: RING_LOOP_DURATION, ease: "linear", repeat: Infinity }}>
        <path d="M0.5 10.5C0.5 16.0229 4.97715 20.5 10.5 20.5C16.0229 20.5 20.5 16.0229 20.5 10.5C20.5 4.97715 16.0229 0.5 10.5 0.5" stroke="#5985FF" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
      <motion.svg className="absolute inset-0" width="24" height="24" viewBox="0 0 21 21" fill="none" animate={{ rotate: -360 }} transition={{ duration: RING_LOOP_DURATION, ease: "linear", repeat: Infinity }}>
        <path d="M16.5 10.5C16.5 7.1863 13.8137 4.5 10.5 4.5C7.1863 4.5 4.5 7.1863 4.5 10.5C4.5 13.8137 7.1863 16.5 10.5 16.5" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  );
}

function CheckItem({ label, highlight, wrap = "nowrap", delay }: { label: string; highlight?: string; wrap?: "nowrap" | "pre"; delay: number }) {
  return (
    <motion.div className="content-stretch flex gap-[1.791px] items-center py-[0.895px] relative shrink-0" {...fadeOnly(delay, 0.3)}>
      <div className="content-stretch flex h-[5.373px] items-center px-[0.895px] py-[1.791px] relative shrink-0">
        <div className="relative shrink-0 size-[3.582px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/figma/onboarding/15-trade-live-markets-dashboard/gauge-dot.svg" />
        </div>
      </div>
      <p className={`[word-break:break-word] font-medium relative shrink-0 text-[2.41px] text-[color:#f1f6ff] ${highlight ? "leading-[0]" : "leading-[3.207px]"} ${wrap === "pre" ? "whitespace-pre" : "whitespace-nowrap"}`}>
        {highlight ? (
          <>
            <span className="leading-[3.207px]">{label}</span>
            <span className="leading-[3.207px] text-[#45ffb5]">{highlight}</span>
          </>
        ) : (
          label
        )}
      </p>
    </motion.div>
  );
}

export function Act6bPaperTrade() {
  return (
    <>
      {/* Headline — same TypedText treatment as every other act */}
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-semibold left-1/2 text-[28px] text-[color:#f1f6ff] text-center top-[130px] w-[287.78px]">
        <span className="leading-[36px]">
          <TypedText text={HEADLINE_TEXT_1} startDelay={HEADLINE_START} charDelay={CHAR_DELAY} />
        </span>
        <span className="leading-[36px] text-[#5985ff]">
          <TypedText text={HEADLINE_TEXT_2} startDelay={HEADLINE_START + HEADLINE_TEXT_1.length * CHAR_DELAY} charDelay={CHAR_DELAY} />
        </span>
      </p>

      {/* Shifted up 2.46px from its literal Figma top (310.43px) so its
          content still lines up right below the toolbar now that the
          toolbar is a persistent element rendered by the sequencer (see
          OnboardingScreens.tsx) instead of living inside this act's own
          scaled wrapper, per the user's explicit "the nav panel should just
          be a fixed frame, only the highlight slides" correction. */}
      <div className="absolute h-[280px] left-[-1.2px] top-[307.97px] w-[678px]">
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute h-[229px] left-1/2 top-[calc(50%-0.5px)] w-[368px]"
          style={{ transform: `scale(${GRAPHIC_SCALE})`, transformOrigin: "50% 50%" }}
        >
          {/* Ongoing Paper Trade row */}
          <motion.div className="absolute content-stretch flex gap-[8px] items-center left-[101.42px] top-[64.46px] w-[177px]" {...fadeOnly(ROW_DELAY, ROW_DURATION)}>
            <SpinningStatusIcon />
            <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative">
              <p className="[word-break:break-word] font-medium leading-[20px] relative shrink-0 text-[14px] text-[color:#a7bce4] whitespace-nowrap">Ongoing Paper Trade</p>
            </div>
          </motion.div>

          {/* Stat panel + veto checks */}
          <motion.div
            className="absolute backdrop-blur-[4px] border-[0.5px] border-[#4c6aa5] border-solid content-stretch flex flex-col gap-[7.164px] h-[134px] items-start left-[5.56px] overflow-clip px-[8.955px] py-[11px] rounded-[7.164px] top-[106.08px] w-[363px]"
            style={{
              backgroundImage:
                "linear-gradient(179.99998793739672deg, rgba(0, 117, 255, 0) 91.538%, rgba(121, 183, 255, 0.118) 111.87%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 363 134' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.4'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000011335 -1.016 11.397 0.0000059333 185.6 -1.4725)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\")",
            }}
            {...fadeOnly(PANEL_DELAY, PANEL_DURATION)}
          >
            <motion.div className="[word-break:break-word] content-stretch flex gap-[5.82px] h-[27.759px] items-center relative shrink-0 w-[386.388px]" {...fadeOnly(STAT_LABELS_DELAY, 0.25)}>
              <div className="backdrop-blur-[4px] bg-[rgba(214,214,214,0.05)] border-[0.448px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col gap-[1.791px] items-center justify-center px-[5.373px] py-[6px] relative rounded-[8px] shrink-0 w-[110px]">
                <p className="font-normal leading-[5.373px] relative shrink-0 text-[4.48px] text-[color:#a7bce4] w-full">WIN RATE</p>
                <p className="font-semibold leading-[9.85px] relative shrink-0 text-[7.16px] text-[color:#f1f6ff] w-full">
                  <CountUp value={76} startDelay={WIN_RATE_COUNT_DELAY} duration={WIN_RATE_COUNT_DURATION} format={(n) => `${n}%`} />
                </p>
              </div>
              <div className="backdrop-blur-[4px] bg-[rgba(214,214,214,0.05)] border-[0.448px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col gap-[1.791px] items-center justify-center px-[5.373px] py-[6px] relative rounded-[8px] shrink-0 w-[110px]">
                <p className="font-normal leading-[5.373px] relative shrink-0 text-[4.48px] text-[color:#a7bce4] w-full">{`NOTIONAL P&L`}</p>
                <p className="font-semibold leading-[9.85px] relative shrink-0 text-[7.16px] text-[color:#f1f6ff] w-full">
                  <ShuffleNumber value={1204} startDelay={PL_SHUFFLE_DELAY} duration={PL_SHUFFLE_DURATION} format={(n) => `+$${n.toLocaleString()}`} />
                </p>
              </div>
              <div className="backdrop-blur-[4px] bg-[rgba(0,85,209,0.1)] border-[0.448px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col gap-[1.791px] items-center justify-center px-[5.373px] py-[6px] relative rounded-[8px] shrink-0 w-[110px]">
                <p className="font-normal leading-[5.373px] relative shrink-0 text-[4.48px] text-[color:#a7bce4] w-full">DRAWDOWN</p>
                <p className="font-semibold leading-[9.85px] relative shrink-0 text-[7.16px] text-[color:#f1f6ff] w-full">-4.1%</p>
              </div>
            </motion.div>

            <motion.div className="h-0 relative shrink-0 w-full" {...fadeOnly(DIVIDER_DELAY, 0.25)}>
              <div className="absolute inset-[-0.22px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src="/figma/onboarding/15-trade-live-markets-dashboard/divider.svg" />
              </div>
            </motion.div>

            <motion.div className="content-stretch flex items-start relative shrink-0 w-full" {...fadeOnly(CHECKS_LABEL_DELAY, 0.25)}>
              <p className="[word-break:break-word] font-normal leading-[7.164px] relative shrink-0 text-[5.373px] text-[color:#a7bce4] whitespace-nowrap">13 VETO CHECKS</p>
            </motion.div>

            {/* 3 columns x 4 rows, matching Screen15's real grouping (not PaperTradeCard's 4-column layout) — row-major stagger for a clean cascade */}
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3.582px] items-start min-w-px relative">
                <CheckItem label="Stale Data" delay={CHECKS_START + 0 * CHECK_STAGGER} />
                <CheckItem label="Drawdown" delay={CHECKS_START + 3 * CHECK_STAGGER} />
                <CheckItem label="Liquidation Cascade" delay={CHECKS_START + 6 * CHECK_STAGGER} />
                <CheckItem label="Manual Override" delay={CHECKS_START + 9 * CHECK_STAGGER} />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3.582px] items-start min-w-px relative">
                <CheckItem label="Source Disagreement" delay={CHECKS_START + 1 * CHECK_STAGGER} />
                <CheckItem label="Time-of-day" delay={CHECKS_START + 4 * CHECK_STAGGER} />
                <CheckItem label="Anomaly" delay={CHECKS_START + 7 * CHECK_STAGGER} />
                <CheckItem label="Concentration " delay={CHECKS_START + 10 * CHECK_STAGGER} />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3.582px] items-start min-w-px relative">
                <CheckItem label="Fragility " highlight="VETO" delay={CHECKS_START + 2 * CHECK_STAGGER} />
                <CheckItem label="News Blackout" delay={CHECKS_START + 5 * CHECK_STAGGER} />
                <CheckItem label="Calibration Drift" delay={CHECKS_START + 8 * CHECK_STAGGER} />
                <CheckItem label="Funding Extreme" delay={CHECKS_START + 11 * CHECK_STAGGER} />
              </div>
            </div>

            <DiagonalGlow left={0} top={0} width={363} height={134} borderRadius={7} delay={GLOW_DELAY} duration={GLOW_DURATION} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
