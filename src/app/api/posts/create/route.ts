import { getAuthSession, requireAuth } from "@/lib/middleware";
import connectDB from "@/lib/mongodb";
import { uploadImageToGCS } from "@/lib/gcs";
import { createPostSchema } from "@/lib/validation";
import type { IContent } from "@/models/Post";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Rota privada para criar post
 */
export async function POST(request: NextRequest) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string | null;
    const urlName = formData.get("urlName") as string;
    const contentStr = formData.get("content") as string;
    const image = formData.get("image") as File | null;
    const keywordsStr = formData.get("keywords") as string | null;
    const metaDescription = formData.get("metaDescription") as string | null;
    const metaTitle = formData.get("metaTitle") as string | null;
    const metaImage = formData.get("metaImage") as string | null;
    const metaImageAlt = formData.get("metaImageAlt") as string | null;

    if (!title || !urlName || !contentStr) {
      return NextResponse.json(
        { error: "Título, urlName e conteúdo são obrigatórios" },
        { status: 400 }
      );
    }

    let content: IContent[];
    try {
      const parsed = JSON.parse(contentStr);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Content deve ser um array não vazio");
      }
      content = parsed;
    } catch {
      return NextResponse.json(
        { error: "Content deve ser um array JSON válido de blocos IContent" },
        { status: 400 }
      );
    }

    let imageUrl = "/images/about-cover.jpg";
    if (image && image.size > 0) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadImageToGCS(
        imageBuffer,
        image.type,
        "blog"
      );
      imageUrl = uploadResult.url;
    }

    const validationResult = createPostSchema.safeParse({
      title,
      subtitle: subtitle && subtitle.trim() ? subtitle.trim() : undefined,
      urlName,
      content,
      imageUrl,
      keywords:
        keywordsStr?.trim() ? keywordsStr.split(",").map((k) => k.trim()) : [],
      metaDescription: metaDescription?.trim() || undefined,
      metaTitle: metaTitle?.trim() || undefined,
      metaImage: metaImage?.trim() || undefined,
      metaImageAlt: metaImageAlt?.trim() || undefined,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    await connectDB();

    const existingPost = await Post.findOne({
      urlName: validationResult.data.urlName,
    });
    if (existingPost) {
      return NextResponse.json(
        { error: "URL name already exists. Choose another." },
        { status: 409 }
      );
    }

    const postData: Record<string, unknown> = {
      title: validationResult.data.title,
      urlName: validationResult.data.urlName,
      content: validationResult.data.content,
      imageUrl: validationResult.data.imageUrl,
      authorId: session.user.id,
      published: true,
    };

    if (validationResult.data.subtitle?.trim()) {
      postData.subtitle = validationResult.data.subtitle.trim();
    }
    if (validationResult.data.keywords?.length) {
      postData.keywords = validationResult.data.keywords;
    }
    if (validationResult.data.metaDescription) {
      postData.metaDescription = validationResult.data.metaDescription;
    }
    if (validationResult.data.metaTitle) {
      postData.metaTitle = validationResult.data.metaTitle;
    }
    if (validationResult.data.metaImage) {
      postData.metaImage = validationResult.data.metaImage;
    }
    if (validationResult.data.metaImageAlt) {
      postData.metaImageAlt = validationResult.data.metaImageAlt;
    }

    const post = await Post.create(postData);

    revalidatePath("/sitemap.xml");
    revalidatePath("/blog");

    return NextResponse.json(
      {
        success: true,
        message: "Post criado com sucesso",
        post: {
          _id: post._id.toString(),
          title: post.title,
          urlName: post.urlName,
          imageUrl: post.imageUrl,
          createdAt: post.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
