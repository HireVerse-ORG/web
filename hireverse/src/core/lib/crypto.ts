import CryptoJS from 'crypto-js';

const SECRET_KEY: string = import.meta.env.VITE_CRYPTO_SECRET;

export function encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);

    try {
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
            throw new Error('Decryption failed: Invalid encrypted data');
        }
        return JSON.parse(decryptedString);
    } catch (error) {
        throw new Error('Failed to decrypt data');
    }
}