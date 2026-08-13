"use client";

import { motion } from "framer-motion";
import type { Footprint as FootprintData } from "./footprint-data";

function Column({ cells, values, delay }: { cells: string[]; values: string[]; delay: number }) {
  return (
    <div className="flex flex-col items-start">
      {cells.map((color, i) => (
        <div
          key={i}
          className="flex h-[11.588px] w-[24.913px] shrink-0 items-center justify-center border-[0.29px] border-[rgba(255,89,113,0.1)] p-[2.318px] opacity-90"
          style={{ backgroundColor: color }}
        >
          <motion.span
            className="whitespace-nowrap text-[5.79px] font-semibold leading-[6.953px] text-[#f1f6ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
          >
            {values[i]}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

// A single "footprint" bar: mirrored bid/ask cell columns flanking a
// candle+wick, positioned within its parent Card box. `delay` staggers this
// footprint's cell numbers fading in relative to the others.
export function Footprint({ data, delay = 0 }: { data: FootprintData; delay?: number }) {
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{ left: data.left, top: data.top, width: data.width, height: data.height }}
    >
      <Column cells={data.cells} values={data.values} delay={delay} />
      <div className="absolute left-1/2 top-0 bottom-0 w-[5.794px] -translate-x-1/2">
        <div className="absolute inset-0 left-1/2 w-[1.159px] -translate-x-1/2" style={{ backgroundColor: data.candle }} />
        <div
          className="absolute left-1/2 w-[4.635px] -translate-x-1/2"
          style={{ backgroundColor: data.candle, top: "15.5%", bottom: "16%" }}
        />
      </div>
      <Column cells={data.cells} values={data.values} delay={delay} />
    </div>
  );
}
