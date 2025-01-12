import { Box, Typography } from "@mui/material";

interface FormLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
    title,
    description,
    children,
}) => {
    return (
        <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: {xs: "center", sm: "start"},
               flexWrap: "wrap",
               gap: 4,
               mb: 3,
               overflow: "hidden",
            }}
        >
            {/* Header */}
            <Box sx={{
                width: "300px",
            }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="textDisabled" gutterBottom>
                    {description}
                </Typography>
            </Box>

            {/* Content */}
            <Box flexGrow={1} sx={{
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                {children}
            </Box>
        </Box>
    );
};

export default FormLayout;
