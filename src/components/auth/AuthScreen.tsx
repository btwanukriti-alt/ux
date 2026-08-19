import type { ReactNode } from "react";
import { OnboardingScreens } from "../onboarding/OnboardingScreens";

// Shared layout for the login and signup screens — Figma nodes 2742:268894
// (login) and 2928:280852 (signup), both named "Landing Page — Desktop",
// each a 1440x900 frame with exactly two children: the onboarding canvas
// at (42, 37.82) and the auth form at (890, formTop). Per the user's
// explicit request, the canvas here is the real, live OnboardingScreens
// loop (not the single static frame Figma shows) placed at that same
// position/size — Figma's own canvas placeholder is 678x828 against our
// OnboardingCanvas's 678x829, close enough to be pixel-identical.
export function AuthScreen({ formTop, children }: { formTop: number; children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#00022b] py-10">
      <div className="relative h-[900px] w-[1440px] shrink-0">
        <div className="absolute left-[42px] top-[37.82px]">
          <OnboardingScreens />
        </div>
        <div className="absolute left-[890px]" style={{ top: formTop }}>
          {children}
        </div>
      </div>
    </div>
  );
}
