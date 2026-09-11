import { AdminUser } from "@/types";

export class AdminService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async login(
    username: string,
    password: string,
  ): Promise<{
    success: boolean;
    data?: { admin: AdminUser; token: string };
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Erro ao fazer login",
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

export const adminService = new AdminService();
