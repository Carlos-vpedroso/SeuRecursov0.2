"use client";

import Header from "@/components/Header";
import { recursosMock } from "@/data/recursos";
import RecursoCard from "../_components/RecursoCard";
import Link from "next/link";
import { User } from "lucide-react";

export default function RecursosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header visible={true} />

      <section className="bg-fundo2 flex-1 px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-end justify-between px-4">
            <h1 className="font-title text-texto2 text-3xl font-bold">
              Meus Recursos
            </h1>

            <Link
              href="/perfil"
              className="bg-cor1 hover:bg-cor1/90 text-texto flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200"
            >
              <User className="h-4 w-4" />
              Painel do Usuário
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {recursosMock.map((recurso) => (
              <RecursoCard
                key={recurso.id}
                recurso={recurso}
                onVisualizar={() =>
                  console.log("visualizar recurso", recurso.id)
                }
                onBaixar={() => console.log("baixar recurso", recurso.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
