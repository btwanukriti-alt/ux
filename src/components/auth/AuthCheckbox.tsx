"use client";

// Checkbox for "Remember me" / "I agree to the Terms..." — Figma nodes
// 2928:280841 (Login) / 2928:281924 (Signup), both the same 20x20 outline
// glyph (checkbox-icon.svg, downloaded from Figma). The checked state reuses
// the filled-square + checkmark pair already established for the strategy
// picker checkboxes in Act6SaveStrategy.tsx (checkbox-icon-1/2.svg) rather
// than inventing a new asset, since it's the same visual language.
export function AuthCheckbox({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-[10px]">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative block size-[20px] shrink-0"
      >
        {checked ? (
          <>
            <img alt="" className="absolute inset-0 block size-full" src="/figma/onboarding/13-save-strategy-compare-button/checkbox-icon-1.svg" />
            <img alt="" className="absolute block" style={{ inset: "33.33% 27.21% 35% 29.17%" }} src="/figma/onboarding/13-save-strategy-compare-button/checkbox-icon-2.svg" />
          </>
        ) : (
          <img alt="" className="absolute inset-0 block size-full" src="/figma/auth/checkbox-icon.svg" />
        )}
      </button>
      <span className="text-[14px] font-normal leading-[20px] text-[#a7bce4]">{label}</span>
    </label>
  );
}
