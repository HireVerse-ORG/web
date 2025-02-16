import { Box, Skeleton } from '@mui/material';

const MetricSkeleton = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={80} />
        </Box>
    </Box>
);

export default MetricSkeleton;
