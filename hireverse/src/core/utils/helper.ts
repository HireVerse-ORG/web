import { UserRoles } from "@core/types/user.interface"

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

