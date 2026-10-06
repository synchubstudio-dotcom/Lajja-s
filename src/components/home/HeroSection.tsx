"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Leaf, Heart } from "lucide-react";

const slides = [
  {
    number: "01",
    title: "Thepla",
    subtitle: "Homemade. Healthy. Traditional.",
    description:
      "Soft, healthy and delicious methi theplas made with fresh ingredients and authentic Gujarati spices.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Thepla_main.jpg",
    alt: "Stacked Gujarati methi thepla",
    tag: "Gujarati Classic",
  },
  {
    number: "02",
    title: "Khakhra",
    subtitle: "Crisp. Roasted. Full of flavour.",
    description:
      "Traditional Gujarati khakhra, carefully roasted for a light, crispy and satisfying everyday snack.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Khakhra.JPG",
    alt: "Traditional Gujarati khakhra",
    tag: "Roasted Goodness",
  },
  {
    number: "03",
    title: "Roasted Snacks",
    subtitle: "Simple ingredients. Honest taste.",
    description:
      "Wholesome roasted peanuts and chana made for travel, tea time and every family table.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Roasted_Peanuts_with_shell.jpg",
    alt: "Roasted peanuts Gujarati snack",
    tag: "Everyday Favourite",
  },
];

const benefits = [
  { label: "Natural Ingredients", icon: Leaf },
  { label: "Made With Love", icon: Heart },
  { label: "No Preservatives", icon: "✿" },
  { label: "Traditional Taste", icon: "☼" },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const swipeStartX = useRef<number | null>(null);

  const slide = slides[activeSlide];

  /* =========================
     SLIDER CONTROLS
  ========================= */

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  /* =========================
     AUTO SLIDE
  ========================= */

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      showNextSlide();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  /* =========================
     SWIPE
  ========================= */

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.clientX;
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
    <section className="relative overflow-hidden border-b border-[#e8e1d8] bg-[#f5efe7]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#dfeadd]/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#ead9c4]/40 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="relative overflow-hidden rounded-[30px] border border-[#e4dbcf] bg-[#f9f5ef] shadow-[0_20px_70px_rgba(52,42,32,0.08)]">
          {/* =========================
              MAIN GRID
          ========================= */}

          <div
            className="grid min-h-[680px] items-stretch lg:grid-cols-[0.85fr_1.15fr]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {/* =========================
                LEFT CONTENT
            ========================= */}

            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16">
              <div>
                {/* Brand */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#245d3c] text-white">
                    <Leaf size={16} strokeWidth={1.8} />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#245d3c]">
                      Lajja&apos;s Foods
                    </p>

                    <p className="text-[10px] text-[#81786f]">
                      Authentic Gujarati Taste
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce5dc] bg-[#eef5ef] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2c7049]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2c7049]">
                    {slide.tag}
                  </span>
                </div>

                {/* Heading */}
                <div className="overflow-hidden">
                  <p
                    key={`${slide.number}-subtitle`}
                    className="mb-3 animate-[fadeUp_.6s_ease-out] text-lg font-medium text-[#625a52] sm:text-xl"
                  >
                    {slide.subtitle}
                  </p>

                  <h1
                    key={`${slide.number}-title`}
                    className="animate-[fadeUp_.7s_ease-out] font-serif text-[clamp(4rem,9vw,8rem)] font-bold leading-none tracking-[-0.07em] text-[#1d1a17]"
                  >
                    {slide.title}
                  </h1>
                </div>

                {/* Description */}
                <p
                  key={`${slide.number}-description`}
                  className="mt-8 max-w-[440px] animate-[fadeUp_.8s_ease-out] text-sm leading-7 text-[#716a63] sm:text-base"
                >
                  {slide.description}
                </p>

                {/* Benefits */}
                <div className="mt-8 grid max-w-[470px] grid-cols-2 gap-2 sm:grid-cols-4">
                  {benefits.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="group rounded-2xl border border-[#e5dbcf] bg-[#fcfaf7] px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c9d7ca] hover:shadow-md"
                      >
                        {typeof Icon === "string" ? (
                          <span className="mb-2 block text-lg text-[#326d4b]">
                            {Icon}
                          </span>
                        ) : (
                          <Icon
                            size={17}
                            strokeWidth={1.7}
                            className="mx-auto mb-2 text-[#326d4b]"
                          />
                        )}

                        <span className="block text-[9px] font-medium leading-tight text-[#4f4943]">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Slide Counter */}
              {/* <div className="mt-12 flex items-center gap-4">
                <span className="font-serif text-2xl font-semibold text-[#25211e]">
                  {slide.number}
                </span>

                <div className="h-px w-16 bg-[#d8cec2]" />

                <span className="text-xs text-[#948b82]">0{slides.length}</span>
              </div> */}
            </div>

            {/* =========================
                RIGHT IMAGE
            ========================= */}

            <div className="relative min-h-[400px] overflow-hidden lg:min-h-full">
              {/* IMAGE */}

              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                fill
                priority={activeSlide === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Image overlay */}

              <div className="pointer-events-none absolute inset-0 z-10 bg-black/5" />

              {/* =================================
                  LEFT ARROW
              ================================= */}

              <button
                type="button"
                aria-label="Previous slide"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousSlide();
                }}
                className="absolute left-4 top-1/2 z-[30] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110 hover:bg-white/15 active:scale-95 sm:left-6"
              >
                <ArrowLeft size={26} strokeWidth={2.5} />
              </button>

              {/* =================================
                  RIGHT ARROW
              ================================= */}

              <button
                type="button"
                aria-label="Next slide"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextSlide();
                }}
                className="absolute right-4 top-1/2 z-[30] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-110 hover:bg-white/15 active:scale-95 sm:right-6"
              >
                <ArrowRight size={26} strokeWidth={2.5} />
              </button>

              {/* Bottom gradient */}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Floating card */}

              <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-30 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="rounded-2xl border border-white/30 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#706960]">
                    Made Traditionally
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#28231f]">
                    From our kitchen to your home
                  </p>
                </div>

                <div className="hidden rounded-full border border-white/30 bg-black/30 px-4 py-2 backdrop-blur-md sm:block">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    Swipe to explore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}

          <div className="absolute bottom-0 left-0 right-0 z-40 h-[3px] bg-black/5">
            <div
              key={activeSlide}
              className="h-full bg-[#2c7049] animate-[progress_5s_linear]"
            />
          </div>
        </div>
      </div>

      {/* Animations */}

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
