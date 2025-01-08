import { listSeekerEducation } from "@core/api/seeker/educationApi";
import AddButton from "@core/components/ui/AddButton";
import CustomDialog from "@core/components/ui/CustomDialog";
import EditButton from "@core/components/ui/EditButton";
import useGet from "@core/hooks/useGet";
import colors from "@core/theme/colors";
import { SeekerEducation } from "@core/types/seeker.interface";
import { Box, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import SeekerEducationForm from "../forms/SeekerEducationForm";
import { DEAFULT_SEEKER_EDUCATION_IMAGE_URL } from "@core/utils/constants";

type EducationCardProps = {
    editable?: boolean;
    showCount?: number;
    username?: string;
};

const EducationCard = ({ editable, showCount = 2, username }: EducationCardProps) => {
    const { data: educations, setData: setEducations, loading, error } = useGet<SeekerEducation[]>(() => listSeekerEducation(username));

    const [showAll, setShowAll] = useState(false);
    const [visibleEducations, setVisibleEducations] = useState<SeekerEducation[]>([]);
    const [restEducationCount, setRestEducationCount] = useState(0);
    const [education, setEducation] = useState<SeekerEducation | null>(null);
    const [modelOpen, setModelOpen] = useState(false);


    useEffect(() => {
        if (educations) {
            const list = showAll ? educations : educations.slice(0, showCount);
            const count = educations.length - list.length;
            setVisibleEducations(list)
            setRestEducationCount(count)
        }
    }, [educations, showAll])

    const handleAddEducation = () => {
        setEducation(null);
        setModelOpen(true);
    }

    const handleEditEducation = (education: SeekerEducation) => {
        setEducation(education);
        setModelOpen(true);
    }

    const handleModelClose = () => setModelOpen(false)

    const handleFormAddSuccess = (education: SeekerEducation) => {
        setEducations((prevEducations) => [...prevEducations!, education]);
        handleModelClose();
    };

    const handleFormEditSuccess = (education: SeekerEducation) => {
        setEducations((prevEducations) =>
            prevEducations!.map((educ) =>
                educ.id === education.id ? { ...educ, ...education } : educ
            )
        );
        handleModelClose();
    };

    const handleEducationDeleteSuccess = (education: SeekerEducation) => {
        setEducations((prevEducations) =>
            prevEducations!.filter((educ) => educ.id !== education.id)
        );
        handleModelClose();
    }

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Educations
                </Typography>
                {editable && <AddButton onClick={handleAddEducation} color="primary" />}
            </Box>

            {/* Loading State with Skeleton */}
            {loading && (
                <Box>
                    {Array.from({ length: showCount }).map((_, index) => (
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
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    width: { xs: 60, sm: 80 },
                                    height: { xs: 60, sm: 80 },
                                    borderRadius: 1,
                                }}
                            />
                            <Box flexGrow={1}>
                                <Skeleton variant="text" width="50%" />
                                <Skeleton variant="text" width="30%" />
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Error State */}
            {error && (
                <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                    <Typography variant="body2" color="error">
                        Failed to load educations. Please try again.
                    </Typography>
                </Box>
            )}

            {/* Loaded State */}
            {!loading && !error && educations && educations.length > 0 && (
                <>
                    {visibleEducations.map((education) => (
                        <Box
                            key={education.id}
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
                                src={DEAFULT_SEEKER_EDUCATION_IMAGE_URL}
                                alt={education.school || "Education Image"}
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
                                        {education.school}
                                    </Typography>
                                    <Typography variant="subtitle1">{education.fieldOfStudy}</Typography>
                                    <Typography variant="body2" sx={{ color: "gray" }}>
                                        {education.startYear} - {education.currentlyPursuing ? "Present" : education.endYear}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: "gray" }}>
                                        {education.location?.city}{", "}{education.location?.country}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                                        {education.description}
                                    </Typography>
                                </Box>
                                {editable && <EditButton onClick={() => handleEditEducation(education)} color="primary" />}
                            </Box>
                        </Box>
                    ))}

                    {/* Show/Hide Toggle */}
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
                </>
            )}

            {/* No Data State */}
            {!loading && !error && educations?.length === 0 && (
                <Typography variant="body2" sx={{ py: 2 }}>
                    No education records found.
                </Typography>
            )}

            {/* form */}
            {editable && (
                <>
                    <CustomDialog open={modelOpen} onClose={handleModelClose}>
                        <SeekerEducationForm onAdded={handleFormAddSuccess} onUpdated={handleFormEditSuccess} onDeleted={handleEducationDeleteSuccess} education={education} />
                    </CustomDialog>
                </>
            )}
        </Box>
    );
};

export default EducationCard;
