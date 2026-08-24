import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      author: "Hardik Parekh",
      city: "Vadodara → London",
      snack: "Travel Combo (30 Theplas + Khakhra)",
      rating: 5,
      comment:
        "Carried Lajja’s Travel Combo on my flight to Heathrow. They stayed completely soft for over 12 days in my student flat in London. Tastes exactly like mom's cooking!",
    },
    {
      author: "Bhavna Patel",
      city: "Ahmedabad",
      snack: "Methi Thepla & Gujarati Chundo",
      rating: 5,
      comment:
        "Finally, an authentic thepla that doesn't use maida or chemical preservatives. Perfectly balanced fenugreek bitterness and ajwain warmth. Our weekly breakfast must-have.",
    },
    {
      author: "Prashant Bhatt",
      city: "Bharuch",
      snack: "Bharuchi Salted Khari Sing",
      rating: 5,
      comment:
        "As a native of Bharuch, I'm very picky about salted peanuts. Lajja’s Foods uses the genuine sand roasting brine technique. Jumbo kernels, perfect crunch!",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-warm-50/70 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-bold text-kesari-700 tracking-wider">
            Genuine Customer Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Trusted by Travelers & Food Lovers Worldwide
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Over 50,000+ packs delivered to homes, breakfast tables, and overseas travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-kesari-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-kesari-500 text-kesari-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 font-serif">
                    {rev.author}
                  </h4>
                  <span className="text-[11px] text-stone-500">{rev.city}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-herbal-800 bg-herbal-50 px-2 py-0.5 rounded-full border border-herbal-200">
                  <CheckCircle2 className="w-3 h-3 text-herbal-700" />
                  <span>Verified Order</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
