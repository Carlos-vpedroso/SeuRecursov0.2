"use client"

import { User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Dados from "./_components/Dados";
import Recursos from "./_components/Recursos";
// import Senha from "./components/Senha";
// import FAQ from "./components/FAQ";
import { useAuth } from "@/hook/useAuth";
import { UserContext } from "@/context/UserContext";

const Perfil = () => {
    const { user } = useAuth(UserContext)
    if (!user) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Carregando Página...</p>
            </div>
        );
    }
    const searchParams = useSearchParams();

    const page = searchParams.get("page") || "dados";

    const renderPage = () => {
        switch (page.toLowerCase()) {
            case "dados":
                return <Dados user={user} />;

            case "recursos":
                return <Recursos userId={user.id} />;

            case "senha":
                return <div />;

            case "faq":
                return <div />;

            default:
                return <Dados user={user} />;
        }
    };

    return (
        <section className="flex w-full justify-center items-center">
            <div className="w-full xl:w-1/2 grid grid-cols-1 xl:grid-cols-3 min-h-screen">

                <div className="h-full bg-azul">

                    <div className="border-b-4 border-white mx-4 my-4">
                        <User className="text-white w-30 h-30 mx-auto" />
                        <h1 className="text-center text-white font-semibold my-2">
                            Usuário
                        </h1>
                    </div>

                    <div className="flex flex-col text-center text-white font-semibold space-y-3">

                        <Link href="/">
                            Home
                        </Link>

                        <Link href="/perfil?page=dados">
                            Meus Dados
                        </Link>

                        <Link href="/perfil?page=recursos">
                            Meus Recursos
                        </Link>

                        <Link href="/perfil?page=senha">
                            Alterar Senha
                        </Link>

                        <Link href="/perfil?page=faq">
                            Dúvidas Frequentes
                        </Link>

                    </div>
                </div>

                <div className="xl:col-span-2 min-h-screen p-4 w-full">
                    {renderPage()}
                </div>

            </div>
        </section>
    );
};

export default Perfil;