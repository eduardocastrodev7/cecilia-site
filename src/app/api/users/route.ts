import { createUser } from "@/lib/auth";
import { requireAuth } from "@/lib/middleware";
import connectDB from "@/lib/mongodb";
import { createUserSchema } from "@/lib/validation";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

/**
 * Rota privada para listar todos os usuários (admin)
 */
export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    await connectDB();

    // Busca todos os usuários (sem senha)
    const users = await User.find()
      .select("_id email name createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        users: users.map((user: any) => ({
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("List users error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * Rota privada para criar novo usuário (admin)
 */
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const body = await request.json();

    // Valida com Zod
    const validationResult = createUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    await connectDB();

    // Verifica se email já existe
    const existingUser = await User.findOne({
      email: validationResult.data.email,
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 409 }
      );
    }

    // Cria usuário
    const user = await createUser(
      validationResult.data.email,
      validationResult.data.password,
      validationResult.data.name
    );

    return NextResponse.json(
      {
        success: true,
        message: "Usuário criado com sucesso",
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
