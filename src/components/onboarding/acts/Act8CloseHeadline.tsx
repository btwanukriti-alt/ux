"use client";

import { motion } from "framer-motion";
import { TypedText } from "../../cards/TypedText";

// Act 8 — closing headline (Figma node 2999:56881 / Screen18). Simplest
// beat in the whole storyboard: just the headline, typed in exactly like
// every other headline in this project, then it holds — no graphic, no
// chart, nothing else to sequence.
//
// Per the user's correction: the outer card frame (background/border/blur/
// glow) is no longer rendered per-act — it's the persistent OnboardingCanvas
// the sequencer mounts once, so this component now returns only its inner
// content. ACT8_DURATION is exported so the sequencer waits for this act's
// own real completion — no more, no less — before cutting to the next act.
//
// Unlike every other act in this storyboard, this one is deliberately slow
// and unhurried rather than fast-paced, per the user's explicit correction:
// this is the closing line right before the logo outro, so it should read
// as a measured, deliberate statement — not another quick beat in the same
// rhythm as the QuantLab acts.

const HEADLINE_LINE1 = "Everything you need to trade, ";
const HEADLINE_LINE2 = "in one platform";
const CHAR_DELAY = 0.05;
const START_DELAY = 0.4;
const HOLD_AFTER_TYPED = 1.3;

export const ACT8_DURATION = START_DELAY + (HEADLINE_LINE1.length + HEADLINE_LINE2.length) * CHAR_DELAY + HOLD_AFTER_TYPED;

export function Act8CloseHeadline() {
  return (
    <motion.p
      className="-translate-x-1/2 absolute left-1/2 top-[387.17px] w-[403.703px] text-center text-[28px] font-semibold leading-[36px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span className="text-[#f1f6ff]">
        <TypedText text={HEADLINE_LINE1} startDelay={START_DELAY} charDelay={CHAR_DELAY} />
      </span>
      <span className="text-[#5985ff]">
        <TypedText text={HEADLINE_LINE2} startDelay={START_DELAY + HEADLINE_LINE1.length * CHAR_DELAY} charDelay={CHAR_DELAY} />
      </span>
    </motion.p>
  );
}
