import AddButton from "@core/components/ui/AddButton";
import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Box, Typography, Chip } from "@mui/material";

type SkillsCardProps = {
    editable?: boolean;
}

const skills = [
    { id: 1, name: "Javascript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "CSS" },
    { id: 5, name: "HTML" },
    { id: 6, name: "TypeScript" },
];

const SkillsCard = ({ editable }: SkillsCardProps) => {
    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Skills
                </Typography>
                {editable && (
                    <Box>
                        <AddButton color="primary" />
                        <EditButton color="primary" />
                    </Box>
                )}
            </Box>

            {/* Render skills */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {skills.map((skill) => (
                    <Chip key={skill.id} label={skill.name} sx={{ backgroundColor: "secondary.light", color: "primary.main" }} />
                ))}
            </Box>
        </Box>
    );
}

export default SkillsCard;
