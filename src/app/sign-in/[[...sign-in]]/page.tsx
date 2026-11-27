import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { LajjasLoader } from "@/components/ui/LajjasLoader";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 bg-[#FDFBF7]">
      <Suspense fallback={<LajjasLoader size="sm" message="Loading sign-in form..." />}>
        <SignIn />
      </Suspense>
      <div className="mt-4 text-center">
        <Link
          href="/forgot-password/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#1f5a3d] transition-colors"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#1f5a3d]" />
          Forgot password? Reset via OTP
        </Link>
      </div>
    </div>
  );
}
