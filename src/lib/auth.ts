import bcrypt from 'bcryptjs';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

/**
 * Hash de senha usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verifica se a senha corresponde ao hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Busca usuário por email
 */
export async function getUserByEmail(email: string) {
  await connectDB();
  return User.findOne({ email: email.toLowerCase().trim() });
}

/**
 * Cria um novo usuário
 */
export async function createUser(email: string, password: string, name?: string) {
  await connectDB();
  const hashedPassword = await hashPassword(password);
  return User.create({
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    name,
  });
}



