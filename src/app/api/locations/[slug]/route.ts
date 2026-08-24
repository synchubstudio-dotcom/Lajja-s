import { NextResponse } from "next/server";
import { LOCATIONS } from "@/data/locations";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    return NextResponse.json(
      { success: false, message: "Location not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: location,
  });
}
