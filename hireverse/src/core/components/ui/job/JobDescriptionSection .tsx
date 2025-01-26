import { Box, Typography } from "@mui/material";
import RenderJobDescription from "@core/components/ui/job/RenderJobDescription";

type JobDescriptionSectionProps = {
    job: {
        description: string;
        responsibilities?: string;
        whoYouAre?: string;
        niceToHaves?: string;
    };
};

const JobDescriptionSection = ({ job }: JobDescriptionSectionProps) => {
    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Job Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                <RenderJobDescription htmlContent={job.description} />
            </Typography>

            {job.responsibilities && (
                <>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Responsibilities
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        <RenderJobDescription htmlContent={job.responsibilities} />
                    </Typography>
                </>
            )}

            {job.whoYouAre && (
                <>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Who You Are
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        <RenderJobDescription htmlContent={job.whoYouAre} />
                    </Typography>
                </>
            )}

            {job.niceToHaves && (
                <>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Nice to Have
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        <RenderJobDescription htmlContent={job.niceToHaves} />
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default JobDescriptionSection;
