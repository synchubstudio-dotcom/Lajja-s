import { Suspense } from "react";
import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { LajjasLoader } from "@/components/ui/LajjasLoader";

export const metadata: Metadata = {
  title: "Forgot Password | Lajja's Foods",
  description: "Reset your Lajja's Foods account password securely using a one-time verification OTP code.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <Suspense fallback={<LajjasLoader size="sm" message="Loading security verification..." />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
