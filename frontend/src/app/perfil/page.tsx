"use client"
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DadosUser, RecursoResponse } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hook/useAuth";
import { UserContext } from "@/context/UserContext";
import { userService } from "@/services/user.service";

const Perfil = () => {
    const { user } = useAuth(UserContext);

    const [celular, setCelular] = useState<string>("")
    const [editable, setEditable] = useState<boolean>(false)
    const [suaSenha, setSuaSenha] = useState<string>("")
    const [novaSenha, setNovaSenha] = useState<string>("")
    const [confirmSenha, setConfirmSenha] = useState<string>("")

    const [telaAtiva, setTelaAtiva] = useState<"dados" | "recursos" | "senha" | "faq" | null>("dados");

    const [recursos, setRecursos] = useState<RecursoResponse[]>([]);
    const [loadingRecursos, setLoadingRecursos] = useState(false);

    useEffect(() => {
        const fetchRecursos = async () => {
            if (telaAtiva !== "recursos" || !user?.id) return;

            try {
                setLoadingRecursos(true);

                const response = await userService.getAllRecursos(user.id);

                if (response.success && response.data) {
                    setRecursos(response.data);
                } else {
                    toast.error(response.error || "Erro ao buscar recursos");
                }

            } catch (error) {
                console.error(error);
                toast.error("Erro inesperado");
            } finally {
                setLoadingRecursos(false);
            }
        };

        fetchRecursos();
    }, [telaAtiva, user?.id]);


    function formatarCelular(valor: string): string {
        const numeros = valor.replace(/\D/g, "");
        return numeros.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }

    return (
        <section className="flex w-full justify-center items-center">
            <div className="w-full xl:w-1/2 grid grid-cols-1 xl:grid-cols-3 min-h-screen">
                <div className="h-full bg-azul">
                    <div className="border-b-4 border-white mx-4 my-4">
                        <User className="text-white w-30 h-30 mx-auto" />
                        <h1 className="text-center text-white font-semibold my-2">{user?.nome || "Usuário"}</h1>
                    </div>
                    <div className="flex flex-col text-center text-white font-semibold space-y-3">
                        <Link href="/" className="block">Home</Link>
                        <button className="cursor-pointer hover:underline" onClick={() => setTelaAtiva("dados")}>Meus Dados</button>
                        <button className="cursor-pointer hover:underline" onClick={() => setTelaAtiva("recursos")}>Meus Recursos</button>
                        <button className="cursor-pointer hover:underline" onClick={() => setTelaAtiva("senha")}>Alterar Senha</button>
                        <button className="cursor-pointer hover:underline" onClick={() => setTelaAtiva("faq")}>Dúvidas Frequentes</button>
                    </div>
                </div>
                <div className="xl:col-span-2 min-h-screen p-4 w-full">
                    {telaAtiva === "dados" &&
                        <div className="relative space-y-3 min-h-1/3">
                            <h1 className="text-center font-bold text-xl">Meus Dados</h1>
                            <div className="flex justify-between">
                                <Label className="mr-2">Nome:</Label>
                                <Input
                                    type="text"
                                    value={user?.nome || ""}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="flex">
                                <Label className="mr-2">Email:</Label>
                                <Input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="flex">
                                <Label className="mr-2">Telefone:</Label>
                                <Input
                                    type="text"
                                    value={celular}
                                    onChange={(e) => setCelular(formatarCelular(e.target.value))}
                                    disabled={!editable}
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full ">
                                <div className="flex justify-between">
                                    <Button className="bg-azul cursor-pointer" onClick={() => setEditable(!editable)}>Editar</Button>
                                    <Button className="bg-azul cursor-pointer" >Salvar Alterações</Button>
                                </div>
                            </div>
                        </div>
                    }
                    {telaAtiva === "recursos" && <h1 className="text-center font-bold text-xl">Meus Recursos</h1>}
                    {telaAtiva === "senha" &&
                        <div className="relative space-y-3 min-h-1/3">
                            <h1 className="text-center font-bold text-xl">Alterar Senha</h1>
                            <div>
                                <Label htmlFor="senha" className="mr-2">Sua senha atual:</Label>
                                <Input
                                    id="senha"
                                    placeholder="Digite sua senha atual"
                                    type="password"
                                    value={suaSenha}
                                    onChange={(e) => setSuaSenha(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="senha2" className="mr-2">Nova senha:</Label>
                                <Input
                                    id="senha2"
                                    placeholder="Digite sua nova senha"
                                    type="password"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="senha3" className="mr-2">Confirmar nova senha:</Label>
                                <Input
                                    id="senha3"
                                    placeholder="Confirme sua nova senha"
                                    type="password"
                                    value={confirmSenha}
                                    onChange={(e) => setConfirmSenha(e.target.value)}
                                />
                            </div>
                            <div className="absolute bottom-0 right-0">
                                <Button className="bg-azul cursor-pointer" >Salvar Alterações</Button>
                            </div>
                        </div>
                    }
                    {telaAtiva === "faq" && <h1>Dúvidas Frequentes</h1>}
                </div>
            </div>
        </section>
    )
}

export default Perfil;
