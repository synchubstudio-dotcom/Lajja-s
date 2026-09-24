import Link from "next/link";
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { FAQS } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/schema";

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((product) => product.bestSeller);
  const homeFaqs = FAQS.slice(0, 4);

  return (
    <>
      <JsonLd data={generateFAQSchema(homeFaqs)} />
      <div className="bg-[#1f5a3d] px-4 py-2 text-center text-xs font-semibold text-white">
        Fresh Gujarati snacks delivered across India · Free shipping on orders above ₹999
      </div>

      <HeroSection />

      <main className="bg-[#eaeded] pb-16">
        <section className="mx-auto -mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.slice(0, 4).map((category) => (
              <Link key={category.slug} href={`/${category.slug}/`} className="group bg-white p-5 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-stone-900">{category.name}</h2>
                <div className="mt-4 overflow-hidden bg-[#f6f0e5]">
                  <img src={category.heroImage} alt={category.name} className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#1f5a3d]">Shop now <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-5 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#1f5a3d]">Popular picks</p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">Best Sellers</h2>
              </div>
              <Link href="/products/all-products/" className="text-sm font-bold text-[#1f5a3d]">See all</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 bg-white p-5 sm:grid-cols-3 sm:p-7">
            {[
              { icon: Truck, title: "Fast delivery", text: "Fresh snacks packed and shipped with care." },
              { icon: ShieldCheck, title: "Trusted quality", text: "Traditional recipes and honest ingredients." },
              { icon: RotateCcw, title: "Easy support", text: "Our team is here whenever you need us." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3 border-b border-stone-100 pb-4 last:border-0 last:pb-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 sm:last:border-r-0">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-[#1f5a3d]" />
                <div><h3 className="font-bold text-stone-900">{title}</h3><p className="mt-1 text-sm text-stone-500">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1f5a3d]">Need to know more?</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900">Frequently Asked Questions</h2>
            </div>
            <div className="mt-6 space-y-3">
              {homeFaqs.map((faq) => (
                <details key={faq.id} className="border border-stone-200 p-4">
                  <summary className="cursor-pointer font-bold text-stone-900">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 bg-[#1f5a3d] p-8 text-center text-white sm:flex-row sm:text-left">
            <div><h2 className="font-serif text-2xl font-bold">Ready for authentic Gujarati taste?</h2><p className="mt-1 text-sm text-white/75">Choose your favourites and order today.</p></div>
            <Link href="/products/all-products/" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1f5a3d]">Shop all snacks <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
