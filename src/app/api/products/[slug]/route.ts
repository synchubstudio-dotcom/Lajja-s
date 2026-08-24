import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

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
