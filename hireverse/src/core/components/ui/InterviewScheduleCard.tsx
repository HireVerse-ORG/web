import colors from '@core/theme/colors';
import { InterviewStatus, InterviewType } from '@core/types/interview.interface';
import { getInterviewStatusDetails } from '@core/utils/ui';
import { Box, Chip, Skeleton, Typography } from '@mui/material';
import moment from 'moment';

type InterviewScheduleCardProps = {
    data: {
        jobTitle?: string;
        scheduledTime: Date;
        type: InterviewType;
        status: InterviewStatus;
        description?: string;
    };
    children?: React.ReactNode;
}
const InterviewScheduleCard = ({ data, children }: InterviewScheduleCardProps) => {
    const statusDetails = getInterviewStatusDetails(data.status);

    return (
        <Box mb={2} p={2} border={1} borderColor={colors.borderColour} borderRadius={2}>
            {data.jobTitle && (
                <Typography variant="h6" gutterBottom>
                    {data.jobTitle}
                </Typography>
            )}
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                {moment(data.scheduledTime).format('MMMM Do YYYY, h:mm a')}
            </Typography>

            <Box display="flex" gap={3} mb={1}>
                <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>Type:</Typography>
                    <Typography textTransform="capitalize" fontWeight={500}>{data.type}</Typography>
                </Box>

                <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>Status:</Typography>
                    <Chip
                        size="small"
                        variant="outlined"
                        label={statusDetails.label}
                        color={statusDetails.color}
                    />
                </Box>
            </Box>

            {data.description && (
                <Box mt={1}>
                    <Typography variant="body2" color="text.secondary">Description:</Typography>
                    <Typography variant="body1" whiteSpace="pre-wrap">
                        {data.description}
                    </Typography>
                </Box>
            )}

            {children}
        </Box>
    );
}

export const InterviewScheduleCardSkeleton = () => {
    return (
        <Box sx={{ width: "100%", p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="rectangular" width="100%" height={150} sx={{ my: 1, borderRadius: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 2 }} />
        </Box>
    )
}

export default InterviewScheduleCard;
