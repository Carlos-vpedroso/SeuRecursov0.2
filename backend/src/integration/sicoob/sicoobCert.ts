import https from "https";

export default function getSicoobHttpsAgent() {
    const base64 = process.env.SICOOB_CERT_BASE64;
    const passphrase = process.env.SICOOB_CERT_PASSWORD;

    if (!base64) {
        throw new Error("SICOOB_CERT_BASE64 não definido");
    }

    return new https.Agent({
        pfx: Buffer.from(base64.replace(/\n/g, ""), "base64"),
        passphrase,
        minVersion: "TLSv1.2",
        maxVersion: "TLSv1.3",
    });
}