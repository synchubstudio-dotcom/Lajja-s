import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login/");
  if (session.role !== "admin") redirect("/");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1f5a3d]">Administration</p>
          <h1 className="font-serif text-4xl font-bold text-stone-900">Lajja&apos;s Foods Control Panel</h1>
        </div>
        <Link href="/admin/products/" className="rounded-xl bg-[#1f5a3d] px-5 py-3 text-sm font-bold text-white">Open manage section</Link>
      </div>
      <section className="mt-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1f5a3d]">Manage</p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-stone-900">Website management</h2>
          <p className="mt-2 text-sm text-stone-500">Update the content and operations for your storefront.</p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <Link href="/admin/products/" className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1f5a3d]">
            <h3 className="font-serif text-xl font-bold text-stone-900">Products</h3>
            <p className="mt-2 text-sm text-stone-500">Add, edit, or remove products and their catalog data.</p>
            <span className="mt-5 inline-block text-sm font-bold text-[#1f5a3d]">Manage products →</span>
          </Link>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-stone-900">Categories</h3>
            <p className="mt-2 text-sm text-stone-500">Category management is ready for the next admin module.</p>
            <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-stone-400">Coming soon</span>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-stone-900">Orders</h3>
            <p className="mt-2 text-sm text-stone-500">Review and update customer orders from one workspace.</p>
            <span className="mt-5 inline-block text-xs font-bold uppercase tracking-wider text-stone-400">Coming soon</span>
          </div>
        </div>
      </section>
    </main>
  );
}
