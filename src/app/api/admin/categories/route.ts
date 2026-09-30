import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { getCatalogCategories, normalizeCategoryRecord } from "@/lib/category-catalog";
import { SITE_CONFIG } from "@/lib/constants";
import { Category } from "@/types/category";

async function allowed() { return (await getSession())?.role === "admin"; }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function categoryFilter(id: unknown) {
  const categoryId = typeof id === "string" ? id : isRecord(id) && typeof id.$oid === "string" ? id.$oid : "";
  if (!categoryId) return null;
  return ObjectId.isValid(categoryId)
    ? { _id: new ObjectId(categoryId) }
    : { id: categoryId };
}

function isValidSlug(slug: string) {
  const reserved = new Set([
    "about-us", "admin", "api", "blog", "cart", "cancellation-policy", "checkout",
    "contact-us", "faq", "locations", "login", "my-account", "portfolio", "privacy-policy",
    "products", "register", "return-refund-policy", "shipping-policy", "terms-and-conditions",
  ]);
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && !reserved.has(slug);
}

function revalidateCategoryPages(...slugs: string[]) {
  for (const slug of new Set(slugs.filter(Boolean))) revalidatePath(`/${slug}/`);
  revalidatePath("/", "page");
  revalidatePath("/sitemap.xml");
}

export async function GET() {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  await getCatalogCategories();
  const collection = (await getDatabase()).collection("categories");
  const categories = await collection.find().sort({ name: 1 }).toArray();
  return NextResponse.json({ categories: categories.map(({ _id, ...category }) => ({ ...category, _id: _id.toString() })) });
}

export async function POST(request: Request) {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Category data must be valid JSON." }, { status: 400 });
  }

  let category: Category;
  try {
    if (!isRecord(input) || typeof input.name !== "string" || !input.name.trim()) {
      return NextResponse.json({ message: "Category name is required." }, { status: 400 });
    }
    const submittedSlug = typeof input.slug === "string" ? input.slug.trim().toLowerCase() : "";
    const generatedSlug = input.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    category = normalizeCategoryRecord({ ...input, slug: submittedSlug || generatedSlug });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Invalid category data." }, { status: 400 });
  }
  if (!isValidSlug(category.slug)) {
    return NextResponse.json({ message: "Category slug must use lowercase letters, numbers, and hyphens, and cannot use a reserved page name." }, { status: 400 });
  }

  const collection = (await getDatabase()).collection("categories");
  if (await collection.findOne({ slug: category.slug })) {
    return NextResponse.json({ message: "A category with this slug already exists." }, { status: 409 });
  }
  const result = await collection.insertOne({ ...category, createdAt: new Date(), updatedAt: new Date() });
  revalidateCategoryPages(category.slug);
  return NextResponse.json({ id: result.insertedId.toString() });
}

export async function PUT(request: Request) {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Category data must be valid JSON." }, { status: 400 });
  }
  if (!isRecord(input)) return NextResponse.json({ message: "Category data must be an object." }, { status: 400 });

  const filter = categoryFilter(input.id);
  if (!filter) return NextResponse.json({ message: "Category id is required." }, { status: 400 });

  const collection = (await getDatabase()).collection("categories");
  const existing = await collection.findOne(filter);
  if (!existing) return NextResponse.json({ message: "Category not found." }, { status: 404 });

  const changes = { ...input };
  delete changes.id;
  delete changes._id;
  let category: Category;
  try {
    category = normalizeCategoryRecord({ ...existing, ...changes });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Invalid category data." }, { status: 400 });
  }
  if (!isValidSlug(category.slug)) {
    return NextResponse.json({ message: "Category slug must use lowercase letters, numbers, and hyphens, and cannot use a reserved page name." }, { status: 400 });
  }
  if (await collection.findOne({ slug: category.slug, _id: { $ne: existing._id } })) {
    return NextResponse.json({ message: "A category with this slug already exists." }, { status: 409 });
  }
  if (category.slug !== existing.slug && !isRecord(changes.seo)) {
    category.seo.canonicalUrl = `${SITE_CONFIG.url}/${category.slug}/`;
  }

  const result = await collection.updateOne(filter, { $set: { ...category, updatedAt: new Date() } });
  if (!result.matchedCount) return NextResponse.json({ message: "Category not found." }, { status: 404 });
  revalidateCategoryPages(String(existing.slug), category.slug);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Category data must be valid JSON." }, { status: 400 });
  }
  if (!isRecord(input)) return NextResponse.json({ message: "Category data must be an object." }, { status: 400 });

  const filter = categoryFilter(input.id);
  if (!filter) return NextResponse.json({ message: "Category id is required." }, { status: 400 });

  const collection = (await getDatabase()).collection("categories");
  const existing = await collection.findOne(filter);
  if (!existing) return NextResponse.json({ message: "Category not found." }, { status: 404 });
  const result = await collection.deleteOne(filter);
  if (!result.deletedCount) return NextResponse.json({ message: "Category not found." }, { status: 404 });
  revalidateCategoryPages(String(existing.slug));
  return NextResponse.json({ success: true });
}
