import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type GoBackTitleButtonProps = {
    title: string;
    children?: React.ReactNode;
};

const GoBackTitleButton = ({ title, children }: GoBackTitleButtonProps) => {
    const navigate = useNavigate();

    return (
        <Box display="flex" alignItems="center" sx={{ mb: { xs: 0.5, md: 1 } }}>
            <IconButton onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowBack />
            </IconButton>
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                {children}
            </Box>
        </Box>
    );
};

export default GoBackTitleButton;
