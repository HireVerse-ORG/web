import AddButton from "@core/components/ui/AddButton";
import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

type EducationCardProps = {
    editable?: boolean;
    showCount?: number;
}

const educations = [
    {
        organisation: "Harvard University",
        field: "Postgraduate degree, Applied Psychology",
        startYear: "2018",
        present: true,
        endDate: "2022",
        image: "https://placehold.co/150x150",
    },
    {
        organisation: "Stanford University",
        field: "Bachelor of Science, Computer Science",
        startYear: "2015",
        present: false,
        endDate: "2019",
        image: "https://placehold.co/150x150",
    },
    {
        organisation: "University of Oxford",
        field: "Master of Business Administration (MBA)",
        startYear: "2016",
        present: false,
        endDate: "2018",
        image: "https://placehold.co/150x150",
    },
    {
        organisation: "Massachusetts Institute of Technology (MIT)",
        field: "PhD, Electrical Engineering",
        startYear: "2020",
        present: true,
        endDate: "2024",
        image: "https://placehold.co/150x150",
    },
    {
        organisation: "University of California, Berkeley",
        field: "Bachelor of Arts, Philosophy",
        startYear: "2012",
        present: false,
        endDate: "2016",
        image: "https://placehold.co/150x150",
    },
    {
        organisation: "University of Cambridge",
        field: "Master’s Degree, Data Science",
        startYear: "2019",
        present: false,
        endDate: "2021",
        image: "https://placehold.co/150x150",
    }
];

const EducationCard = ({ editable, showCount = 2 }: EducationCardProps) => {
    const [showAll, setShowAll] = useState(false);
    const visibleEducations = showAll ? educations : educations.slice(0, showCount);
    const restEducationCount = educations.length - visibleEducations.length;

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Educations
                </Typography>
                {editable && <AddButton color="primary" />}
            </Box>

            {visibleEducations.map((education, index) => (
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
                        src={education.image}
                        alt={education.organisation}
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
                                {education.field}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "gray" }}>
                                {education.startYear} - {education.present ? "Present" : education.endDate}
                            </Typography>
                        </Box>
                        {editable && <EditButton color="primary" />}
                    </Box>
                </Box>
            ))}

            {/* Show/hide toggle */}
            {!showAll && restEducationCount > 0 ? (
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
                    Show {restEducationCount} more education{restEducationCount > 1 ? "s" : ""}
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
}

export default EducationCard;
