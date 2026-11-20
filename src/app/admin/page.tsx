import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Package, Layers, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login/?returnTo=/admin/");
  if (session.role !== "admin") redirect("/");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#1f5a3d]/10 px-2.5 py-1 text-xs font-bold text-[#1f5a3d]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Store Administration
            </span>
            <span className="text-xs text-stone-400">Logged in as {session.name}</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Lajja&apos;s Foods Control Panel
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Easily manage your storefront inventory, snack variations, and category landing pages.
          </p>
        </div>
        <Link
          href="/admin/products/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#1f5a3d] px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-[#184730] transition-colors"
        >
          <Package className="w-4 h-4" />
          Manage Products
        </Link>
      </div>

      <section className="mt-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1f5a3d]">Storefront Management</p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Visual Content & Catalog Managers
          </h2>
          <p className="mt-1.5 text-sm text-stone-500">
            No technical knowledge or raw JSON required. Update stock, prices, photos, and descriptions with intuitive forms.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/products/"
            className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1f5a3d] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a3d]/10 text-[#1f5a3d] group-hover:bg-[#1f5a3d] group-hover:text-white transition-colors">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-stone-900">Products</h3>
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">
              Add new snacks, set prices, edit pack sizes, upload images, and control in-stock status with a simple visual form.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1f5a3d]">
              Open product manager <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/admin/categories/"
            className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1f5a3d] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-stone-900">Categories</h3>
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">
              Create and edit category hero banners, tradition stories, culinary highlights, FAQs, and SEO meta tags.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1f5a3d]">
              Open category manager <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-6 opacity-80">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-200 text-stone-500">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-stone-700">Orders & Deliveries</h3>
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">
              Review customer orders, dispatch tracking numbers, and WhatsApp shipping alerts from one unified workspace.
            </p>
            <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-stone-400">
              Coming soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
