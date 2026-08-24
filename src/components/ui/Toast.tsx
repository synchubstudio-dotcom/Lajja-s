"use client";

import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function Toast() {
  const toastMessage = useCartStore((state) => state.toastMessage);
  const clearToast = useCartStore((state) => state.clearToast);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-sm">
      <div className="bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-stone-700">
        <CheckCircle2 className="w-5 h-5 text-kesari-400 shrink-0" />
        <p className="text-xs font-medium flex-1">{toastMessage}</p>
        <button
          onClick={clearToast}
          className="text-stone-400 hover:text-white p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
