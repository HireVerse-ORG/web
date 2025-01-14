import EditButton from "@core/components/ui/EditButton";
import { Box, Typography } from "@mui/material";

type AboutCompanyCardProps = {
    mode: "read" | "edit";
}

const AboutCompanyCard = ({ mode }: AboutCompanyCardProps) => {
    return (
        <Box sx={{ position: "relative" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={700}>
                    Company Profile
                </Typography>

                {mode === "edit" && (
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                    }}>

                        <EditButton
                            // onClick={handleCoverPicEdit}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe’s software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure—from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud.
            </Typography>
        </Box>
    );
}

export default AboutCompanyCard;
