import { requireAuth } from "@/lib/middleware";
import connectDB from "@/lib/mongodb";
import { deleteImageFromGCS, extractGCSKeyFromUrl } from "@/lib/gcs";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Rota pública para buscar post completo por ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

    await connectDB();

    const post = await Post.findOne({
      _id: postId,
      published: true,
    })
      .populate("authorId", "email name")
      .lean();

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        _id: post._id.toString(),
        title: post.title,
        urlName: post.urlName,
        content: post.content,
        imageUrl: post.imageUrl,
        authorId: post.authorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * Rota privada para deletar post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const { postId } = params;

    await connectDB();

    // Busca post
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Deleta imagem do GCS (se for URL GCS)
    const imageKey = extractGCSKeyFromUrl(post.imageUrl);
    if (imageKey) {
      try {
        await deleteImageFromGCS(imageKey);
      } catch (error) {
        console.error("Error deleting image from GCS:", error);
        // Continua mesmo se falhar ao deletar a imagem
      }
    }

    // Deleta post
    await Post.findByIdAndDelete(postId);

    // Invalida cache
    revalidatePath("/sitemap.xml");
    revalidatePath("/blog");

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
