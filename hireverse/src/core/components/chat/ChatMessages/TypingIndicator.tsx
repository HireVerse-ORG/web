import colors from "@core/theme/colors";
import { Box } from "@mui/material";

const TypingIndicator = () => {
  const dotColor = "primary.main";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
        backgroundColor: `${colors.secondory.veryLight}`,
        borderRadius: 2,
        width: "fit-content",
      }}
    >
      <Box sx={{ display: "flex", gap: "2px" }}>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: `${dotColor}`,
            animation: "blink 1.4s infinite",
            animationDelay: "0s",
          }}
        />
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: `${dotColor}`,
            animation: "blink 1.4s infinite",
            animationDelay: "0.2s",
          }}
        />
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: `${dotColor}`,
            animation: "blink 1.4s infinite",
            animationDelay: "0.4s",
          }}
        />
      </Box>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
    </Box>
  );
};

export default TypingIndicator;
