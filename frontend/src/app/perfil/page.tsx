"use client"
import { useAuth } from "@/context"
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DadosUser } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Perfil = () => {
    const { user } = useAuth();
    const [dadosUser, setDadosUser] = useState<DadosUser | null>(null);
    const [celular, setCelular] = useState<string>("")
    const [editable, setEditable] = useState<boolean>(false)
    const [suaSenha, setSuaSenha] = useState<string>("")
    const [novaSenha, setNovaSenha] = useState<string>("")
    const [confirmSenha, setConfirmSenha] = useState<string>("")

    const [telaAtiva, setTelaAtiva] = useState<"dados" | "recursos" | "senha" | "faq" | null>("dados");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await fetch(`http://localhost:5555/registros/user/${user}`);
                const data = await resp.json();
                setDadosUser(data);
                setCelular(data.telefone || "");
            } catch (e) {
                toast.error("Erro ao buscar dados do usuário.");
                console.error("Erro ao buscar dados do usuário:", e);
            }
        };
        fetchUser();
    }, [user]);

    async function AtualizarDados(celular: string) {
        const celularValido = /^\(\d{2}\)\s9\d{4}-\d{4}$/;

        if (!celularValido.test(celular)) {
            toast.warning("O número de celular deve estar no formato (11) 91234-5678.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:5555/registros/${dadosUser?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ telefone: celular }),
            });

            if (!resposta.ok) {
                toast.error("Erro ao atualizar telefone.");
                return;
            }

            toast.success("Telefone atualizado com sucesso.");
            setEditable(false);
        } catch (e) {
            console.error("Erro ao atualizar dados do usuário:", e);
            toast.error("Erro interno ao atualizar dados.");
        }
    }

    async function AtualizarSenha(senhaAtual: string, novaSenha: string, confirmarNovaSenha: string) {
        if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
            toast.warning("Preencha todos os campos.");
            return;
        }

        if (novaSenha.length < 8) {
            toast.warning("A nova senha deve conter pelo menos 8 caracteres.");
            return;
        }

        if (novaSenha !== confirmarNovaSenha) {
            toast.warning("A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:5555/registros/password/${dadosUser?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ senha: senhaAtual, password: novaSenha }),
            });

            const resultado = await resposta.json();

            if (!resposta.ok || !resultado.Success) {
                toast.error(resultado.Message || "Erro ao atualizar a senha.");
                return;
            }

            toast.success("Senha atualizada com sucesso!");
            setSuaSenha("");
            setNovaSenha("");
            setConfirmSenha("");
        } catch (e) {
            console.error("Erro ao atualizar senha:", e);
            toast.error("Erro interno ao atualizar senha.");
        }
    }

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
                        <h1 className="text-center text-white font-semibold my-2">{dadosUser?.username || user}</h1>
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
                                    value={dadosUser?.username || ""}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="flex">
                                <Label className="mr-2">Email:</Label>
                                <Input
                                    type="email"
                                    value={dadosUser?.useremail || ""}
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
                                    <Button className="bg-azul cursor-pointer" onClick={() => AtualizarDados(celular)}>Salvar Alterações</Button>
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
                                <Button className="bg-azul cursor-pointer" onClick={() => AtualizarSenha(suaSenha, novaSenha, confirmSenha)}>Salvar Alterações</Button>
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
