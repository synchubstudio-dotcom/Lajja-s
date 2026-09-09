"use client";

import { useEffect, useState } from "react";

type CategoryRecord = Record<string, unknown> & { _id?: string; id?: string };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [draft, setDraft] = useState("{}");
  const [editingId, setEditingId] = useState<string>();
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch("/api/admin/categories/", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(data.message || "Unable to load categories."); return; }
    setCategories(data.categories);
  }

  useEffect(() => { void load(); }, []);

  function edit(category: CategoryRecord) {
    setEditingId(String(category._id ?? ""));
    const { _id, ...editable } = category;
    setDraft(JSON.stringify(editable, null, 2));
  }

  async function save() {
    let category: CategoryRecord;
    try { category = JSON.parse(draft); } catch { setMessage("Category data must be valid JSON."); return; }
    const response = await fetch("/api/admin/categories/", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...category } : category),
    });
    const data = await response.json().catch(() => ({}));
    setMessage(response.ok ? "Category saved." : data.message || "Unable to save category.");
    if (response.ok) { setEditingId(undefined); setDraft("{}"); await load(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this category?")) return;
    const response = await fetch("/api/admin/categories/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    const data = await response.json().catch(() => ({}));
    setMessage(response.ok ? "Category deleted." : data.message || "Unable to delete category.");
    if (response.ok) await load();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-stone-900">Manage categories</h1>
      <p className="mt-2 text-sm text-stone-500">Create, edit, or remove storefront categories using the category JSON shape.</p>
      {message && <p className="mt-4 text-sm font-semibold text-[#1f5a3d]">{message}</p>}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section className="space-y-3">
          {categories.map((category) => (
            <div key={String(category._id)} className="flex items-center justify-between rounded-xl border bg-white p-4">
              <div><p className="font-bold">{String(category.name)}</p><p className="text-xs text-stone-500">{String(category.slug)}</p></div>
              <div className="flex gap-2"><button onClick={() => edit(category)} className="text-sm font-bold text-[#1f5a3d]">Edit</button><button onClick={() => void remove(String(category._id))} className="text-sm font-bold text-red-600">Delete</button></div>
            </div>
          ))}
        </section>
        <section>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={24} className="w-full rounded-xl border p-4 font-mono text-xs" aria-label="Category JSON" />
          <div className="mt-3 flex gap-3"><button onClick={() => void save()} className="rounded-xl bg-[#1f5a3d] px-5 py-3 text-sm font-bold text-white">{editingId ? "Update category" : "Add category"}</button><button onClick={() => { setEditingId(undefined); setDraft("{}"); }} className="rounded-xl border px-5 py-3 text-sm font-bold">New</button></div>
        </section>
      </div>
    </main>
  );
}
