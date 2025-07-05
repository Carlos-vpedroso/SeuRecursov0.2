"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DadosUsuario } from "@/types"

const estados = [
    { uf: "AC", nome: "Acre" },
    { uf: "AL", nome: "Alagoas" },
    { uf: "AP", nome: "Amapá" },
    { uf: "AM", nome: "Amazonas" },
    { uf: "BA", nome: "Bahia" },
    { uf: "CE", nome: "Ceará" },
    { uf: "DF", nome: "Distrito Federal" },
    { uf: "ES", nome: "Espírito Santo" },
    { uf: "GO", nome: "Goiás" },
    { uf: "MA", nome: "Maranhão" },
    { uf: "MT", nome: "Mato Grosso" },
    { uf: "MS", nome: "Mato Grosso do Sul" },
    { uf: "MG", nome: "Minas Gerais" },
    { uf: "PA", nome: "Pará" },
    { uf: "PB", nome: "Paraíba" },
    { uf: "PR", nome: "Paraná" },
    { uf: "PE", nome: "Pernambuco" },
    { uf: "PI", nome: "Piauí" },
    { uf: "RJ", nome: "Rio de Janeiro" },
    { uf: "RN", nome: "Rio Grande do Norte" },
    { uf: "RS", nome: "Rio Grande do Sul" },
    { uf: "RO", nome: "Rondônia" },
    { uf: "RR", nome: "Roraima" },
    { uf: "SC", nome: "Santa Catarina" },
    { uf: "SP", nome: "São Paulo" },
    { uf: "SE", nome: "Sergipe" },
    { uf: "TO", nome: "Tocantins" },
];


