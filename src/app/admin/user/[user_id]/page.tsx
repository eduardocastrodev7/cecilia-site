import UserForm from "@/components/admin/UserForm";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { notFound } from "next/navigation";

interface PageProps {
  params: { user_id: string };
}

export default async function EditUserPage({ params }: PageProps) {
  await connectDB();

  const user = await User.findById(params.user_id).lean();

  if (!user) {
    notFound();
  }

  const userData = {
    _id: user._id.toString(),
    email: user.email,
    name: user.name || "",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">
        Editar usuário
      </h1>
      <div>
        <UserForm user={userData} />
      </div>
    </div>
  );
}


