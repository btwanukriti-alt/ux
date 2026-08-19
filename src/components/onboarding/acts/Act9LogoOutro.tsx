"use client";

import { motion } from "framer-motion";
import { GradientBorder } from "../../cards/GradientBorder";
import { DiagonalGlow } from "../../cards/DiagonalGlow";

// Act 9 — logo outro (Figma node 3004:262351 / Screen19). Power-on flicker:
// 2-3 quick opacity stutters on the logo, then holds steady, then — per the
// user's explicit follow-up correction (overriding the earlier "no extra
// glow, it would double up the baked-in background gradient" decision) —
// the pill's own border sweeps once with GradientBorder and settles into a
// subtle resting glow, and a DiagonalGlow sweeps across the whole pill,
// giving this closing beat the same finished-panel flourish every other
// act's results panel gets, rather than ending the loop on a flat static
// card.
//
// Per the user's correction: the outer card frame is now the persistent
// OnboardingCanvas the sequencer mounts once, so this returns only its
// inner content. ACT9_DURATION is exported (flicker, then both glows play
// out, since this is the storyboard's closing punctuation before it loops
// back to Act1) so the sequencer waits for this act's real completion.

const FLICKER_DURATION = 0.55;

const BORDER_SWEEP_DELAY = FLICKER_DURATION;
const BORDER_SWEEP_DURATION = 1.0;

const DIAGONAL_DELAY = FLICKER_DURATION + 0.25;
const DIAGONAL_DURATION = 1.1;

export const ACT9_DURATION = Math.max(BORDER_SWEEP_DELAY + BORDER_SWEEP_DURATION + 0.3, DIAGONAL_DELAY + DIAGONAL_DURATION) + 0.3;

export function Act9LogoOutro() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute border border-[rgba(128,197,255,0.05)] border-solid content-stretch flex h-[63px] items-center left-1/2 overflow-clip px-[22px] py-[14px] rounded-[12px] top-[calc(50%+2.5px)] w-[213px]"
      style={{
        backgroundImage:
          "linear-gradient(180.00000176954381deg, rgba(0, 117, 255, 0) 77.663%, rgba(121, 183, 255, 0.118) 100%), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 213 63' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4000000059604645'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-1.9833e-7 -0.75923 8.1689 -2.6542e-7 108.69 8.8685e-8)'><stop stop-color='rgba(130,210,255,0.6)' offset='0'/><stop stop-color='rgba(128,197,255,0.2)' offset='0.53365'/><stop stop-color='rgba(128,197,255,0)' offset='1'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 213 63' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-5.4218e-7 -2.0808 18.087 -4.2198e-7 106.5 3.3743)'><stop stop-color='rgba(48,85,227,1)' offset='0'/><stop stop-color='rgba(44,84,198,0.3)' offset='0.52469'/><stop stop-color='rgba(40,83,167,0)' offset='1'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgba(27, 27, 27, 0.05) 0%, rgba(27, 27, 27, 0.05) 100%)",
      }}
    >
      <GradientBorder
        color="128,197,255"
        duration={BORDER_SWEEP_DURATION}
        delay={BORDER_SWEEP_DELAY}
        baseOpacity={0.16}
        sweepOpacity={0.6}
        restColor="128,197,255"
        restOpacity={0.25}
      />

      <motion.div
        className="flex-[1_0_0] h-full min-w-px relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.3, 1, 0.5, 1] }}
        transition={{ duration: FLICKER_DURATION, times: [0, 0.18, 0.32, 0.5, 0.62, 1], ease: "easeOut" }}
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/figma/onboarding/19-jaadu-logo-outro/jaadu-logo-coloured.png"
        />
      </motion.div>

      <DiagonalGlow left={0} top={0} width={213} height={63} borderRadius={12} delay={DIAGONAL_DELAY} duration={DIAGONAL_DURATION} />
    </div>
  );
}
