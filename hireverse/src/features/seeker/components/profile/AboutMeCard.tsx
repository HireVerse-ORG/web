import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { Box, Typography } from "@mui/material";

type AboutMeCardProps = {
    editable?: boolean;
};
const AboutMeCard = ({editable}: AboutMeCardProps) => {
    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    About Me
                </Typography>
                {editable && <EditButton color="primary"/>}
            </Box>

            <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                I'm a product designer + filmmaker currently working remotely at
                Twitter from beautiful Manchester, United Kingdom. I'm passionate
                about designing digital products that have a positive impact on the
                world.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                For 10 years, I've specialised in interface, experience & interaction
                design as well as working in user research and product strategy for
                product agencies, big tech companies & start-ups.
            </Typography>
        </Box>
    );
}

export default AboutMeCard;
