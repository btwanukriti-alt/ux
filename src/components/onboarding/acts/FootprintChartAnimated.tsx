"use client";

import { motion } from "framer-motion";

// Footprint/heatmap markup harvested verbatim from
// Screen05DrillIntoOrdersFootprint.tsx (Figma node 2999:51827's chart box,
// 5 "Footprint" column groups). Per the user's description of how this
// actually works: each group grows outward (scaleX, not a uniform scale)
// from a transform-origin matched to the real candle it corresponds to
// (see HIGHLIGHT_IDS in CandleChartAnimated) — that candle keeps rendering,
// unmoved, right where these cells fan out from, so it reads as "the
// footprint is the breakdown of that candle" rather than an unrelated
// shape dissolving in. All 5 groups animate together, no stagger.
export function FootprintChartAnimated({ startDelay }: { startDelay: number }) {
  const FOOTPRINT_START = startDelay;
  const FOOTPRINT_GROUP_DURATION = 0.35; // must match Act1CoinIntro's own constant

  return (
    <div className="bg-[rgba(0,4,40,0.29)] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px overflow-clip relative w-full">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
<motion.div className="col-1 content-stretch flex gap-[18.779px] h-[149.945px] items-center ml-[236.94px] mt-0 relative row-1 w-[70.966px]" data-node-id="2999:52581" data-name="Footprint" style={{ transformOrigin: `52.5% 50%` }} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: FOOTPRINT_GROUP_DURATION, delay: FOOTPRINT_START, ease: "easeOut" }}>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start right-0 top-0 w-[32.3px]" data-node-id="I2999:52581;988:29540">
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29543" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29543;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29544" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29544;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29545" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29545;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29546" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29546;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f2ab4e] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29547" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29547;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#628af8] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29548" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29548;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29549" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29549;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29550" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29550;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29551" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29551;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29552" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29552;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 top-0" data-node-id="I2999:52581;988:29553">
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29556" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29556;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29557" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29557;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29558" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29558;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29559" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29559;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f2ab4e] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29560" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29560;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#628af8] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29561" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29561;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29562" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29562;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29563" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29563;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29564" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29564;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52581;988:29565" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52581;988:29565;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="-translate-x-1/2 absolute bottom-[-3px] content-stretch flex items-center justify-center left-[calc(50%+0.38px)] overflow-clip top-[3px] w-[7.512px]" data-node-id="I2999:52581;988:29566" data-name="Candle">
                    <div className="-translate-x-1/2 absolute bg-[#ff5971] bottom-[24.04px] left-1/2 top-[23.29px] w-[6.009px]" data-node-id="I2999:52581;988:29566;958:9581" data-name="candle" />
                    <div className="-translate-x-1/2 absolute bg-[#ff5971] bottom-0 left-1/2 top-0 w-[1.502px]" data-node-id="I2999:52581;988:29566;958:9580" data-name="wick" />
                  </div>
                </motion.div>
                
<motion.div className="col-1 content-stretch flex gap-[18.779px] h-[136.209px] items-center ml-[78.98px] mt-[2.29px] relative row-1 w-[70.966px]" data-node-id="2999:52582" data-name="Footprint" style={{ transformOrigin: `45.7% 50%` }} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: FOOTPRINT_GROUP_DURATION, delay: FOOTPRINT_START, ease: "easeOut" }}>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start right-0 top-0 w-[32.3px]" data-node-id="I2999:52582;988:29540">
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29541" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29541;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f74560] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29542" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29542;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29543" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29543;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29544" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29544;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29545" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29545;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29546" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29546;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29547" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29547;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29548" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29548;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29549" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29549;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 top-0" data-node-id="I2999:52582;988:29553">
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29554" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29554;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f74560] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29555" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29555;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29556" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29556;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29557" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29557;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29558" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29558;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29559" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29559;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29560" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29560;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29561" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29561;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52582;988:29562" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52582;988:29562;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="-translate-x-1/2 absolute bottom-[-3px] content-stretch flex items-center justify-center left-[calc(50%+0.38px)] overflow-clip top-[3px] w-[7.512px]" data-node-id="I2999:52582;988:29566" data-name="Candle">
                    <div className="-translate-x-1/2 absolute bg-[#ff5971] bottom-[24.04px] left-1/2 top-[23.29px] w-[6.009px]" data-node-id="I2999:52582;988:29566;958:9581" data-name="candle" />
                    <div className="-translate-x-1/2 absolute bg-[#ff5971] bottom-0 left-1/2 top-0 w-[1.502px]" data-node-id="I2999:52582;988:29566;958:9580" data-name="wick" />
                  </div>
                </motion.div>
                
