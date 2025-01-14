import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import AboutCompanyEditor from "../AboutCompanyEditor";
import { useState } from "react";
import { updateCompanyProfile } from "@core/api/company/profileApi";
import { useCompanyContext } from "@core/contexts/CompanyContext";

type CompanyAboutFormProps = {
    initialData?: string;
    onSuccess?: (data: string) => void;
}

const CompanyAboutForm = ({ initialData, onSuccess }: CompanyAboutFormProps) => {
    const {companyProfile, setCompanyProfile } = useCompanyContext();
    const [aboutCompany, setAboutCompany] = useState<string>(initialData || "");
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);
            await updateCompanyProfile({ bio: aboutCompany });
            setCompanyProfile({...companyProfile!, bio: aboutCompany});
            if (onSuccess) {
                onSuccess(aboutCompany);
            }
        } catch (err) {
            setError("Failed to save. Please try again later.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ mx: { xs: "auto", sm: 0 } }}>
            <Typography variant="body1" fontWeight={500} mb={1}>
                About Company
            </Typography>
            <AboutCompanyEditor
                value={aboutCompany}
                onData={(data) => setAboutCompany(data)}
            />

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={isSaving}
                    fullWidth
                >
                    {isSaving ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </Box>
        </Box>
    );
};

export default CompanyAboutForm;
