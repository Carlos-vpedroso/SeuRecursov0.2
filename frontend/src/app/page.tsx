"use client"
import Blogcard from "@/components/Blogcard";
import Cardmultas from "@/components/Cardmultas";
import Footer from "@/components/Footer";
import Perguntas from "@/components/Perguntas";
import { useAuth } from "@/context";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import bannerDesktop from '../../public/bannerdesktop.jpg'
import bannerMobile from '../../public/bannermobile.jpg'
import MultasSkeleton from "@/components/MultasSkeleton";
import { Multa } from "@/types";

export default function Home() {
  const { setDadosFormulario, multas, loading } = useAuth();

  const [filteredMultas, setFilteredMultas] = useState<Multa[]>(multas);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const formularioPadrao = {
      artigoMulta: '',
      codigoMulta: '',
      valorMulta: 0,
      valorRecurso: 0,
      descricao: '',
      tipoMulta: '',
      tipoDefesa: '',
      fato: '',
      fatoComentario: '',
      notificado: '',
      tempoNotificacao: '',
      agente: '',
      acessoAuto: '',
      patio: '',
      patioComentario: ''
    };

    setDadosFormulario(formularioPadrao);
  }, [setDadosFormulario]);


  useEffect(() => {
    const termo = searchTerm.toLowerCase();
    const filtrado = multas.filter((multa) =>
      multa.codigo_multa?.toLowerCase().includes(termo) ||
      multa.artigo_multa?.toLowerCase().includes(termo) ||
      multa.tipo_multa?.toLowerCase().includes(termo) ||
      multa.descricao?.toLowerCase().includes(termo)
    );
    setFilteredMultas(filtrado);
  }, [searchTerm, multas]);

  return (
    <div>
      <section className="bg-azul w-full min-h-[80vh] md:min-h-[50vh] relative overflow-hidden">
        <Image
          src={bannerDesktop}
          alt="Banner Seu Recurso"
          fill
          className="object-cover hidden md:flex"
          priority
        />
        <Image
          src={bannerMobile}
          alt="Banner Seu Recurso"
          fill
          className="object-cover md:hidden"
          priority
        />
      </section>

      <section className="pt-5">
        <h2 className="text-center font-bold text-2xl">Começamos por aqui!</h2>
        <p className="text-center text-gray-500">Pesquise e encontre sua multa</p>
        <div className="flex justify-between mx-5 my-5 px-3 py-2 rounded-md border border-solid border-gray-600 shadow-md xl:mx-80">
          <label htmlFor="pesquisa" className="sr-only">Pesquisar multas</label>
          <input
            id="pesquisa"
            placeholder="Pesquisar multas"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none w-full px-2 outline-none focus:outline-none"
          />
          <Search />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4 mx-2 xl:mx-80">
        {loading ? (
          <MultasSkeleton count={8} />
        ) : (
          filteredMultas
            .slice(0, 8)
            .map(({ id, artigo_multa, codigo_multa, descricao, tipo_multa, valor_multa }) => (
              <Cardmultas
                key={id}
                id={id}
                artigo={artigo_multa}
                codigo={codigo_multa}
                descricao={descricao}
                tipoMulta={tipo_multa}
                valor={valor_multa}
              />
            ))
        )}
      </section>
      <section className="my-10 text-center">
        <Link
          href="/multas"
          className="text-white font-bold bg-azul rounded-md px-3 py-2 inline-block"
        >
          VER TODAS AS MULTAS
        </Link>
      </section>

      <section>
        <h1 className="text-center text-gray-500 font-bold text-2xl my-10">Perguntas Frequentes</h1>
        <Perguntas />
      </section>

      <h1 className="text-center text-gray-500 font-bold text-2xl my-10">Blog</h1>
      <section className="grid grid-cols-1 gap-4 xl:mx-80 md:grid-cols-3">
        <Blogcard
          title="Título do blog"
          description="Mais uma descrição descrição do Blog"
        />
        <Blogcard
          title="Título do blog"
          description="Mais uma descrição descrição do Blog"
        />
        <Blogcard
          title="Título do blog"
          description="Mais uma descrição descrição do Blog"
        />
      </section>

      <div className="my-10 w-full text-center">
        <Link
          href="/artigos"
          className="text-white font-bold bg-azul rounded-md px-3 py-2"
        >
          VER TODOS OS ARTIGOS
        </Link>
      </div>

      <Footer />
    </div>
  );
}
