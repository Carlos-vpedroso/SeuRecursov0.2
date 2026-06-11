"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Multa } from "@/types";
import { useAuth } from "@/hook/useAuth";
import { RecursoContext } from "@/context/RecursoContext";
import { formatCurrency } from "@/lib/utils";

export default function MultaPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter()


  const [error, setError] = useState<string | null>(null)
  const { dadosFormulario, setDadosFormulario, selectedMulta } = useAuth(RecursoContext)


  const valorMulta = selectedMulta != null
    ? formatCurrency(selectedMulta.valor_multa)
    : null;
  const valorRecurso = selectedMulta != null
    ? formatCurrency(selectedMulta.valor_recurso)
    : null;


  function alterarTipoDefesa(e: React.ChangeEvent<HTMLInputElement>) {
    setDadosFormulario(prev => ({
      ...prev,
      tipoDefesa: e.target.value
    }))
  }

  function handleClick() {
    if (dadosFormulario.tipoDefesa === '') {
      setError('Selecione o tipo de Defesa para prosseguir.');
      return;
    }
    setError(null);
    router.push(`/multa/${id}/part2`);
  }
  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  if (!selectedMulta) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </section>
    );
  }


  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="mx-2">
        <div className="flex items-center">
          <h1 className="px-3 py-1 bg-azul rounded-md text-white font-bold text-xl mr-2">1</h1>
          <h1 className="font-bold text-xl">Qual Instância deseja recorrer?</h1>
        </div>
        <div>
          <div className="my-2">
            <h1 className="font-bold text-xl">{selectedMulta.descricao}</h1>
            <div className="text-gray-500 font-bold my-2">
              {selectedMulta.tipo_multa === 'GRAVISSIMA' &&
                <p><span>7 Pontos</span>, Infração Gravíssima</p>}
              {selectedMulta.tipo_multa === 'GRAVE' &&
                <p><span>5 Pontos</span>, Infração Grave</p>}
              {selectedMulta.tipo_multa === 'MEDIA' &&
                <p><span>3 Pontos</span>, Infração Média</p>}
              {selectedMulta.tipo_multa === 'LEVE' &&
                <p><span>2 Pontos</span>, Infração Leve</p>}
            </div>
          </div>

          <div className="border border-solid border-gray-300 rounded-md shadow-md py-2 px-2">
            <div className="flex">
              <p className="mr-4">Artigo : <span className="font-bold text-lg">{selectedMulta.artigo_multa}</span></p>
              <p className="mr-4">Código : <span className="font-bold text-lg">{selectedMulta.codigo_multa}</span></p>
            </div>
            <p>Valor da Multa : <span className="font-bold text-lg text-red-900">{valorMulta}</span></p>
            <p>Valor do Recurso : <span className="font-bold text-lg text-green-900">{valorRecurso}</span></p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-center my-4 text-lg">Selecione uma opção para continuar:</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <input
                className="peer hidden"
                type='radio'
                id='instancia1'
                name='instancia'
                value="Defesa Prévia"
                onChange={alterarTipoDefesa}
              />
              <label
                htmlFor='instancia1'
                className="
                  block p-4 border-2 border-cinza rounded-xl cursor-pointer select-none
                  peer-checked:border-azul peer-checked:shadow-xl
                  transition duration-700 ease-in-out
                "
              >
                <h2 className="border-solid border-b border-gray-200 font-bold text-center pb-2">Defesa prévia ou Defesa da Autuação</h2>
                <p className="text-sm text-gray-500 text-center font-semibold pt-2">Verifique na multa ou consulte no site do Detran</p>
              </label>
            </div>
            <div>
              <input
                className="peer hidden"
                type='radio'
                id='instancia2'
                name='instancia'
                value="Jari"
                onChange={alterarTipoDefesa}
              />
              <label
                htmlFor='instancia2'
                className="
                  block p-4 border-2 border-cinza rounded-xl cursor-pointer select-none
                  peer-checked:border-azul peer-checked:shadow-xl
                  transition duration-700 ease-in-out
                "
              >
                <h2 className="border-solid border-b border-gray-200 font-bold text-center pb-2">Recurso Jari</h2>
                <p className="text-sm text-gray-500 text-center font-semibold pt-2">Verifique na multa ou consulte no site do Detran</p>
              </label>
            </div>
            <div>
              <input
                className="peer hidden"
                type='radio'
                id='instancia3'
                name='instancia'
                value="Cetran"
                onChange={alterarTipoDefesa}
              />
              <label
                className="
                  block p-4 border-2 border-cinza rounded-xl cursor-pointer select-none
                  peer-checked:border-azul peer-checked:shadow-xl
                  transition duration-700 ease-in-out
                "
                htmlFor='instancia3'
              >
                <h2 className="border-solid border-b border-gray-200 font-bold text-center pb-2">Cetran</h2>
                <p className="text-sm text-gray-500 text-center font-semibold pt-2">Somente para recursos negados pela JARI</p>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-around px-4 py-4 items-center">
          <Link href="/" className="px-2 py-1 bg-red-400 hover:bg-red-900 rounded-md text-white font-bold transition duration-300">Voltar</Link>
          <Button
            className={`px-2 py-1 rounded-md text-white font-bold transition duration-300
              ${dadosFormulario.tipoDefesa === ''
                ? 'bg-gray-400 cursor-not-allowed opacity-50'
                : 'bg-azul hover:bg-blue-700 cursor-pointer'}
            `}
            onClick={handleClick}
            disabled={dadosFormulario.tipoDefesa === ''}
          >
            Continuar
          </Button>
        </div>
        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}
