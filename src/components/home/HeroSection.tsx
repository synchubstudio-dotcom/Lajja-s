import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#e8e1d8] bg-[#f5efe7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#e7e1d5] bg-[#f7f2ea] p-4 sm:p-6 lg:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_1.3fr]">
            <div className="space-y-5 pr-0 lg:pr-4">
              <div className="inline-flex items-center rounded-full border border-[#dfe6df] bg-[#edf5ee] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1f5a3d]">
                Organic Gujarati goodness
              </div>

              <h1 className="font-serif text-5xl font-bold leading-[0.88] tracking-[-0.06em] text-[#1b1816] sm:text-6xl lg:text-[5.8rem]">
                Thepla
              </h1>

              <p className="text-xl font-medium text-[#2e2a26] sm:text-2xl">
                Homemade. Healthy. Traditional.
              </p>

              <p className="max-w-[29rem] text-sm leading-relaxed text-[#4d4a46] sm:text-base">
                Soft, healthy and tasty theplas made with fresh methi leaves and authentic spices.
              </p>

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

              <div className="pt-2">
                <Link
                  href="/products/all-products/"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2d6b49] bg-[#2d6b49] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#245a3d] hover:shadow-md"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[760px] overflow-hidden rounded-[22px] border border-[#dfe5df] bg-[#ebf1ea] p-2 shadow-sm">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/74/Thepla_main.jpg"
                  alt="Stacked methi thepla product"
                  width={1200}
                  height={900}
                  priority
                  loading="eager"
                  className="h-[340px] w-full rounded-[18px] object-cover object-center sm:h-[420px] lg:h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
