import { Box } from "@mui/material";

type SegmentedProgressBarProps = {
    progress: number; 
    segments: number; 
    color: string; 
};

const SegmentedProgressBar = ({ progress, segments, color }: SegmentedProgressBarProps) => {
    const completedSegments = Math.floor((progress / 100) * segments); 

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {Array.from({ length: segments }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        width: "100%",
                        height: 8,
                        backgroundColor: index < completedSegments ? color : "#E0E0E0",
                        mx: index < segments - 1 ? 0.5 : 0, 
                    }}
                />
            ))}
        </Box>
    );
};

export default SegmentedProgressBar;
