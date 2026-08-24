import { NextResponse } from "next/server";
import { LOCATIONS } from "@/data/locations";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: LOCATIONS.length,
    data: LOCATIONS,
  });
}
