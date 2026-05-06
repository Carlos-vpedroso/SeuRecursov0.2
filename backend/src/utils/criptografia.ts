import crypto from 'crypto';

const key = process.env.ENCRYPTION_KEY;

if (!key) {
    throw new Error("ENCRYPTION_KEY não definida no .env");
}

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(key, 'hex');

if (KEY.length !== 32) {
    throw new Error("ENCRYPTION_KEY deve ter 32 bytes (AES-256)");
}

export function encrypt(data: any) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const json = JSON.stringify(data);

    const encrypted = Buffer.concat([
        cipher.update(json, 'utf8'),
        cipher.final()
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decrypt(encryptedData: string) {
    const buffer = Buffer.from(encryptedData, 'base64');

    const iv = buffer.slice(0, 16);
    const tag = buffer.slice(16, 32);
    const text = buffer.slice(32);

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
        decipher.update(text),
        decipher.final()
    ]);

    return JSON.parse(decrypted.toString('utf8'));
}