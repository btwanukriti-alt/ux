"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthInput } from "./AuthInput";
import { AuthCheckbox } from "./AuthCheckbox";
import { AuthPrimaryButton, AuthGoogleButton, AuthDivider } from "./AuthButtons";

// Signup screen's form panel — Figma node 2928:281894, part of the second
// "Landing Page — Desktop" signup screen (2928:280852). Positioned by the
// parent AuthScreen at the same (890, 114) spot Figma places it, right of
// the onboarding canvas. Note the underlined links inside the terms
// sentence are literal text per Figma (not routed anywhere real yet), and
// the primary button + divider + Google button are grouped in their own
// tighter 12px-gap "Social" block, matching the login form's normal 32px
// top-level rhythm — this asymmetry is in the real Figma layout, not a typo.
export function SignupForm() {
  const [agreed, setAgreed] = useState(false);

  return (
    <form className="flex w-[400px] flex-col items-start gap-[32px]">
      <div className="flex w-full flex-col items-start gap-[4px]">
        <h1 className="text-[20px] font-semibold leading-[28px] text-[#f1f6ff]">Create your account</h1>
        <p className="text-[14px] font-normal leading-[20px] text-[#a7bce4]">Start trading with Jaadu in minutes</p>
      </div>

      <div className="flex w-full flex-col items-start gap-[20px]">
        <AuthInput label="Full name" type="text" placeholder="Enter your name" autoComplete="name" />
        <AuthInput label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <AuthInput label="Password" isPassword placeholder="Create a password" helperText="Minimum 8 characters" autoComplete="new-password" />

        <AuthCheckbox
          checked={agreed}
          onChange={setAgreed}
          label={
            <>
              I agree to the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
            </>
          }
        />
      </div>

      <div className="flex w-full flex-col items-start gap-[12px]">
        <AuthPrimaryButton type="submit">Create account</AuthPrimaryButton>
        <AuthDivider />
        <AuthGoogleButton />
      </div>

      <p className="flex w-full items-center justify-center gap-[5px] text-[14px] leading-[20px]">
        <span className="text-[#a7bce4]">Already have an account?</span>
        <Link href="/login" className="font-medium text-[#4da3ff] hover:text-[#6cb4ff]">
          Log in
        </Link>
      </p>
    </form>
  );
}
