import axios from "axios";
import QRCode from "qrcode";
import getTokenSicoob from "./sicoobAuth";
import getSicoobHttpsAgent from "./sicoobCert";

export async function createPixSicoob(valor: number) {
    try {
        const token = await getTokenSicoob();
        const httpsAgent = getSicoobHttpsAgent();

        // 🔹 cria cobrança
        const response = await axios.post(
            `https://api.sicoob.com.br/pix/api/v2/cob`,
            {
                calendario: { expiracao: 3600 },
                valor: { original: valor.toFixed(2), modalidadeAlteracao: 0 },
                chave: process.env.SICOOB_PIX_KEY,
                solicitacaoPagador: "Pagamento de recurso de multa",
            },
            {
                httpsAgent,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data;

        const txid = data.txid;
        const copiaECola = data.brcode;

        const qrCodeImage = await QRCode.toDataURL(copiaECola);


        return {
            txid,
            qrCode: copiaECola,
            qrCodeImage
        };

    } catch (error) {
        console.error("Erro ao criar PIX:", error);
        throw new Error("Erro ao criar PIX no Sicoob");
    }
}