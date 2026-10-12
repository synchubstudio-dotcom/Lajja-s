"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { AuthForm } from "./AuthForm";

interface LoginModalProps {
  isOpen: boolean;
  notice?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function LoginModal({ isOpen, notice, onClose, onSuccess }: LoginModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      <button
        type="button"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close sign-in dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-login-title"
        className="relative my-auto w-full max-w-md"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
          aria-label="Close sign-in dialog"
        >
          <X className="h-5 w-5" />
        </button>
        {notice && (
          <p role="alert" className="mb-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {notice}
          </p>
        )}
        <AuthForm onSuccess={onSuccess} />
      </div>
    </div>
  );
}
