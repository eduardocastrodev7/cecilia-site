import { requireAuth } from "@/lib/middleware";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Rota privada para listar todos os posts (admin)
 */
export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    await connectDB();

    // Busca todos os posts (publicados e não publicados)
    const posts = await Post.find()
      .select("_id title urlName imageUrl published createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        posts: posts.map((post) => ({
          _id: post._id.toString(),
          title: post.title,
          urlName: post.urlName,
          imageUrl: post.imageUrl,
          published: post.published,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin list posts error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
