import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { createUserSchema } from '@/lib/validation';
import { createUser, getUserByEmail } from '@/lib/auth';
import connectDB from '@/lib/mongodb';

/**
 * Rota privada para criar usuário
 * Requer autenticação
 */
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();

    // Valida dados com Zod
    const validationResult = createUserSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { email, password, name } = validationResult.data;

    await connectDB();

    // Verifica se usuário já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      );
    }

    // Cria novo usuário
    const user = await createUser(email, password, name);

    return NextResponse.json(
      {
        success: true,
        message: 'Usuário criado com sucesso',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}



