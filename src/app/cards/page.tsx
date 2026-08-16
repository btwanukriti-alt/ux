import { ReadMarketCard } from "@/components/cards/ReadMarketCard";
import { Card2 } from "@/components/cards/Card2";
import { Card3 } from "@/components/cards/Card3";
import { Card4 } from "@/components/cards/Card4";
import { Card5 } from "@/components/cards/Card5";
import { Card6 } from "@/components/cards/Card6";

export default function CardsPreview() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#0a0b1a] px-6 py-24">
      <div className="grid grid-cols-3 gap-6">
        <ReadMarketCard />
        <Card2 />
        <Card3 />
        <Card4 />
        <Card5 />
        <Card6 />
      </div>
    </div>
  );
}
