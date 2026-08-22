import { OnboardingScreens } from "@/components/onboarding/OnboardingScreens";

// Figma frame "3" (node 3046:234947, 678x828): the login screen's left
// illustration panel. Its content is the real, live OnboardingScreens
// looping storyboard — the same self-contained 678x829 "TV frame"
// component AuthScreen.tsx uses for /login and /signup elsewhere in this
// repo. OnboardingScreens is fixed-size internally, so it's scaled down
// via CSS transform (rather than reflowed) to fit the login screen's
// target panel height.
const NATIVE_WIDTH = 678;
const NATIVE_HEIGHT = 829;
const PANEL_HEIGHT = 750;
const SCALE = PANEL_HEIGHT / NATIVE_HEIGHT;

export function IllustrationPanel() {
  return (
    <div
      className="relative hidden shrink-0 self-center lg:block"
      style={{ width: NATIVE_WIDTH * SCALE, height: PANEL_HEIGHT }}
    >
      <div style={{ width: NATIVE_WIDTH, height: NATIVE_HEIGHT, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <OnboardingScreens />
      </div>
    </div>
  );
}
