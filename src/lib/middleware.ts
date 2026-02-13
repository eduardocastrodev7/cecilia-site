import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';

/**
 * Verifica se o usuário está autenticado
 * Retorna a sessão do usuário ou null
 */
export async function getAuthSession() {
  return getServerSession(authOptions);
}

/**
 * Middleware para verificar autenticação em rotas privadas
 * Retorna NextResponse com erro 401 se não autenticado
 */
export async function requireAuth(request: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized. Please log in to continue.' },
      { status: 401 }
    );
  }

  return null; // Usuário autenticado
}

