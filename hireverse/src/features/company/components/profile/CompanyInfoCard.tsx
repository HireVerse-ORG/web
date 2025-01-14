import { Box, Typography, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DEAFULT_COMPANY_IMAGE_URL } from "@core/utils/constants";
import { AccountTree, Business, LocationOn, People, RemoveRedEyeOutlined } from "@mui/icons-material";
import EditButton from "@core/components/ui/EditButton";
import CompanyDetailCard from "./CompanyDetailCard";
import CustomDialog from "@core/components/ui/CustomDialog";
import { useState } from "react";

type CompanyInfoCardProps = {
    mode: "read" | "edit";
    companyId?: string;
}

const CompanyInfoCard = ({ mode, companyId }: CompanyInfoCardProps) => {
    const [modelOpen, setModelOpen] = useState(false);

    const handleModelClose = () => {
        setModelOpen(false)
    }

    const handleEdit = () => {
        setModelOpen(true)
    }

    return (
        <Box
            sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gridTemplateRows: "auto auto",
                gap: 2,
                gridTemplateAreas: {
                    xs: `"logo name-and-website"
                         "details details"`,
                    sm: `"logo name-and-website"
                         "logo details"`,
                },
                mb: 2,
            }}
        >

            {mode === "edit" && (
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    position: "absolute",
                    top: 12,
                    right: 12,
                }}>

                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`/company-view/1223`}
                        target="_blank"
                        startIcon={<RemoveRedEyeOutlined />}
                        sx={{ textWrap: "nowrap", display: {xs: "none", sm: "flex"} }}
                    >
                        View Profile
                    </Button>
                    <EditButton
                        onClick={handleEdit}
                        color="primary"
                    />
                </Box>
            )}

            {/* Logo */}
            <Box
                sx={{
                    gridArea: "logo",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: "60px", md: "120px" },
                }}
            >
                <img
                    src={DEAFULT_COMPANY_IMAGE_URL}
                    alt="Company Logo"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                    }}
                />
            </Box>

            {/* Name and Website container */}
            <Box
                sx={{
                    gridArea: "name-and-website",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h5" fontWeight={600} sx={{ mb: { xs: 0.5, md: 1 } }}>
                    Company Name
                </Typography>
                <Link
                    href="https://company-website.com"
                    target="_blank"
                    color="primary"
                    sx={{ fontWeight: 600, textDecoration: "none" }}
                >
                    https://mycompany.com
                </Link>
            </Box>

            {/* Company Details */}
            <Box
                sx={{
                    gridArea: "details",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mt: { xs: 2, md: 3 },
                }}
            >
                <CompanyDetailCard
                    icon={<Business sx={{ fontSize: 25 }} />}
                    label="Founded"
                    value="January 1, 2000"
                />
                <CompanyDetailCard
                    icon={<People sx={{ fontSize: 25 }} />}
                    label="Employees"
                    value="150+"
                />
                <CompanyDetailCard
                    icon={<LocationOn sx={{ fontSize: 25 }} />}
                    label="Location"
                    value="USA, New York"
                />
                <CompanyDetailCard
                    icon={<AccountTree sx={{ fontSize: 25 }} />}
                    label="Industry"
                    value="Technology"
                />
            </Box>

            {/* form */}
            {mode === "edit" && (
                <>
                    <CustomDialog open={modelOpen} onClose={handleModelClose}>
                        <h1>FOrm</h1>
                        {/* <SeekerProfileUrlForm baseUrl={baseUrl} username={profileUsername} onSuccess={handleFormSucces}/> */}
                    </CustomDialog>
                </>
            )}
        </Box>
    );
};

export default CompanyInfoCard;
