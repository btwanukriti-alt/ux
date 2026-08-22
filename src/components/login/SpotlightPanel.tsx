"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { HoverMosaic } from "./HoverMosaic";

const MOSAIC_NATIVE_WIDTH = 682;
const MOSAIC_NATIVE_HEIGHT = 826;

// Figma "Form Hover Effect" (node 3316:307889): a dashboard-widget mosaic
// sitting at opacity 0 behind the login form, revealed only inside a soft
// cursor-following spotlight. The mask uses a multi-stop radial-gradient
// (rather than a hard-edged circle) so the edge of the reveal fades out
// instead of reading as a cookie-cutter circle. Mouse position is written
// straight to the DOM via ref (no React state) so the spotlight tracks the
// cursor with zero re-render lag.
//
// Per the user's request, this panel keeps the mosaic's native 682px
// width fixed and only compresses its height to fit `height` (vertical
// scale only, not uniform) — the mosaic is the thing being resized, not
// the form: `children` (the login form) is centered on top at its own
// natural size, untouched by that scale.
export function SpotlightPanel({ height, children }: { height: number; children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scaleY = height / MOSAIC_NATIVE_HEIGHT;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    panelRef.current!.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    panelRef.current!.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => panelRef.current?.style.setProperty("--spot-opacity", "1")}
      onMouseLeave={() => panelRef.current?.style.setProperty("--spot-opacity", "0")}
      className="relative overflow-hidden"
      style={{ width: MOSAIC_NATIVE_WIDTH, height, "--mx": "50%", "--my": "50%", "--spot-opacity": "0" } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--spot-opacity)",
          maskImage: "radial-gradient(circle 130px at var(--mx) var(--my), black 0%, black 55%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle 130px at var(--mx) var(--my), black 0%, black 55%, transparent 85%)",
        }}
      >
        <div style={{ width: MOSAIC_NATIVE_WIDTH, height: MOSAIC_NATIVE_HEIGHT, transform: `scaleY(${scaleY})`, transformOrigin: "top left" }}>
          <HoverMosaic />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
