"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Background } from "./Background";
import { IllustrationPanel } from "./IllustrationPanel";
import { LoginForm } from "./LoginForm";
import { SpotlightPanel } from "./SpotlightPanel";

// Figma "Landing Page — Desktop" node 3046:234479 (the frame is misnamed
// from being duplicated — it's actually the login screen). The right-hand
// panel's native size is the "Form Hover Effect" frame's own box (682x826,
// node 3316:307889) so the mosaic tiles' Figma-exact coordinates and the
// Login Form's exact offset within it (Figma-absolute x=832,y=174.88 minus
// the panel's own x=741,y=33) stay correct — it's then scaled down via CSS
// transform (rather than reflowed) to fit the login screen's target panel
// height, same technique as IllustrationPanel.
const NATIVE_WIDTH = 682;
const NATIVE_HEIGHT = 826;
const PANEL_HEIGHT = 750;
const SCALE = PANEL_HEIGHT / NATIVE_HEIGHT;

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

          <div className="relative flex items-center justify-center" style={{ width: NATIVE_WIDTH * SCALE, height: PANEL_HEIGHT }}>
            <div style={{ width: NATIVE_WIDTH, height: NATIVE_HEIGHT, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
              <SpotlightPanel>
                <div className="absolute" style={{ left: 91, top: 141.88 }}>
                  <LoginForm />
                </div>
              </SpotlightPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
