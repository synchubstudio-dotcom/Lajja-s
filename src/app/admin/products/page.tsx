"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw, 
  Search, 
  ImageIcon, 
  Tag, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Code2, 
  X,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";
import { Product, PackOption } from "@/types/product";

type ProductRecord = Partial<Product> & { _id?: string };

const DEFAULT_CATEGORIES = [
  { slug: "thepla", name: "Thepla" },
  { slug: "khakhra", name: "Khakhra" },
  { slug: "khari-sing-chana", name: "Khari Sing & Chana" },
  { slug: "roasted-peanuts", name: "Roasted Peanuts" },
  { slug: "combo-packs", name: "Combo Packs" },
];

const PRESET_DIETARY_TAGS = [
  "100% Vegetarian",
  "No Added Preservatives",
  "Zero Maida",
  "Travel Ready",
  "Jain Friendly Available",
  "Vacuum Sealed",
  "Cold-Pressed Spices",
  "Stone-Ground Wheat",
];

const initialProductState: ProductRecord = {
  name: "",
  gujaratiName: "",
  slug: "",
  categorySlug: "thepla",
  categoryName: "Thepla",
  shortDescription: "",
  description: "",
  price: 150,
  compareAtPrice: 180,
  sku: "",
  inStock: true,
  stockCount: 50,
  featured: false,
  bestSeller: false,
  shelfLife: "20 Days in Ambient, 45 Days Refrigerated",
  storageInstructions: "Store unopened pack in a cool, dry place away from direct sunlight.",
  shippingInfo: "Cooked fresh to order in Vadodara. Dispatched in tamper-evident vacuum pouches within 24 hours.",
  images: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Thepla_2.jpg",
      alt: "Product image",
      isPrimary: true,
    },
  ],
  packOptions: [
    {
      size: "Pack of 10 (approx. 250g)",
      weightGrams: 250,
      price: 150,
      compareAtPrice: 180,
      sku: "LJ-PACK-10",
      inStock: true,
    },
  ],
  ingredients: ["Stone-Ground Whole Wheat Flour", "Pure Groundnut Oil", "Turmeric", "Rock Salt"],
  dietaryTags: ["100% Vegetarian", "No Added Preservatives", "Zero Maida"],
  nutrition: {
    servingSize: "2 Pieces (approx. 50g)",
    calories: 145,
    protein: "3.5g",
    carbohydrates: "22g",
    fat: "5g",
  },
  highlights: [],
  faqs: [],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>(DEFAULT_CATEGORIES);
  const [formData, setFormData] = useState<ProductRecord>(initialProductState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "pricing" | "packs" | "media" | "details" | "faq" | "json">("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [rawJson, setRawJson] = useState("");

  async function loadProducts() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/products", { cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        showNotification("error", data.message || "Unable to load products.");
        return;
      }
      setProducts(data.products || []);
    } catch {
      showNotification("error", "Failed to connect to the database.");
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const response = await fetch("/api/admin/categories/", { cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (response.ok && Array.isArray(data.categories) && data.categories.length > 0) {
        const mapped = data.categories.map((c: { slug: string; name: string }) => ({
          slug: c.slug,
          name: c.name,
        }));
        setCategories(mapped);
      }
    } catch {
      // Keep DEFAULT_CATEGORIES
    }
  }

  useEffect(() => {
    void loadProducts();
    void loadCategories();
  }, []);

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
    }));
  }

  function editProduct(product: ProductRecord) {
    const id = String(product._id ?? product.id ?? "");
    setEditingId(id);
    setFormData({
      ...initialProductState,
      ...product,
      images: Array.isArray(product.images) && product.images.length > 0 
        ? product.images 
        : [{ url: "", alt: product.name || "", isPrimary: true }],
      packOptions: Array.isArray(product.packOptions) && product.packOptions.length > 0 
        ? product.packOptions 
        : initialProductState.packOptions,
      ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
      dietaryTags: Array.isArray(product.dietaryTags) ? product.dietaryTags : [],
      highlights: Array.isArray(product.highlights) ? product.highlights : [],
      faqs: Array.isArray(product.faqs) ? product.faqs : [],
      nutrition: product.nutrition || initialProductState.nutrition,
    });
    setRawJson(JSON.stringify(product, null, 2));
    setActiveTab("general");
    showNotification("success", `Loaded "${product.name}" for editing.`);
  }

  function resetForm() {
    setEditingId(null);
    setFormData(initialProductState);
    setRawJson("");
    setActiveTab("general");
  }

  async function saveProduct(e?: React.FormEvent) {
    if (e) e.preventDefault();

    if (!formData.name?.trim()) {
      showNotification("error", "Please provide a product name.");
      setActiveTab("general");
      return;
    }
    if (!formData.slug?.trim()) {
      showNotification("error", "Product slug is required.");
      setActiveTab("general");
      return;
    }
    if (!formData.categorySlug) {
      showNotification("error", "Please select a category.");
      setActiveTab("general");
      return;
    }

    setSaving(true);
    try {
      let payload: ProductRecord;
      if (activeTab === "json" && rawJson.trim()) {
        try {
          payload = JSON.parse(rawJson);
        } catch {
          showNotification("error", "Invalid JSON syntax. Please fix or switch back to the Form tab.");
          setSaving(false);
          return;
        }
      } else {
        payload = {
          ...formData,
          price: Number(formData.price) || 0,
          compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
          stockCount: Number(formData.stockCount) || 0,
          packOptions: (formData.packOptions || []).map((p) => ({
            ...p,
            weightGrams: Number(p.weightGrams) || 0,
            price: Number(p.price) || 0,
            compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : undefined,
          })),
        };
      }

      const { _id, id, ...cleanPayload } = payload;
      const response = await fetch("/api/admin/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...cleanPayload } : cleanPayload),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        showNotification("success", editingId ? "Product updated successfully!" : "New product created successfully!");
        resetForm();
        await loadProducts();
      } else {
        showNotification("error", data.message || "Failed to save product.");
      }
    } catch {
      showNotification("error", "Network error while saving product.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id: string, name?: string) {
    if (!confirm(`Are you sure you want to permanently delete "${name || "this product"}"?`)) return;

    try {
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        showNotification("success", "Product deleted.");
        if (editingId === id) resetForm();
        await loadProducts();
      } else {
        const data = await response.json().catch(() => ({}));
        showNotification("error", data.message || "Failed to delete product.");
      }
    } catch {
      showNotification("error", "Network error while deleting product.");
    }
  }

  // Variant Helpers
  function addPackOption() {
    const newPack: PackOption = {
      size: "Pack of 20 (approx. 500g)",
      weightGrams: 500,
      price: (formData.price || 150) * 2 - 20,
      sku: `${formData.sku || "LJ"}-500G`,
      inStock: true,
    };
    setFormData((prev) => ({
      ...prev,
      packOptions: [...(prev.packOptions || []), newPack],
    }));
  }

  function updatePackOption(index: number, field: keyof PackOption, value: unknown) {
    setFormData((prev) => {
      const updated = [...(prev.packOptions || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, packOptions: updated };
    });
  }

  function removePackOption(index: number) {
    setFormData((prev) => ({
      ...prev,
      packOptions: (prev.packOptions || []).filter((_, i) => i !== index),
    }));
  }

  // Image Helpers
  function addImageRow() {
    setFormData((prev) => ({
      ...prev,
      images: [
        ...(prev.images || []),
        { url: "", alt: prev.name || "Product image", isPrimary: false },
      ],
    }));
  }

  function updateImageRow(index: number, field: "url" | "alt" | "isPrimary", value: unknown) {
    setFormData((prev) => {
      const updated = [...(prev.images || [])];
      if (field === "isPrimary" && value === true) {
        updated.forEach((img, i) => {
          img.isPrimary = i === index;
        });
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, images: updated };
    });
  }

  function removeImageRow(index: number) {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  }

  // FAQ Helpers
  function addFaqRow() {
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: "", answer: "" }],
    }));
  }

  function updateFaqRow(index: number, field: "question" | "answer", value: string) {
    setFormData((prev) => {
      const updated = [...(prev.faqs || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, faqs: updated };
    });
  }

  function removeFaqRow(index: number) {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  }

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        !searchQuery ||
        prod.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        filterCategory === "all" || prod.categorySlug === filterCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, filterCategory]);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb Navigation */}
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
              Manage Products
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/categories/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              Manage Categories
            </Link>
            <button
              onClick={() => resetForm()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1f5a3d] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#184730] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Product
            </button>
          </div>
        </div>

        {/* Page Title & Stats */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Product Catalog
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Create, edit, or remove traditional snacks and pack options using simple form fields.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-xl px-4 py-2.5 shadow-2xs">
            <Package className="w-4 h-4 text-[#1f5a3d]" />
            <span>Total Catalog Products:</span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 font-bold text-stone-900">
              {products.length}
            </span>
          </div>
        </div>

        {/* Notification Toast */}
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

        {/* Main 2-Column Responsive Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Left Column: Product Directory */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by name, slug, or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/20 focus:border-[#1f5a3d]"
                  />
                </div>
                <button
                  onClick={() => void loadProducts()}
                  disabled={loading}
                  title="Refresh products"
                  className="p-2 text-stone-600 hover:text-[#1f5a3d] rounded-lg border border-stone-200 hover:bg-stone-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors shrink-0 ${
                    filterCategory === "all"
                      ? "bg-[#1f5a3d] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  All ({products.length})
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.categorySlug === c.slug).length;
                  return (
                    <button
                      key={c.slug}
                      onClick={() => setFilterCategory(c.slug)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors shrink-0 ${
                        filterCategory === c.slug
                          ? "bg-[#1f5a3d] text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {c.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Card List */}
            <div className="space-y-3 max-h-[820px] overflow-y-auto pr-1">
              {loading && products.length === 0 && (
                <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#1f5a3d] mb-2" />
                  Loading products...
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">
                  No products matched your search.
                </div>
              )}

              {filteredProducts.map((product) => {
                const id = String(product._id ?? product.id ?? "");
                const isSelected = editingId === id;
                const primaryImage =
                  product.images?.find((img) => img.isPrimary)?.url ||
                  product.images?.[0]?.url;

                return (
                  <div
                    key={id}
                    className={`group relative rounded-2xl border transition-all p-4 bg-white ${
                      isSelected
                        ? "border-[#1f5a3d] ring-2 ring-[#1f5a3d]/20 shadow-md"
                        : "border-stone-200 hover:border-stone-300 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {primaryImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={primaryImage}
                            alt={product.name || ""}
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
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-bold text-sm text-[#1f5a3d]">
                              ₹{product.price}
                            </span>
                            {product.compareAtPrice && product.compareAtPrice > (product.price || 0) && (
                              <span className="text-[11px] text-stone-400 line-through">
                                ₹{product.compareAtPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        {product.gujaratiName && (
                          <p className="text-xs text-stone-500 font-medium">
                            {product.gujaratiName}
                          </p>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600 uppercase">
                            {product.categorySlug}
                          </span>

                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              product.inStock !== false
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {product.inStock !== false ? "In Stock" : "Out of Stock"}
                          </span>

                          {product.featured && (
                            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                              Featured
                            </span>
                          )}

                          {product.bestSeller && (
                            <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                              Best Seller
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 font-mono">
                        slug: /{product.slug}/
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => editProduct(product)}
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
                          onClick={() => deleteProduct(id, product.name)}
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

          {/* Right Column: Intuitive Product Form */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sticky top-8">
            {/* Form Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#1f5a3d]/10 p-2 text-[#1f5a3d]">
                  {editingId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
                <div>
                  <h2 className="font-bold text-base text-stone-900">
                    {editingId ? "Edit Product" : "Create New Product"}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {editingId ? `Editing ID: ${editingId}` : "Fill out the fields to publish to store"}
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

            {/* Tab Navigation */}
            <div className="mt-4 flex gap-1 border-b border-stone-200 overflow-x-auto pb-px text-xs font-bold scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "general"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                1. Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pricing")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "pricing"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                2. Price & Inventory
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("packs")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "packs"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                3. Pack Sizes ({formData.packOptions?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "media"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                4. Images ({formData.images?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "details"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                5. Dietary & Shelf Life
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("faq")}
                className={`py-2 px-3 border-b-2 transition-colors shrink-0 ${
                  activeTab === "faq"
                    ? "border-[#1f5a3d] text-[#1f5a3d]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                6. FAQ & Highlights
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

            {/* Form Body */}
            <form onSubmit={saveProduct} className="mt-5 space-y-4">
              {/* TAB 1: GENERAL INFO */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. Methi Thepla"
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
                        placeholder="e.g. મેથી થેપલા"
                        className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Store Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.categorySlug || "thepla"}
                        onChange={(e) => {
                          const cat = categories.find((c) => c.slug === e.target.value);
                          setFormData({
                            ...formData,
                            categorySlug: e.target.value as Product["categorySlug"],
                            categoryName: cat?.name || e.target.value,
                          });
                        }}
                        className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm bg-white focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name} ({c.slug})
                          </option>
                        ))}
                      </select>
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
                        placeholder="e.g. methi-thepla"
                        className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm font-mono focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Short Tagline Description
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription || ""}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="One-line summary for cards and search results..."
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Full Description & Story
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed product story, craftsmanship, traditional preparation method..."
                      className="w-full rounded-xl border border-stone-200 p-3 text-sm focus:border-[#1f5a3d] focus:outline-none focus:ring-2 focus:ring-[#1f5a3d]/10"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING & INVENTORY */}
              {activeTab === "pricing" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Base Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="number"
                          required
                          min="0"
                          value={formData.price ?? ""}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-sm font-bold text-stone-900 focus:border-[#1f5a3d] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Original / Strikethrough Price (₹)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="number"
                          min="0"
                          value={formData.compareAtPrice ?? ""}
                          onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value ? Number(e.target.value) : undefined })}
                          placeholder="Optional discount"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-[#1f5a3d] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Stock Units
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stockCount ?? 50}
                        onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-[#1f5a3d] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={formData.sku || ""}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                      placeholder="e.g. LJ-THP-MTH-01"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2 text-sm font-mono focus:border-[#1f5a3d] focus:outline-none"
                    />
                  </div>

                  {/* Badges and Toggles */}
                  <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Product Status & Badges
                    </h4>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-stone-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.inStock !== false}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                          className="h-4 w-4 rounded text-[#1f5a3d] focus:ring-[#1f5a3d]"
                        />
                        <span className="text-xs font-bold text-stone-800">In Stock</span>
                      </label>

                      <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-stone-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="h-4 w-4 rounded text-[#1f5a3d] focus:ring-[#1f5a3d]"
                        />
                        <span className="text-xs font-bold text-amber-800">Featured Card</span>
                      </label>

                      <label className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-stone-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!formData.bestSeller}
                          onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                          className="h-4 w-4 rounded text-[#1f5a3d] focus:ring-[#1f5a3d]"
                        />
                        <span className="text-xs font-bold text-purple-800">Best Seller Tag</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PACK SIZES (VARIANTS) */}
              {activeTab === "packs" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-stone-800">Pack Options / Weight Variants</h3>
                      <p className="text-[11px] text-stone-500">Configure different weight packs customers can select.</p>
                    </div>
                    <button
                      type="button"
                      onClick={addPackOption}
                      className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700 hover:bg-stone-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Pack Variant
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.packOptions?.map((pack, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-700">
                            Pack #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removePackOption(idx)}
                            className="text-stone-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Size Label (e.g. &quot;Pack of 10 (approx. 250g)&quot;)
                            </label>
                            <input
                              type="text"
                              value={pack.size}
                              onChange={(e) => updatePackOption(idx, "size", e.target.value)}
                              className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Weight (Grams)
                            </label>
                            <input
                              type="number"
                              value={pack.weightGrams}
                              onChange={(e) => updatePackOption(idx, "weightGrams", Number(e.target.value))}
                              className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Price (₹)
                            </label>
                            <input
                              type="number"
                              value={pack.price}
                              onChange={(e) => updatePackOption(idx, "price", Number(e.target.value))}
                              className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Original Price (₹)
                            </label>
                            <input
                              type="number"
                              value={pack.compareAtPrice ?? ""}
                              onChange={(e) => updatePackOption(idx, "compareAtPrice", e.target.value ? Number(e.target.value) : undefined)}
                              className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Pack SKU
                            </label>
                            <input
                              type="text"
                              value={pack.sku || ""}
                              onChange={(e) => updatePackOption(idx, "sku", e.target.value)}
                              className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: IMAGES */}
              {activeTab === "media" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-stone-800">Product Images</h3>
                      <p className="text-[11px] text-stone-500">Provide image URLs and choose the primary hero cover.</p>
                    </div>
                    <button
                      type="button"
                      onClick={addImageRow}
                      className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700 hover:bg-stone-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Image
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.images?.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                      >
                        {/* Preview */}
                        <div className="w-16 h-16 rounded-lg bg-stone-200 border border-stone-300 overflow-hidden shrink-0 flex items-center justify-center">
                          {img.url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-stone-400" />
                          )}
                        </div>

                        {/* Fields */}
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            placeholder="Image URL (e.g. Cloudinary, Wikimedia, or /images/...)"
                            value={img.url}
                            onChange={(e) => updateImageRow(idx, "url", e.target.value)}
                            className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs focus:outline-none"
                          />
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              placeholder="Alt text description"
                              value={img.alt}
                              onChange={(e) => updateImageRow(idx, "alt", e.target.value)}
                              className="flex-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs focus:outline-none"
                            />
                            <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer shrink-0">
                              <input
                                type="radio"
                                name="primaryImageRadio"
                                checked={!!img.isPrimary}
                                onChange={() => updateImageRow(idx, "isPrimary", true)}
                                className="text-[#1f5a3d]"
                              />
                              <span className="font-bold text-[11px]">Primary</span>
                            </label>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => removeImageRow(idx)}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DIETARY, INGREDIENTS & SHELF LIFE */}
              {activeTab === "details" && (
                <div className="space-y-4">
                  {/* Dietary Tags */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Dietary Tags (Quick Click to Add / Remove)
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {PRESET_DIETARY_TAGS.map((tag) => {
                        const isSelected = formData.dietaryTags?.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              const current = formData.dietaryTags || [];
                              setFormData({
                                ...formData,
                                dietaryTags: isSelected
                                  ? current.filter((t) => t !== tag)
                                  : [...current, tag],
                              });
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                              isSelected
                                ? "bg-[#1f5a3d] text-white"
                                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }`}
                          >
                            {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Ingredients (Comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      value={(formData.ingredients || []).join(", ")}
                      onChange={(e) => {
                        const list = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        setFormData({ ...formData, ingredients: list });
                      }}
                      placeholder="e.g. Stone-Ground Whole Wheat Flour, Fresh Fenugreek, Pure Curd, Groundnut Oil"
                      className="w-full rounded-xl border border-stone-200 p-2.5 text-xs focus:outline-none"
                    />
                  </div>

                  {/* Shelf Life & Storage */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Shelf Life Guarantee
                      </label>
                      <input
                        type="text"
                        value={formData.shelfLife || ""}
                        onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                        placeholder="e.g. 20 Days Ambient, 45 Days Refrigerated"
                        className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Shipping Guarantee
                      </label>
                      <input
                        type="text"
                        value={formData.shippingInfo || ""}
                        onChange={(e) => setFormData({ ...formData, shippingInfo: e.target.value })}
                        placeholder="e.g. Dispatched within 24 hours in vacuum pouch"
                        className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Storage Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.storageInstructions || ""}
                      onChange={(e) => setFormData({ ...formData, storageInstructions: e.target.value })}
                      placeholder="e.g. Store in cool, dry place. Seal in container once opened."
                      className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: FAQ & HIGHLIGHTS */}
              {activeTab === "faq" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-stone-800">Frequently Asked Questions</h3>
                      <p className="text-[11px] text-stone-500">Provide answers for common buyer questions.</p>
                    </div>
                    <button
                      type="button"
                      onClick={addFaqRow}
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
                          <span className="text-xs font-bold text-stone-700">Question #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeFaqRow(idx)}
                            className="text-stone-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Question (e.g. How long does this last during travel?)"
                          value={faq.question}
                          onChange={(e) => updateFaqRow(idx, "question", e.target.value)}
                          className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          placeholder="Answer description..."
                          value={faq.answer}
                          onChange={(e) => updateFaqRow(idx, "answer", e.target.value)}
                          className="w-full rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: RAW JSON (DEVELOPER FALLBACK) */}
              {activeTab === "json" && (
                <div className="space-y-2">
                  <p className="text-xs text-stone-500">
                    Direct JSON representation of this product. Useful for pasting batch properties.
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
                    ? "Saving product..."
                    : editingId
                    ? "Save Changes"
                    : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
