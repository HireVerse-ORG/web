export const getTitle = (path: string, id: string | undefined) => {
    switch (path) {
        case "/admin/skills":
            return id ? `Edit Skill - ${id}` : "Manage Skills";
        case "/admin/settings":
            return "Settings";
        default:
            return "Admin Panel";
    }
};