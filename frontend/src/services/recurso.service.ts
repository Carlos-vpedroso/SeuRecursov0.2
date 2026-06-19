import { RecursoResponseWithMetaData } from "@/types";

export class RecursoService {
    private baseUrl = process.env.NEXT_PUBLIC_API_URL;

    async makePDF(
        recursoId: string,
        token:string
    ): Promise<{
        success: boolean;
        data?: RecursoResponseWithMetaData;
        error?: string;
    }> {

        try {

            const response = await fetch(
                `${this.baseUrl}/recursos/make-pdf/${recursoId}`,
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
                    error:
                        result.message ||
                        "Erro ao buscar dados do recurso",
                };
            }

            return {
                success: true,
                data: result,
            };

        } catch (error) {

            console.error("Erro ao gerar PDF:", error);

            return {
                success: false,
                error: "Erro inesperado",
            };
        }
    }

}

export const recursoService = new RecursoService();