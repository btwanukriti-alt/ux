import { CircuitBackground } from "./CircuitBackground";

export function PageBackground() {
  return (
    <div className="page-bg" aria-hidden="true">
      <CircuitBackground />
      <div className="bg-rings" />
      <div className="bg-starfield" />
      <img src="/assets/icons/dot-grid.svg" alt="" className="bg-dot-grid bg-dot-grid--left" />
      <img src="/assets/icons/dot-grid.svg" alt="" className="bg-dot-grid bg-dot-grid--right" />
      <div className="bg-hud-frame" />
    </div>
  );
}
