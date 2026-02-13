import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalida a cada 24 horas (conteúdo estático)

export async function GET() {
  try {
    const fixedMapPath = join(process.cwd(), 'public', 'fixedMap.xml');
    if (!existsSync(fixedMapPath)) {
      return new NextResponse('Fixed sitemap not found', { status: 404 });
    }
    const fixedMapContent = readFileSync(fixedMapPath, 'utf-8');

    // Substitui localhost pela URL base se necessário
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const content = fixedMapContent.replace(/http:\/\/localhost:3000/g, baseUrl);

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Fixed sitemap error:', error);
    return new NextResponse('Error loading fixed sitemap', { status: 500 });
  }
}
