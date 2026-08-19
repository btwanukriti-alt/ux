import { Reveal } from "./Reveal";

const MILESTONES = [
  { year: "2020", label: "Started learning to trade", pos: "below" as const },
  { year: "2022", label: "Cleared EPAT. Went full-time into algorithmic trading", pos: "above" as const },
  { year: "2024", label: "Built the MVP. Joined Google for Startups", pos: "below" as const },
  { year: "2025", label: "Selected for NVIDIA Inception", pos: "above" as const },
  { year: "2026", label: "Product launch", pos: "below" as const, accent: true },
];

export function Timeline() {
  return (
    <section className="section timeline" id="journey">
      <Reveal as="div" className="section-heading">
        <span className="eyebrow">THE JOURNEY</span>
        <h2>From a curious trader to a launching product</h2>
        <p>Six years, five milestones, and the same question running through all of them: what actually works?</p>
      </Reveal>

      <Reveal as="div" className="timeline-rail">
        <div className="timeline-line" />
        {MILESTONES.map((m) => (
          <div className={`timeline-item timeline-item--${m.pos}`} key={m.year}>
            {m.pos === "above" ? (
              <>
                <span className="timeline-slot">
                  <span className={`timeline-pill${m.accent ? " timeline-pill--accent" : ""}`}>{m.label}</span>
                </span>
                <span className="timeline-marker" />
                <span className="timeline-slot">
                  <span className={`timeline-year${m.accent ? " timeline-year--accent" : ""}`}>{m.year}</span>
                </span>
              </>
            ) : (
              <>
                <span className="timeline-slot">
                  <span className={`timeline-year${m.accent ? " timeline-year--accent" : ""}`}>{m.year}</span>
                </span>
                <span className="timeline-marker" />
                <span className="timeline-slot">
                  <span className={`timeline-pill${m.accent ? " timeline-pill--accent" : ""}`}>{m.label}</span>
                </span>
              </>
            )}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
