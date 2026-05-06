import axios from "axios";
import getSicoobHttpsAgent from "./sicoobCert";

export default async function getTokenSicoob() {
    try {
        const httpsAgent = getSicoobHttpsAgent();

        const response = await axios.post(
            "https://auth.sicoob.com.br/auth/realms/cooperado/protocol/openid-connect/token",
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.SICOOB_CLIENT_ID!,
                scope: "pix.read cobv.read lotecobv.write payloadlocation.read webhook.write cob.read cob.write webhook.read pix.write lotecobv.read payloadlocation.write cobv.write"
            }),
            {
                httpsAgent,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return response.data.access_token;

    } catch (error) {
        console.error("Erro ao autenticar no Sicoob:", error);
        throw new Error("Erro ao obter token Sicoob");
    }
}
