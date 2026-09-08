import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/product-catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();
  const featured = searchParams.get("featured");

  let result = await getCatalogProducts();

  if (category) {
    result = result.filter((p) => p.categorySlug === category);
  }

  if (query) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.ingredients.some((i) => i.toLowerCase().includes(query))
    );
  }

  if (featured === "true") {
    result = result.filter((p) => p.featured || p.bestSeller);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
  });
}