<motion.div className="col-1 content-stretch flex gap-[18.779px] h-[89.28px] items-center ml-0 mt-[66.39px] relative row-1 w-[70.966px]" data-node-id="2999:52583" data-name="Footprint" style={{ transformOrigin: `48.3% 50%` }} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: FOOTPRINT_GROUP_DURATION, delay: FOOTPRINT_START, ease: "easeOut" }}>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start right-0 top-0 w-[32.3px]" data-node-id="I2999:52583;988:29540">
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29544" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29544;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29545" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29545;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29546" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29546;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29547" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29547;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29548" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29548;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29549" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29549;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 top-0" data-node-id="I2999:52583;988:29553">
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29557" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29557;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29558" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29558;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29559" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29559;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29560" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29560;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#345dcd] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29561" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29561;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52583;988:29562" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52583;988:29562;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="-translate-x-1/2 absolute bottom-[-3px] content-stretch flex items-center justify-center left-[calc(50%+0.38px)] overflow-clip top-[3px] w-[7.512px]" data-node-id="I2999:52583;988:29566" data-name="Candle">
                    <div className="-translate-x-1/2 absolute bg-[#45ffb5] bottom-[24.04px] left-1/2 top-[23.29px] w-[6.009px]" data-node-id="I2999:52583;988:29566;958:9581" data-name="candle" />
                    <div className="-translate-x-1/2 absolute bg-[#45ffb5] bottom-0 left-1/2 top-0 w-[1.502px]" data-node-id="I2999:52583;988:29566;958:9580" data-name="wick" />
                  </div>
                </motion.div>
                
<motion.div className="col-1 content-stretch flex gap-[18.779px] h-[89.28px] items-center ml-[315.92px] mt-[104.16px] relative row-1 w-[70.966px]" data-node-id="2999:52584" data-name="Footprint" style={{ transformOrigin: `49.9% 50%` }} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: FOOTPRINT_GROUP_DURATION, delay: FOOTPRINT_START, ease: "easeOut" }}>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start right-0 top-0 w-[32.3px]" data-node-id="I2999:52584;988:29540">
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29544" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29544;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f74560] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29545" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29545;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29546" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29546;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f74560] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29547" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29547;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29548" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29548;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f2ab4e] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29549" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29549;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 top-0" data-node-id="I2999:52584;988:29553">
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29557" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29557;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f74560] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29558" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29558;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#7f1c2b] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29559" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29559;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f74560] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29560" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29560;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#c91e37] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29561" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29561;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f2ab4e] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52584;988:29562" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52584;988:29562;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="-translate-x-1/2 absolute bottom-[-3px] content-stretch flex items-center justify-center left-[calc(50%+0.38px)] overflow-clip top-[3px] w-[7.512px]" data-node-id="I2999:52584;988:29566" data-name="Candle">
                    <div className="-translate-x-1/2 absolute bg-[#ff5971] bottom-[24.04px] left-1/2 top-[23.29px] w-[6.009px]" data-node-id="I2999:52584;988:29566;958:9581" data-name="candle" />
                    <div className="-translate-x-1/2 absolute bg-[#ff5971] bottom-0 left-1/2 top-0 w-[1.502px]" data-node-id="I2999:52584;988:29566;958:9580" data-name="wick" />
                  </div>
                </motion.div>
                
<motion.div className="col-1 content-stretch flex gap-[18.779px] h-[89.28px] items-center ml-[157.96px] mt-[95px] relative row-1 w-[70.966px]" data-node-id="2999:52585" data-name="Footprint" style={{ transformOrigin: `55.2% 50%` }} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: FOOTPRINT_GROUP_DURATION, delay: FOOTPRINT_START, ease: "easeOut" }}>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start right-0 top-0 w-[32.3px]" data-node-id="I2999:52585;988:29540">
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29544" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29544;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29545" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29545;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#628af8] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29546" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29546;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f2ab4e] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29547" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29547;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#628af8] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29548" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29548;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29549" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29549;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 top-0" data-node-id="I2999:52585;988:29553">
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29557" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29557;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29558" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29558;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#628af8] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29559" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29559;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#f2ab4e] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29560" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29560;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#628af8] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29561" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29561;940:12347">
                        594.5k
                      </p>
                    </div>
                    <div className="bg-[#042888] border-[0.376px] border-[rgba(255,89,113,0.1)] border-solid content-stretch flex h-[15.023px] items-center justify-center opacity-90 overflow-clip p-[3.005px] relative shrink-0" data-node-id="I2999:52585;988:29562" data-name="Cell">
                      <p className="[word-break:break-word] font-semibold leading-[9.014px] relative shrink-0 text-[7.51px] text-[color:#f1f6ff] text-center whitespace-nowrap" data-node-id="I2999:52585;988:29562;940:12347">
                        594.5k
                      </p>
                    </div>
                  </div>
                  <div className="-translate-x-1/2 absolute bottom-[-3px] content-stretch flex items-center justify-center left-[calc(50%+0.38px)] overflow-clip top-[3px] w-[7.512px]" data-node-id="I2999:52585;988:29566" data-name="Candle">
                    <div className="-translate-x-1/2 absolute bg-[#45ffb5] bottom-[24.04px] left-1/2 top-[23.29px] w-[6.009px]" data-node-id="I2999:52585;988:29566;958:9581" data-name="candle" />
                    <div className="-translate-x-1/2 absolute bg-[#45ffb5] bottom-0 left-1/2 top-0 w-[1.502px]" data-node-id="I2999:52585;988:29566;958:9580" data-name="wick" />
                  </div>
                </motion.div>
      </div>
    </div>
  );
}
