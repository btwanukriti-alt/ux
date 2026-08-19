import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="section final-cta">
      <Reveal as="div" className="section-heading">
        <span className="eyebrow">READY WHEN YOU ARE</span>
        <h2>Start defending your decisions</h2>
        <p>Jaadu 2.0 is in private beta. Join the list and we&apos;ll open your seat first.</p>
        <button className="btn btn-primary final-cta-btn">Sign Up</button>
      </Reveal>
    </section>
  );
}
