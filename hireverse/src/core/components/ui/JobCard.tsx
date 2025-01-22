import colors, { getColorByIndex } from "@core/theme/colors";
import { Box, Button, Chip, Typography } from "@mui/material";

type JobCardProps = {
    job: {
        id: string;
        title: string;
        employmentType: string[];
        categories: string[];
    };
    company: {
        imageUrl: string;
        name: string;
        location: {
            city: string;
            country: string;
        };
    };
    canApply?: boolean;
    onApply: (jobId: string) => void;
};

const JobCard = ({ job, company, onApply, canApply = false }: JobCardProps) => {
    return (
        <Box
            sx={{
                border: `1px solid ${colors.borderColour}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                backgroundColor: "white",
                p: 2,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                },
            }}
        >
            {/* Company Image */}
            <Box
                sx={{
                    flex: "0 0 100px",
                    height: "auto",
                    backgroundImage: `url(${company.imageUrl})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
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
                        {job.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <span style={{ fontWeight: 'bold' }}>
                            {company.name || ""}
                        </span>
                        {company.name && company.location?.city && company.location?.country ? (
                            ` . ${company.location.city}, ${company.location.country}`
                        ) : (
                            ""
                        )}
                    </Typography>


                    {/* Chips for Employment Types and Categories */}
                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {job.employmentType.map((type, index) => (
                            <Chip
                                key={index}
                                label={type}
                                size="small"
                                color={getColorByIndex(index)}
                            />
                        ))}

                        <Typography sx={{ mx: 1, color: "gray" }}>|</Typography>

                        {job.categories.map((category, index) => (
                            <Chip
                                key={index}
                                label={category}
                                size="small"
                                color={getColorByIndex((category.length - 1) - index)}
                                variant="outlined"
                            />
                        ))}
                    </Box>

                </Box>

                {/* Apply Button */}
                {canApply && (
                    <Box
                        sx={{
                            flexShrink: 0,
                            width: { xs: "100%", sm: "auto" },
                            mt: { xs: 2, sm: 0 },
                            display: "flex",
                            justifyContent: { xs: "flex-start", sm: "flex-end" },
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => onApply(job.id)}
                        >
                            Apply
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default JobCard;
