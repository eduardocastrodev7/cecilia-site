import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface BlogPost {
  _id: string;
  title: string;
  subtitle?: string;
  urlName: string;
  imageUrl: string;
  createdAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const all = searchParams.get("all") === "true";

    if (!query.trim()) {
      return NextResponse.json({
        posts: [],
        total: 0,
      });
    }

    const searchRegex = new RegExp(query, "i");

    const searchFilter: any = {
      $or: [
        { title: { $regex: searchRegex } },
        { subtitle: { $regex: searchRegex } },
      ],
    };

    // Se não for busca admin, filtra apenas posts publicados
    if (!all) {
      searchFilter.published = true;
    }

    const [posts, total] = await Promise.all([
      Post.find(searchFilter)
        .select(
          "_id title subtitle urlName imageUrl createdAt published updatedAt"
        )
        .sort({ createdAt: -1 })
        .lean(),
      Post.countDocuments(searchFilter),
    ]);

    const formattedPosts: any[] = posts.map((post: any) => ({
      _id: post._id.toString(),
      title: post.title,
      subtitle: post.subtitle,
      urlName: post.urlName,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
      published: post.published,
      updatedAt: post.updatedAt,
    }));

    return NextResponse.json({
      posts: formattedPosts,
      total,
    });
  } catch (error) {
    console.error("Error searching posts:", error);
    return NextResponse.json(
      { error: "Failed to search posts" },
      { status: 500 }
    );
  }
}
