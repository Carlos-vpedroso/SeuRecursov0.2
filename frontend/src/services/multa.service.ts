import { Multa } from "@/types";

export class MultaService {
    async getAll(): Promise<{ success: boolean, data?: Multa[], error?: string }> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/multas/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                return {
                    success: false,
                    error: "Erro ao buscar multas"
                }
            }

            const multas = await response.json();
            return {
                success: true,
                data: multas
            };
        } catch (error) {
            console.error("Erro no getAll:", error);
            throw error;
        }
    }

    async getById(id: string): Promise<{ success: boolean, data?: Multa, error?: string }> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/multas/get/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                return {
                    success: false,
                    error: "Erro ao buscar multa"
                }
            }

            const multa = await response.json();
            return {
                success: true,
                data: multa
            };
        } catch (error) {
            console.error("Erro no getAll:", error);
            throw error;
        }
    }
}

export const multaService = new MultaService();