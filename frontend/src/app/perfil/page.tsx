"use client";
import { LogOut, FileText } from "lucide-react";
import Header from "@/components/Header";
import UserStats from "./_components/UserStats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Recurso } from "@/types";
import RecursoCard from "./_components/RecursoCard";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/hook/useAuth";
import { UserContext } from "@/context/UserContext";
import { userService } from "@/services/user.service";
import LoadingScreen from "@/components/LoadingScreen";

export default function ProfilePage() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, userId, accessToken } = useAuth(UserContext);

  useEffect(() => {
    if (!userId || !accessToken) return;

    const fetchRecursos = async () => {
      setLoading(true);

      try {
        const response = await userService.getAllRecursos(userId, accessToken);

        if (response.success && response.data) {
          setRecursos(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erro ao buscar recursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecursos();
  }, [accessToken, userId]);

  const userStats = useMemo(() => {
    return {
      totalRecursos: recursos.length,

      totalInvestido: recursos
        .reduce(
          (acc, recurso) => acc + parseFloat(recurso.multa.valor_recurso),
          0,
        )
        .toFixed(2),

      totalEconomizado: recursos
        .reduce(
          (acc, recurso) =>
            acc +
            parseFloat(recurso.multa.valor_multa) -
            parseFloat(recurso.multa.valor_recurso),
          0,
        )
        .toFixed(2),

      ultimaCompra: recursos[0]?.payment?.paidAt
        ? formatDate(recursos[0].payment.paidAt)
        : "-",
    };
  }, [recursos]);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  const initials = user?.name
    .split(" ")
    .slice(0, 2)
    .map((n: any) => n[0])
    .join("")
    .toUpperCase();

  if (!userId || !accessToken || loading) {
    return (
      <LoadingScreen text="Aguarde enquanto recuperamos os dados do usuário e de seus recursos." />
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header visible={true} />

      <div className="bg-fundo2 grid flex-1 grid-cols-1 lg:grid-cols-4">
        {/* ── Sidebar esquerda ── */}
        <aside className="border-fundo col-span-1 flex flex-col items-center justify-around gap-6 border-r p-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="ring-cor1/40 ring-offset-fundo2 h-24 w-24 ring-2 ring-offset-2">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name || "Usuário"}
              />
              <AvatarFallback className="bg-cor1/20 bg- text-cor1 font-title text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <p className="font-title text-texto2 text-xl font-semibold">
                {user?.name}
              </p>
              <p className="text-texto2/50 mt-1 text-sm">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-all duration-200 hover:bg-red-500/20"
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </button>
        </aside>

        {/* ── Área principal ── */}
        <section className="col-span-3 my-auto space-y-8 p-4 lg:p-8">
          {/* Estatísticas */}
          <div>
            <h2 className="font-title text-texto2 mb-6 px-4 text-3xl font-bold">
              Resumo
            </h2>

            <UserStats userStats={userStats} />
          </div>

          <div className="mb-6 flex flex-col items-center justify-between gap-4 px-4 lg:flex-row lg:items-end">
            <h2 className="font-title text-texto2 text-3xl font-bold">
              Últimas Transações
            </h2>

            <Link
              href="/perfil/meus-recursos"
              className="bg-cor1 hover:bg-cor1/90 text-texto flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200"
            >
              <FileText className="h-4 w-4" />
              Todos os Recursos
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {recursos.slice(0, 3).map((recurso) => (
              <RecursoCard
                key={recurso.id}
                recurso={recurso}
                accessToken={accessToken}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
