import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { PRODUCTS } from "@/data/products";

async function requireAdmin() {
  const session = await getSession();
  return session?.role === "admin" ? session : null;
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  try {
    const collection = (await getDatabase()).collection("products");
    if (await collection.countDocuments() === 0) {
      await collection.insertMany(PRODUCTS.map((product) => ({ ...product, createdAt: new Date(), updatedAt: new Date() })));
    }
    const products = await collection.find().sort({ name: 1 }).toArray();
    return NextResponse.json({
      products: products.map(({ _id, ...product }) => ({ ...product, _id: _id.toString() })),
    });
  } catch (error) {
    console.error("Admin product listing failed:", error);
    return NextResponse.json({ message: "Products could not be loaded. Check the MongoDB connection." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  try {
    const product = await request.json();
    if (!product.name || !product.slug || !product.categorySlug) return NextResponse.json({ message: "Name, slug, and category are required." }, { status: 400 });
    const result = await (await getDatabase()).collection("products").insertOne({ ...product, _id: new ObjectId(), updatedAt: new Date() });
    return NextResponse.json({ id: result.insertedId.toString() });
  } catch (error) {
    console.error("Admin product creation failed:", error);
    return NextResponse.json({ message: "Product could not be added. Check the MongoDB connection and product data." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { id, ...changes } = await request.json();
  if (!id || !ObjectId.isValid(id)) return NextResponse.json({ message: "Valid product id is required." }, { status: 400 });
  try {
    const result = await (await getDatabase()).collection("products").updateOne({ _id: new ObjectId(id) }, { $set: { ...changes, updatedAt: new Date() } });
    if (!result.matchedCount) return NextResponse.json({ message: "Product not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin product update failed:", error);
    return NextResponse.json({ message: "Product could not be updated. Check the MongoDB connection." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const { id } = await request.json();
  if (!id || !ObjectId.isValid(id)) return NextResponse.json({ message: "Valid product id is required." }, { status: 400 });
  try {
    const result = await (await getDatabase()).collection("products").deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) return NextResponse.json({ message: "Product not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin product deletion failed:", error);
    return NextResponse.json({ message: "Product could not be deleted. Check the MongoDB connection." }, { status: 500 });
  }
}
