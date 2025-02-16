import { Skeleton } from "@mui/material";

const ChartSkeleton = () => (
    <Skeleton
        variant="rectangular"
        height={300}
        sx={{ borderRadius: 2 }}
        animation="wave"
    />
);

export default ChartSkeleton;
