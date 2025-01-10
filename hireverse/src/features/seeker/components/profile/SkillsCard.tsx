import AddButton from "@core/components/ui/AddButton";
import CustomDialog from "@core/components/ui/CustomDialog";
import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState } from "react";
import SkillChip from "./SkillChip";
import DeleteButton from "@core/components/ui/DeleteButton";
import SeekerSkillForm from "../forms/SeekerSkillForm";
import { getSeekerSkills } from "@core/api/seeker/profileApi";
import useGet from "@core/hooks/useGet";
import { ISkill } from "@core/types/skill.interface";

type SkillsCardProps = {
    editable?: boolean;
    username?: string;
};

const SkillsCard = ({ editable, username }: SkillsCardProps) => {
    const { data: skills, setData: setSkills, loading, error } = useGet<ISkill[] | null>(() => getSeekerSkills(username));
    const [deletable, setDeletable] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);

    const handleAddSkill = () => {
        setModelOpen(true);
    };
    const toggleDelete = () => {
        setDeletable(!deletable);
    };
    const handleModelClose = () => setModelOpen(false);

    const handleAddSkillSucces = (skill: ISkill) => {
        setSkills(prevSkills => [...prevSkills!, skill]);
        handleModelClose()
    }

    const handleSkillDeleteSuccess = (id: string) => {
        setSkills(prevSkills => prevSkills!.filter(skill => skill.id !== id));
    }

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Skills
                </Typography>
                {editable && (
                    <Box>
                        <AddButton onClick={handleAddSkill} color="primary" />
                        {deletable ? (
                            <DeleteButton onClick={toggleDelete} color="primary" />
                        ) : skills && skills.length > 0 && (
                            <EditButton onClick={toggleDelete} color="primary" />
                        )}
                    </Box>
                )}
            </Box>

            {/* Loading State */}
            {loading && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                    {[...Array(5)].map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={80}
                            height={24}
                            sx={{ borderRadius: "16px" }}
                        />
                    ))}
                </Box>
            )}

            {/* Error State */}
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    Failed to load skills. Please try again later.
                </Typography>
            )}

            {/* Empty State */}
            {!loading && !error && (!skills || skills.length === 0) && (
                <Typography sx={{ mt: 2, color: "text.secondary" }}>
                    No skills available.
                </Typography>
            )}

            {/* Render Skills */}
            {skills && skills.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                    {skills.map((skill) => (
                        <SkillChip key={skill.id} name={skill.name} id={skill.id} deletable={deletable} onDeleted={handleSkillDeleteSuccess} />
                    ))}
                </Box>
            )}

            {/* Form Dialog */}
            {editable && (
                <CustomDialog open={modelOpen} onClose={handleModelClose}>
                    <SeekerSkillForm onAdded={handleAddSkillSucces} />
                </CustomDialog>
            )}
        </Box>
    );
};

export default SkillsCard;
