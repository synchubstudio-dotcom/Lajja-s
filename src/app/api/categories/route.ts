import { NextResponse } from "next/server";
import { getCatalogCategories } from "@/lib/category-catalog";

export async function GET() {
  const categories = await getCatalogCategories();
  return NextResponse.json({
    success: true,
    total: categories.length,
    data: categories,
  });
}
