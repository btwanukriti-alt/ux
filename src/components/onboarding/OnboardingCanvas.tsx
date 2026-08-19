import type { ReactNode } from "react";

// The persistent "TV frame" every act renders its content inside — the
// outer rounded card, its border/backdrop-blur, and the ambient bg-glow
// image. Per the user's explicit correction, this frame is a fixed canvas,
// not part of the video content: it must never itself animate, fade, or
// re-render when the sequencer swaps from one act to the next — only what
// is passed as `children` (each act's inner content) transitions. Every
// act used to render an identical copy of this exact markup as its own
// outer wrapper (confirmed byte-for-byte across all 10 acts, modulo ~1px
// of Figma-export rounding noise on the bg-glow layer's position, which is
// imperceptible and now standardized to one value here); this component
// replaces all of those copies with the single instance the sequencer
// mounts once and never unmounts.
export function OnboardingCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="backdrop-blur-[50.31px] bg-[rgba(0,21,139,0)] border border-[rgba(128,197,255,0.05)] border-solid overflow-clip relative rounded-[18.809px] shrink-0 w-[678px] h-[829px]">
      <div className="absolute h-[829px] left-[-1.03px] top-[0.67px] w-[678px]">
        <div className="absolute inset-[-24.19%_-49.77%_-30.84%_0]">
          <img alt="" className="block max-w-none size-full" src="/figma/onboarding/shared/bg-glow.svg" />
        </div>
      </div>
      {children}
    </div>
  );
}
