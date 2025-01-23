import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import colors from "@core/theme/colors";

type SecondaryLightLayoutProps = {
  header: ReactNode;
  children: ReactNode; 
};

const SecondaryLightLayout = ({ header, children }: SecondaryLightLayoutProps) => {
  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: colors.secondory?.veryLight || "#f5f5f5",
        }}
      >
        <Container sx={{py: 4}}>
         {header}
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{backgroundColor: "white", minHeight: "500px"}}>
        <Container sx={{py: 5}}>
            {children}
        </Container>
      </Box>
    </Box>
  );
};

export default SecondaryLightLayout;
