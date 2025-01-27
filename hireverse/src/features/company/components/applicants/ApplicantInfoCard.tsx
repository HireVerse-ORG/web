import { Box, Typography, Avatar, Skeleton, Divider, Button, IconButton, Tooltip } from "@mui/material";
import colors from "@core/theme/colors";
import SegmentedProgressBar from "@core/components/ui/SegmentedProgressBar";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import { applicantStagesOrder, getApplicantStagesOrder } from "@core/utils/ui";
import { ArrowOutward, EmailOutlined, Phone } from "@mui/icons-material";
import moment from "moment";

type ApplicantInfoCardProps = {
    data: {
        profilePicture: string;
        fullName: string;
        currentPosition: string;
        appliedJob: string;
        appliedDate: Date;
        stage: JobApplicationStatus;
        email: string;
        phone: string;
    };
    onMessageClick: () => void;
    onViewProfileClick: () => void;
};

const ApplicantInfoCard = ({
    data,
    onMessageClick,
    onViewProfileClick
}: ApplicantInfoCardProps) => {
    const {
        profilePicture,
        fullName,
        currentPosition,
        appliedJob,
        appliedDate,
        stage,
        email,
        phone,
    } = data;

    const { progress, color } = getApplicantStagesOrder(stage);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
                backgroundColor: "white",
                border: `1px solid ${colors.borderColour}`,
                maxWidth: 400,
                width: "100%",
                height: "max-content",
            }}
        >
            {/* Profile Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                    src={profilePicture}
                    alt={fullName}
                    sx={{ width: 60, height: 60 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {currentPosition}
                    </Typography>
                </Box>

                <Tooltip title="View Profile">
                    <IconButton
                        onClick={onViewProfileClick}
                        color="primary"
                        sx={{ padding: "8px" }}
                    >
                        <ArrowOutward />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Applied Job and Date */}
            <Box sx={{ backgroundColor: `${colors.secondory.veryLight}`, p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: `1px solid ${colors.borderColour}`,
                        pb: 1,
                    }}
                >
                    <Typography variant="body2" gutterBottom>
                        Applied Job
                    </Typography>
                    <Typography variant="body2">
                        {moment(appliedDate).fromNow()}
                    </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold" sx={{ pt: 1 }}>
                    {appliedJob}
                </Typography>
            </Box>

            {/* Hiring Stage */}
            <Box sx={{ backgroundColor: `${colors.secondory.veryLight}`, p: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: `1px solid ${colors.borderColour}`,
                        pb: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight="400" gutterBottom>
                        Stage
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {(["in-review", "interview", "shortlisted"].includes(stage)) && (
                            <Skeleton
                                variant="circular"
                                animation="pulse"
                                sx={{
                                    backgroundColor: colors.secondory.accent,
                                    width: "15px",
                                    height: "15px",
                                }}
                            />
                        )}
                        <Typography variant="body2" fontWeight="500" color={color}>
                            {stage.toUpperCase()}
                        </Typography>
                    </Box>
                </Box>
                <Box mt={2}>
                    <SegmentedProgressBar
                        color={color}
                        segments={applicantStagesOrder.length - 1}
                        progress={progress}
                    />
                </Box>
            </Box>

            <Divider sx={{ borderColor: `${colors.borderColour}` }} />

            {/* Contact Section */}
            <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Contact
                </Typography>
                <Box sx={{ display: "flex", alignItems: "start", gap: 1, mb: 2 }}>
                    <EmailOutlined fontSize="small" color="action" />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" color="text.secondary">
                            Email
                        </Typography>
                        <Typography
                            variant="body2"
                            component="a"
                            href={`mailto:${email || ""}`}
                            sx={{ textDecoration: "none", color: email ? "text.primary" : "text.disabled" }}
                        >
                            {email || "N/A"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "start", gap: 1 }}>
                    <Phone fontSize="small" color="action" />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" color="text.secondary">
                            Phone
                        </Typography>
                        <Typography
                            variant="body2"
                            component="a"
                            href={`tel:${phone || ""}`}
                            sx={{ textDecoration: "none", color: phone ? "text.primary" : "text.disabled" }}
                        >
                            {phone || "N/A"}
                        </Typography>
                    </Box>
                </Box>
                {/* Message Button */}
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={onMessageClick}
                    >
                        Message Applicant
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ApplicantInfoCard;
