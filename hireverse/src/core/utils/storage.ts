import { User } from "@core/types/user.interface";

export const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token") || null;

export const getUser = (): User | null => {
    const userData = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
};

export const clearUser = () => {
    if(localStorage.getItem("user")){
        localStorage.removeItem("user");
    } else {
        sessionStorage.removeItem("user")
    }
}

export const clearToken = () => {
    if(localStorage.getItem("token")){
        localStorage.removeItem("token");
    } else {
        sessionStorage.removeItem("token")
    }
}