import colors from "@core/theme/colors";
import { Box, Typography } from "@mui/material";

interface CompanyDetailCardProps {
    icon: JSX.Element;
    label: string;
    value: string;
}

const CompanyDetailCard = ({ icon, label, value }: CompanyDetailCardProps) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2
        }}>

            <Box
                sx={{
                    color: "lightblue",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${colors.borderColour}`,
                }}
            >
                {icon}
            </Box>

            {/* Label and Value */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" color="textSecondary">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export default CompanyDetailCard;
