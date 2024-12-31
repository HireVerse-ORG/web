import { UserRoles } from "@core/types/user.interface"
import { AxiosError } from "axios";

export const getUserDashboardPath = (user: UserRoles) => {
    let dashboardPath = '/seeker';

    if(user === "admin"){
        dashboardPath = '/admin';
    } else if (user === "company"){
        dashboardPath = "/company";
    }
    
    return dashboardPath
}

export const maskEmail = (email: string, visibleChars = 2) => {
    const [localPart, domain] = email.split("@");
    const visiblePart = localPart.slice(0, visibleChars);
    const maskedLocalPart = `${visiblePart}${"*".repeat(localPart.length - visibleChars)}`;
    return `${maskedLocalPart}@${domain}`;
};

export const handleApiError = (error: any) => {
    if(error instanceof AxiosError){
        return error.response?.data?.message || error.response?.data
    }

    return "Unknown Errors"
}

export const apiWrapper = async <T>(fn: Promise<T>): Promise<T> => {
    try {
        return await fn;
    } catch (error: any) {
        throw handleApiError(error);
    }
};
