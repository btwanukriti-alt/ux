"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, useInView } from "./Reveal";
import { LibraryCard } from "@/components/cards/quant/LibraryCard";
import { ResearchCard } from "@/components/cards/quant/ResearchCard";
import { BuildBacktestCard } from "@/components/cards/quant/BuildBacktestCard";
import { DiscoveriesCard } from "@/components/cards/quant/DiscoveriesCard";
import { PaperTradeCard } from "@/components/cards/quant/PaperTradeCard";
import { DejaVuCard } from "@/components/cards/quant/DejaVuCard";

const CYCLE_MS = 6000;

const TABS = [
  {
    key: "library",
    label: "Library",
    eyebrow: "EVERYTHING YOU'VE TESTED",
    heading: "Line them up, side by side",
    body: "Every strategy and backtest you've saved, sorted by regime and type — and any two of them set against each other, metric for metric.",
    bullets: [
      ["Compare side by side", " — drawdown, win rate, exposure"],
      ["Sorted by regime", " — Breakout, Sideways, Volatile, Reversal"],
      ["Backtest results attached", " to every strategy you save"],
    ],
    Card: LibraryCard,
  },
  {
    key: "research",
    label: "Research",
    eyebrow: "ASK, DON'T DIG",
    heading: "Research that answers back",
    body: "Ask a question in plain English. Jaadu pulls the data, runs the pipeline, and shows its work while it runs.",
    bullets: [
      ["Plain-English prompts", " — no query language to learn"],
      ["Live pipeline trace", " — fetch, shape, sandbox, render"],
      ["Results with receipts", " — every chart is reproducible"],
    ],
    Card: ResearchCard,
  },
  {
    key: "build-backtest",
    label: "Build & Backtest",
    eyebrow: "FROM IDEA TO EVIDENCE",
    heading: "Describe it. Jaadu builds it.",
    body: "Type a strategy in plain English and Jaadu turns it into a rule set, then backtests it against years of market data instantly.",
    bullets: [
      ["Natural-language rules", " — regime, price, fragility conditions"],
      ["Instant backtest", " — years of data, seconds to results"],
      ["Full results panel", " — equity curve and trade table"],
    ],
    Card: BuildBacktestCard,
  },
  {
    key: "discoveries",
    label: "Overnight Discoveries",
    eyebrow: "WHILE YOU SLEEP",
    heading: "It keeps looking after you log off",
    body: "Jaadu generates and filters hundreds of candidate strategies overnight, and only surfaces the ones that survive.",
    bullets: [
      ["642 candidates generated", ", funneled down automatically"],
      ["Filtered by regime, robustness, and cost", ""],
      ["Only the survivors", " land in your inbox"],
    ],
    Card: DiscoveriesCard,
  },
  {
    key: "paper-trade",
    label: "Paper Trade",
    eyebrow: "PROVE IT FIRST",
    heading: "Paper trade before you risk a cent",
    body: "Every strategy runs live on paper first, checked against a full veto checklist before it ever sees real capital.",
    bullets: [
      ["Live simulated fills", " — real market data, no real risk"],
      ["13 veto checks", " per trade before it counts"],
      ["Win rate & P&L", " tracked from day one"],
    ],
    Card: PaperTradeCard,
  },
  {
    key: "deja-vu",
    label: "Déjà Vu",
    eyebrow: "SEEN THIS BEFORE?",
    heading: "Find the look-alikes in market history",
    body: "Jaadu scans years of market history for setups that resemble right now, and shows you what happened next.",
    bullets: [
      ["Pattern match", " across regime, timeframe, and asset"],
      ["Historical outcomes", " ranked by similarity"],
      ["Outcome histogram", " — see the full distribution"],
    ],
    Card: DejaVuCard,
  },
];

export function QuantLab() {
  const { ref: panelRef, inView } = useInView<HTMLDivElement>(0.2);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [activated, setActivated] = useState<Set<string>>(new Set());
  const [cycleKey, setCycleKey] = useState(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kick off once the panel scrolls into view (matches vanilla runOnceInView behavior).
  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      setActivated((prev) => new Set(prev).add(TABS[0].key));
    }
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;
    function scheduleNext() {
      timerRef.current = setTimeout(() => {
        if (!pausedRef.current) {
          setCurrent((c) => {
            const next = (c + 1) % TABS.length;
            setActivated((prev) => new Set(prev).add(TABS[next].key));
            setCycleKey((k) => k + 1);
            return next;
          });
        }
        scheduleNext();
      }, CYCLE_MS);
    }
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started]);

  function selectTab(i: number) {
    setCurrent(i);
    setActivated((prev) => new Set(prev).add(TABS[i].key));
    setCycleKey((k) => k + 1);
  }

  return (
    <section className="section quant-lab" id="quant-lab">
      <Reveal as="div" className="section-heading">
        <span className="eyebrow">QUANT LAB</span>
        <h2>Research that runs while you sleep</h2>
        <p>
          Describe a strategy in plain English. Jaadu builds it, backtests it against years of data, and keeps
          searching after you log off.
        </p>
      </Reveal>

      <Reveal as="div" className="feature-panel" id="feature-panel">
        <div ref={panelRef}>
          <div className="feature-tabs" role="tablist" id="feature-tabs" onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)}>
            {TABS.map((tab, i) => {
              const active = i === current && started;
              return (
                <button
                  key={tab.key}
                  className={`feature-tab${active ? " active" : ""}`}
                  data-tab={tab.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectTab(i)}
                >
                  <span>{tab.label}</span>
                  {active ? (
                    <i
                      key={cycleKey}
                      className="tab-underline"
                      style={{ animation: `jaaduQuantTabUnderline ${CYCLE_MS}ms linear forwards` }}
                    />
                  ) : (
                    <i className="tab-underline" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="feature-panels" id="feature-panels">
            {TABS.map((tab, i) => {
              const active = i === current && started;
              const Card = tab.Card;
              return (
                <div key={tab.key} className={`feature-panel-content${active ? " active" : ""}`} data-panel={tab.key}>
                  <div className="feature-copy">
                    <span className="feature-eyebrow">{tab.eyebrow}</span>
                    <h3>{tab.heading}</h3>
                    <p>{tab.body}</p>
                    <ul className="feature-bullets">
                      {tab.bullets.map(([b, rest], bi) => (
                        <li key={bi}>
                          <b>{b}</b>
                          {rest}
                        </li>
                      ))}
                    </ul>
                    <button className="btn btn-white">Try Jaadu 2.0</button>
                  </div>
                  <div className="quant-card-slot">{activated.has(tab.key) ? <Card /> : null}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
