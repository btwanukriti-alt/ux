import { AuthScreen } from "@/components/auth/AuthScreen";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthScreen formTop={114}>
      <SignupForm />
    </AuthScreen>
  );
}
