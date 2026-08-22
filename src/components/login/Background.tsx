// Figma node 3046:234480 ("Background") — the full-bleed circuit-HUD wash
// behind both panels of the login page: a dark base, ~34 faint translucent
// "data block" rectangles, and 3 stacked SVG layers (rings, star field,
// circuit traces).
const DATA_BLOCKS: { x: number; y: number; w: number; h: number; a: number }[] = [
  { x: 880, y: 120, w: 100, h: 100, a: 0.02 },
  { x: 1120, y: 120, w: 200, h: 100, a: 0.02 },
  { x: 840, y: 820, w: 40, h: 80, a: 0.01 },
  { x: 1220, y: 640, w: 100, h: 100, a: 0.03 },
  { x: 400, y: 820, w: 80, h: 60, a: 0.03 },
  { x: 640, y: 200, w: 180, h: 40, a: 0.01 },
  { x: 480, y: 360, w: 100, h: 60, a: 0.03 },
  { x: 1180, y: 760, w: 180, h: 80, a: 0.03 },
  { x: 1000, y: 380, w: 100, h: 60, a: 0.02 },
  { x: 1000, y: 580, w: 120, h: 80, a: 0.03 },
  { x: 760, y: 240, w: 160, h: 100, a: 0.03 },
  { x: 80, y: 760, w: 140, h: 60, a: 0.01 },
  { x: 700, y: 740, w: 180, h: 40, a: 0.02 },
  { x: 1260, y: 500, w: 100, h: 60, a: 0.02 },
  { x: 800, y: 80, w: 160, h: 60, a: 0.03 },
  { x: 220, y: 320, w: 120, h: 60, a: 0.03 },
  { x: 400, y: 220, w: 160, h: 80, a: 0.03 },
  { x: 740, y: 320, w: 100, h: 40, a: 0.01 },
  { x: 540, y: 580, w: 40, h: 60, a: 0.02 },
  { x: 1180, y: 600, w: 80, h: 40, a: 0.03 },
  { x: 1140, y: 780, w: 80, h: 60, a: 0.03 },
  { x: 1220, y: 260, w: 160, h: 40, a: 0.01 },
  { x: 940, y: 80, w: 40, h: 100, a: 0.02 },
  { x: 100, y: 380, w: 120, h: 60, a: 0.03 },
  { x: 1120, y: 100, w: 60, h: 80, a: 0.02 },
  { x: 960, y: 380, w: 180, h: 60, a: 0.02 },
  { x: 1000, y: 220, w: 120, h: 40, a: 0.03 },
  { x: 1060, y: 240, w: 120, h: 20, a: 0.03 },
  { x: 1100, y: 460, w: 160, h: 80, a: 0.03 },
  { x: 800, y: 280, w: 100, h: 60, a: 0.02 },
  { x: 380, y: 20, w: 160, h: 40, a: 0.01 },
  { x: 1240, y: 200, w: 120, h: 100, a: 0.03 },
  { x: 860, y: 140, w: 180, h: 20, a: 0.03 },
  { x: 820, y: 560, w: 160, h: 100, a: 0.02 },
];

export function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#05070f]">
      <div className="absolute left-0 top-0 h-[1024px] w-[1440px] opacity-80">
        <div className="absolute left-0 top-0 h-[900px] w-[1440px] opacity-40">
          {DATA_BLOCKS.map((b, i) => (
            <div key={i} className="absolute bg-white" style={{ left: b.x, top: b.y, width: b.w, height: b.h, opacity: b.a }} />
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/login/bg-rings.svg" alt="" className="absolute left-0 top-0 h-[900px] w-[1440px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/login/bg-starfield.svg" alt="" className="absolute left-0 top-0 h-[900px] w-[1440px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/login/bg-circuit-traces.svg" alt="" className="absolute left-0 top-0 h-[900px] w-[1440px]" />
      </div>
    </div>
  );
}
