import Cookies from "js-cookie"

export type CreatePaymentDTO = {
    userId: string;
    multaId: string;
    metodo: "PIX" | "CREDIT_CARD";
    gateway: "SICOOB" | "INFINITEPAY";
    metadata: any;
};

export type CreatePaymentResponse = {
    success: boolean;
    message: string;
    pagamentoId?: number;
    paymentData?: {
        qrCode?: string;
        qrCodeImage?: string;
        checkoutUrl?: string;
    };
    fields?: string[];
};

export class PaymentService {
    private baseUrl = process.env.NEXT_PUBLIC_API_URL;
    private getToken() {
        return Cookies.get("token");
    }

    async create(data: CreatePaymentDTO): Promise<CreatePaymentResponse> {
        const token = this.getToken();
        const response = await fetch(`${this.baseUrl}/pagamentos/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    }
}

export const paymentService = new PaymentService();