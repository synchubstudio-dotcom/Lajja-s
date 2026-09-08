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
        <Link href="/admin/products/" className="rounded-xl bg-[#1f5a3d] px-5 py-3 text-sm font-bold text-white">Manage products</Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {["Products", "Categories", "Orders"].map((item) => (
          <div key={item} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-stone-900">{item}</h2>
            <p className="mt-2 text-sm text-stone-500">Manage {item.toLowerCase()} from the admin workspace.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
