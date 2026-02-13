import { hashPassword } from "@/lib/auth";
import { requireAuth } from "@/lib/middleware";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema para edição de usuário
const updateUserSchema = z.object({
  email: z.string().email("Email inválido").toLowerCase().trim().optional(),
  name: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

/**
 * Rota privada para buscar usuário por ID (admin)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const { userId } = params;

    await connectDB();

    const user = await User.findById(userId)
      .select("_id email name createdAt updatedAt")
      .lean();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * Rota privada para atualizar usuário (admin)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const { userId } = params;
    const body = await request.json();

    // Valida com Zod
    const validationResult = updateUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    await connectDB();

    // Busca usuário
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Atualiza campos
    if (
      validationResult.data.email &&
      validationResult.data.email !== user.email
    ) {
      // Verifica se novo email já existe
      const existingUser = await User.findOne({
        email: validationResult.data.email,
      });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email já está em uso" },
          { status: 409 }
        );
      }
      user.email = validationResult.data.email;
    }

    if (validationResult.data.name !== undefined) {
      user.name = validationResult.data.name || undefined;
    }

    if (validationResult.data.password) {
      user.password = await hashPassword(validationResult.data.password);
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Usuário atualizado com sucesso",
        user: {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * Rota privada para deletar usuário (admin)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verifica autenticação
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const { userId } = params;

    await connectDB();

    // Busca usuário
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Deleta usuário
    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
