import { useState } from "react";
import AddButton from "@core/components/ui/AddButton";
import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Box, Typography } from "@mui/material";

const experiences = [
    {
        title: "Product Designer",
        company: "Twitter",
        employmentType: "Full-Time",
        duration: {
            start: "Jun 2019",
            end: "Present",
            total: "1y 1m",
        },
        location: "Manchester, UK",
        description: "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
        image: "https://placehold.co/150x150",
    },
    {
        title: "UX/UI Designer",
        company: "Google",
        employmentType: "Contract",
        duration: {
            start: "Mar 2018",
            end: "May 2019",
            total: "1y 2m",
        },
        location: "London, UK",
        description: "Redesigned core products to enhance user experience, leading to a 20% increase in user retention.",
        image: "https://placehold.co/150x150",
    },
    {
        title: "Front-End Developer",
        company: "Facebook",
        employmentType: "Part-Time",
        duration: {
            start: "Jan 2016",
            end: "Feb 2018",
            total: "2y 1m",
        },
        location: "New York, USA",
        description: "Built responsive web interfaces for global users and optimized application performance by 30%.",
        image: "https://placehold.co/150x150",
    },
    {
        title: "Graphic Designer",
        company: "Adobe",
        employmentType: "Intern",
        duration: {
            start: "May 2015",
            end: "Dec 2015",
            total: "7m",
        },
        location: "San Francisco, USA",
        description: "Created visual content for marketing campaigns, contributing to a 15% increase in customer engagement.",
        image: "https://placehold.co/150x150",
    },
];

type ExperienceCardProps = {
    editable?: boolean;
    showCount?: number;
    username?: string;
};

const ExperiencesCard = ({ editable, showCount = 2, username }: ExperienceCardProps) => {
    const [showAll, setShowAll] = useState(false);
    const visibleExperiences = showAll ? experiences : experiences.slice(0, showCount);
    const restExperienceCount = experiences.length - visibleExperiences.length;

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Experiences
                </Typography>
                {editable && <AddButton color="primary" />}
            </Box>

            {visibleExperiences.map((experience, index) => (
                <Box
                    key={index}
                    sx={{
                        py: 2,
                        borderBottom: `1px solid ${colors.borderColour}`,
                        display: "flex",
                        alignItems: "start",
                        gap: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={experience.image}
                        alt={experience.title}
                        sx={{
                            width: { xs: 60, sm: 80 },
                            height: { xs: 60, sm: 80 },
                            objectFit: "cover",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        loading="lazy"
                    />
                    <Box flexGrow={1} display="flex" alignItems="start" justifyContent="space-between">
                        <Box>
                            <Typography variant="h6" fontWeight={500}>
                                {experience.title}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="subtitle1">{experience.company}</Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    •
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    {experience.employmentType}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    •
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                    {experience.duration.total}
                                </Typography>
                            </Box>

                            <Typography variant="subtitle2" sx={{ color: "gray" }}>
                                {experience.location}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                                {experience.description}
                            </Typography>
                        </Box>
                        {editable && <EditButton color="primary" />}
                    </Box>
                </Box>
            ))}

            {/* Show/hide toggle */}
            {!showAll && restExperienceCount > 0 ? (
                <Typography
                    variant="body2"
                    onClick={() => setShowAll(true)}
                    sx={{
                        mt: 2,
                        color: "primary.main",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Show {restExperienceCount} more experience{restExperienceCount > 1 ? "s" : ""}
                </Typography>
            ) : showAll && (
                <Typography
                    variant="body2"
                    onClick={() => setShowAll(false)}
                    sx={{
                        mt: 2,
                        color: "primary.main",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Show less
                </Typography>
            )}
        </Box>
    );
};

export default ExperiencesCard;
