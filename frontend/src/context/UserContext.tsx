"use client"
import React, { createContext, ReactNode, useState, useEffect } from "react"
import Cookies from "js-cookie"
import { DadosUser, Providers } from "@/types"
import { userService } from "@/services/user.service";
import { decodeJwt } from "jose";

interface UserContextType {
    user: DadosUser | null;
    accessToken: string | null;
    SignIn: (email: string, password: string) => Promise<{ success: boolean, message: string }>
    SignOut: () => void;
    loading: boolean;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    accessToken: null,
    SignIn: async () => ({ success: false, message: "" }),
    SignOut: () => { },
    loading: false
})

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<DadosUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) return;

        try {
            const decoded: { id: string, nome: string, email: string, provider: Providers } = decodeJwt(token);

            const userData: DadosUser = {
                id: decoded.id,
                nome: decoded.nome,
                email: decoded.email,
                provider: decoded.provider
            };

            setUser(userData);
            setAccessToken(token);
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            Cookies.remove("token");
        }
    }, []);

    async function SignIn(email: string, password: string) {
        setLoading(true);

        try {
            const response = await userService.login(email, password);

            if (!response.success || !response.data) {
                return {
                    success: false,
                    message: response.error || "Erro ao fazer login"
                };
            }

            const { user, token } = response.data;

            // salva no state
            setUser(user);
            setAccessToken(token);

            // salva no cookie
            Cookies.set("token", token, { expires: 7 });

            return {
                success: true,
                message: "Login realizado com sucesso"
            };

        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: "Erro inesperado ao fazer login"
            };
        } finally {
            setLoading(false);
        }
    }

    function SignOut() {
        setUser(null)
        setAccessToken(null)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                accessToken,
                SignIn,
                SignOut,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    )
}