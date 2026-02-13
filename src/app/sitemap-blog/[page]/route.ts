import { generateBlogSitemapPage } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalida a cada 1 hora

interface RouteParams {
  params: Promise<{ page: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { page: pageParam } = await params;
    const page = parseInt(pageParam, 10);

    if (isNaN(page) || page < 1) {
      return new NextResponse("Invalid page number", { status: 400 });
    }

    const sitemap = await generateBlogSitemapPage(page);

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Blog sitemap page generation error:", error);
    return new NextResponse("Error generating blog sitemap page", {
      status: 500,
    });
  }
}
