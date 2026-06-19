"use client";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { Address, DadosFormulario, DadosUsuario, Multa } from "@/types";
import { multaService } from "@/services/multa.service";

interface RecursoContextType {
  multas: Multa[];
  selectedMulta: Multa | null;
  setSelectedMulta: React.Dispatch<React.SetStateAction<Multa | null>>;
  loading: boolean;
  dadosFormulario: DadosFormulario;
  setDadosFormulario: React.Dispatch<React.SetStateAction<DadosFormulario>>;
  dadosUsuario: DadosUsuario;
  setDadosUsuario: React.Dispatch<React.SetStateAction<DadosUsuario>>;
  endereco: Address;
  setEndereco: React.Dispatch<React.SetStateAction<Address>>;
}

export const RecursoContext = createContext<RecursoContextType | undefined>(
  undefined,
);
// {
//     multas: [],
//     selectedMulta: null,
//     setSelectedMulta: () => undefined,
//     loading: false,
//     dadosFormulario: {
//         tipoDefesa: '',
//         fato: '',
//         fatoComentario: '',
//         notificado: '',
//         tempoNotificacao: '',
//         agente: '',
//         acessoAuto: '',
//         patio: '',
//         patioComentario: ''
//     },
//     setDadosFormulario: () => undefined,
//     dadosUsuario: {
//         nome: "",
//         cpf: "",
//         rg: "",
//         celular: "",
//         ufEmissao: "",
//         autoInfracao: "",
//         placaVeiculo: "",
//         tipoUsuario: "",
//         solicitante: "",
//     },
//     setDadosUsuario: () => undefined,
//     endereco: {
//         cep: "",
//         logradouro: "",
//         numero: "",
//         bairro: "",
//         cidade: "",
//         uf: ""
//     },
//     setEndereco: () => undefined,
// }

interface RecursoProviderProps {
  children: ReactNode;
}

export const RecursoProvider = ({ children }: RecursoProviderProps) => {
  const [multas, setMultas] = useState<Multa[]>([]);
  const [selectedMulta, setSelectedMulta] = useState<Multa | null>(null);
  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
    tipoDefesa: "",
    fato: "",
    fatoComentario: "",
    notificado: "",
    tempoNotificacao: "",
    agente: "",
    acessoAuto: "",
    patio: "",
    patioComentario: "",
  });
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario>({
    nome: "",
    cpf: "",
    rg: "",
    celular: "",
    ufEmissao: "",
    autoInfracao: "",
    placaVeiculo: "",
    tipoUsuario: "",
    solicitante: "",
  });
  const [endereco, setEndereco] = useState<Address>({
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMultas = async () => {
      try {
        setLoading(true);

        const response = await multaService.getAll();

        if (response.success && response.data) {
          setMultas(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erro ao buscar multas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMultas();
  }, []);

  useEffect(() => {
    const loadSavedData = () => {
      try {
        const saved = localStorage.getItem("recurso-formulario");

        if (saved) {
          const data = JSON.parse(saved);

          setSelectedMulta(data.selectedMulta ?? null);
          setDadosFormulario(
            data.dadosFormulario ?? {
              tipoDefesa: "",
              fato: "",
              fatoComentario: "",
              notificado: "",
              tempoNotificacao: "",
              agente: "",
              acessoAuto: "",
              patio: "",
              patioComentario: "",
            },
          );

          setDadosUsuario(
            data.dadosUsuario ?? {
              nome: "",
              cpf: "",
              rg: "",
              celular: "",
              ufEmissao: "",
              autoInfracao: "",
              placaVeiculo: "",
              tipoUsuario: "",
              solicitante: "",
            },
          );

          setEndereco(
            data.endereco ?? {
              cep: "",
              logradouro: "",
              numero: "",
              bairro: "",
              cidade: "",
              uf: "",
            },
          );
        }
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error);
      } finally {
        setLoading(true);
      }
    };

    loadSavedData();
  }, []);

  return (
    <RecursoContext.Provider
      value={{
        multas,
        selectedMulta,
        setSelectedMulta,
        dadosFormulario,
        setDadosFormulario,
        dadosUsuario,
        setDadosUsuario,
        endereco,
        setEndereco,
        loading,
      }}
    >
      {children}
    </RecursoContext.Provider>
  );
};
