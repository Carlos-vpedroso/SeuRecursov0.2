import { Multa } from "@/types";

export class MultaService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  async getAll(): Promise<{
    success: boolean;
    data?: Multa[];
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/multas/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return {
          success: false,
          error: "Erro ao buscar multas",
        };
      }

      const multas = await response.json();
      return {
        success: true,
        data: multas,
      };
    } catch (error) {
      console.error("Erro no getAll:", error);
      throw error;
    }
  }

  async getById(
    id: string,
  ): Promise<{ success: boolean; data?: Multa; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/multas/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return {
          success: false,
          error: "Erro ao buscar multa",
        };
      }

      const multa = await response.json();
      return {
        success: true,
        data: multa,
      };
    } catch (error) {
      console.error("Erro no getAll:", error);
      throw error;
    }
  }

  async create(
    data: Omit<Multa, "id">,
    adminToken: string,
  ): Promise<{
    success: boolean;
    data?: Multa;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/multas/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          artigo_multa: data.artigo_multa,
          codigo_multa: data.codigo_multa,
          valor_multa: data.valor_multa,
          valor_recurso: data.valor_recurso,
          descricao: data.descricao,
          tipo_multa: data.tipo_multa,
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Erro ao criar multa",
        };
      }
  
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Erro no create:", error);
  
      return {
        success: false,
        error: "Erro ao criar multa",
      };
    }
  }

  async update(
    id: string,
    data: Omit<Multa, "id">,
    adminToken: string,
  ): Promise<{
    success: boolean;
    data?: Multa;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/multas/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Erro ao atualizar multa",
        };
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Erro no update:", error);

      return {
        success: false,
        error: "Erro ao atualizar multa",
      };
    }
  }

  async delete(
    id: string,
    adminToken: string,
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/multas/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Erro ao excluir multa",
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Erro no delete:", error);

      return {
        success: false,
        error: "Erro ao excluir multa",
      };
    }
  }
}

export const multaService = new MultaService();
