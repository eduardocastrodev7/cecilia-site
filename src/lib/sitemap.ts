import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

const POSTS_PER_SITEMAP = 50000; // Limite do sitemap XML
const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

/**
 * Calcula o número de páginas de sitemap necessárias
 */
export async function getSitemapPageCount(): Promise<number> {
  await connectDB();
  const totalPosts = await Post.countDocuments({ published: true });
  return Math.ceil(totalPosts / POSTS_PER_SITEMAP);
}

/**
 * Gera XML do sitemap index
 * Inclui sitemap-fixed.xml quando existir (páginas fixas); no futuro podem ser adicionadas mais.
 */
export function generateSitemapIndex(
  fixedMapExists: boolean,
  totalPages: number
): string {
  const sitemaps: string[] = [];

  if (fixedMapExists) {
    sitemaps.push(`${BASE_URL}/sitemap-fixed.xml`);
  }

  for (let i = 1; i <= totalPages; i++) {
    sitemaps.push(`${BASE_URL}/sitemap-blog/${i}`);
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return sitemapIndex;
}

/**
 * Gera XML de uma página de sitemap com posts
 */
export async function generateBlogSitemapPage(page: number): Promise<string> {
  await connectDB();

  const skip = (page - 1) * POSTS_PER_SITEMAP;

  const posts = await Post.find({ published: true })
    .select("_id urlName updatedAt createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(POSTS_PER_SITEMAP)
    .lean();

  const urls = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post._id.toString()}/${post.urlName}`;
      const lastmod = new Date(post.updatedAt || (post as any).createdAt)
        .toISOString()
        .split("T")[0];
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemap;
}
