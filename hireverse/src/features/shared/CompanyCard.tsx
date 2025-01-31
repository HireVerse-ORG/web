import colors from '@core/theme/colors';
import { Box, Typography, Chip, Avatar } from '@mui/material';

type CompanyCardProps = {
    data: {
        name: string;
        image: string;
        location: {
            city: string,
            country: string;
        }
        type: string;
        industry: string;
    };
    onClick?: () => void;
};

const CompanyCard = ({ data, onClick }: CompanyCardProps) => {
    return (
        <Box
            sx={{
                border: `1px solid ${colors.borderColour}`,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: "start",
                cursor: onClick ? 'pointer' : 'default',
            }}
            onClick={onClick}
        >
            {/* Image */}
            <Avatar
                variant='square'
                alt={data.name}
                src={data.image}
                sx={{ width: 80, height: 80, marginBottom: 2 }}
                slotProps={{
                    img: {
                        style: { objectFit: "contain" }
                    }
                }}
            />

            {/* Name */}
            <Typography variant="h6" align="center" sx={{ fontWeight: 500, marginBottom: 1 }}>
                {data.name}
            </Typography>

            {data.location.city && data.location.country && (
                <Typography variant="body2" mb={1}>
                    {data.location.city}, {data.location.country}
                </Typography>
            )}


            {/* Type and Industry as Chips */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: "wrap" }}>
                <Chip variant='outlined' label={data.type} color="success" size="small" />
                <Chip variant='outlined' label={data.industry} color="info" size="small" />
            </Box>
        </Box>
    );
};

export default CompanyCard;
