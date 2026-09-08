"use client";

import { useEffect, useState } from "react";

type ProductRecord = Record<string, unknown> & { _id?: string };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [draft, setDraft] = useState("{}");
  const [editingId, setEditingId] = useState<string>();
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(data.message || "Unable to load products.");
      return;
    }
    setProducts(data.products);
  }

  useEffect(() => { void load(); }, []);

  function edit(product: ProductRecord) {
    setEditingId(product._id);
    const { _id, ...editable } = product;
    setDraft(JSON.stringify(editable, null, 2));
  }

  async function save() {
    let product: ProductRecord;
    try {
      product = JSON.parse(draft);
    } catch {
      setMessage("Product data must be valid JSON.");
      return;
    }
    const response = await fetch("/api/admin/products", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...product } : product),
    });
    const data = await response.json().catch(() => ({}));
    setMessage(response.ok ? "Product saved." : data.message || "Unable to save product.");
    if (response.ok) { setEditingId(undefined); setDraft("{}"); await load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const response = await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setMessage(response.ok ? "Product deleted." : "Unable to delete product.");
    if (response.ok) await load();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-stone-900">Manage products</h1>
      <p className="mt-2 text-sm text-stone-500">Create, edit, or remove products. Product data uses the catalog JSON shape.</p>
      {message && <p className="mt-4 text-sm font-semibold text-[#1f5a3d]">{message}</p>}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section className="space-y-3">
          {products.map((product) => (
            <div key={product._id} className="flex items-center justify-between rounded-xl border bg-white p-4">
              <div><p className="font-bold">{String(product.name)}</p><p className="text-xs text-stone-500">{String(product.slug)}</p></div>
              <div className="flex gap-2"><button onClick={() => edit(product)} className="text-sm font-bold text-[#1f5a3d]">Edit</button><button onClick={() => remove(product._id!)} className="text-sm font-bold text-red-600">Delete</button></div>
            </div>
          ))}
        </section>
        <section>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={24} className="w-full rounded-xl border p-4 font-mono text-xs" aria-label="Product JSON" />
          <div className="mt-3 flex gap-3"><button onClick={() => void save()} className="rounded-xl bg-[#1f5a3d] px-5 py-3 text-sm font-bold text-white">{editingId ? "Update product" : "Add product"}</button><button onClick={() => { setEditingId(undefined); setDraft("{}"); }} className="rounded-xl border px-5 py-3 text-sm font-bold">New</button></div>
        </section>
      </div>
    </main>
  );
}
