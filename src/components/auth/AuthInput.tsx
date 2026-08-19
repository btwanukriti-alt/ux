"use client";

import { useId, useState, type InputHTMLAttributes } from "react";

// Text/email/password field — Figma nodes 2928:280830 (Login/Email) etc.
// Design tokens flattened to literal values per this project's existing
// convention (every onboarding component uses literal hex/rgba, not CSS
// custom properties): text/secondary #a7bce4, input-fill rgba(31,60,139,0.1),
// border/cards-10% rgba(255,255,255,0.1), text/muted #3b567a, text/accent
// #4da3ff.
export function AuthInput({
  label,
  helperText,
  isPassword,
  className = "",
  ...inputProps
}: {
  label: string;
  helperText?: string;
  isPassword?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-[8px]">
      <label htmlFor={id} className="text-[14px] font-medium leading-[20px] text-[#a7bce4]">
        {label}
      </label>
      <div className="flex w-full items-center gap-[12px] rounded-[10px] border border-[rgba(255,255,255,0.1)] bg-[rgba(31,60,139,0.1)] px-[16px] py-[13px]">
        <input
          id={id}
          type={isPassword && !revealed ? "password" : isPassword ? "text" : inputProps.type}
          className={`w-full min-w-0 flex-1 bg-transparent text-[16px] font-normal leading-[22px] text-[#f1f6ff] placeholder:text-[#3b567a] focus:outline-none ${className}`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            className="shrink-0 text-[14px] font-medium leading-[20px] text-[#4da3ff] hover:text-[#6cb4ff]"
          >
            {revealed ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {helperText && <p className="text-[12px] font-normal leading-[16px] text-[#3b567a]">{helperText}</p>}
    </div>
  );
}
