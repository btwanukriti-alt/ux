"use client";

import { motion } from "framer-motion";

// Shared nav toolbar used at the top of every onboarding act's graphic
// region (Screens 09-17). Previously each act hand-copied this markup from
// its own Figma export, and each export only wrapped icons *up to and
// including* that screen's own "active" icon in the padded button box
// (icons after the active one were left as bare, unpadded glyphs) — e.g.
// Screen09 pads just icon 0, Screen10 pads icons 0-1, Screen11 pads icons
// 0-2, and so on. That's a literal, faithful copy of the raw Figma export,
// but it means the *visual* gap between icon glyphs was uneven within a
// single toolbar (a padded box's glyph sits inset from its own box edge, a
// bare icon's doesn't), and the outer gap value changed screen to screen
// (40px/36px/34px) to keep the row's total width fixed at 357px as the
// padded-icon count grew. Per the user's explicit correction ("equal gaps
// ... icons properly sized"), every icon here is now uniformly wrapped in
// the same padded button box regardless of position, and a single gap
// value (32px) is used everywhere — computed the same way Figma's own
// auto-layout would, so the row still fills exactly 357px when every icon
// carries the same padding. Act5Research's toolbar was additionally
// missing the outer backdrop-blur/border entirely (present on every other
// screen's real export) — also corrected here since all screens now share
// this one component.
const ICONS: { src: string; inset: string; innerInset?: string }[] = [
  { src: "icon-ai-search.svg", inset: "10.42% 12.06% 12.06% 12.5%", innerInset: "-19.22% -10.88% -10.59% -7.69%" },
  { src: "icon-stack.svg", inset: "9.38% 1.54% 12.5% 1.53%" },
  { src: "icon-library.svg", inset: "12.5% 6.25%" },
  { src: "icon-finance-mode.svg", inset: "8.33% 8.33% 12.29% 12.5%" },
  { src: "icon-bulb.svg", inset: "8.33% 16.67% 0.77% 16.67%" },
  { src: "icon-history.svg", inset: "12.5%", innerInset: "-6.25%" },
];

const OUTER_BG =
  "linear-gradient(180.00000078495196deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 357 46.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-3.3242e-7 -0.56447 13.691 -1.9733e-7 182.18 6.5936e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 357 46.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-9.0872e-7 -1.5471 30.314 -3.1373e-7 178.5 2.5088)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)";

const ACTIVE_BG =
  "linear-gradient(180.0000059827434deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 29.839 29.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-2.7785e-8 -0.3596 1.1444 -1.2571e-7 15.227 4.2005e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 29.839 29.839' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-7.5954e-8 -0.98557 2.5338 -1.9987e-7 14.92 1.5982)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)";

// Index into ICONS for each screen's real "you are here" tab: Research(0),
// Build & Backtest(1), Save Strategy/Library(2), Paper Trade(3),
// Discoveries(4), Deja Vu(5) — taken from which icon Screen09/10/11/15/16/17
// each mark active in their own Figma export.
export type ToolbarActiveIcon = 0 | 1 | 2 | 3 | 4 | 5;

// Per the user's explicit request: when the active QuantLab feature changes
// (moving between acts), the highlighted pill must not dissolve out on the
// old icon and fade in fresh on the new one — it should visibly glide from
// the old icon's position to the new one, while every icon glyph and the
// toolbar's own frame stay completely still. That requires this component
// to persist continuously across act transitions (see OnboardingScreens.tsx,
// which now renders exactly one instance of this, outside the per-act
// content that crossfades) and for the pill itself to be ONE shared
// `motion.div` with a stable `layoutId`, rendered inside whichever icon's
// slot is currently active — Framer Motion tracks that layoutId across the
// unmount/remount as `activeIndex` changes and animates its bounding box
// (position + size) smoothly between the two icons' slots, rather than
// crossfading two unrelated elements.
export function OnboardingToolbar({ delay = 0, duration = 0.35, activeIndex }: { delay?: number; duration?: number; activeIndex: ToolbarActiveIcon }) {
  return (
    <motion.div
      className="absolute backdrop-blur-[4px] border-[0.5px] border-[#4c6aa5] border-solid content-stretch flex gap-[32px] items-center left-[5.56px] px-[12px] py-[8px] rounded-[10px] top-0 w-[357px]"
      style={{ backgroundImage: OUTER_BG }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {ICONS.map((icon, i) => {
        const active = i === activeIndex;
        return (
          <div key={icon.src} className="content-stretch flex items-center p-[5px] relative rounded-[8px] shrink-0">
            {active && (
              <motion.div
                layoutId="toolbar-active-highlight"
                className="absolute inset-0 rounded-[8px] border-[0.5px] border-[#4c6aa5] border-solid"
                style={{ backgroundImage: ACTIVE_BG }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            <div className="relative shrink-0 size-[18.839px]">
              <div className="absolute" style={{ inset: icon.inset }}>
                {icon.innerInset ? (
                  <div className="absolute" style={{ inset: icon.innerInset }}>
                    <img alt="" className="block max-w-none size-full" src={`/figma/onboarding/shared/${icon.src}`} />
                  </div>
                ) : (
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={`/figma/onboarding/shared/${icon.src}`} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
