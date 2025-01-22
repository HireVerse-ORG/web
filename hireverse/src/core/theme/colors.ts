const colors = {
    borderColour: "#D6DDEB"
};

export const getColorByIndex = (index: number): "primary" | "secondary" | "success" | "error" | "warning" | "info" => {
    const colors = ["success", "warning", "info", "error", "primary"] as const;
    return colors[index % colors.length];
};

export default colors;