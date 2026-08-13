interface StaticGradientBorderProps {
  className?: string;
  angle: number;
  from: string;
  to: string;
  width?: number;
}

// Plain (non-animated) gradient stroke via the mask-composite ring technique
// — CSS `border` can't take a gradient directly. This is the resting Figma
// look; per-card animation is added separately later.
export function StaticGradientBorder({ className = "", angle, from, to, width = 1 }: StaticGradientBorderProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={{
        padding: width,
        background: `linear-gradient(${angle}deg, ${from}, ${to})`,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}
