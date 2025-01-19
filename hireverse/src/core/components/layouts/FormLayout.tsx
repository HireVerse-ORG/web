import { Box, Typography, SxProps, Theme } from "@mui/material";

interface FormLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>; 
    headerSx?: SxProps<Theme>; 
    contentSx?: SxProps<Theme>; 
}

const FormLayout = ({
    title,
    description,
    children,
    sx = {}, 
    headerSx = {}, 
    contentSx = {},
}: FormLayoutProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "start" },
                flexWrap: "wrap",
                gap: 4,
                mb: 3,
                overflow: "hidden",
                ...sx, 
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    width: "300px",
                    ...headerSx, 
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="textDisabled" gutterBottom>
                    {description}
                </Typography>
            </Box>

            {/* Content */}
            <Box
                flexGrow={1}
                sx={{
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    ...contentSx, 
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default FormLayout;
