"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Background } from "./Background";
import { IllustrationPanel } from "./IllustrationPanel";
import { LoginForm } from "./LoginForm";
import { SpotlightPanel } from "./SpotlightPanel";

// Figma "Landing Page — Desktop" node 3046:234479 (the frame is misnamed
// from being duplicated — it's actually the login screen). The right-hand
// panel keeps the mosaic's native 682px width fixed (SpotlightPanel only
// compresses its height to PANEL_HEIGHT) and centers the login form on
// top of it at natural size, per the user's explicit request.
const PANEL_HEIGHT = 750;

// The (illustration + gap + form) group has a fixed natural width. On a
// viewport narrower than that, it used to just overflow the centered
// flex row and get clipped equally on both sides by the viewport edge —
// this measures the available space live and scales the whole group down
// to fit inside it (never up), so nothing goes off-screen.
export function LoginScreen() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    function recompute() {
      if (!viewport || !content) return;
      const scaleX = viewport.clientWidth / content.offsetWidth;
      const scaleY = viewport.clientHeight / content.offsetHeight;
      setFitScale(Math.min(scaleX, scaleY, 1));
    }

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <Background />

      <div ref={viewportRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden p-4">
        <div
          ref={contentRef}
          className="relative flex items-stretch gap-10"
          style={{ transform: `scale(${fitScale})` }}
        >
          <IllustrationPanel />

          <SpotlightPanel height={PANEL_HEIGHT}>
            <LoginForm />
          </SpotlightPanel>
        </div>
      </div>
    </div>
  );
}
