"use client";

import { AdminContext } from "@/context/AdminContext";
import { useAuth } from "@/hook/useAuth";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login } = useAuth(AdminContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await login(username, password);

      if (result.success) {
        router.push("/admin/dashboard");
        return;
      }

      toast.error(result.error || "Usuário ou senha inválidos");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-fundo2 flex min-h-screen items-center justify-center px-4">
      <div className="bg-fundo w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/Logo_Derruba.png"
            alt="Derruba Multa"
            width={180}
            height={180}
            priority
            className="mb-6 scale-150"
          />

          <h1 className="text-texto font-title text-center text-2xl font-bold">
            Painel Administrador
          </h1>

          <div className="mt-8 w-full space-y-5">
            {/* USUÁRIO */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-texto font-title text-sm font-semibold"
              >
                Usuário
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                autoComplete="username"
                className="bg-fundo text-texto w-full border px-4 py-3 transition outline-none placeholder:text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* SENHA */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-texto font-title text-sm font-semibold"
              >
                Senha
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="bg-fundo text-texto w-full border px-4 py-3 pr-12 transition outline-none placeholder:text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setVisible((prev) => !prev)}
                  aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                  className="text-texto/60 hover:text-texto absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition"
                >
                  {visible ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>

            {/* LOGIN */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="font-title bg-cor1 flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 font-semibold text-white transition duration-300 hover:bg-blue-800"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
