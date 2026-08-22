"use client";

import Image from "next/image";
import { useState } from "react";

// Figma node 3046:235711 ("Login Form"). Visual only — no auth wiring.
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-[496px] max-w-full flex-col items-start gap-6">
      <Image src="/figma/login/jaadu-logo.png" alt="Jaadu 2.0" width={157} height={41} className="h-[41px] w-[157px] object-cover" />

      <div className="flex w-[400px] max-w-full flex-col items-start gap-1">
        <h1 className="text-2xl leading-8 font-semibold text-[#f1f6ff]">Welcome back</h1>
        <p className="text-sm leading-5 text-[#a7bce4]">Log in to your Jaadu account</p>
      </div>

      <div className="flex w-full flex-col gap-6">
        <label className="flex w-full flex-col gap-1.5">
          <span className="text-sm leading-5 font-medium text-[#a7bce4]">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[rgba(31,60,139,0.1)] px-4 py-[13px] text-base leading-[22px] text-[#f1f6ff] placeholder:text-[#3b567a] backdrop-blur-[3.85px] outline-none focus:border-[#4da3ff]"
          />
        </label>

        <div className="flex w-full flex-col gap-1.5">
          <span className="text-sm leading-5 font-medium text-[#a7bce4]">Password</span>
          <div className="flex w-full items-center gap-3 rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[rgba(31,60,139,0.1)] px-4 py-[13px] backdrop-blur-[3.85px] focus-within:border-[#4da3ff]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="min-w-0 flex-1 bg-transparent text-base leading-[22px] text-[#f1f6ff] placeholder:text-[#3b567a] outline-none"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="shrink-0"
            >
              <Image src="/figma/login/eye-off.svg" alt="" width={22} height={22} className={showPassword ? "opacity-50" : ""} />
            </button>
          </div>
          <div className="flex w-full items-center justify-end">
            <a href="#" className="text-sm leading-5 font-medium text-[#4da3ff]">
              Forgot password?
            </a>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-5">
        <button
          type="submit"
          className="w-full rounded-[10px] py-[13px] text-base leading-[22px] font-semibold text-[#f1f6ff] backdrop-blur-[2px]"
          style={{ backgroundImage: "linear-gradient(89.5deg, #00ffff 25.7%, #5985ff 51.2%, #00ffff 125.1%)" }}
        >
          Log in
        </button>

        <div className="flex w-full items-center gap-4">
          <span className="h-px flex-1 bg-[rgba(255,255,255,0.1)]" />
          <span className="text-base leading-[22px] font-medium text-[#3b567a]">or</span>
          <span className="h-px flex-1 bg-[rgba(255,255,255,0.1)]" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[rgba(31,60,139,0.1)] py-[13px] backdrop-blur-[2px]"
        >
          <Image src="/figma/login/google.svg" alt="" width={22} height={22} />
          <span className="text-base leading-[22px] font-semibold text-[#f1f6ff]">Continue with Google</span>
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-1 text-sm leading-5">
        <span className="text-[#a7bce4]">Don&apos;t have an account?</span>
        <a href="#" className="font-medium text-[#4da3ff]">
          Sign up Now!
        </a>
      </div>
    </div>
  );
}
