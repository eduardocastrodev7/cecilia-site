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
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find({ published: true })
        .select("_id title subtitle urlName imageUrl createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments({ published: true }),
    ]);

    const formattedPosts: BlogPost[] = posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      subtitle: post.subtitle,
      urlName: post.urlName,
      imageUrl: post.imageUrl,
      createdAt: post.createdAt,
    }));

    const hasMore = skip + limit < total;

    return NextResponse.json({
      posts: formattedPosts,
      total,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
