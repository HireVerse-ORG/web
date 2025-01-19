import { createSkill } from "@core/api/admin/skillapi";
import { ISkill } from "@core/types/skill.interface";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface JobSkillFormProps {
    onAdded?: (skill: ISkill) => void;
}

const JobSkillForm = ({ onAdded }: JobSkillFormProps) => {
    const [skillName, setSkillName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        if(!skillName.trim()){
            setErrorMessage("Skill name is required");
            return;
        }

        if (skillName.trim()) {
            setIsSubmitting(true);
            setErrorMessage("");  

            try {
                const response = await createSkill({ name: skillName, isActive: true });
                onAdded?.(response.skill);
                setSkillName("");
            } catch (error) {
                setErrorMessage("Failed to add the skill. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Box>
            <Typography variant="body2" color="textSecondary" mb={1} >
               Skill
            </Typography>
            <TextField
                fullWidth
                value={skillName}
                placeholder="Enter skill name"
                onChange={(e) => setSkillName(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
                error={Boolean(errorMessage)}
            />
            {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Typography>
            )}

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                fullWidth
                disabled={isSubmitting}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
            </Button>
        </Box>
    );
};

export default JobSkillForm;
