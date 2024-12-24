import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type LogoProps = {
  homePath?: string;
}

const Logo = ({homePath = '/'}: LogoProps) => {
  return (
    <Link to={homePath} style={{ textDecoration: 'none' }}>
      <Box display="flex" alignItems="center">
        <img src="/hireverse.svg" alt="hireverse-logo" width={32} height={32} style={{ marginRight: 8 }} />
        <Typography variant="h6" fontWeight="bold">
          HireVerse
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
