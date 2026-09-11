"use client";

import { useAuth } from "@/hook/useAuth";
import { Multa } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import { multaService } from "@/services/multa.service";

interface DashboardContextType {
  multas: Multa[];
  setMultas: React.Dispatch<React.SetStateAction<Multa[]>>;
  loading: boolean;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { accessToken } = useAuth(AdminContext);
  const [multas, setMultas] = useState<Multa[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAll = async () => {
    // if (!accessToken) return;
    setLoading(true);
    try {
      const [multaRes] = await Promise.all([multaService.getAll()]);

      if (multaRes.success && multaRes.data) {
        setMultas(multaRes.data);
      }
    } catch (error) {
      console.error("Erro no fetchAll:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchAll();
    // if (accessToken) {
    // }
  }, [accessToken]);

  return (
    <DashboardContext.Provider
      value={{
        multas,
        setMultas,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
