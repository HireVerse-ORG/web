const colors = {
    borderColour: "#D6DDEB",
    secondory: {
        veryLight: "#f7f7fd",
        accent: "#26A4FF"
    },
    success: {
        main: '#56CDAD',
    },
    error: {
        main: '#FF6550',
    }
};

export const getColorByIndex = (index: number): "primary" | "secondary" | "success" | "error" | "warning" | "info" => {
    const colors = ["success", "warning", "info", "error", "primary"] as const;
    return colors[index % colors.length];
};

export default colors;