"use client"

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DadosUser } from "@/types";

interface DadosProps {
    user: DadosUser | null
}

const Dados = ({ user }: DadosProps) => {

    const [editable, setEditable] = useState(false);
    const [celular, setCelular] = useState("");

    function formatarCelular(valor: string): string {
        const numeros = valor.replace(/\D/g, "");

        return numeros.replace(
            /^(\d{2})(\d{5})(\d{4}).*/,
            "($1) $2-$3"
        );
    }

    return (
        <div className="relative space-y-3 min-h-1/3">

            <h1 className="text-center font-bold text-xl">
                Meus Dados
            </h1>

            <div className="flex justify-between">
                <Label className="mr-2">
                    Nome:
                </Label>

                <Input
                    value={user?.nome}
                    disabled
                />
            </div>

            <div className="flex">
                <Label className="mr-2">
                    Telefone:
                </Label>

                <Input
                    value={celular}
                    onChange={(e) =>
                        setCelular(formatarCelular(e.target.value))
                    }
                    disabled={!editable}
                />
            </div>

            <div className="absolute bottom-0 left-0 w-full">
                <div className="flex justify-between">

                    <Button
                        className="bg-azul"
                        onClick={() => setEditable(!editable)}
                    >
                        Editar
                    </Button>

                    <Button className="bg-azul">
                        Salvar Alterações
                    </Button>

                </div>
            </div>

        </div>
    );
};

export default Dados;