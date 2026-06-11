import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight } from "lucide-react";

type StepProps = {
    onNext: () => void;
    tipoDefesa: string;
    setTipoDefesa: (value: string) => void;
};

export function TipoDefesa({
    onNext,
    tipoDefesa,
    setTipoDefesa,
}: StepProps) {
    const opcoes = [
        {
            label: "Defesa Prévia",
            info: "Verifique na multa ou consulte no site do Detran",
            value: "Defesa Prévia"
        },
        {
            label: "JARI",
            info: "Verifique na multa ou consulte no site do Detran",
            value: "Jari"
        },
        {
            label: "CETRAN",
            info: "Somente para recursos negados pela JARI",
            value: "Cetran"
        }
    ];
    const podeAvancar = tipoDefesa !== ""
    return (
        <Card className="w-full h-full flex flex-col bg-card justify-between">
            <CardHeader>
                <CardTitle className="font-title text-lg">Tipo Defesa</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {opcoes.map((opcao) => (
                        <div
                            key={opcao.value}
                            onClick={() => setTipoDefesa(opcao.value)}
                            className={`
                                cursor-pointer rounded-lg border p-6 text-center transition-all
                                hover:border-cor1 hover:shadow-md space-y-2
                                ${tipoDefesa === opcao.value
                                    ? "border-cor1 bg-cor1/10"
                                    : "border-border"
                                }
                            `}
                        >
                            <h2 className="font-title text-lg border-b border-border font-semibold">{opcao.label}</h2>
                            <p className="text-xs text-texto2/60">{opcao.info}</p>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-end bg-card">
                <button
                    onClick={onNext}
                    disabled={!podeAvancar}
                    className={`
                        flex h-10 items-center rounded-xl px-4 transition-all duration-200
                        ${podeAvancar
                            ? "bg-cor1 hover:brightness-125 text-texto cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                        `}
                >
                    <MoveRight />
                </button>
            </CardFooter>
        </Card>
    );
}