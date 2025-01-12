import { Box, StepIconProps } from "@mui/material";

const StepIcon = (props: StepIconProps & { icon: JSX.Element }) => {
    const { icon, active, completed } = props;
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: completed
                    ? "success.main"
                    : active
                    ? "primary.main"
                    : "grey.400",
                color: "#fff",
            }}
        >
            {icon}
        </Box>
    );
};

export default StepIcon;
