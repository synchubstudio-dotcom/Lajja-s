"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    title: "Thepla",
    subtitle: "Homemade. Healthy. Traditional.",
    description: "Soft, healthy and tasty theplas made with fresh methi leaves and authentic spices.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Thepla_main.jpg",
    alt: "Stacked Gujarati methi thepla",
  },
  {
    title: "Khakhra",
    subtitle: "Crisp. Roasted. Full of flavour.",
    description: "Traditional Gujarati khakhra, hand-pressed and roasted for a light everyday snack.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Khakhra.JPG",
    alt: "Traditional Gujarati khakhra",
  },
  {
    title: "Roasted Snacks",
    subtitle: "Simple ingredients. Honest taste.",
    description: "Wholesome roasted peanuts and chana made for travel, tea time, and every family table.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Roasted_Peanuts_with_shell.jpg",
    alt: "Roasted peanuts Gujarati snack",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(distance) < 50) return;
    if (distance > 0) {
      showPreviousSlide();
    } else {
      showNextSlide();
    }
  };

  const handlePointerCancel = () => {
    swipeStartX.current = null;
  };

  return (
    <section className="relative overflow-hidden border-b border-[#e8e1d8] bg-[#f5efe7] py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#e7e1d5] bg-[#f7f2ea] p-4 sm:p-6 lg:p-8">
          <div
            className="relative grid touch-pan-y select-none items-center gap-6 lg:grid-cols-[1.05fr_1.3fr]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className="space-y-5 pr-0 lg:pr-4" aria-live="polite">
              <div className="inline-flex items-center rounded-full border border-[#dfe6df] bg-[#edf5ee] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1f5a3d]">
                Organic Gujarati goodness
              </div>
              <h1 className="font-serif text-5xl font-bold leading-[0.88] tracking-[-0.06em] text-[#1b1816] sm:text-6xl lg:text-[5.8rem]">
                {slide.title}
              </h1>
              <p className="text-xl font-medium text-[#2e2a26] sm:text-2xl">{slide.subtitle}</p>
              <p className="max-w-[29rem] text-sm leading-relaxed text-[#4d4a46] sm:text-base">{slide.description}</p>
              <div className="grid max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "100% Natural Ingredients", icon: "✦" },
                  { label: "Made With Love", icon: "♥" },
                  { label: "No Preservatives", icon: "✿" },
                  { label: "Traditional Taste", icon: "☼" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center justify-center rounded-xl border border-[#ddd1c2] bg-[#f9f5f0] px-2 py-3 text-center text-[10px] font-medium text-[#2a2927] shadow-sm">
                    <span className="mb-1 text-base text-[#2b6d47]">{item.icon}</span>
                    <span className="leading-snug">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/products/all-products/" className="inline-flex items-center gap-2 rounded-full border border-[#2d6b49] bg-[#2d6b49] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#245a3d] hover:shadow-md">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[760px] overflow-hidden rounded-[22px] border border-[#dfe5df] bg-[#ebf1ea] p-2 shadow-sm">
                <Image key={slide.image} src={slide.image} alt={slide.alt} width={1200} height={900} priority={activeSlide === 0} sizes="(max-width: 1024px) 100vw, 760px" className="h-[340px] w-full rounded-[18px] object-cover object-center transition-opacity duration-500 sm:h-[420px] lg:h-[500px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
