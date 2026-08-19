import { Reveal, LazyMount } from "./Reveal";
import { ReadMarketCard } from "@/components/cards/ReadMarketCard";
import { Card2 } from "@/components/cards/Card2";
import { Card3 } from "@/components/cards/Card3";
import { Card4 } from "@/components/cards/Card4";
import { Card5 } from "@/components/cards/Card5";
import { Card6 } from "@/components/cards/Card6";

const CARDS = [
  { id: "card-read-market", Card: ReadMarketCard },
  { id: "card-inside-candle", Card: Card2 },
  { id: "card-never-miss-it", Card: Card3 },
  { id: "card-answers-update", Card: Card4 },
  { id: "card-journal", Card: Card5 },
  { id: "card-describe-test-repeat", Card: Card6 },
];

export function Features() {
  return (
    <section className="section features" id="features">
      <Reveal as="div" className="section-heading">
        <span className="eyebrow">INSIDE THE TERMINAL</span>
        <h2>Six tools that never leave the screen</h2>
        <p>
          Zoom out to the whole market or into a single candle. Set a watch, log a trade, ask a question — without
          ever leaving the canvas.
        </p>
      </Reveal>

      <div className="feature-grid">
        {CARDS.map(({ id, Card }) => (
          <Reveal as="article" key={id} id={id} className="feature-card-slot" threshold={0.25}>
            <LazyMount threshold={0.25}>
              <Card />
            </LazyMount>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
