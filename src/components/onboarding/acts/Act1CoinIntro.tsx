"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { TypedText } from "../../cards/TypedText";
import { CandleChartAnimated } from "./CandleChartAnimated";
import { FootprintChartAnimated } from "./FootprintChartAnimated";

// Act 1 of the onboarding storyboard — animates Figma frames
// 2999:49634 (headline only) -> 2999:66251 (coin wheel) -> 2999:50129 (ETH
// chip landed) -> 2999:50612 (candlestick chart) -> 2999:51827 (footprint
// chart), reusing their exact markup/positions/assets (see the static
// Screen01..Screen05 components for the pixel-verified reference) with
// motion layered on top, per the user's spec:
//   1) headline types in
//   2) headline moves up, coin wheel spins in and lands on ETH (alarm-clock
//      picker feel), holds briefly
//   3) headline swaps (typed) + the landed pill shrinks into the chart's
//      header chip while candles draw in
//   4) candle chart zooms into the footprint chart; the headline swaps again
//      but this time only fades in (no typing), per the user's explicit spec

const HEADLINE_1_LINE1 = "Professional trading, ";
const HEADLINE_1_LINE2 = "powered by AI";
const HEADLINE_2 = "Live charts that spot the market regime";
const HEADLINE_3 = "Drill into every order, see where size builds";

// Timing below is compressed from the original (CHAR_DELAY 0.035, and every
// buffer/duration roughly halved) for a faster-paced feel, per the user's
// explicit correction: acts must still play to their own true completion
// before the sequencer cuts away (see ACT1_DURATION at the bottom, which
// the sequencer now waits for exactly), so "fast paced" has to come from
// tightening this act's own choreography rather than truncating it.
const CHAR_DELAY = 0.02;
const HEADLINE_1_START = 0.15;
const HEADLINE_1_DURATION = (HEADLINE_1_LINE1.length + HEADLINE_1_LINE2.length) * CHAR_DELAY;

// --- Beat 2: headline moves up, wheel spins in --------------------------
const HEADLINE_MOVE_DELAY = HEADLINE_1_START + HEADLINE_1_DURATION + 0.25;
const HEADLINE_MOVE_DURATION = 0.35;
const WHEEL_APPEAR_DELAY = HEADLINE_MOVE_DELAY + 0.08;
const WHEEL_APPEAR_DURATION = 0.25;

const ROW_H = 46;
const VISIBLE_ROWS = 5;
const VIEWPORT_H = ROW_H * VISIBLE_ROWS;
// Absolute position (within the 678x829 card) of the coin-wheel viewport's
// top edge, chosen so the centered/landing row sits exactly where Screen03's
// landed ETHUSDT pill sits (top-[316.09+110.76] =~ 426.85px absolute).
const WHEEL_TOP = 426.85 - VIEWPORT_H / 2;

type Coin = { ticker: string; icon: string };
const COINS: Coin[] = [
  { ticker: "BTC", icon: "/figma/onboarding/professional-trading/coin-btc.svg" },
  { ticker: "SOL", icon: "/figma/onboarding/professional-trading/coin-sol.svg" },
  { ticker: "ETHUSDT", icon: "/figma/onboarding/professional-trading/coin-ethusdt.svg" },
  { ticker: "XRP", icon: "/figma/onboarding/professional-trading/coin-xrp.svg" },
  { ticker: "BNB", icon: "/figma/onboarding/professional-trading/coin-bnb.svg" },
];
const LANDING_TICKER = "ETHUSDT";

const RUNWAY_LOOPS = 4;
const STRIP: Coin[] = [...Array(RUNWAY_LOOPS)].flatMap(() => COINS).concat(COINS);
const LANDING_INDEX = STRIP.length - COINS.length + COINS.findIndex((c) => c.ticker === LANDING_TICKER);

function centerYFor(index: number) {
  return VIEWPORT_H / 2 - (index * ROW_H + ROW_H / 2);
}
const START_Y = centerYFor(0);