const Part3 = () => {
    const { dadosFormulario } = useAuth();
    const [erroCpf, setErroCpf] = useState("");
    const [erroRg, setErroRg] = useState("");

    function validarCPF(cpf: string): boolean {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    }
    function aplicarMascaraCPF(valor: string): string {
        return valor
            .replace(/\D/g, "") // remove não dígitos
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    function validarRG(rg: string): boolean {
        const regex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
        return regex.test(rg);
    }
    function aplicarMascaraRG(valor: string): string {
        return valor
            .replace(/\D/g, "") // remove não dígitos
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1})$/, "$1-$2");
    }
    function aplicarMascaraCelular(valor: string): string {
        return valor
            .replace(/\D/g, "") // Remove tudo que não for dígito
            .replace(/^(\d{2})(\d)/, "($1) $2") // Coloca os parênteses e espaço
            .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o traço
            .slice(0, 15); // Limita a 15 caracteres totais
    }

    // Dados Usuário
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [rg, setRg] = useState("")
    const [celular, setCelular] = useState("")
    const [ufEmissao, setUfEmissao] = useState("")
    const [autoInfracao, setAutoInfracao] = useState("")
    const [placaVeiculo, setPlacaVeiculo] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("")
    const [solicitante, setSolicitante] = useState("")
    //

    // Dados Endereço
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [errorCep, setErrorCep] = useState("");
    //

    const router = useRouter()

    const isFormularioIncompleto =
        nome === '' ||
        cpf === '' ||
        rg === '' ||
        celular === '' ||
        ufEmissao === '' ||
        autoInfracao === '' ||
        placaVeiculo === '' ||
        tipoUsuario === '' ||
        solicitante === '' ||
        cep === '' ||
        logradouro === '' ||
        numero === '' ||
        bairro === '' ||
        cidade === '' ||
        uf === '' ||
        erroCpf !== '' ||
        erroRg !== '';


    function codificarDados(dados: DadosUsuario) {
        const json = JSON.stringify(dados);
        return encodeURIComponent(btoa(json));
    }

    function handleContinuar() {
        const dados = {
            nome, cpf, rg, celular, ufEmissao,
            autoInfracao, placaVeiculo, tipoUsuario, solicitante,
            cep, logradouro, numero, bairro, cidade, uf,
        };

        const dadosCodificados = codificarDados(dados);
        router.push(`/purchase?dados=${dadosCodificados}`);
    };

    const buscarEndereco = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setErrorCep("Cep não encontrado")
                setLogradouro("");
                setBairro("");
                setCidade("");
                setUf("");
            } else {
                setErrorCep("")
                setLogradouro(data.logradouro || "");
                setBairro(data.bairro || "");
                setCidade(data.localidade || "");
                setUf(data.uf || "");
            }
        } catch {
            setErrorCep("Erro ao buscar endereço")
            setLogradouro("");
            setBairro("");
            setCidade("");
            setUf("");
        }
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novoCep = e.target.value.replace(/\D/g, ""); // remove não dígitos
        setCep(novoCep);

        if (novoCep.length === 8) {
            buscarEndereco(novoCep);
        } else {
            setLogradouro("");
            setBairro("");
            setCidade("");
            setUf("");
        }
    };


    return (
        <section className="flex items-center justify-center min-h-screen mx-2">
            <div className="block xl:w-1/2">
                <div className="flex items-center">
                    <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">3</h1>
                    <h1 className="font-bold text-xl">Preencha os dados do Requerente</h1>
                </div>
                <div className="bg-cinza px-[25px] py-2 rounded-md my-4">
                    <h1 className="font-bold my-2 text-xl">{dadosFormulario.descricao}</h1>
                    <p className="text-gray-500 font-semibold text-sm">Infração {dadosFormulario.tipoMulta} / {dadosFormulario.tipoDefesa}</p>
                </div>
                <div>
                    <h1 className="font-bold text-2xl text-center">Dados do Condutor ou do Proprietário do veículo</h1>
                </div>
                <div className="grid gap-4 grid-cols-1 my-2 border-2 border-cinza rounded-md px-2 py-2 shadow-md">
                    <div>
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="celular">Celular</Label>
                        <Input
                            type="tel"
                            id="celular"
                            name="celular"
                            placeholder="(11) 91234-5678"
                            value={celular}
                            onChange={(e) => {
                                const formatado = aplicarMascaraCelular(e.target.value);
                                setCelular(formatado);
                            }}
                            className="w-full"
                            maxLength={15}
                            required
                        />

                    </div>
                    <div className="flex justify-between">
                        <div className="min-w-[50%] pr-1">
                            <Label htmlFor="rg">RG</Label>
                            <Input
                                type="text"
                                id="rg"
                                name="rg"
                                placeholder="12.345.678-9"
                                value={rg}
                                onChange={(e) => {
                                    const valorComMascara = aplicarMascaraRG(e.target.value);
                                    setRg(valorComMascara);
                                    if (valorComMascara.length > 0 && !validarRG(valorComMascara)) {
                                        setErroRg("Formato de RG inválido.");
                                    } else {
                                        setErroRg("");
                                    }
                                }}
                                className={`w-full ${erroRg ? 'border-red-400' : ''}`}
                                maxLength={12}
                                required
                            />

                            {erroRg && <p className="text-red-500 text-sm mt-1">{erroRg}</p>}
                        </div>

                        <div className="min-w-[50%] pl-1">
                            <Label>UF de Emissão</Label>
                            <Select value={ufEmissao} onValueChange={setUfEmissao} required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {estados.map((estado) => (
                                        <SelectItem key={estado.uf} value={estado.uf}>
                                            {`${estado.nome} (${estado.uf})`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => {
                                const valorComMascara = aplicarMascaraCPF(e.target.value);
                                setCpf(valorComMascara);
                                if (valorComMascara.length > 0 && !validarCPF(valorComMascara)) {
                                    setErroCpf("Formato de CPF inválido.");
                                } else {
                                    setErroCpf("");
                                }
                            }}
                            className={`w-full ${erroCpf ? 'border-red-400' : ''}`}
                            maxLength={14}
                            required
                        />

                        {erroCpf && <p className="text-red-500 text-sm mt-1">{erroCpf}</p>}
                    </div>

                    <div className="flex justify-between">
                        <div className="min-w-[50%] pr-1">
                            <Label htmlFor="cep">CEP</Label>
                            <Input
                                type="text"
                                id="cep"
                                name="cep"
                                placeholder="Digite seu CEP"
                                value={cep}
                                onChange={handleCepChange}
                                maxLength={8}
                                className={`
                                    w-full
                                    ${errorCep === "" && cep.length === 8 ? 'border-green-200 border-2' : ''}
                                    ${errorCep !== "" ? 'border-red-400' : ''}
                                `}
                                required
                            />
                            {errorCep && (
                                <p className="text-sm font-semibold text-red-400 mt-1">{errorCep}</p>
                            )}
                        </div>
                        <div className="min-w-[50%] pl-1">
                            <Label htmlFor="endereco">Endereço</Label>
                            <Input
                                type="text"
                                id="endereco"
                                name="endereco"
                                value={logradouro}
                                onChange={(e) => setLogradouro(e.target.value)}
                                placeholder="Rua, Av., etc."
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="min-w-[50%] pr-1">
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                                type="text"
                                id="bairro"
                                name="bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="min-w-[50%] pl-1">
                            <Label htmlFor="numero">Número</Label>
                            <Input
                                type="text"
                                id="numero"
                                name="numero"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Número"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="min-w-[50%] pr-1">
                            <Label>Estado</Label>
                            <Select value={uf} onValueChange={setUf} required disabled>
                                <SelectTrigger className="w-full bg-gray-100">
                                    <SelectValue placeholder="Selecione o Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {estados.map((estado) => (
                                        <SelectItem key={estado.uf} value={estado.uf}>
                                            {estado.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="min-w-[50%] pl-1 cursor-not-allowed">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                className="w-full bg-gray-100"
                                disabled
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="auto">Número do Auto de Infração</Label>
                        <Input
                            type="text"
                            id="auto"
                            name="auto"
                            placeholder="Auto de Infração"
                            onChange={(e) => setAutoInfracao(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="placa">Placa do Veículo</Label>
                        <Input
                            type="text"
                            id="placa"
                            name="placa"
                            placeholder="Placa do Veículo"
                            onChange={(e) => setPlacaVeiculo(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm text-center mb-1">Escolha uma das opções abaixo?</h1>
                        <RadioGroup className="flex w-full justify-center" onValueChange={setTipoUsuario}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Pessoa Física" id="PF" />
                                <Label htmlFor="PF" className="text-gray-500">{"PF (Pessoa Física)"}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Pessoa Jurídica" id="PJ" />
                                <Label htmlFor="PJ" className="text-gray-500">{"PJ (Pessoa Jurídica)"}</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm text-center mb-1">Você é procurador do condutor?</h1>
                        <RadioGroup className="flex w-full justify-center" onValueChange={setSolicitante}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Procurador" id="Procurador" />
                                <Label htmlFor="Procurador" className="text-gray-500">Sim</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Condutor" id="Condutor" />
                                <Label htmlFor="Condutor" className="text-gray-500">Não, eu sou o condutor.</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex w-full justify-around items-center">
                        <Link href="/" className="px-2 py-1 bg-red-400 hover:bg-red-900 rounded-md text-white font-bold transition duration-300 cursor-pointer">Voltar</Link>
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

export default Part3