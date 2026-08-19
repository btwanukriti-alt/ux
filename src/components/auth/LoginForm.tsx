"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthInput } from "./AuthInput";
import { AuthCheckbox } from "./AuthCheckbox";
import { AuthPrimaryButton, AuthGoogleButton, AuthDivider } from "./AuthButtons";

// Login screen's form panel — Figma node 2928:280815, part of the
// "Landing Page — Desktop" login screen (2742:268894). Positioned by the
// parent AuthScreen at the same (890, 150) spot Figma places it, right of
// the onboarding canvas.
export function LoginForm() {
  const [remember, setRemember] = useState(false);

  return (
    <form className="flex w-[400px] flex-col items-start gap-[32px]">
      <div className="flex w-full flex-col items-start gap-[4px]">
        <h1 className="text-[20px] font-semibold leading-[28px] text-[#f1f6ff]">Welcome back</h1>
        <p className="text-[14px] font-normal leading-[20px] text-[#a7bce4]">Log in to your Jaadu account</p>
      </div>

      <div className="flex w-full flex-col items-start gap-[20px]">
        <AuthInput label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <AuthInput label="Password" isPassword placeholder="Enter your password" autoComplete="current-password" />

        <div className="flex w-full items-center justify-between">
          <AuthCheckbox checked={remember} onChange={setRemember} label="Remember me" />
          <Link href="#" className="text-[14px] font-medium leading-[20px] text-[#4da3ff] hover:text-[#6cb4ff]">
            Forgot password?
          </Link>
        </div>
      </div>

      <AuthPrimaryButton type="submit">Log in</AuthPrimaryButton>

      <AuthDivider />

      <AuthGoogleButton />

      <p className="flex w-full items-center justify-center gap-[5px] text-[14px] leading-[20px]">
        <span className="text-[#a7bce4]">Don&apos;t have an account?</span>
        <Link href="/signup" className="font-medium text-[#4da3ff] hover:text-[#6cb4ff]">
          Sign up
        </Link>
      </p>
    </form>
  );
}
