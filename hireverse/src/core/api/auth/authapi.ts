import axios from "@core/lib/axios"
import { LoginResponse, RegisterResponse } from "./types";
import { apiWrapper, handleApiError } from "@core/utils/helper";
import { User } from "@core/types/user.interface";

export const getUser = async (): Promise<User> => {
    try {
        return (await axios.get<User>('/user')).data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export const msSignin = async (data: { msToken: string, role: string}): Promise<LoginResponse> => {
    return (await apiWrapper(axios.post<LoginResponse>("/user/auth/microsoft", data))).data;
}

export const googleSignin = async (data: { gToken: string, role: string}): Promise<LoginResponse> => {
    return (await apiWrapper(axios.post<LoginResponse>("/user/auth/google", data))).data;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        return (await axios.post<LoginResponse>('/user/login', {email, password})).data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export const registerUser = async (data: any): Promise<RegisterResponse> => {
    try {
        return (await axios.post<RegisterResponse>('/user/register', data)).data; 
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export const sendOtp = async (email: string) => {
    try {
        return (await axios.post<LoginResponse>('/user/send-otp', {email})).data; 
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export const verifyUser = async (data: {email: string, otp: string}): Promise<LoginResponse> => {
    try {
        return (await axios.put<LoginResponse>('/user/verify-otp', data)).data; 
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export const requestResetPassword = async (data: {email: string}) => {
    try {
        return (await axios.post('/user/request-password-reset', data)).data; 
    } catch (error: any) {
        throw handleApiError(error);
    }
}

export const resetPassword = async (data: {token: string, newPassword: string, confirmPassword: string}) => {
    try {
        return (await axios.post('/user/reset-password', data)).data; 
    } catch (error: any) {
        throw handleApiError(error);
    }
}
