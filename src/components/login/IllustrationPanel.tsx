import { OnboardingScreens } from "@/components/onboarding/OnboardingScreens";

// Figma frame "3" (node 3046:234947, 678x828): the login screen's left
// illustration panel. Its content is the real, live OnboardingScreens
// looping storyboard — the same self-contained 678x829 "TV frame"
// component AuthScreen.tsx uses for /login and /signup elsewhere in this
// repo.
export function IllustrationPanel() {
  return (
    <div className="relative hidden h-[829px] w-[678px] shrink-0 self-center lg:block">
      <OnboardingScreens />
    </div>
  );
}
