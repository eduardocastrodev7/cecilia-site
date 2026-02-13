import UserList from "@/components/admin/UserList";
import Link from "next/link";

export default function AdminUserPage() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Gerenciar usuários
        </h1>
        <Link
          href="/admin/user/create"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Criar novo usuário
        </Link>
      </div>
      <div>
        <UserList />
      </div>
    </div>
  );
}


