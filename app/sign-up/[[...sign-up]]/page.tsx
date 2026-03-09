import { AuthShell } from "@/components/auth/AuthShell";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthShell mode="sign-up">
      <SignUpForm />
    </AuthShell>
  );
}
