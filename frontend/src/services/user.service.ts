import { DadosUser, RecursoResponse } from "@/types";
import Cookies from "js-cookie"

export class UserService {

    private baseUrl = process.env.NEXT_PUBLIC_API_URL;

    private getToken() {
        return Cookies.get("token");
    }
    async login(email: string, password: string): Promise<{ success: boolean, data?: { user: DadosUser, token: string }, error?: string }> {
        try {
            const response = await fetch(`${this.baseUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: "Erro ao fazer login"
                }
            }

            return { success: true, data: result };

        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    }

    async registerLocal(data: { nome: string, email: string, password: string }): Promise<{ success: boolean, data?: DadosUser, error?: string }> {
        try {
            const response = await fetch(`${this.baseUrl}/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                    password: data.password,
                    provider: "LOCAL"
                })
            })

            const result = await response.json();

            if (!result.ok) {
                return {
                    success: false,
                    error: "Erro ao fazer login"
                }
            }

            return { success: true, data: result };
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    }

    async getAllRecursos(userId: string): Promise<{
        success: boolean;
        data?: RecursoResponse[];
        error?: string;
    }> {
        try {
            const token = this.getToken();

            const response = await fetch(
                `${this.baseUrl}/users/${userId}/all-recursos`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: result.error || "Erro ao buscar recursos",
                };
            }

            return {
                success: true,
                data: result,
            };
        } catch (error) {
            console.error("Erro ao buscar recursos:", error);
            return {
                success: false,
                error: "Erro inesperado",
            };
        }
    }
}

export const userService = new UserService();