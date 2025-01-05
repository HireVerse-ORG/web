import { styled, Box, BoxProps } from "@mui/material";

const ScrollableContainer = styled(Box)<BoxProps>({
    "&::-webkit-scrollbar": {
        width: "6px",
        height: "6px", 
    },
    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "#E0DFFF",
        borderRadius: "8px",
        backgroundClip: "padding-box",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: "#8A89D0", 
    },
});


export default ScrollableContainer;
