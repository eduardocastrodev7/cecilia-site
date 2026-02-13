import LoginForm from "@/components/admin/LoginForm";
import { getAuthSession } from "@/lib/middleware";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/admin/blog");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Painel Admin
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre para continuar
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
