import { useEffect, useState } from "react";
import AddButton from "@core/components/ui/AddButton";
import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Box, Skeleton, Typography } from "@mui/material";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { listSeekerExperience } from "@core/api/seeker/experiencesApi";
import { SeekerExperience } from "@core/types/seeker.interface";
import useGet from "@core/hooks/useGet";
import CustomDialog from "@core/components/ui/CustomDialog";
import SeekerExperienceForm from "../forms/SeekerExperienceForm";

type ExperienceCardProps = {
  editable?: boolean;
  showCount?: number;
  username?: string;
};

const ExperiencesCard = ({ editable, showCount = 2, username }: ExperienceCardProps) => {
  const { data: experiences, setData: setExperiences, loading, error } = useGet<SeekerExperience[]>(() =>
    listSeekerExperience(username),
    [username]
  );

  const [showAll, setShowAll] = useState(false);
  const [visibleExperiences, setVisibleExperiences] = useState<SeekerExperience[]>([]);
  const [restExperienceCount, setRestExperienceCount] = useState(0);
  const [experience, setExperience] = useState<SeekerExperience | null>(null);
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    if (experiences) {
      const list = showAll ? experiences : experiences.slice(0, showCount);
      const count = experiences.length - list.length;
      setVisibleExperiences(list);
      setRestExperienceCount(count);
    }
  }, [experiences, showAll, showCount]);

  const handleAddExperience = () => {
    setExperience(null);
    setModelOpen(true);
  };

  const handleEditExperience = (experience: SeekerExperience) => {
    setExperience(experience);
    setModelOpen(true);
  };

  const handleModelClose = () => setModelOpen(false);

  const handleFormAddSuccess = (newExperience: SeekerExperience) => {
    setExperiences((prevExperiences) => [...prevExperiences!, newExperience]);
    handleModelClose();
  };

  const handleFormEditSuccess = (updatedExperience: SeekerExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences!.map((exp) => (exp.id === updatedExperience.id ? updatedExperience : exp))
    );
    handleModelClose();
  };

  const handleExperienceDeleteSuccess = (deletedExperience: SeekerExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences!.filter((exp) => exp.id !== deletedExperience.id)
    );
    handleModelClose();
  };

  return (
    <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          Experiences
        </Typography>
        {editable && <AddButton onClick={handleAddExperience} color="primary" />}
      </Box>

      {/* Loading State with Skeleton */}
      {loading && (
        <Box>
          {Array.from({ length: Math.min(showCount, experiences?.length || showCount) }).map((_, index) => (
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
            Failed to load experiences. {error || "Please try again."}
          </Typography>
        </Box>
      )}

      {/* Loaded State */}
      {!loading && !error && visibleExperiences.length > 0 && (
        <>
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
                src={experience.company?.image || DEAFULT_COMPANY_IMAGE_URL}
                alt={experience.title}
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  objectFit: "contain",
                }}
                loading="lazy"
              />
              <Box flexGrow={1} display="flex" alignItems="start" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" fontWeight={500}>
                    {experience.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="subtitle1">{experience.company?.name}</Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      •
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {experience.startYear} - {experience.currentlyWorking ? "Present" : experience.endYear}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" sx={{ color: "gray" }}>
                    {experience.location?.city}, {experience.location?.country}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                    {experience.description}
                  </Typography>
                </Box>
                {editable && <EditButton onClick={() => handleEditExperience(experience)} color="primary" />}
              </Box>
            </Box>
          ))}
        </>
      )}

      {/* Show More / Less Toggle */}
      {!showAll && restExperienceCount > 0 ? (
        <Box
          component="button"
          onClick={() => setShowAll(true)}
          sx={{
            mt: 2,
            color: "primary.main",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: "bold",
            background: "none",
            border: "none",
          }}
        >
          Show {restExperienceCount} more experience{restExperienceCount > 1 ? "s" : ""}
        </Box>
      ) : showAll && (
        <Box
          component="button"
          onClick={() => setShowAll(false)}
          sx={{
            mt: 2,
            color: "primary.main",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: "bold",
            background: "none",
            border: "none",
          }}
        >
          Show less
        </Box>
      )}

      {/* No Data State */}
      {!loading && !error && experiences?.length === 0 && (
        <Typography variant="body2" sx={{ py: 2 }}>
          No experience records found.
        </Typography>
      )}

      {/* Form Dialog */}
      {editable && (
        <CustomDialog open={modelOpen} onClose={handleModelClose}>
          <SeekerExperienceForm
            onAdded={handleFormAddSuccess}
            onUpdated={handleFormEditSuccess}
            onDeleted={handleExperienceDeleteSuccess}
            experience={experience}
          />
        </CustomDialog>
      )}
    </Box>
  );
};

export default ExperiencesCard;
