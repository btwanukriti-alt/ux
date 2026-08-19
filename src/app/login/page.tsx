import { AuthScreen } from "@/components/auth/AuthScreen";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthScreen formTop={150}>
      <LoginForm />
    </AuthScreen>
  );
}
