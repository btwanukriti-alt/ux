"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { HoverMosaic } from "./HoverMosaic";

// Figma "Form Hover Effect" (node 3316:307889): a dashboard-widget mosaic
// sitting at opacity 0 behind the login form, revealed only inside a soft
// cursor-following spotlight. The mask uses a multi-stop radial-gradient
// (rather than a hard-edged circle) so the edge of the reveal fades out
// instead of reading as a cookie-cutter circle. Mouse position is written
// straight to the DOM via ref (no React state) so the spotlight tracks the
// cursor with zero re-render lag.
export function SpotlightPanel({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

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
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ "--mx": "50%", "--my": "50%", "--spot-opacity": "0" } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--spot-opacity)",
          maskImage: "radial-gradient(circle 130px at var(--mx) var(--my), black 0%, black 55%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle 130px at var(--mx) var(--my), black 0%, black 55%, transparent 85%)",
        }}
      >
        <HoverMosaic />
      </div>

      {children}
    </div>
  );
}
