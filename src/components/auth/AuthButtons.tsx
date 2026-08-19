// Shared button/divider pieces for the login and signup forms — Figma
// nodes 2928:280845/2928:281951 (primary), 2928:280822/2928:281901
// (Google), 2928:280825/2928:281904 (divider). Design tokens flattened to
// literal values per this project's existing convention: primary/500-main
// #5985ff, background/component-background rgba(0,52,194,0.15), colorborder
// rgba(167,191,255,0.3), text/accent #4da3ff, border/cards-10%
// rgba(255,255,255,0.1), text/muted #3b567a.

export function AuthPrimaryButton({ children, type = "button" }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      className="w-full rounded-[10px] bg-[#5985ff] py-[13px] text-[16px] font-semibold leading-[22px] text-[#f1f6ff] transition-colors hover:bg-[#6c93ff]"
    >
      {children}
    </button>
  );
}

export function AuthGoogleButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-[12px] rounded-[10px] border border-[rgba(167,191,255,0.3)] bg-[rgba(0,52,194,0.15)] py-[13px] text-[16px] font-semibold leading-[22px] transition-colors hover:bg-[rgba(0,52,194,0.25)]"
    >
      <span className="text-[#4da3ff]">G</span>
      <span className="text-[#f1f6ff]">Continue with Google</span>
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="flex w-full items-center gap-[16px]">
      <div className="h-px flex-1 bg-[rgba(255,255,255,0.1)]" />
      <p className="shrink-0 text-[14px] font-normal leading-[20px] text-[#3b567a]">or</p>
      <div className="h-px flex-1 bg-[rgba(255,255,255,0.1)]" />
    </div>
  );
}
