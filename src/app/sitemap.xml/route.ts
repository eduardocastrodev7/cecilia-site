import { existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { getSitemapPageCount, generateSitemapIndex } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalida a cada 1 hora

export async function GET() {
  try {
    const totalPages = await getSitemapPageCount();
    const fixedMapPath = join(process.cwd(), 'public', 'fixedMap.xml');
    const fixedMapExists = existsSync(fixedMapPath);
    const sitemapIndex = generateSitemapIndex(fixedMapExists, totalPages);

    return new NextResponse(sitemapIndex, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Sitemap index generation error:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

