import UserForm from "@/components/admin/UserForm";

export default function CreateUserPage() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">
        Criar novo usuário
      </h1>
      <div>
        <UserForm />
      </div>
    </div>
  );
}


