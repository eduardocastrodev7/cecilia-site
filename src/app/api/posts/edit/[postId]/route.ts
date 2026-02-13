import { getAuthSession, requireAuth } from "@/lib/middleware";
import connectDB from "@/lib/mongodb";
import {
  deleteImageFromGCS,
  extractGCSKeyFromUrl,
  uploadImageToGCS,
} from "@/lib/gcs";
import { editPostSchema } from "@/lib/validation";
import type { IContent } from "@/models/Post";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Rota privada para editar post
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = params;
    await connectDB();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;
    const urlName = formData.get("urlName") as string | null;
    const contentStr = formData.get("content") as string | null;
    const image = formData.get("image") as File | null;
    const publishedStr = formData.get("published") as string | null;
    const keywordsStr = formData.get("keywords") as string | null;
    const metaDescription = formData.get("metaDescription") as string | null;
    const metaTitle = formData.get("metaTitle") as string | null;
    const metaImage = formData.get("metaImage") as string | null;
    const metaImageAlt = formData.get("metaImageAlt") as string | null;

    const updateData: Record<string, unknown> = {};

    if (title) updateData.title = title;
    if (subtitle !== null) {
      updateData.subtitle =
        subtitle && subtitle.trim() ? subtitle.trim() : undefined;
    }
    if (urlName) updateData.urlName = urlName;
    if (contentStr) {
      try {
        const parsed = JSON.parse(contentStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          updateData.content = parsed as IContent[];
        }
      } catch {
        return NextResponse.json(
          { error: "Content deve ser um array JSON válido de blocos IContent" },
          { status: 400 }
        );
      }
    }
    if (keywordsStr !== null) {
      updateData.keywords = keywordsStr.trim()
        ? keywordsStr.split(",").map((k) => k.trim())
        : [];
    }
    if (metaDescription !== null) {
      updateData.metaDescription = metaDescription?.trim() || undefined;
    }
    if (metaTitle !== null) {
      updateData.metaTitle = metaTitle?.trim() || undefined;
    }
    if (metaImage !== null) {
      updateData.metaImage = metaImage?.trim() || undefined;
    }
    if (metaImageAlt !== null) {
      updateData.metaImageAlt = metaImageAlt?.trim() || undefined;
    }

    if (Object.keys(updateData).length > 0) {
      const validationResult = editPostSchema.safeParse(updateData);
      if (!validationResult.success) {
        return NextResponse.json(
          { error: "Dados inválidos", details: validationResult.error.errors },
          { status: 400 }
        );
      }

      if (
        validationResult.data.urlName &&
        validationResult.data.urlName !== post.urlName
      ) {
        const existingPost = await Post.findOne({
          urlName: validationResult.data.urlName,
        });
        if (existingPost) {
          return NextResponse.json(
            { error: "URL name já existe. Escolha outro." },
            { status: 409 }
          );
        }
        post.urlName = validationResult.data.urlName;
      }

      if (validationResult.data.title) post.title = validationResult.data.title;
      if ("subtitle" in updateData) {
        post.subtitle = (validationResult.data.subtitle?.trim() as string) || undefined;
      }
      if (validationResult.data.content) {
        post.content = validationResult.data.content as unknown as IContent[];
      }
      if (validationResult.data.keywords !== undefined) {
        post.keywords = validationResult.data.keywords;
      }
      if (validationResult.data.metaDescription !== undefined) {
        post.metaDescription = validationResult.data.metaDescription;
      }
      if (validationResult.data.metaTitle !== undefined) {
        post.metaTitle = validationResult.data.metaTitle;
      }
      if (validationResult.data.metaImage !== undefined) {
        post.metaImage = validationResult.data.metaImage;
      }
      if (validationResult.data.metaImageAlt !== undefined) {
        post.metaImageAlt = validationResult.data.metaImageAlt;
      }
    }

    if (publishedStr !== null) {
      post.published = publishedStr === "true";
    }

    if (image && image.size > 0) {
      const oldImageKey = extractGCSKeyFromUrl(post.imageUrl);
      if (oldImageKey) {
        try {
          await deleteImageFromGCS(oldImageKey);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadImageToGCS(
        imageBuffer,
        image.type,
        "blog"
      );
      post.imageUrl = uploadResult.url;
    }

    await post.save();

    revalidatePath("/sitemap.xml");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}/${post.urlName}`);

    return NextResponse.json(
      {
        success: true,
        message: "Post atualizado com sucesso",
        post: {
          _id: post._id.toString(),
          title: post.title,
          urlName: post.urlName,
          imageUrl: post.imageUrl,
          updatedAt: post.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Edit post error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
