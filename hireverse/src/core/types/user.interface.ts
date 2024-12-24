export type UserRoles = 'admin' | 'seeker' | 'company';

export interface User {
    email: string;
    role: UserRoles;
}
