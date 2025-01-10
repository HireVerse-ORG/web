import { removeSeekerProfileSkill } from "@core/api/seeker/profileApi";
import { Chip, CircularProgress } from "@mui/material";
import { useState } from "react";

type SkillChipProps = {
    id: string;
    name: string;
    deletable?: boolean;
    onDeleted?: (id: string) => void;
};

const SkillChip = ({ id, name, deletable, onDeleted }: SkillChipProps) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true); 
        try {
            const deleted = await removeSeekerProfileSkill(id);
            if (deleted && onDeleted) {
                onDeleted(id); 
            }
        } catch (error) {
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Chip
            label={name}
            onDelete={deletable ? handleDelete : undefined}
            sx={{
                backgroundColor: "secondary.light",
                color: "primary.main",
                pointerEvents: loading ? "none" : "auto", 
            }}
            deleteIcon={loading ? <CircularProgress size={16} color="primary" /> : undefined}
        />
    );
};

export default SkillChip;
