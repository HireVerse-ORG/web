import { Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Box display="flex" alignItems="center">
      <img src="/hireverse.svg" alt="hireverse-logo" width={32} height={32} style={{ marginRight: 8 }} />
      <Typography variant="h6" fontWeight="bold">
        HireVerse
      </Typography>
    </Box>
  );
};

export default Logo;
