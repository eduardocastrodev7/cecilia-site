import type { ReactNode } from "react";
import { getAuthSession } from '@/lib/middleware';
import AdminLayout from '@/components/admin/AdminLayout';
import SessionProviderWrapper from '@/components/admin/SessionProviderWrapper';

export default async function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();

  // O AdminLayout component irá verificar autenticação e pathname
  return (
    <SessionProviderWrapper session={session}>
      <AdminLayout session={session}>{children}</AdminLayout>
    </SessionProviderWrapper>
  );
}

