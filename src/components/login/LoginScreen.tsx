import { Background } from "./Background";
import { IllustrationPanel } from "./IllustrationPanel";
import { LoginForm } from "./LoginForm";
import { SpotlightPanel } from "./SpotlightPanel";

// Figma "Landing Page — Desktop" node 3046:234479 (the frame is misnamed
// from being duplicated — it's actually the login screen). The right-hand
// panel is sized to the "Form Hover Effect" frame's own box (682x826, node
// 3316:307889) so the mosaic tiles' Figma-exact coordinates line up, with
// the Login Form positioned at its exact offset within that same box
// (Figma-absolute x=832,y=174.88 minus the panel's own x=741,y=33).
export function LoginScreen() {
  return (
    <div className="relative flex min-h-screen w-full items-stretch gap-6 p-6">
      <Background />
      <IllustrationPanel />

      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative" style={{ width: 682, height: 826 }}>
          <SpotlightPanel>
            <div className="absolute" style={{ left: 91, top: 141.88 }}>
              <LoginForm />
            </div>
          </SpotlightPanel>
        </div>
      </div>
    </div>
  );
}
