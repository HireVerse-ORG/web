import { decrypt, encrypt } from "@core/lib/crypto";
import { User } from "@core/types/user.interface";

export const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token") || null;

export const getUser = (): User | null => {
    const userData = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
};

export const clearUser = () => {
    if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
    } else {
        sessionStorage.removeItem("user")
    }
}

export const clearToken = () => {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
    } else {
        sessionStorage.removeItem("token")
    }
}

export function setUserApplicationInfo(data: {
    fullName: string;
    email: string;
    phoneNo: string;
    coverLetter: string;
    resumeLink: string;
}): void {
    try {
        const encryptedData = encrypt(data);
        localStorage.setItem('userApplicationData', encryptedData);
    } catch (error) {
        throw new Error('Failed to save user application info');
    }
}

export function getUserApplicationInfo(): {
    fullName: string;
    email: string;
    phoneNo: string;
    coverLetter: string;
    resumeLink: string;
} | null {
    try {
        const encryptedData = localStorage.getItem('userApplicationData');

        if (!encryptedData) {
            console.log('No user application info found in storage.');
            return null;
        }

        const decryptedData = decrypt(encryptedData);
        return decryptedData;
    } catch (error) {
        throw new Error('Failed to retrieve user application info');
    }
}