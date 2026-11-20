"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  Search,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Code2,
  X,
  Package,
  BookOpen,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { Category, CategoryBenefit, CategoryFaq } from "@/types/category";

type CategoryRecord = Partial<Category> & { _id?: string };

const initialCategoryState: CategoryRecord = {
  name: "",
  gujaratiName: "",
  slug: "",
  tagline: "",
  description: "",
  heroImage: "https://res.cloudinary.com/yrndj90e/image/upload/v1790597725/azeri-traditional-kyukyu-with-barberry.jpg",
  traditionContent: {
    heading: "",
    paragraphs: [""],
  },
  culinaryHighlights: [
    "100% Whole Wheat Flour (Zero Maida)",
    "Cold-Pressed Spices & Pure Groundnut Oil",
    "Vacuum-Sealed Stay-Fresh Packaging",
    "Zero Artificial Preservatives",
  ],
  storageAndTravelTips: [
    "Unopened Vacuum Packs stay fresh at room temperature for up to 20 days.",
    "Once opened, keep enclosed in an airtight container or refrigerate.",
    "Perfect travel companion for international flights and road journeys.",
  ],
  benefits: [
    {
      title: "Naturally Extended Freshness",
      description: "Cooked with traditional tempering and turmeric to stay soft and tender without chemical preservatives.",
    },
  ],
  faqs: [
    {
      question: "How long does this snack stay fresh without refrigeration?",
      answer: "Our multi-layer barrier vacuum packaging keeps products completely fresh and flavorful for up to 20 days at room temperature.",
    },
  ],
  seo: {
    title: "",
    description: "",
    canonicalUrl: "",
    keywords: [],
  },
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [formData, setFormData] = useState<CategoryRecord>(initialCategoryState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "story" | "highlights" | "benefits" | "seo" | "json">("basic");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [rawJson, setRawJson] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/categories/", {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && Array.isArray(data.categories)) {
        setCategories(data.categories as CategoryRecord[]);
      } else {
        showNotification("error", data.message || "Unable to load categories.");
      }
    } catch {
      showNotification("error", "Failed to connect to the categories API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  function showNotification(type: "success" | "error", text: string) {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification((current) => (current?.text === text ? null : current));
    }, 5000);
  }

  function handleNameChange(name: string) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData((prev) => ({
      ...prev,
      name,
      slug: !editingId || !prev.slug ? slug : prev.slug,
      tagline: prev.tagline || `Authentic handcrafted Gujarati ${name}`,
      description: prev.description || `Explore our signature range of freshly roasted and vacuum-sealed ${name}.`,
      traditionContent: {
        heading: prev.traditionContent?.heading || `The Heritage of Gujarati ${name}`,
        paragraphs: prev.traditionContent?.paragraphs || [""],
      },
      seo: {
        ...prev.seo,
        title: prev.seo?.title || `${name} | Traditional Gujarati Snacks | Lajja's Foods`,
        description: prev.seo?.description || `Order fresh, handcrafted Gujarati ${name} online from Lajja's Foods. Vacuum-sealed for travel freshness.`,
        canonicalUrl: prev.seo?.canonicalUrl || `https://lajjasfoods.com/${slug}/`,
        keywords: prev.seo?.keywords?.length ? prev.seo.keywords : [name.toLowerCase(), `buy ${name.toLowerCase()} online`, "gujarati snacks"],
      },
    }));
  }

  function editCategory(category: CategoryRecord) {
    const id = String(category._id ?? category.id ?? "");
    setEditingId(id);
    setFormData({
      ...initialCategoryState,
      ...category,
      traditionContent: {
        heading: category.traditionContent?.heading || `The Heritage of Gujarati ${category.name || ""}`,
        paragraphs: Array.isArray(category.traditionContent?.paragraphs) && category.traditionContent.paragraphs.length > 0
          ? category.traditionContent.paragraphs
          : [""],
      },
      culinaryHighlights: Array.isArray(category.culinaryHighlights) ? category.culinaryHighlights : initialCategoryState.culinaryHighlights,
      storageAndTravelTips: Array.isArray(category.storageAndTravelTips) ? category.storageAndTravelTips : initialCategoryState.storageAndTravelTips,
      benefits: Array.isArray(category.benefits) ? category.benefits : initialCategoryState.benefits,
      faqs: Array.isArray(category.faqs) ? category.faqs : initialCategoryState.faqs,
      seo: category.seo || initialCategoryState.seo,
    });
    setRawJson(JSON.stringify(category, null, 2));
    setActiveTab("basic");
    showNotification("success", `Loaded category "${category.name}" for editing.`);
  }

  function resetForm() {
    setEditingId(null);
    setFormData(initialCategoryState);
    setRawJson("");
    setActiveTab("basic");
  }

  async function saveCategory(e?: React.FormEvent) {
    if (e) e.preventDefault();

    if (!formData.name?.trim()) {
      showNotification("error", "Category name is required.");
      setActiveTab("basic");
      return;
    }

    if (!formData.slug?.trim()) {
      showNotification("error", "Category slug is required.");
      setActiveTab("basic");
      return;
    }

    setSaving(true);
    try {
      let payload: CategoryRecord;
      if (activeTab === "json" && rawJson.trim()) {
        try {
          payload = JSON.parse(rawJson);
        } catch {
          showNotification("error", "Invalid JSON syntax. Please check or switch back to visual Form.");
          setSaving(false);
          return;
        }
      } else {
        payload = {
          ...formData,
          traditionContent: {
            heading: formData.traditionContent?.heading || `About ${formData.name}`,
            paragraphs: (formData.traditionContent?.paragraphs || []).filter((p) => p.trim().length > 0),
          },
          culinaryHighlights: (formData.culinaryHighlights || []).filter((h) => h.trim().length > 0),
          storageAndTravelTips: (formData.storageAndTravelTips || []).filter((t) => t.trim().length > 0),
          benefits: (formData.benefits || []).filter((b) => b.title?.trim() && b.description?.trim()),
          faqs: (formData.faqs || []).filter((f) => f.question?.trim() && f.answer?.trim()),
        };
      }

      const { _id, id, ...cleanPayload } = payload;
      const response = await fetch("/api/admin/categories/", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(editingId ? { ...cleanPayload, id: editingId } : cleanPayload),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        showNotification("success", editingId ? "Category updated successfully!" : "New category created successfully!");
        resetForm();
        await loadCategories();
      } else {
        showNotification("error", data.message || "Failed to save category.");
      }
    } catch {
      showNotification("error", "Network error while saving category.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: string, name?: string) {
    if (!confirm(`Are you sure you want to delete category "${name || id}"? All associated pages will be removed.`)) return;

    try {
      const response = await fetch("/api/admin/categories/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        showNotification("success", "Category deleted.");
        if (editingId === id) resetForm();
        await loadCategories();
      } else {
        const data = await response.json().catch(() => ({}));
        showNotification("error", data.message || "Failed to delete category.");
      }
    } catch {
      showNotification("error", "Network error while deleting category.");
    }
  }

  // Tradition Paragraph Helpers
  function addParagraph() {
    setFormData((prev) => ({
      ...prev,
      traditionContent: {
        heading: prev.traditionContent?.heading || "",
        paragraphs: [...(prev.traditionContent?.paragraphs || []), ""],
      },
    }));
  }

  function updateParagraph(index: number, value: string) {
    setFormData((prev) => {
      const paragraphs = [...(prev.traditionContent?.paragraphs || [])];
      paragraphs[index] = value;
      return {
        ...prev,
        traditionContent: {
          heading: prev.traditionContent?.heading || "",
          paragraphs,
        },
      };
    });
  }

  function removeParagraph(index: number) {
    setFormData((prev) => ({
      ...prev,
      traditionContent: {
        heading: prev.traditionContent?.heading || "",
        paragraphs: (prev.traditionContent?.paragraphs || []).filter((_, i) => i !== index),
      },
    }));
  }

  // Benefits Helpers
  function addBenefit() {
    setFormData((prev) => ({
      ...prev,
      benefits: [...(prev.benefits || []), { title: "", description: "" }],
    }));
  }

  function updateBenefit(index: number, field: keyof CategoryBenefit, value: string) {
    setFormData((prev) => {
      const benefits = [...(prev.benefits || [])];
      benefits[index] = { ...benefits[index], [field]: value };
      return { ...prev, benefits };
    });
  }

  function removeBenefit(index: number) {
    setFormData((prev) => ({
      ...prev,
      benefits: (prev.benefits || []).filter((_, i) => i !== index),
    }));
  }

  // FAQ Helpers
  function addFaq() {
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: "", answer: "" }],
    }));
  }

  function updateFaq(index: number, field: keyof CategoryFaq, value: string) {
    setFormData((prev) => {
      const faqs = [...(prev.faqs || [])];
      faqs[index] = { ...faqs[index], [field]: value };
      return { ...prev, faqs };
    });
  }

  function removeFaq(index: number) {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  }

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        cat.name?.toLowerCase().includes(q) ||
        cat.slug?.toLowerCase().includes(q) ||
        cat.gujaratiName?.toLowerCase().includes(q)
      );
    });
  }, [categories, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#1f5a3d] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Admin Control Panel
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1f5a3d]">
              Manage Categories
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-stone-500" />
              Manage Products
            </Link>
            <button
              onClick={() => resetForm()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1f5a3d] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#184730] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Category
            </button>
          </div>
        </div>

        {/* Title & Stats */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Storefront Categories
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Create, edit, or customize storefront snack categories and heritage pages using visual form inputs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-xl px-4 py-2.5 shadow-2xs">
            <Layers className="w-4 h-4 text-[#1f5a3d]" />
            <span>Active Categories:</span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 font-bold text-stone-900">
              {categories.length}
            </span>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div
            role="status"
            className={`mt-4 flex items-center justify-between rounded-xl p-4 text-sm font-semibold shadow-xs transition-all ${
              notification.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                : "bg-red-50 border border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{notification.text}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Left Column: Category Cards Directory */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search categories by name or slug..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/20 focus:border-[#1f5a3d]"
                  />
                </div>
                <button
                  onClick={() => void loadCategories()}
                  disabled={loading}
                  title="Refresh categories"
                  className="p-2 text-stone-600 hover:text-[#1f5a3d] rounded-lg border border-stone-200 hover:bg-stone-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Category Cards */}
            <div className="space-y-3 max-h-[820px] overflow-y-auto pr-1">
              {loading && categories.length === 0 && (
                <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#1f5a3d] mb-2" />
                  Loading categories...
                </div>
              )}

              {!loading && filteredCategories.length === 0 && (
                <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
                  No categories found. Click &quot;New Category&quot; to create one.
                </div>
              )}

              {filteredCategories.map((category) => {
                const id = String(category._id ?? category.id ?? "");
                const isSelected = editingId === id;

                return (
                  <div
                    key={id || category.slug}
                    className={`group relative rounded-2xl border transition-all p-4 bg-white ${
                      isSelected
                        ? "border-[#1f5a3d] ring-2 ring-[#1f5a3d]/20 shadow-md"
                        : "border-stone-200 hover:border-stone-300 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Hero Image Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {category.heroImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={category.heroImage}
                            alt={category.name || ""}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-stone-300" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-sm text-stone-900 truncate">
                            {category.name}
                          </h3>
                          <span className="text-[11px] font-mono text-stone-400 shrink-0">
                            /{category.slug}/
                          </span>
                        </div>

                        {category.gujaratiName && (
                          <p className="text-xs text-stone-500 font-medium">
                            {category.gujaratiName}
                          </p>
                        )}

                        {category.tagline && (
                          <p className="mt-1 text-xs text-stone-600 line-clamp-1">
                            {category.tagline}
                          </p>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-stone-500 font-semibold">
                          <span className="rounded bg-stone-100 px-1.5 py-0.5">
                            {category.culinaryHighlights?.length || 0} highlights
                          </span>
                          <span className="rounded bg-stone-100 px-1.5 py-0.5">
                            {category.benefits?.length || 0} benefits
                          </span>
                          <span className="rounded bg-stone-100 px-1.5 py-0.5">
                            {category.faqs?.length || 0} FAQs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <Link
                        href={`/${category.slug}/`}
                        target="_blank"
                        className="text-[11px] font-bold text-stone-500 hover:text-[#1f5a3d] transition-colors"
                      >
                        View Store Page ↗
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => editCategory(category)}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                            isSelected
                              ? "bg-[#1f5a3d] text-white"
                              : "text-[#1f5a3d] hover:bg-[#1f5a3d]/10"
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          {isSelected ? "Editing" : "Edit"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCategory(id, category.name)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Category Form */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sticky top-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#1f5a3d]/10 p-2 text-[#1f5a3d]">
                  {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
                <div>
                  <h2 className="font-bold text-base text-stone-900">
                    {editingId ? "Edit Category" : "Create New Category"}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {editingId ? `Editing ID: ${editingId}` : "Fill out details to publish new category"}
                  </p>
                </div>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-stone-200 px-3 py-1 text-xs font-bold text-stone-600 hover:bg-stone-50"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="mt-4 flex gap-1 border-b border-stone-200 overflow-x-auto pb-px text-xs font-bold scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "basic"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                1. Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("story")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "story"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                2. Hero & Heritage
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("highlights")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "highlights"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                3. Highlights & Tips
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("benefits")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "benefits"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                4. Benefits & FAQs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "seo"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                5. SEO Meta
              </button>
              <button
                type="button"
                onClick={() => {
                  setRawJson(JSON.stringify(formData, null, 2));
                  setActiveTab("json");
                }}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 flex items-center gap-1 ${
                  activeTab === "json"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Raw JSON
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={saveCategory} className="mt-5 space-y-4">
              {/* TAB 1: BASIC INFO */}
              {activeTab === "basic" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Thepla"
                        className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Gujarati Name
                      </label>
                      <input
                        type="text"
                        value={formData.gujaratiName || ""}
                        onChange={(e) => setFormData({ ...formData, gujaratiName: e.target.value })}
                        placeholder="e.g. થેપલા"
                        className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug || ""}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().trim() })}
                      placeholder="e.g. thepla"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm font-mono focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                    />
                    <p className="mt-1 text-[11px] text-stone-400">
                      Lowercase, numbers, and hyphens. Determines URL: lajjasfoods.com/<strong>{formData.slug || "category-slug"}</strong>/
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Header Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline || ""}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Soft, Spiced Gujarati Flatbreads Handcrafted with Whole Wheat..."
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm focus:border-[#1f5a3d] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Overview Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Short summary of this category for landing pages..."
                      className="w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-[#1f5a3d] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & HERITAGE STORY */}
              {activeTab === "story" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Hero Banner Image URL
                    </label>
                    <div className="flex gap-3 items-center">
                      <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {formData.heroImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={formData.heroImage}
                            alt="Hero preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-stone-300" />
                        )}
                      </div>
                      <input
                        type="text"
                        value={formData.heroImage || ""}
                        onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                        placeholder="https://res.cloudinary.com/... or image link"
                        className="flex-1 rounded-xl border border-stone-200 px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Tradition Section Heading
                    </label>
                    <input
                      type="text"
                      value={formData.traditionContent?.heading || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          traditionContent: {
                            paragraphs: formData.traditionContent?.paragraphs || [""],
                            heading: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. The Heritage of Gujarati Thepla: Centuries of Culinary Wisdom"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Paragraphs */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-stone-700">
                        Tradition & Story Paragraphs
                      </label>
                      <button
                        type="button"
                        onClick={addParagraph}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1f5a3d] hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Paragraph
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.traditionContent?.paragraphs?.map((para, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <textarea
                            rows={3}
                            value={para}
                            onChange={(e) => updateParagraph(idx, e.target.value)}
                            placeholder={`Paragraph #${idx + 1}...`}
                            className="flex-1 rounded-xl border border-stone-200 p-2.5 text-xs focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeParagraph(idx)}
                            className="p-2 text-stone-400 hover:text-red-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HIGHLIGHTS & STORAGE */}
              {activeTab === "highlights" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Culinary Highlights (One per line)
                    </label>
                    <p className="text-[11px] text-stone-500 mb-2">
                      Bullet points featured prominently on the category banner.
                    </p>
                    <textarea
                      rows={5}
                      value={(formData.culinaryHighlights || []).join("\n")}
                      onChange={(e) => {
                        const lines = e.target.value.split("\n");
                        setFormData({ ...formData, culinaryHighlights: lines });
                      }}
                      placeholder="100% Whole Wheat Flour (Zero Maida)&#10;Kneaded with Freshly Chopped Methi & Curd&#10;Vacuum-Sealed Stay-Fresh Packaging"
                      className="w-full rounded-xl border border-stone-200 p-3 text-xs focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Storage & Travel Tips (One per line)
                    </label>
                    <p className="text-[11px] text-stone-500 mb-2">
                      Practical guidelines for travelers, flight packing, and storage.
                    </p>
                    <textarea
                      rows={5}
                      value={(formData.storageAndTravelTips || []).join("\n")}
                      onChange={(e) => {
                        const lines = e.target.value.split("\n");
                        setFormData({ ...formData, storageAndTravelTips: lines });
                      }}
                      placeholder="Unopened Vacuum Packs stay fresh at room temperature for up to 20 days.&#10;Once opened, keep enclosed in an airtight container."
                      className="w-full rounded-xl border border-stone-200 p-3 text-xs focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: BENEFITS & FAQS */}
              {activeTab === "benefits" && (
                <div className="space-y-6">
                  {/* Benefits */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xs font-bold text-stone-800">Category Benefits</h3>
                        <p className="text-[11px] text-stone-500">Key value propositions (e.g. natural shelf life, fiber).</p>
                      </div>
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700 hover:bg-stone-200"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Benefit
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.benefits?.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-700">Benefit #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeBenefit(idx)}
                              className="text-stone-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Benefit Title (e.g. Extended Shelf Life Naturally)"
                            value={benefit.title}
                            onChange={(e) => updateBenefit(idx, "title", e.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-semibold"
                          />
                          <textarea
                            rows={2}
                            placeholder="Description..."
                            value={benefit.description}
                            onChange={(e) => updateBenefit(idx, "description", e.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQs */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xs font-bold text-stone-800">Category FAQs</h3>
                        <p className="text-[11px] text-stone-500">Frequently asked questions shown on the category page.</p>
                      </div>
                      <button
                        type="button"
                        onClick={addFaq}
                        className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700 hover:bg-stone-200"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add FAQ
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.faqs?.map((faq, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-700">FAQ #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeFaq(idx)}
                              className="text-stone-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Question (e.g. Can I warm this up before eating?)"
                            value={faq.question}
                            onChange={(e) => updateFaq(idx, "question", e.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-semibold"
                          />
                          <textarea
                            rows={2}
                            placeholder="Answer..."
                            value={faq.answer}
                            onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SEO META */}
              {activeTab === "seo" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Meta Page Title
                    </label>
                    <input
                      type="text"
                      value={formData.seo?.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            description: formData.seo?.description || "",
                            canonicalUrl: formData.seo?.canonicalUrl || "",
                            keywords: formData.seo?.keywords || [],
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. Authentic Gujarati Thepla | Buy Online | Lajja's Foods"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.seo?.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            title: formData.seo?.title || "",
                            canonicalUrl: formData.seo?.canonicalUrl || "",
                            keywords: formData.seo?.keywords || [],
                            description: e.target.value,
                          },
                        })
                      }
                      placeholder="Search engine summary text..."
                      className="w-full rounded-xl border border-stone-200 p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(formData.seo?.keywords || []).join(", ")}
                      onChange={(e) => {
                        const kws = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        setFormData({
                          ...formData,
                          seo: {
                            title: formData.seo?.title || "",
                            description: formData.seo?.description || "",
                            canonicalUrl: formData.seo?.canonicalUrl || "",
                            keywords: kws,
                          },
                        });
                      }}
                      placeholder="thepla, buy thepla online, gujarati snacks, travel thepla"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: RAW JSON */}
              {activeTab === "json" && (
                <div className="space-y-2">
                  <p className="text-xs text-stone-500">
                    Direct JSON object representation for this category.
                  </p>
                  <textarea
                    rows={18}
                    value={rawJson}
                    onChange={(e) => setRawJson(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-900 text-emerald-400 p-4 font-mono text-xs focus:outline-none"
                  />
                </div>
              )}

              {/* Form Submission Bar */}
              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  Clear / New
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1f5a3d] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#184730] disabled:opacity-60 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {saving
                    ? "Saving category..."
                    : editingId
                    ? "Save Changes"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
