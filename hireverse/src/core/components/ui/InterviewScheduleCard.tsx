import colors from '@core/theme/colors';
import { InterviewStatus, InterviewType } from '@core/types/interview.interface';
import { getInterviewStatusDetails } from '@core/utils/ui';
import { Box, Chip, Typography } from '@mui/material';
import moment from 'moment';

type InterviewScheduleCardProps = {
    data: {
        scheduledTime: Date;
        type: InterviewType;
        status: InterviewStatus;
        description?: string;
    };
    children?: React.ReactNode;
}
const InterviewScheduleCard = ({data, children}: InterviewScheduleCardProps) => {
    const statusDetails = getInterviewStatusDetails(data.status);
    
    return (
        <Box mb={2} p={2} border={1} borderColor={colors.borderColour} borderRadius={2}>
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

export default InterviewScheduleCard;
