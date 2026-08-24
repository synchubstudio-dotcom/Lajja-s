import { NextResponse } from "next/server";
import { CATEGORIES } from "@/data/categories";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return NextResponse.json(
      { success: false, message: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: category,
  });
}
