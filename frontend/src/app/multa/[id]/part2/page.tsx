"use client"
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context"
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


const Part2 = () => {
    const params = useParams();
    const id = params.id
    const [errorComentario, setErrorComentario] = useState<string | null>(null);
    const [errorPatio, setErrorPatio] = useState<string | null>(null);
    const { dadosFormulario, setDadosFormulario } = useAuth();
    const router = useRouter();

    const isFormularioIncompleto =
        dadosFormulario.fato === '' ||
        dadosFormulario.notificado === '' ||
        dadosFormulario.tempoNotificacao === '' ||
        dadosFormulario.agente === '' ||
        dadosFormulario.acessoAuto === '' ||
        dadosFormulario.patio === '';

    function handleContinuar() {
        if (dadosFormulario.fato === 'SIM' && dadosFormulario.fatoComentario.trim() === '') {
            setErrorComentario('Descreva o ocorrido para continuar.');
            return;
        }

        if (dadosFormulario.patio === 'LIBERADO' && dadosFormulario.patioComentario.trim() === '') {
            setErrorPatio('Preencha o nome para quem foi liberado o veículo.');
            return;
        }

        setErrorComentario(null);
        setErrorPatio(null);
        router.push(`/multa/${id}/part3`)
    };

    return (
        <section className='flex items-center justify-center min-h-screen mx-2'>
            <div className="block">
                <div className="flex items-center">
                    <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">2</h1>
                    <h1 className="font-bold text-xl">Responda as perguntas abaixo</h1>
                </div>
                <div className="bg-cinza px-[25px] py-2 rounded-md my-4">
                    <h1 className="font-bold my-2 text-xl">{dadosFormulario.descricao}</h1>
                    <p className="text-gray-500 font-semibold text-sm">Infração {dadosFormulario.tipoMulta} / {dadosFormulario.tipoDefesa}</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex border-cinza border-solid border-1 rounded-md px-2 py-1 shadow-sm">
                        <div >
                            <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">1</h1>
                        </div>
                        <div className="border-l-2 border-cinza px-2">
                            <h1 className="text-xl font-bold">Você gostaria de descrever os fatos ocorridos na sua multa?</h1>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='nao1'
                                    name='fatos'
                                    value='NÃO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            fato: value,
                                            fatoComentario: ''
                                        }));
                                    }}
                                />
                                <label htmlFor="nao1"><p>Não</p></label>

                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='sim1'
                                    name='fatos'
                                    value='SIM'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            fato: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="sim1"><p>Sim</p></label>
                            </div>
                            {dadosFormulario.fato === 'SIM' && (
                                <div>
                                    <Textarea
                                        placeholder="Informe mais sobre o ocorrido"
                                        id="fatoComentario"
                                        onChange={(e) => {
                                            const value = e.currentTarget.value;
                                            setDadosFormulario(prev => ({
                                                ...prev,
                                                fatoComentario: value
                                            }));
                                        }}
                                        className={`
                                            mt-2 w-full rounded-md border 
                                            ${errorComentario?.includes('Descreva o ocorrido') ? 'border-red-500' : 'border-gray-300'}
                                        `}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex border-cinza border-solid border-1 rounded-md px-2 py-1 shadow-sm">
                        <div >
                            <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">2</h1>
                        </div>
                        <div className="border-l-2 border-cinza px-2">
                            <h1 className="text-xl font-bold">Você recebeu a primeira notificação da infração pelo correio?</h1>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='nao2'
                                    name='notificado'
                                    value='NÃO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            notificado: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="nao2"><p>Não</p></label>

                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='sim2'
                                    name='notificado'
                                    value='SIM'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            notificado: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="sim2"><p>Sim</p></label>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-cinza border-solid border-1 rounded-md px-2 py-1 shadow-sm">
                        <div >
                            <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">3</h1>
                        </div>
                        <div className="border-l-2 border-cinza px-2">
                            <h1 className="text-xl font-bold">
                                {`A notificação de autuação (primeira notificação) foi postada em mais de 30 dias após a data do cometimento da infração?`}
                            </h1>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='nao3'
                                    name='temponot'
                                    value='NÃO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            tempoNotificacao: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="nao3"><p>Não</p></label>

                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='sim3'
                                    name='temponot'
                                    value='SIM'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            tempoNotificacao: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="sim3"><p>Sim</p></label>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-cinza border-solid border-1 rounded-md px-2 py-1 shadow-sm">
                        <div >
                            <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">4</h1>
                        </div>
                        <div className="border-l-2 border-cinza px-2">
                            <h1 className="text-xl font-bold">
                                O veículo foi parado e abordado pelo agente de trânsito?
                            </h1>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='nao4'
                                    name='agente'
                                    value='NÃO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            agente: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="nao4"><p>Não</p></label>

                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='sim4'
                                    name='agente'
                                    value='SIM'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            agente: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="sim4"><p>Sim</p></label>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-cinza border-solid border-1 rounded-md px-2 py-1 shadow-sm">
                        <div >
                            <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">5</h1>
                        </div>
                        <div className="border-l-2 border-cinza px-2">
                            <h1 className="text-xl font-bold">
                                {`Você teve acesso ao auto de infração (papel da infração) no momento da abordagem?`}
                            </h1>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='nao5'
                                    name='acessoAuto'
                                    value='NÃO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            acessoAuto: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="nao5"><p>Não</p></label>

                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='sim5'
                                    name='acessoAuto'
                                    value='SIM'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            acessoAuto: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="sim5"><p>Sim</p></label>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-cinza border-solid border-1 rounded-md px-2 py-1 shadow-sm">
                        <div >
                            <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">6</h1>
                        </div>
                        <div className="border-l-2 border-cinza px-2">
                            <h1 className="text-xl font-bold">Seu veículo foi removido ao pátio ou foi liberado?</h1>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='nao6'
                                    name='patio'
                                    value='REMOVIDO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            patio: value,
                                            patioComentario: ''
                                        }));
                                    }}
                                />
                                <label htmlFor="nao6"><p>Removido</p></label>

                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    id='sim6'
                                    name='patio'
                                    value='LIBERADO'
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                        const value = e.currentTarget.value;
                                        setDadosFormulario(prev => ({
                                            ...prev,
                                            patio: value,
                                        }));
                                    }}
                                />
                                <label htmlFor="sim6"><p>Liberado</p></label>
                            </div>
                            {dadosFormulario.patio === 'LIBERADO' && (
                                <div>
                                    <Textarea
                                        placeholder="Apenas cite o nome para quem foi liberado o veículo."
                                        id="patioComentario"
                                        onChange={(e) => {
                                            const value = e.currentTarget.value;
                                            setDadosFormulario(prev => ({
                                                ...prev,
                                                patioComentario: value
                                            }));
                                        }}
                                        className={`
                                            mt-2 w-full rounded-md border 
                                            ${errorPatio?.includes('Preencha o nome para quem foi liberado o veículo.') ? 'border-red-500' : 'border-gray-300'}
                                        `}
                                    />
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="flex justify-between px-4 py-4 items-center">
                        <Link href="/" className="px-2 py-1 bg-red-400 hover:bg-red-900 rounded-md text-white font-bold transition duration-300">Voltar</Link>
                        <Button
                            className={`px-2 py-1 rounded-md text-white font-bold transition duration-300
                            ${isFormularioIncompleto
                                    ? 'bg-gray-400 cursor-not-allowed opacity-50'
                                    : 'bg-azul hover:bg-blue-700 cursor-pointer'}
                            `}
                            onClick={handleContinuar}
                            disabled={isFormularioIncompleto}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Part2