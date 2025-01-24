import colors from "@core/theme/colors"
import { Box, Button, Typography } from "@mui/material"

type JobTitleCardProps = {
    data: {
        jobid: string,
        jobtitle: string,
        companyName: string,
        companyLogoUrl: string,
        companyLocation: {
            city: string,
            country: string,
        }
    }

    onApply: (jobId: string) => void;
}

const JobTitleCard = ({ data, onApply }: JobTitleCardProps) => {
    const {jobid, jobtitle, companyName, companyLogoUrl, companyLocation} = data;
    return (
        <Box sx={{
            border: `1px solid ${colors.borderColour}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            backgroundColor: "white",
            p: 2,
        }}>
            {/* Company Image */}
            <Box
                sx={{
                    flex: "0 0 100px",
                    height: "auto",
                    backgroundImage: `url(${companyLogoUrl})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 2, sm: 0 },
                }}
            />

            {/* Content and Button */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                {/* Job and Company Details */}
                <Box sx={{ minWidth: 200, flex: 1 }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                            mb: 0.5,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {jobtitle}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <span style={{ fontWeight: 'bold' }}>
                            {companyName}
                        </span>
                        {companyName && companyLocation?.city && companyLocation?.country ? (
                            ` . ${companyLocation.city}, ${companyLocation.country}`
                        ) : (
                            ""
                        )}
                    </Typography>
                </Box>

                {/* Buttons */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            width: { xs: "100%", sm: "auto" },
                            mt: { xs: 2, sm: 0 },
                            display: "flex",
                            justifyContent: { xs: "flex-start", sm: "flex-end" },
                            gap: 2,
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => onApply(jobid)}
                        >
                            Apply
                        </Button>
                    </Box>
            </Box>
        </Box>
    );
}

export default JobTitleCard;
