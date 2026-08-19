"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OnboardingCanvas } from "./OnboardingCanvas";
import { OnboardingToolbar, type ToolbarActiveIcon } from "./OnboardingToolbar";
import { Act1CoinIntro, ACT1_DURATION } from "./acts/Act1CoinIntro";
import { Act4InstantAnswers, ACT4_DURATION } from "./acts/Act4InstantAnswers";
import { Act5Research, ACT5_DURATION } from "./acts/Act5Research";
import { Act5bBuildBacktest, ACT5B_DURATION } from "./acts/Act5bBuildBacktest";
import { Act6SaveStrategy, ACT6_DURATION } from "./acts/Act6SaveStrategy";
import { Act6bPaperTrade, ACT6B_DURATION } from "./acts/Act6bPaperTrade";
import { Act7Discoveries, ACT7_DURATION } from "./acts/Act7Discoveries";
import { Act7bDejaVu, ACT7B_DURATION } from "./acts/Act7bDejaVu";
import { Act8CloseHeadline, ACT8_DURATION } from "./acts/Act8CloseHeadline";
import { Act9LogoOutro, ACT9_DURATION } from "./acts/Act9LogoOutro";

// Ordered exactly as the 19 frames read left-to-right / top-to-bottom in the
// Figma storyboard (node 2999:49633) — this is also the correct story order.
// Phase 2: every screen is now an animated "Act" that lands on the exact
// pixel-verified static end-state its source Screen*.tsx file describes —
// see each Act's own file header for which Figma node(s)/screens it covers.
//
// Per the user's request, this plays as one continuous, chrome-free auto-
// looping video — no manual controls — with a fast-paced but *complete*
// rhythm: every act now plays to its own real, exported completion time
// (ACT*_DURATION, computed from that act's own timing chain, in seconds —
// not an arbitrary shared number) before the sequencer cuts to the next
// one. "Fast paced" comes entirely from each act's own internal
// choreography having been tightened (shorter char-delays, gaps, and
// animation durations throughout every act file), not from truncating any
// act's animation early — per the user's explicit correction that cutting
// away before an act finished was the actual problem, not the pacing
// approach itself.
//
// The card frame itself (OnboardingCanvas — the persistent rounded
// background/border/ambient-glow "TV frame" every act's content sits
// inside) is mounted once here, outside the AnimatePresence boundary below,
// and never remounts or animates when the sequencer cuts between acts —
// only the inner content swaps. That's also per the user's explicit
// correction: the canvas is fixed set-dressing, not part of the video
// content, so it must never itself fade/scale/blur along with whatever's
// playing inside it.
// `toolbarIndex` is which of the 6 nav icons this act marks active, or
// `null` for the 4 acts (intro, instant-answers, closing headline, logo
// outro) whose real Figma frames never show this toolbar at all. Per the
// user's explicit correction, the toolbar is no longer rendered by each
// act individually — it's a single persistent element (below) that only
// this index changes, so its highlighted pill can glide between icons
// instead of dissolving; it fades in/out only at the two edges of this
// list where `toolbarIndex` flips between a number and `null`.
const SCREENS = [
  { Component: Act1CoinIntro, durationSec: ACT1_DURATION, toolbarIndex: null },
  { Component: Act4InstantAnswers, durationSec: ACT4_DURATION, toolbarIndex: null },
  { Component: Act5Research, durationSec: ACT5_DURATION, toolbarIndex: 0 },
  { Component: Act5bBuildBacktest, durationSec: ACT5B_DURATION, toolbarIndex: 1 },
  { Component: Act6SaveStrategy, durationSec: ACT6_DURATION, toolbarIndex: 2 },
  { Component: Act6bPaperTrade, durationSec: ACT6B_DURATION, toolbarIndex: 3 },
  { Component: Act7Discoveries, durationSec: ACT7_DURATION, toolbarIndex: 4 },
  { Component: Act7bDejaVu, durationSec: ACT7B_DURATION, toolbarIndex: 5 },
  { Component: Act8CloseHeadline, durationSec: ACT8_DURATION, toolbarIndex: null },
  { Component: Act9LogoOutro, durationSec: ACT9_DURATION, toolbarIndex: null },
] as const;

// Fixed on-screen geometry for the persistent toolbar — scale and vertical
// position chosen as a middle ground across the 6 acts' own former (now-
// removed) per-act toolbar placements, so it never overlaps any act's
// headline above or its content below (each of those 6 acts' own graphic
// region was nudged up/down by a few px to line up with this exact spot —
// see the comment at each act's graphic-region wrapper). Horizontally
// centered; scale keeps it legible without dominating the card.
const TOOLBAR_SCALE = 1.35;
const TOOLBAR_TOP = 270;

// The one consistent, snappy "cut" grammar applied between every single
// act, no matter what's on either side of it — same duration, same easing,
// same opacity/blur shape every time. Repeating the exact same transition
// is what makes it register as a designed pattern rather than a generic
// fade. Only opacity/blur (no scale) on the inner content now that it's
// contained within the fixed canvas, so the cut reads as clean rather than
// "zooming" inside a frame that isn't moving.
const TRANSITION_DURATION = 0.4;
const TRANSITION_EASE = [0.4, 0, 0.2, 1] as const;

// Renders just the fixed 678x829 canvas + its looping content — no outer
// full-page wrapper — so it can be embedded at whatever position a page
// needs (e.g. centered on its own for the /onboarding preview route, or
// positioned inside the login/signup screens per their own Figma layout,
// which places this exact canvas on the left at (42, 37.82) next to the
// auth form).
export function OnboardingScreens() {
  const [index, setIndex] = useState(0);
  const total = SCREENS.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, SCREENS[index].durationSec * 1000);
    return () => clearTimeout(timer);
  }, [index, total]);

  const CurrentScreen = SCREENS[index].Component;
  const toolbarIndex = SCREENS[index].toolbarIndex;

  return (
    <OnboardingCanvas>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: TRANSITION_DURATION, ease: TRANSITION_EASE }}
        >
          <CurrentScreen />
        </motion.div>
      </AnimatePresence>

      {/* Persistent nav toolbar — a single instance that stays mounted
          across every QuantLab act-to-act cut (Research through DejaVu);
          only `activeIndex` changes, which is what lets the highlighted
          pill glide smoothly to the new icon (see OnboardingToolbar's own
          layoutId) instead of dissolving. It only unmounts/fades at the
          two edges where the sequence enters or leaves that range. */}
      <AnimatePresence>
        {toolbarIndex !== null && (
          <div
            key="toolbar"
            className="-translate-x-1/2 absolute left-1/2 w-[357px]"
            style={{ top: TOOLBAR_TOP, transform: `scale(${TOOLBAR_SCALE})`, transformOrigin: "50% 0%" }}
          >
            <OnboardingToolbar activeIndex={toolbarIndex} delay={0} duration={0.3} />
          </div>
        )}
      </AnimatePresence>
    </OnboardingCanvas>
  );
}
