import EditButton from "@core/components/ui/EditButton";
import colors from "@core/theme/colors";
import { MailOutline, PhoneAndroidOutlined, TranslateOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type AdditionalDetailCardProps = {
    editable?: boolean;
    username?: string;
}
const AdditionalDetailCard = ({ editable }: AdditionalDetailCardProps) => {
    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Additional Details
                </Typography>
                {editable && <EditButton color="primary" />}
            </Box>
            
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: 1,
                    mt: 2,
                }}
            >

                <Box sx={{
                    display: "flex",
                    gap: 1,
                }}>
                    <MailOutline sx={{ fontSize: 18 }} />
                    <Box>
                        <Typography variant="body2" >
                            Email
                        </Typography>
                        <Typography variant="body2" fontWeight={500} >
                            john-doe@gmail.com
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    gap: 1,
                }}>
                    <PhoneAndroidOutlined sx={{ fontSize: 18 }} />
                    <Box>
                        <Typography variant="body2" >
                            Phone
                        </Typography>
                        <Typography variant="body2" fontWeight={500} >
                            +91 1234567890
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    gap: 1,
                }}>
                    <TranslateOutlined sx={{ fontSize: 18 }} />
                    <Box>
                        <Typography variant="body2" >
                            Languages
                        </Typography>
                        <Typography variant="body2" fontWeight={500} >
                            English, Hindi
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default AdditionalDetailCard;
