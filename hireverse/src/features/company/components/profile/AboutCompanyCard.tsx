import CustomDialog from "@core/components/ui/CustomDialog";
import EditButton from "@core/components/ui/EditButton";
import RenderHtml from "@core/components/ui/RenderHtml";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CompanyAboutForm from "../forms/CompanyAboutForm";

type AboutCompanyCardProps = {
    mode: "read" | "edit";
    data: {
        about: string
    }
}

const AboutCompanyCard = ({ mode, data }: AboutCompanyCardProps) => {
    const [modelOpen, setModelOpen] = useState(false);

    const handleModelClose = () => setModelOpen(false);

    const handleEdit = () => setModelOpen(true);

    const handleSucces = () => handleModelClose();

    return (
        <Box sx={{ position: "relative", display: (mode === "read" && !data.about) ? "none" : "block" }}>
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
                            onClick={handleEdit}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                {mode === "edit" && !data.about ? (
                    <>Write about your company....</>
                ) : (
                    <RenderHtml htmlContent={data.about} />
                )}
            </Typography>

            {/* Form */}
            {mode === "edit" && (
                <CustomDialog open={modelOpen} onClose={handleModelClose}>
                    <CompanyAboutForm initialData={data.about} onSuccess={handleSucces} />
                </CustomDialog>
            )}
        </Box>
    );
}

export default AboutCompanyCard;
