"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { 
  KeyRound, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ShieldCheck
} from "lucide-react";

export function ResetPasswordForm() {
  const clerk = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  // Step 1: "email" | Step 2: "otp" | Step 3: "success"
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState(initialEmail);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Step 1: Request OTP to email
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!clerk.loaded) return;

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create sign-in attempt with reset_password_email_code strategy
      const signInAttempt = await clerk.client.signIn.create({
        strategy: "reset_password_email_code",
        identifier: trimmedEmail,
      });

      // If prepareFirstFactor is required for specific email factor
      const resetFactor = signInAttempt.supportedFirstFactors?.find(
        (f) => f.strategy === "reset_password_email_code"
      );
      if (resetFactor && "emailAddressId" in resetFactor) {
        await signInAttempt.prepareFirstFactor({
          strategy: "reset_password_email_code",
          emailAddressId: resetFactor.emailAddressId,
        });
      }

      setStep("otp");
      setResendCooldown(45); // 45 seconds cooldown
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg = clerkError.errors?.[0]?.longMessage || clerkError.errors?.[0]?.message || "Could not find an account with this email address.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify OTP & update password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!clerk.loaded) return;

    const trimmedOtp = otpCode.trim();
    if (!trimmedOtp) {
      setError("Please enter the 6-digit OTP code sent to your email.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await clerk.client.signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: trimmedOtp,
        password: newPassword,
      });

      if (result.status === "complete") {
        setStep("success");
        if (result.createdSessionId) {
          await clerk.setActive({ session: result.createdSessionId });
        }
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 2000);
      } else {
        setError("Password reset requires additional verification. Please contact support.");
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg = clerkError.errors?.[0]?.longMessage || clerkError.errors?.[0]?.message || "Invalid or expired OTP code. Please check and try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // Resend OTP handler
  async function handleResendOtp() {
    if (!clerk.loaded || resendCooldown > 0 || loading) return;
    setLoading(true);
    setError("");

    try {
      const signInAttempt = await clerk.client.signIn.create({
        strategy: "reset_password_email_code",
        identifier: email.trim().toLowerCase(),
      });

      const resetFactor = signInAttempt.supportedFirstFactors?.find(
        (f) => f.strategy === "reset_password_email_code"
      );
      if (resetFactor && "emailAddressId" in resetFactor) {
        await signInAttempt.prepareFirstFactor({
          strategy: "reset_password_email_code",
          emailAddressId: resetFactor.emailAddressId,
        });
      }

      setResendCooldown(45);
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      setError(clerkError.errors?.[0]?.longMessage || "Unable to resend OTP right now. Please wait a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card p-6 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1f5a3d]/10 text-[#1f5a3d] mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            {step === "email" && "Forgot Password?"}
            {step === "otp" && "Enter Reset OTP"}
            {step === "success" && "Password Reset Successful!"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
            {step === "email" && "Enter your registered email address to receive a secure OTP code."}
            {step === "otp" && `We sent a 6-digit verification code to ${email}`}
            {step === "success" && "Your password has been changed. Signing you in to your account..."}
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800 font-medium"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-xs font-bold text-stone-700 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !clerk.loaded}
              className="w-full py-3 px-4 rounded-xl bg-[#1f5a3d] hover:bg-[#184730] active:scale-[0.99] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <span>Send Verification OTP →</span>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/sign-in/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#1f5a3d] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </form>
        )}

        {/* STEP 2: Enter OTP & New Password */}
        {step === "otp" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* OTP Code */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="otp-code" className="block text-xs font-bold text-stone-700">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  className="text-[11px] font-semibold text-[#1f5a3d] hover:underline"
                >
                  Change Email
                </button>
              </div>
              <input
                id="otp-code"
                type="text"
                required
                autoFocus
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="123456"
                className="w-full text-center tracking-[0.5em] font-mono text-xl py-2.5 rounded-xl border border-stone-200 focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
              />
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="new-password" className="block text-xs font-bold text-stone-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-stone-400 hover:text-stone-600 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-xs font-bold text-stone-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !clerk.loaded}
              className="w-full py-3 px-4 rounded-xl bg-[#1f5a3d] hover:bg-[#184730] active:scale-[0.99] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying OTP & Updating...</span>
                </>
              ) : (
                <span>Update Password & Sign In</span>
              )}
            </button>

            {/* Resend OTP */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-stone-500">Didn&apos;t receive code?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || loading}
                className="font-bold text-[#1f5a3d] hover:underline disabled:text-stone-400 disabled:no-underline"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Screen */}
        {step === "success" && (
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-emerald-800">
              Your password has been changed successfully.
            </p>
            <p className="text-xs text-stone-500">
              Signing you in to your account...
            </p>
            <Link
              href="/"
              className="inline-block mt-2 rounded-xl bg-[#1f5a3d] px-6 py-2.5 text-xs font-bold text-white"
            >
              Go to Storefront Now
            </Link>
          </div>
        )}

        {/* Security badge */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-400">
          <ShieldCheck className="w-4 h-4 text-[#1f5a3d]" />
          <span>Encrypted with Clerk 256-bit Security Verification</span>
        </div>
      </div>
    </div>
  );
}
