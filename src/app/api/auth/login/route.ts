import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';

/**
 * Rota pública para validação de login
 * O login real deve ser feito através de /api/auth/signin do NextAuth
 * Esta rota pode ser usada para validação prévia dos dados
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Valida dados com Zod
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    // Retorna sucesso - o login real deve ser feito via NextAuth
    return NextResponse.json(
      { 
        message: 'Dados válidos. Use /api/auth/signin para fazer login.',
        valid: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login validation error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

