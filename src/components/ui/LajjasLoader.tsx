"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export interface LajjasLoaderProps {
  /** Size variant of the central emblem */
  size?: "sm" | "md" | "lg";
  /** If true, wraps in a full-screen overlay (ideal for Next.js loading.tsx) */
  fullScreen?: boolean;
  /** Custom text to display below the logo */
  message?: string;
  /** Whether to show the animated progress bar */
  showProgress?: boolean;
  /** Additional custom classes */
  className?: string;
}

export function LajjasLoader({
  size = "md",
  fullScreen = false,
  message = "Preparing fresh authentic flavors...",
  showProgress = true,
  className = "",
}: LajjasLoaderProps) {
  // Dimensions based on size
  const sizeMap = {
    sm: {
      outer: "w-16 h-16",
      inner: "w-12 h-12",
      letter: "text-xl",
      gujarati: "text-[8px]",
      title: "text-lg",
      subtitle: "text-[10px]",
    },
    md: {
      outer: "w-24 h-24",
      inner: "w-18 h-18",
      letter: "text-3xl",
      gujarati: "text-[10px]",
      title: "text-2xl",
      subtitle: "text-xs",
    },
    lg: {
      outer: "w-32 h-32",
      inner: "w-24 h-24",
      letter: "text-4xl",
      gujarati: "text-xs",
      title: "text-3xl",
      subtitle: "text-sm",
    },
  }[size];

  const content = (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Central Emblem & Spinning Rings */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d7b16b]/20 via-[#1f5a3d]/15 to-transparent blur-xl scale-125" />

        {/* Outer Rotating Artisan Track */}
        <div
          className={`relative ${sizeMap.outer} rounded-full border-2 border-stone-200/80 border-t-[#1f5a3d] border-r-[#d7b16b] border-b-transparent border-l-transparent animate-lajjas-spin shadow-sm`}
          style={{ willChange: "transform" }}
        />

        {/* Counter-rotating Accent Dots Ring */}
        <div
          className="absolute w-[88%] h-[88%] rounded-full border border-dashed border-[#d7b16b]/40 animate-spin"
          style={{ animationDuration: "6s", animationDirection: "reverse" }}
        />

        {/* Inner Heritage Medallion */}
        <div
          className={`absolute ${sizeMap.inner} rounded-full bg-gradient-to-br from-[#fffefc] to-[#f4ece0] border-2 border-[#d7b16b]/50 shadow-md flex flex-col items-center justify-center animate-lajjas-pulse`}
        >
          {/* Decorative Sparkle */}
          <Sparkles className="w-2.5 h-2.5 text-[#d7b16b] -mb-1 animate-pulse" />

          {/* Signature 'L' Monogram */}
          <span className={`font-serif font-black ${sizeMap.letter} leading-none text-[#1f5a3d] tracking-tighter drop-shadow-xs`}>
            L
          </span>

          {/* Gujarati Script Accent */}
          <span className={`font-serif font-bold ${sizeMap.gujarati} text-[#b45309] -mt-0.5 tracking-wider uppercase`}>
            લાજ્જા
          </span>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="mt-5 space-y-1">
        <h2 className={`font-serif font-black ${sizeMap.title} tracking-tight text-[#1f5a3d]`}>
          <span className="bg-gradient-to-r from-[#1f5a3d] via-[#b45309] to-[#1f5a3d] bg-clip-text text-transparent animate-lajjas-shimmer">
            Lajja&apos;s Foods
          </span>
        </h2>
        <p className={`font-sans font-semibold uppercase tracking-widest text-[#d7b16b] ${sizeMap.subtitle}`}>
          Authentic Gujarati Delicacies
        </p>
      </div>

      {/* Context Message */}
      {message && (
        <p className="mt-2 text-xs font-medium text-stone-500 max-w-xs animate-pulse">
          {message}
        </p>
      )}

      {/* Progress Shimmer Bar */}
      {showProgress && (
        <div className="mt-4 w-44 h-1.5 rounded-full bg-stone-200/80 overflow-hidden relative shadow-inner">
          <div className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-[#1f5a3d] via-[#d7b16b] to-[#1f5a3d] animate-lajjas-progress" />
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading page content"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFBF7]/90 backdrop-blur-md transition-opacity duration-300"
      >
        {content}
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" aria-label="Loading content" className="py-8">
      {content}
    </div>
  );
}

export default LajjasLoader;
