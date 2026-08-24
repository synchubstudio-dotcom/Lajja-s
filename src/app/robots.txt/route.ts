import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET() {
  const robotsText = `User-agent: *
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /api/
Disallow: /search

Sitemap: ${SITE_CONFIG.url}/sitemap.xml
`;

  return new NextResponse(robotsText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
