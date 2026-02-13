import connectDB from '@/lib/mongodb';
import { createUser, getUserByEmail } from '@/lib/auth';

/**
 * Garante que existe um usuário admin no banco de dados
 * Cria o admin se não existir, usando credenciais das variáveis de ambiente
 */
export async function ensureAdminUser(): Promise<void> {
  try {
    const adminEmail = process.env.EMAIL_ADMIN;
    const adminPassword = process.env.PASSWORD_ADMIN;

    if (!adminEmail || !adminPassword) {
      console.warn('EMAIL_ADMIN ou PASSWORD_ADMIN não definidos. Pulando criação de admin.');
      return;
    }

    await connectDB();

    // Verifica se o admin já existe
    const existingAdmin = await getUserByEmail(adminEmail);
    
    if (existingAdmin) {
      console.log(`Admin já existe: ${adminEmail}`);
      return;
    }

    // Cria o admin
    const admin = await createUser(adminEmail, adminPassword, 'Admin');
    console.log(`Admin criado com sucesso: ${adminEmail}`);
  } catch (error) {
    console.error('Erro ao garantir usuário admin:', error);
    // Não lança erro para não quebrar a aplicação
  }
}

