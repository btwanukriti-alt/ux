"use client";

import { motion } from "framer-motion";
import { CandlestickChart } from "./CandlestickChart";
import { GradientBorder } from "./GradientBorder";

const badgeFade = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// Fixed to the exact Figma frame size (358.23 x 340.45). The chart region is
// intentionally wider/taller than the card and bleeds off its right and
// bottom edges — only clipped by the card's own overflow-hidden, not inset
// on every side. See node 2346:233211.
export function ReadMarketCard() {
  return (
    <div className="relative h-[340px] w-[358px] overflow-hidden rounded-[22px] bg-[rgba(86,79,154,0.04)] backdrop-blur-[4.65px]">
      <GradientBorder color="167,191,255" duration={4.2} baseOpacity={0.14} sweepOpacity={0.42} />

      <h3 className="absolute left-[29px] top-[30px] text-lg font-semibold leading-6 text-[#f3f4ff]">
        Read the Market
      </h3>
      <p className="absolute left-[29px] top-[58px] w-[299px] text-sm font-medium leading-5 text-[#a8aac7]">
        Candles, indicators, watchlist, and market regime on one canvas.
      </p>

      <div className="absolute left-[26.65px] top-[124px] h-[244px] w-[394px]">
        <div className="absolute inset-0 rounded-[17px]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />
        </div>

        <div className="absolute left-[13.6px] top-[13px] h-[227px] w-[367px] overflow-hidden rounded-[13px] bg-[rgba(4,1,58,0.14)]">
          <GradientBorder color="191,236,255" duration={3.6} baseOpacity={0.05} sweepOpacity={1} />
          <CandlestickChart />

          <motion.div className="absolute left-[14px] top-[10.6px] flex items-center gap-1" {...badgeFade(1.0)}>
            <img src="/figma/read-market-card/coin-icon.svg" alt="" className="size-3.5" />
            <span className="text-[10px] font-medium leading-[22px] text-white">
              BTCUSDT
            </span>
          </motion.div>

          <motion.div
            className="absolute left-[199.6px] top-[15px] flex h-[21px] w-[96px] items-center justify-center gap-1.5 rounded-[4px] border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(55,81,118,0.1)] px-[6.7px] backdrop-blur-[7.4px]"
            {...badgeFade(1.15)}
          >
            <img src="/figma/read-market-card/ellipse-regime.svg" alt="" className="size-[6px]" />
            <span className="whitespace-nowrap text-[6.6px] font-medium leading-[8.8px] text-[#f1f6ff]">
              Breakout: 40%
            </span>
          </motion.div>

          <motion.div
            className="absolute left-[14px] top-[160px] flex h-[21px] items-center gap-[3px] rounded-[4px] border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[rgba(55,81,118,0.1)] px-[6px] py-[2px] backdrop-blur-[7.4px]"
            {...badgeFade(1.3)}
          >
            <img
              src="/figma/read-market-card/candlestick-icon.svg"
              alt=""
              className="size-[15px]"
            />
            <span className="whitespace-nowrap text-[6.6px] font-medium leading-[8.8px] text-[#f1f6ff]">
              Doji
            </span>
            <img src="/figma/read-market-card/dot.svg" alt="" className="size-[3.7px]" />
            <span className="whitespace-nowrap text-[6.6px] font-medium leading-[8.8px] text-[#f1f6ff]">
              Shooting Star
            </span>
            <img src="/figma/read-market-card/dot.svg" alt="" className="size-[3.7px]" />
            <span className="whitespace-nowrap text-[6.6px] font-medium leading-[8.8px] text-[#f1f6ff]">
              Hammer
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
