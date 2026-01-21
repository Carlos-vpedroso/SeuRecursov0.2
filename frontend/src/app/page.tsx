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

// DELETAR QUANDO FOR FAZER O APP REAL
const multasMock: Multa[] = [
  {
    id: "0c535097-de61-4c4f-9473-5f134b7ca303",
    artigo_multa: "Art. 203, V",
    codigo_multa: "Cód 596-70",
    valor_multa: 58.69,
    valor_recurso: 58.69,
    descricao: "Ultrapassar pela contramão linha de divisão de fluxos opostos, contínua amarela",
    tipo_multa: "Gravíssima",
  },
  {
    id: "1940c21b-d062-4663-91c9-c94b881e503f",
    artigo_multa: "Art. 165-A",
    codigo_multa: "Cód 757-90",
    valor_multa: 68.97,
    valor_recurso: 68.97,
    descricao: "Recusar-se a ser submetido a teste, exame clínico, perícia ou outro procedimento que permita certificar influência de álcool ou outra substância psicoativa, na forma estabelecida pelo art. 277",
    tipo_multa: "Gravíssima",
  },
  {
    id: "1faafb89-c85d-43cf-9e67-39fa63169abc",
    artigo_multa: "Art. 218, III",
    codigo_multa: "Cód 746-30",
    valor_multa: 58.69,
    valor_recurso: 58.69,
    descricao: "Transitar em velocidade superior à máxima permitida em mais de 50%",
    tipo_multa: "Gravíssima",
  },
  {
    id: "45cf8ce4-8bc8-440b-8b95-e89971230872",
    artigo_multa: "Art. 252, § Único",
    codigo_multa: "Cód 763-32",
    valor_multa: 44.02,
    valor_recurso: 44.02,
    descricao: "Dirigir veículo manuseando telefone celular",
    tipo_multa: "Gravíssima",
  },
  {
    id: "65741a7d-00da-44f5-971a-694e6502dcb1",
    artigo_multa: "Art. 218, II",
    codigo_multa: "Cód 746-30",
    valor_multa: 29.28,
    valor_recurso: 29.28,
    descricao: "Transitar em velocidade superior à máxima permitida em 20% até 50%",
    tipo_multa: "Grave",
  },
  {
    id: "73dc87fa-b7fb-4499-ae57-f4ed0f8e4fc8",
    artigo_multa: "Art. 184, III",
    codigo_multa: "Cód 758-70",
    valor_multa: 44.02,
    valor_recurso: 44.02,
    descricao: "Transitar na faixa ou via de trânsito exclusivo, regulamentada com circulação destinada aos veículos de transporte público coletivo de passageiros",
    tipo_multa: "Gravíssima",
  },
  {
    id: "834280fe-e404-47b0-beea-38e0f0990bee",
    artigo_multa: "Art. 181, XVII",
    codigo_multa: "Cód 554-12",
    valor_multa: 29.28,
    valor_recurso: 29.28,
    descricao: "Estacionar em desacordo com a regulamentação - estacionamento rotativo",
    tipo_multa: "Grave",
  },
  {
    id: "8b4081d8-db3c-47ad-8a34-078bb6ba8c60",
    artigo_multa: "Art. 167",
    codigo_multa: "Cód 518-51",
    valor_multa: 29.28,
    valor_recurso: 29.28,
    descricao: "Deixar o condutor de usar o cinto de segurança, conforme previsto no art. 65",
    tipo_multa: "Grave",
  },
  {
    id: "d56775ac-8074-4fb7-ad48-9b49d83bad46",
    artigo_multa: "Art. 169",
    codigo_multa: "Cód 520-70",
    valor_multa: 13.26,
    valor_recurso: 13.26,
    descricao: "Dirigir sem atenção ou sem os cuidados indispensáveis à segurança",
    tipo_multa: "Leve",
  },
  {
    id: "dc8d0386-66e3-4f3d-9678-008671085b68",
    artigo_multa: "Art. 208",
    codigo_multa: "Cód 605-01",
    valor_multa: 44.02,
    valor_recurso: 44.02,
    descricao: "Avançar o sinal vermelho do semáforo (sem foto)",
    tipo_multa: "Gravíssima",
  },
  {
    id: "dfff6d42-0755-430d-b224-8de1043fc30d",
    artigo_multa: "Art. 208",
    codigo_multa: "Cód 605-03",
    valor_multa: 44.02,
    valor_recurso: 44.02,
    descricao: "Avançar o sinal vermelho do semáforo - Fiscalização Eletrônica (com foto)",
    tipo_multa: "Gravíssima",
  },
  {
    id: "f885a564-5907-45ed-b611-1ae552749e8e",
    artigo_multa: "Art. 218, I",
    codigo_multa: "Cód 745-50",
    valor_multa: 19.52,
    valor_recurso: 19.52,
    descricao: "Transitar em velocidade superior à máxima permitida em até 20%",
    tipo_multa: "Média",
  },
];


export default function Home() {
  const { setDadosFormulario, multas, loading } = useAuth();

  // const [filteredMultas, setFilteredMultas] = useState<Multa[]>(multas);
  const [filteredMultas, setFilteredMultas] = useState<Multa[]>(multasMock);
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
    const filtrado = multasMock.filter((multa) =>
      multa.codigo_multa?.toLowerCase().includes(termo) ||
      multa.artigo_multa?.toLowerCase().includes(termo) ||
      multa.tipo_multa?.toLowerCase().includes(termo) ||
      multa.descricao?.toLowerCase().includes(termo)
    );
    setFilteredMultas(filtrado);
  }, [searchTerm, multasMock]);

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
