import { Box } from "@mui/material";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileUrlCard from "../components/profile/ProfileUrlCard";
import AdditionalDetailCard from "../components/profile/AdditionalDetailCard";
import AboutMeCard from "../components/profile/AboutMeCard";
import ExperiencesCard from "../components/profile/ExperiencsCard";
import EducationCard from "../components/profile/EducationCard";
import SkillsCard from "../components/profile/SkillsCard";
import PortfolioCard from "../components/profile/PortfolioCard";

type ProfilePageProps = {
    mode: "edit" | "read";
}

const ProfilePage = ({mode}: ProfilePageProps) => {
    const editable = mode === "edit";

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%", 
                overflowX: "hidden", 
                display: "grid",
                gridTemplateAreas: {
                    xs: `"profile" "right" "about" "experiences" "education" "skills" "portfolio"`, 
                    md: `"profile right" "about right" "experiences right" "education right" "skills right" "portfolio right"`, 
                },
                gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
                gap: 2,
                boxSizing: "border-box",
                pb: 3,
            }}
        >
            {/* Profile Card */}
            <Box
                sx={{
                    gridArea: "profile",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <ProfileCard editable={editable} />
            </Box>

            {/* Right Side */}
            <Box
                sx={{
                    gridArea: "right",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <ProfileUrlCard editable={editable} />
                <AdditionalDetailCard editable={editable} />
            </Box>

            {/* Left Side Content */}
            <Box
                sx={{
                    gridArea: "about",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <AboutMeCard editable={editable} />
            </Box>
            <Box
                sx={{
                    gridArea: "experiences",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <ExperiencesCard editable={editable} />
            </Box>
            <Box
                sx={{
                    gridArea: "education",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <EducationCard editable={editable} />
            </Box>
            <Box
                sx={{
                    gridArea: "skills",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <SkillsCard editable={editable} />
            </Box>
            <Box
                sx={{
                    gridArea: "portfolio",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <PortfolioCard editable={editable} />
            </Box>
        </Box>
    );
};

export default ProfilePage;