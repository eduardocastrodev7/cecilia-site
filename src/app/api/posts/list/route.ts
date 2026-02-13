import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export const dynamic = 'force-dynamic';

/**
 * Rota pública para listar posts com paginação
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Valida parâmetros
    if (page < 1) {
      return NextResponse.json(
        { error: 'Página deve ser maior que 0' },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit deve estar entre 1 e 100' },
        { status: 400 }
      );
    }

    await connectDB();

    // Calcula skip
    const skip = (page - 1) * limit;

    // Busca posts publicados
    const [posts, total] = await Promise.all([
      Post.find({ published: true })
        .select('_id title urlName imageUrl createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments({ published: true }),
    ]);

    return NextResponse.json(
      {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        posts: posts.map((post) => ({
          _id: post._id.toString(),
          title: post.title,
          urlName: post.urlName,
          imageUrl: post.imageUrl,
          createdAt: post.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('List posts error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

