export type UserRoles = 'admin' | 'seeker' | 'company';

export interface User {
    id: string;
    email: string;
    role: UserRoles;
    fullname: string;
    isVerified: boolean;
    isBlocked: boolean;
}