import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import colors from "@core/theme/colors";
import { useLocation } from "react-router-dom";

type SecondaryLightLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

const SecondaryLightLayout = ({ header, children }: SecondaryLightLayoutProps) => {
  const location = useLocation();

  const isDashboard = location.pathname.includes("seeker");

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: colors.secondory?.veryLight || "#f5f5f5",
        }}
      >
        <Container sx={{ py: 4 }}>
          {header}
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ backgroundColor: "white", minHeight: "500px" }}>
        {!isDashboard ? (
          <Container sx={{ py: 5 }}>
            {children}
          </Container>
        ) : (
          <Box sx={{ py: 5 }}>
            {children}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SecondaryLightLayout;
