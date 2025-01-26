import { Box, Chip, Divider, Typography } from "@mui/material";
import colors, { getColorByIndex } from "@core/theme/colors";
import { dateFormatter } from "@core/utils/helper";

type JobDetailsSectionProps = {
    job: {
        salaryRange: number[];
        createdAt: Date;
    };
    categories: string[];
    skills: string[];
};

const JobDetailsSection = ({ job, categories, skills }: JobDetailsSectionProps) => {
    return (
        <Box>
            <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    About This Role
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Salary:</strong> {job.salaryRange?.length ? job.salaryRange.join(" - ") : "Not disclosed"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Job Posted:</strong> {dateFormatter(job.createdAt)}
                </Typography>
            </Box>

            <Divider color="red" sx={{ my: 2, border: `1px solid ${colors.borderColour}` }} />

            {categories.length > 0 && (
                <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Categories
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {categories.map((category, index) => (
                            <Chip key={index} label={category} color={getColorByIndex(index)} variant="outlined" />
                        ))}
                    </Box>
                </Box>
            )}

            {skills.length > 0 && (
                <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Required Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {skills.map((skill, index) => (
                            <Chip key={index} label={skill} sx={{ backgroundColor: "secondary.light", color: "primary.main" }} />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default JobDetailsSection;
