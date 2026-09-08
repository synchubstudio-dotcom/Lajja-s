import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/product-catalog";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}
