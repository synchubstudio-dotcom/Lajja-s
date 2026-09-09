import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { CATEGORIES } from "@/data/categories";

async function allowed() { return (await getSession())?.role === "admin"; }

export async function GET() {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const collection = (await getDatabase()).collection("categories");
  if (await collection.countDocuments() === 0) {
    await collection.insertMany(CATEGORIES.map((category) => ({ ...category, createdAt: new Date(), updatedAt: new Date() })));
  }
  const categories = await collection.find().sort({ name: 1 }).toArray();
  return NextResponse.json({ categories: categories.map(({ _id, ...category }) => ({ ...category, _id: _id.toString() })) });
}

export async function POST(request: Request) {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const category = await request.json();
  if (!category.name || !category.slug) return NextResponse.json({ message: "Name and slug are required." }, { status: 400 });
  const result = await (await getDatabase()).collection("categories").insertOne({ ...category, createdAt: new Date(), updatedAt: new Date() });
  return NextResponse.json({ id: result.insertedId.toString() });
}

export async function PUT(request: Request) {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { id, ...changes } = await request.json();
  const categoryId = typeof id === "string" ? id : id?.$oid;
  if (!categoryId || !ObjectId.isValid(categoryId)) return NextResponse.json({ message: "Valid category id is required." }, { status: 400 });
  await (await getDatabase()).collection("categories").updateOne({ _id: new ObjectId(categoryId) }, { $set: { ...changes, updatedAt: new Date() } });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  if (!(await allowed())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { id } = await request.json();
  const categoryId = typeof id === "string" ? id : id?.$oid;
  if (!categoryId || !ObjectId.isValid(categoryId)) return NextResponse.json({ message: "Valid category id is required." }, { status: 400 });
  await (await getDatabase()).collection("categories").deleteOne({ _id: new ObjectId(categoryId) });
  return NextResponse.json({ success: true });
}
