import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-title">
        <span className="hero-pill">INTRODUCING JAADU 2.0</span>
        <h1>The intelligence layer behind smarter trading decisions.</h1>
        <p className="hero-subhead">
          Professional-grade charting, AI research, and around-the-clock monitoring in one terminal — so every
          decision you make is one you can defend.
        </p>
        <button className="btn btn-primary hero-cta">Sign Up</button>
      </div>

      <HeroDashboard />
    </section>
  );
}
