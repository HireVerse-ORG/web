import { User } from "@core/types/user.interface";

export interface LoginResponse {
    token: string;
    user: User
} 
export interface RegisterResponse {
    user: User
} 