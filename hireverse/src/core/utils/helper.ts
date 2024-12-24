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