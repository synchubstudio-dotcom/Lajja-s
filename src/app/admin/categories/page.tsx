"use client";

import { useCallback, useEffect, useState } from "react";

type CategoryRecord = Record<string, unknown> & {
  _id?: string;
  id?: string;
  name?: string;
  slug?: string;
};

const API_URL = "/api/admin/categories/";

async function readResponse(response: Response) {
  const text = await response.text();

  let data: Record<string, unknown> = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `API returned a non-JSON response (${response.status}). Check your API route.`
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}.`
    );
  }

  return data;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [draft, setDraft] = useState("{}");
  const [editingId, setEditingId] = useState<string>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      const data = await readResponse(response);

      if (!Array.isArray(data.categories)) {
        throw new Error(
          "Invalid API response: expected a categories array."
        );
      }

      setCategories(data.categories as CategoryRecord[]);
      setMessage("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function edit(category: CategoryRecord) {
    const id = category._id ?? category.id;

    if (!id) {
      setMessage("This category has no ID and cannot be edited.");
      return;
    }

    setEditingId(String(id));

    const { _id, ...editable } = category;
    setDraft(JSON.stringify(editable, null, 2));
    setMessage("");
  }

  async function save() {
    let category: CategoryRecord;

    try {
      category = JSON.parse(draft) as CategoryRecord;

      if (
        !category ||
        typeof category !== "object" ||
        Array.isArray(category)
      ) {
        throw new Error("Category data must be a JSON object.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Category data must be valid JSON."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          editingId ? { ...category, id: editingId } : category
        ),
      });

      await readResponse(response);

      setMessage(editingId ? "Category updated." : "Category created.");
      setEditingId(undefined);
      setDraft("{}");

      await load();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!id) {
      setMessage("Category ID is missing.");
      return;
    }

    if (!window.confirm("Delete this category?")) return;

    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await readResponse(response);

      setMessage("Category deleted.");

      if (editingId === id) {
        setEditingId(undefined);
        setDraft("{}");
      }

      await load();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete category."
      );
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-stone-900">
        Manage categories
      </h1>

      <p className="mt-2 text-sm text-stone-500">
        Create, edit, or remove storefront categories using JSON.
      </p>

      {message && (
        <div
          role="status"
          className="mt-4 rounded-lg border border-stone-200 bg-white p-3 text-sm font-medium text-stone-700"
        >
          {message}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-stone-900">Categories</h2>

            <button
              onClick={() => void load()}
              disabled={loading}
              className="text-sm font-semibold text-[#1f5a3d] disabled:opacity-50"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loading && (
            <p className="py-6 text-sm text-stone-500">
              Loading categories...
            </p>
          )}

          {!loading && categories.length === 0 && (
            <p className="rounded-xl border bg-white p-5 text-sm text-stone-500">
              No categories found, or the API request failed. Check the
              message above.
            </p>
          )}

          {categories.map((category, index) => {
            const id = String(category._id ?? category.id ?? "");

            return (
              <div
                key={id || `${category.slug ?? "category"}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl border bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="font-bold">
                    {String(category.name ?? "Unnamed category")}
                  </p>
                  <p className="truncate text-xs text-stone-500">
                    {String(category.slug ?? "")}
                  </p>
                </div>

                <div className="flex shrink-0 gap-3">
                  <button
                    onClick={() => edit(category)}
                    className="text-sm font-bold text-[#1f5a3d]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => void remove(id)}
                    disabled={!id}
                    className="text-sm font-bold text-red-600 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <section>
          <h2 className="mb-3 font-bold text-stone-900">
            {editingId ? "Edit category" : "Create category"}
          </h2>

          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={24}
            spellCheck={false}
            className="w-full rounded-xl border border-stone-300 bg-white p-4 font-mono text-xs focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
            aria-label="Category JSON"
          />

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={() => void save()}
              disabled={saving}
              className="rounded-xl bg-[#1f5a3d] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update category"
                  : "Add category"}
            </button>

            <button
              onClick={() => {
                setEditingId(undefined);
                setDraft("{}");
                setMessage("");
              }}
              className="rounded-xl border px-5 py-3 text-sm font-bold"
            >
              New
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
