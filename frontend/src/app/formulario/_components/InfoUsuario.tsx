import { FloatingInput } from "@/components/FloatingInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buscarCEP } from "@/lib/utils";
import { Address, DadosUsuario } from "@/types";
import { Check, MoveLeft, MoveRight, Text, User } from "lucide-react";

type StepProps = {
    onBack: () => void;
    onNext: () => void;
    nome: string;
    celular: string;
    cpf: string;
    rg: string;
    autoInfracao: string;
    placaVeiculo: string;
    solicitante: string;
    cep: string;
    cidade: string;
    uf: string;
    setDadosUsuario: React.Dispatch<React.SetStateAction<DadosUsuario>>;
    setEndereco: React.Dispatch<React.SetStateAction<Address>>;
};

export default function InfoUsuario({
    onBack,
    onNext,
    nome,
    celular,
    cpf,
    rg,
    autoInfracao,
    placaVeiculo,
    solicitante,
    cep,
    cidade,
    uf,
    setDadosUsuario,
    setEndereco
}: StepProps) {
    const podeAvancar = [
        nome,
        celular,
        cpf,
        rg,
        autoInfracao,
        placaVeiculo,
        solicitante,
        cep,
        cidade,
        uf,
    ].every((value) => value.trim() !== "");


    const handleCEP = async (value: string) => {
        setEndereco((prev) => ({
            ...prev,
            cep: value,
        }));

        const cepLimpo = value.replace(/\D/g, "");

        if (cepLimpo.length !== 8) return;

        const response = await buscarCEP(cepLimpo);

        if (!response.success || !response.data) return;

        setEndereco((prev) => ({
            ...prev,
            cep: value,
            cidade: response.data.localidade,
            uf: response.data.uf,
        }));
    };
    return (
        <Card className="w-full h-full flex flex-col bg-card justify-between">
            <CardHeader>
                <CardTitle className="font-title text-lg">Dados Complementares</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" >
                <main className="flex flex-col w-full border border-border rounded-md p-4 gap-4">
                    <div className="flex gap-4 items-center mb-4">
                        <div className="flex bg-cor1 p-2 rounded-full items-center justify-center">
                            <User className="text-white h-4 w-4" />
                        </div>
                        <h2 className="text-lg">Dados Usuário</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <FloatingInput
                            label="Seu Nome"
                            setState={(value) => setDadosUsuario((prev) => ({
                                ...prev,
                                nome: value
                            }))}
                            value={nome}
                        />
                        <FloatingInput
                            label="Celular"
                            setState={(value) => setDadosUsuario((prev) => ({
                                ...prev,
                                celular: value
                            }))}
                            value={celular}
                            mask="phone"
                        />
                        <FloatingInput
                            label="CPF"
                            setState={(value) => setDadosUsuario((prev) => ({
                                ...prev,
                                cpf: value
                            }))}
                            value={cpf}
                            mask="cpf"
                        />
                        <FloatingInput
                            label="RG"
                            setState={(value) => setDadosUsuario((prev) => ({
                                ...prev,
                                rg: value
                            }))}
                            value={rg}
                            mask="rg"
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:col-span-2">
                            <FloatingInput
                                label="CEP"
                                setState={handleCEP}
                                value={cep}
                                mask="cep"
                            />
                            <FloatingInput
                                label="Cidade"
                                setState={(value) => setEndereco((prev) => ({
                                    ...prev,
                                    cidade: value
                                }))}
                                value={cidade}
                                disabled={true}
                            />
                            <FloatingInput
                                label="Estado"
                                setState={(value) => setEndereco((prev) => ({
                                    ...prev,
                                    uf: value
                                }))}
                                value={uf}
                                disabled={true}
                            />
                        </div>

                    </div>

                </main>
                <main className="flex flex-col w-full border border-border rounded-md p-4 gap-4">
                    <div className="flex gap-4 items-center mb-4">
                        <div className="flex bg-cor1 p-2 rounded-full items-center justify-center">
                            <Text className="text-white h-4 w-4" />
                        </div>
                        <h2 className="text-lg">Dados Infração</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <FloatingInput
                            label="Nº do Auto da Infração"
                            setState={(value) => setDadosUsuario((prev) => ({
                                ...prev,
                                autoInfracao: value
                            }))}
                            value={autoInfracao}
                        />
                        <FloatingInput
                            label="Placa do Veículo"
                            setState={(value) => setDadosUsuario((prev) => ({
                                ...prev,
                                placaVeiculo: value
                            }))}
                            value={placaVeiculo}
                            mask="plate"
                        />
                        <div className="grid grid-cols-1 gap-2 mx-auto lg:col-span-2">
                            <h2>Você é procurador do condutor?</h2>
                            <div className="flex gap-4">
                                <div
                                    onClick={() =>
                                        setDadosUsuario((prev) => ({
                                            ...prev,
                                            solicitante: "Procurador"
                                        }))}
                                    className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${solicitante === "Procurador"
                                            ? "border-cor1 bg-cor1/10"
                                            : "border-border"
                                        }
                            `}>
                                    <span>Sim</span>
                                </div>
                                <div
                                    onClick={() =>
                                        setDadosUsuario((prev) => ({
                                            ...prev,
                                            solicitante: "Condutor"
                                        }))}
                                    className={`max-h-10
                                cursor-pointer rounded-lg border p-2 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${solicitante === "Condutor"
                                            ? "border-cor1 bg-cor1/10"
                                            : "border-border"
                                        }
                            `}>
                                    <span>Não, sou o Condutor</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>


            </CardContent>

            <CardFooter className="flex items-center justify-between bg-card">
                <button
                    onClick={onBack}
                    className="bg-transparent hover:bg-gray-200 text-texto2 flex h-10 cursor-pointer items-center  rounded-xl px-4 transition-all duration-200 border-border border"
                >
                    <MoveLeft />
                </button>
                <button
                    onClick={onNext}
                    disabled={!podeAvancar}
                    className={`
                        flex h-10 items-center rounded-xl px-4 transition-all duration-200
                        ${podeAvancar
                            ? "bg-green-600 hover:brightness-125 text-texto cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                        `}
                >
                    <Check />
                </button>
            </CardFooter>
        </Card>
    );
}