const SPIN_START = WHEEL_APPEAR_DELAY + WHEEL_APPEAR_DURATION + 0.08;
const SPIN_DURATION = 1.8;
const SPIN_END = SPIN_START + SPIN_DURATION;
const TARGET_Y = centerYFor(LANDING_INDEX);

// No standalone "sits alone" pause once landed — per the user's explicit
// request, the moment the coin is selected it starts moving up, with the
// other rows fading out concurrently rather than as a separate prior step.
const ROW_FADE_OUT_DURATION = 0.25;

// --- Beat 3: pill shrinks into header chip, headline 2 types in ---------
const MOVE_UP_DELAY = SPIN_END;
const MOVE_UP_DURATION = 0.4;

// Chart box position (Figma nodes 2999:50612 / 2999:51827's chart, exact).
const CHART_BOX_TOP = 358.77;
const CHART_BOX_LEFT = "calc(50% + 4.97px)";
const CHART_BOX_W = 393;
const CHART_BOX_H = 253;

// Header chip: per the user's explicit request, positioned with an exact
// 40px gap above the chart box (rather than Screen04/05's literal Figma
// position). Chip's own rendered height (padding + border + tallest
// child's line-height): py-[9.326px]*2 + border-[0.622px]*2 + 22.383px.
const CHIP_HEIGHT = 9.326 * 2 + 0.622 * 2 + 22.383;
const CHIP_TOP = CHART_BOX_TOP - 40 - CHIP_HEIGHT;

// Landed pill's on-screen center (Screen03) vs. the header-chip's on-screen
// center — pure top-position move the pill wrapper travels, its own scale
// shrinks it the rest. Pill's own rendered height, same formula as the
// chip above: py-[12.386px]*2 + border-[0.826px]*2 + 29.727px.
const PILL_HEIGHT = 12.386 * 2 + 0.826 * 2 + 29.727;
const PILL_CENTER_Y = 426.85 + PILL_HEIGHT / 2;
const CHIP_CENTER_Y = CHIP_TOP + CHIP_HEIGHT / 2;
const PILL_MOVE_UP_PX = CHIP_CENTER_Y - PILL_CENTER_Y;
const PILL_SCALE_DOWN = 0.62; // 17.41/23.121 text-size ratio, matches chip's shrink

const OLD_HEADLINE_1_FADE_DELAY = MOVE_UP_DELAY;
const OLD_HEADLINE_1_FADE_DURATION = 0.18;
const HEADLINE_2_START = OLD_HEADLINE_1_FADE_DELAY + OLD_HEADLINE_1_FADE_DURATION + 0.2;
const HEADLINE_2_DURATION = HEADLINE_2.length * CHAR_DELAY;

// The chart starts appearing exactly 0.5s after the pill has fully arrived
// at (and crossfaded into) the header chip — per the user's explicit spec.
const CHART_BOX_DELAY = MOVE_UP_DELAY + MOVE_UP_DURATION + 0.3;
const CHART_BOX_APPEAR_DURATION = 0.2;
const CANDLES_START = CHART_BOX_DELAY + CHART_BOX_APPEAR_DURATION;
// All 149 candles fade in together, no stagger (see CandleChartAnimated).
const CANDLES_END = CANDLES_START + 0.3;

// --- Beat 4: the candle chart breaks down into the footprint chart -------
// No camera zoom: the 5 candles that CandleChartAnimated's HIGHLIGHT_IDS
// keeps permanently visible stay exactly where they are; every other
// candle fades away around them, and FootprintChartAnimated's 5 cell
// groups grow outward from those same 5 candles' positions — so it reads
// as "these candles are breaking down into their footprint," per the
// user's explicit description of how this actually works, not an
// unrelated shape zooming/dissolving in.
const CANDLE_HOLD = 0.35;
const BREAKDOWN_START = CANDLES_END + CANDLE_HOLD;
const BREAKDOWN_FADE_OUT_DURATION = 0.3; // must match CandleChartAnimated's own constant

