import { NextResponse } from "next/server";
import { BLOG_ARTICLES } from "@/data/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = [...BLOG_ARTICLES];
  if (category) {
    result = result.filter((a) => a.categorySlug === category);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
  });
}
