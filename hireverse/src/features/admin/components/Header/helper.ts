export const getTitle = (path: string, id: string | undefined) => {
    switch (path) {
        case "/admin":
            return "Dashboard";
        case "/admin/seekers":
            return "Manage Seekers";
        case "/admin/companies":
            return "Manage Companies";
        case "/admin/skills":
            return id ? `Edit Skill - ${id}` : "Manage Skills";
        case "/admin/job-category":
            return id ? `Edit Category - ${id}` : "Manage Categories";
        case "/admin/settings":
            return "Settings";
        default:
            return "Admin Panel";
    }
};