const OLD_HEADLINE_2_FADE_DELAY = BREAKDOWN_START;
const OLD_HEADLINE_2_FADE_DURATION = 0.18;
// Per the user's spec, headline 3 does NOT type — it only fades in.
const HEADLINE_3_FADE_DELAY = OLD_HEADLINE_2_FADE_DELAY + OLD_HEADLINE_2_FADE_DURATION + 0.2;
const HEADLINE_3_FADE_DURATION = 0.3;

// Cells start growing in shortly after the other candles begin clearing
// away, so the footprint reads as a consequence of that decluttering.
const FOOTPRINT_START = BREAKDOWN_START + 0.08;
const FOOTPRINT_GROUP_DURATION = 0.35; // must match FootprintChartAnimated's own constant

// The sequencer waits for exactly this long (converted to ms) before
// cutting to the next act — this is the act's real completion, not an
// arbitrary padded number, per the user's "let it finish, then switch
// right when it's done" correction.
export const ACT1_DURATION = FOOTPRINT_START + FOOTPRINT_GROUP_DURATION + 0.3;

function ChevronUp({ size = 15, src }: { size?: number; src: string }) {
  return (
    <div className="bg-[rgba(0,52,194,0.15)] content-stretch flex items-center justify-center p-[1.651px] relative rounded-[50px] shrink-0" style={{ width: size, height: size }}>
      <div className="relative shrink-0 size-full">
        <div className="absolute flex inset-[37.5%_29.17%_41.66%_29.16%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
            <div className="relative size-full">
              <div className="absolute inset-[-13.33%_-6.67%]">
                <img alt="" className="block max-w-none size-full" src={src} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// One row of the wheel strip. Non-landing coins always render the small
// "Coin / X" pill; the landing-index row always renders the big highlighted
// "Crypto Coin" pill (Screen02/03's exact markup) — same size throughout the
// whole spin, not just after landing, so there's no size pop at the moment
// it settles. Its scale/opacity still fall off with distance from the
// center line like every other row (alarm-clock-picker feel); only `landed`
// changes is whether the OTHER rows fade away.
function WheelRow({
  coin,
  index,
  y,
  isLanding,
  landed,
}: {
  coin: Coin;
  index: number;
  y: ReturnType<typeof useMotionValue<number>>;
  isLanding: boolean;
  landed: boolean;
}) {
  const centerY = centerYFor(index);
  const scale = useTransform(y, [centerY - 2 * ROW_H, centerY - ROW_H, centerY, centerY + ROW_H, centerY + 2 * ROW_H], [0.6, 0.8, 1, 0.8, 0.6]);
  const opacity = useTransform(y, [centerY - 2 * ROW_H, centerY - ROW_H, centerY, centerY + ROW_H, centerY + 2 * ROW_H], [0.08, 0.4, 1, 0.4, 0.08]);

  const showBigPill = isLanding;

  return (
    <motion.div
      style={{ height: ROW_H }}
      className="flex items-center justify-center"
      animate={{ opacity: landed && !isLanding ? 0 : 1 }}
      transition={{ duration: ROW_FADE_OUT_DURATION, ease: "easeOut" }}
    >
      {/* At rest, `scale`/`opacity` naturally evaluate to 1 for the landing
          row (y sits exactly at its centerY) — same big-pill markup the
          whole time, so settling just means this scale/opacity reaches 1,
          never a swap to a differently-sized element. */}
      <motion.div style={{ scale, opacity }}>
        {showBigPill ? (
          <div
            className="backdrop-blur-[4px] border-[0.826px] border-[#4c6aa5] border-solid content-stretch flex gap-[6.606px] items-center px-[18px] py-[12.386px] rounded-[47.067px]"
            style={{
              backgroundImage:
                "linear-gradient(180.00000147941165deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 197.02 48.719' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-1.8345e-7 -0.58712 7.556 -2.0525e-7 100.54 6.8581e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 197.02 48.719' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-5.015e-7 -1.6092 16.73 -3.2632e-7 98.51 2.6094)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
            }}
          >
            <div className="overflow-clip relative shrink-0 size-[23.12px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={coin.icon} />
            </div>
            <p className="[word-break:break-word] font-bold leading-[29.727px] relative shrink-0 text-[23.121px] text-[color:#f1f6ff] whitespace-nowrap">
              {coin.ticker}
            </p>
            <ChevronUp size={14.863} src="/figma/onboarding/professional-trading/chevron-up.svg" />
          </div>
        ) : (
          <div className="bg-[rgba(31,60,139,0.1)] border-[1.156px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[6.936px] items-center justify-center opacity-77 overflow-clip pl-[13.872px] pr-[16.184px] py-[8.092px] rounded-[1154.847px]">
            <div className="overflow-clip relative shrink-0 size-[23px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={coin.icon} />
            </div>
            <p className="[word-break:break-word] font-medium leading-[23.12px] relative shrink-0 text-[16.184px] text-[color:#a7bce4] whitespace-nowrap">
              {coin.ticker}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Act1CoinIntro() {
  const y = useMotionValue(START_Y);
  const [landed, setLanded] = useState(false);

  // `landed` flips via a plain mount-relative timer, matching every other
  // beat in this sequence, instead of the spin's onAnimationComplete
  // callback — keeps this trigger on the same timing model as everything
  // else here, which matters because of the note below.
  useEffect(() => {
    const t = setTimeout(() => setLanded(true), SPIN_END * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Headline 1 — typed in, then moves up and fades out once the pill
          starts its move to the header chip. */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[368.281px] text-center text-[28px] font-semibold leading-[36px]"
        initial={{ top: 387.5 }}
        animate={{ top: 141, opacity: [1, 1, 0] }}
        transition={{
          top: { duration: HEADLINE_MOVE_DURATION, delay: HEADLINE_MOVE_DELAY, ease: "easeInOut" },
          opacity: { duration: OLD_HEADLINE_1_FADE_DURATION, delay: OLD_HEADLINE_1_FADE_DELAY, times: [0, 0, 1], ease: "easeOut" },
        }}
      >
        <p className="text-[color:#f1f6ff]">
          <TypedText text={HEADLINE_1_LINE1} startDelay={HEADLINE_1_START} charDelay={CHAR_DELAY} />
        </p>
        <p className="text-[color:#5cb5ff]">
          <TypedText text={HEADLINE_1_LINE2} startDelay={HEADLINE_1_START + HEADLINE_1_LINE1.length * CHAR_DELAY} charDelay={CHAR_DELAY} />
        </p>
      </motion.div>

      {/* Headline 2 — typed in once headline 1 has fully faded; fades out
          itself once the zoom into the footprint chart begins. */}
      <motion.p
        className="absolute left-[calc(50%+0.1px)] -translate-x-1/2 top-[130px] w-[474px] text-center text-[28px] font-semibold leading-[36px] text-[color:#f1f6ff]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: OLD_HEADLINE_2_FADE_DELAY + OLD_HEADLINE_2_FADE_DURATION - HEADLINE_2_START,
          delay: HEADLINE_2_START,
          times: [0, 0.05, 1, 1],
          ease: "easeOut",
        }}
      >
        <TypedText text={HEADLINE_2} startDelay={0} charDelay={CHAR_DELAY} />
      </motion.p>

      {/* Headline 3 — per the user's spec, this one does NOT type in, it
          only fades in (Screen05's exact copy/position). */}
      <motion.p
        className="absolute left-[calc(50%+0.1px)] -translate-x-1/2 top-[130px] w-[474px] text-center text-[28px] font-semibold leading-[36px] text-[color:#f1f6ff]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: HEADLINE_3_FADE_DURATION, delay: HEADLINE_3_FADE_DELAY, ease: "easeOut" }}
      >
        {HEADLINE_3}
      </motion.p>

      {/* The coin wheel — appears once, spins to a stop on ETHUSDT (the
          alarm-clock-picker feel), holds, then the whole (now nearly-empty)
          viewport travels up + shrinks to become the chart's header chip —
          the same pill element, never a second one.

          Moves via `top`, exactly like Headline 1 above (initial top ->
          animate to a new top, same easeInOut/duration shape) rather than a
          transform-based `y`, per the user's explicit request to match that
          same movement style. */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        initial={{ top: WHEEL_TOP }}
        animate={{ top: landed ? WHEEL_TOP + PILL_MOVE_UP_PX : WHEEL_TOP, scale: landed ? PILL_SCALE_DOWN : 1 }}
        // No `delay` here referencing MOVE_UP_DELAY: this whole animate
        // object only takes its "landed" branch once `landed` itself flips
        // true, which already happens at MOVE_UP_DELAY (see the timer in
        // the effect above). Framer Motion's transition.delay counts from
        // when the animate target changes, not from mount — adding
        // MOVE_UP_DELAY again here was double-counting it, pushing the
        // actual move out to ~2x MOVE_UP_DELAY and stranding the pill
        // visually frozen through the entire chart/candle sequence.
        //
        // This is the ONLY coin pill for the rest of the act — it moves up,
        // shrinks, and then just stays there as the header chip. There used
        // to be a second, separately-styled "header chip" element that
        // faded in as this one faded out; that crossfade briefly showed two
        // overlapping pills and read as a glitch, so it's gone now.
        transition={{
          top: { duration: MOVE_UP_DURATION, ease: "easeInOut" },
          scale: { duration: MOVE_UP_DURATION, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="overflow-hidden"
          style={{
            height: VIEWPORT_H,
            width: 220,
            maskImage: landed ? "none" : "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskImage: landed ? "none" : "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: WHEEL_APPEAR_DURATION, delay: WHEEL_APPEAR_DELAY, ease: "easeOut" }}
        >
          <motion.div style={{ y }} animate={{ y: TARGET_Y }} transition={{ duration: SPIN_DURATION, delay: SPIN_START, ease: [0.1, 0.7, 0.15, 1] }}>
            {STRIP.map((coin, i) => (
              <WheelRow
                key={i}
                coin={coin}
                index={i}
                y={y}
                isLanding={i === LANDING_INDEX}
                landed={landed}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Chart box — one static box (Screen04/05's exact position/size),
          hosting first the candle chart, then (via a zoom + crossfade) the
          footprint chart, exactly like the source frames. */}
      <motion.div
        className="absolute -translate-x-1/2 rounded-[24px] border border-[rgba(128,197,255,0.05)] border-solid backdrop-blur-[4px] overflow-hidden"
        style={{
          left: CHART_BOX_LEFT,
          top: CHART_BOX_TOP,
          width: CHART_BOX_W,
          height: CHART_BOX_H,
          backgroundImage:
            "linear-gradient(179.99997896362797deg, rgba(0, 117, 255, 0) 91.538%, rgba(121, 183, 255, 0.118) 111.87%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 393 253' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000012272 -1.9184 12.339 0.000011202 200.93 -2.7802)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 393 253' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.30000001192092896'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-8.2873e-7 -3.8923 18.136 -0.0000054803 196.5 9.4208e-7)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: CHART_BOX_APPEAR_DURATION, delay: CHART_BOX_DELAY, ease: "easeOut" }}
      >
        {/* Candle content and footprint content are just plain, unanimated
            positioning layers now — the actual motion (candles fading
            selectively, footprint cells growing from the surviving
            candles' positions) all lives inside CandleChartAnimated /
            FootprintChartAnimated itself, per the user's requested
            "footprint is a breakdown of the candle" effect: no outer
            zoom/scale to layer on top of that. `flex flex-col` reproduces
            the original "Chart" ancestor's layout context (Screen04/05),
            so their own flex-[1_0_0] root actually fills the box instead
            of collapsing to content height.

            Footprint renders FIRST (underneath): its own root has a
            semi-transparent navy fill across the whole box, and the
            surviving candles need to stay crisp on top of that, not
            tinted by it, since they're the whole point here. */}
        <div className="absolute inset-0 flex flex-col">
          <FootprintChartAnimated startDelay={FOOTPRINT_START} />
        </div>

        <div className="absolute inset-0 flex flex-col">
          <CandleChartAnimated startDelay={CANDLES_START} breakdownDelay={BREAKDOWN_START} />
        </div>
      </motion.div>
    </>
  );
}
