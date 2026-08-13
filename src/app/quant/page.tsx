import { LibraryCard } from "@/components/cards/quant/LibraryCard";
import { ResearchCard } from "@/components/cards/quant/ResearchCard";
import { BuildBacktestCard } from "@/components/cards/quant/BuildBacktestCard";
import { DiscoveriesCard } from "@/components/cards/quant/DiscoveriesCard";
import { PaperTradeCard } from "@/components/cards/quant/PaperTradeCard";
import { DejaVuCard } from "@/components/cards/quant/DejaVuCard";

export default function QuantPreview() {
  return (
    <div className="flex flex-1 flex-col items-center gap-10 bg-[#00022b] px-6 py-24">
      <LibraryCard />
      <ResearchCard />
      <BuildBacktestCard />
      <DiscoveriesCard />
      <PaperTradeCard />
      <DejaVuCard />
    </div>
  );
}
