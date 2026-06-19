import { RecursoResponseWithoutMetaData } from "@/types";

export class UserService {

    private baseUrl = process.env.NEXT_PUBLIC_API_URL;

    async getAllRecursos(userId: string, token: string): Promise<{
        success: boolean;
        data?: RecursoResponseWithoutMetaData[];
        error?: string;
    }> {
        try {

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