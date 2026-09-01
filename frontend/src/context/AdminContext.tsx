"use client";

import { adminService } from "@/services/admin.service";
import { AdminUser } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AdminContextType {
  admin: AdminUser | null;
  accessToken: string | null;
  login: (
    username: string,
    password: string,
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (
    username: string,
    password: string,
  ): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      const response = await adminService.login(username, password);

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error || "Erro ao fazer login",
        };
      }

      const { admin, token } = response.data;

      setAdmin(admin);
      setAccessToken(token);

      Cookies.set("adminToken", token, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
        sameSite: "strict",
        path: "/",
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      return {
        success: false,
        error: "Erro inesperado ao fazer login",
      };
    }
  };

  const logout = () => {
    // Remove o token do cookie
    Cookies.remove("adminToken", {
      path: "/",
    });

    // Limpa os dados do estado
    setAdmin(null);
    setAccessToken(null);
    window.location.reload();
  };

  useEffect(() => {
    const restoreSession = () => {
      try {
        const token = Cookies.get("adminToken");

        if (!token) {
          setAccessToken(null);
          setAdmin(null);
          return;
        }

        const [, payload] = token.split(".");

        if (!payload) {
          Cookies.remove("adminToken", {
            path: "/",
          });

          setAccessToken(null);
          setAdmin(null);

          return;
        }

        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
        );

        // Verifica expiração do JWT
        if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
          Cookies.remove("adminToken", {
            path: "/",
          });

          setAccessToken(null);
          setAdmin(null);

          return;
        }

        setAccessToken(token);

        setAdmin({
          id: decodedPayload.id,
          name: decodedPayload.name,
          username: decodedPayload.username,
        });
      } catch (error) {
        console.error("Erro ao restaurar sessão do admin:", error);

        Cookies.remove("adminToken", {
          path: "/",
        });

        setAccessToken(null);
        setAdmin(null);
      }
    };

    restoreSession();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, accessToken, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
