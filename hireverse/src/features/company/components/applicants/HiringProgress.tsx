import CustomDialog from "@core/components/ui/CustomDialog";
import colors from "@core/theme/colors";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import { Box, Typography, Button, TextField, SxProps } from "@mui/material";
import { useState } from "react";

type HiringProgressProps = {
    hiringStage: JobApplicationStatus;
    onMoveToNextStep: (nextStage: JobApplicationStatus) => void;
    onDeclineApplication: (reason?: string) => void;
    disabled?: boolean;
};

const stages: (JobApplicationStatus | "hired/declined")[] = [
    "in-review",
    "shortlisted",
    "interview",
    "offered",
    "hired/declined",
];

const HiringProgress = ({
    hiringStage,
    onMoveToNextStep,
    onDeclineApplication,
    disabled,
}: HiringProgressProps) => {
    const [modelOpen, setModelOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState<string>("");

    const currentStageIndex = stages.findIndex((stage) =>
        stage === "hired/declined"
            ? ["hired", "declined"].includes(hiringStage)
            : stage === hiringStage
    );

    const nextStage =
        currentStageIndex < stages.length - 1
            ? stages[currentStageIndex + 1]
            : null;

    const handleModelClose = () => {
        setModelOpen(false);
        setDeclineReason("");
    };

    const handleDeclineSubmit = () => {
        onDeclineApplication(declineReason);
        handleModelClose();
    };

    const getBoxStyles = (stage: JobApplicationStatus | "hired/declined") => {
        const stageIndex = stages.findIndex((s) => s === stage);

        let style: SxProps = {
            py: 1.5,
            px: 3,
            textAlign: "center",
            backgroundColor: colors.secondory.veryLight,
            color: colors.secondory.accent,
            fontWeight: "400",
        };

        // Special styles for "Hired/Declined" stage
        if (stage === "hired/declined") {
            if (hiringStage === "hired") {
                return {
                    ...style,
                    backgroundColor: "success.main",
                    color: "white",
                    fontWeight: "bold",
                };
            }
            if (hiringStage === "declined") {
                return {
                    ...style,
                    backgroundColor: "error.main",
                    color: "white",
                    fontWeight: "bold",
                };
            }
        }

        // Active stage
        if (stageIndex === currentStageIndex) {
            return {
                ...style,
                backgroundColor: colors.secondory.accent,
                color: "white",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            };
        }

        // Completed stage
        if (stageIndex < currentStageIndex) {
            return {
                ...style,
                backgroundColor: "success.main",
                color: "white",
                border: `1px solid success.main`,
            };
        }

        // Pending stage
        return style;
    };

    const getStageText = (stage: JobApplicationStatus | "hired/declined") => {
        if (stage === "hired/declined") {
            if (hiringStage === "hired") return "Hired";
            if (hiringStage === "declined") return "Declined";
            return "Hired/Declined";
        }
        return stage
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <Box>
            <Typography variant="body1" fontWeight="bold">
                Current Progress
            </Typography>

            {/* Stages as Boxes */}
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                }}
            >
                {stages.map((stage) => (
                    <Box key={stage} sx={getBoxStyles(stage)}>
                        {getStageText(stage)}
                    </Box>
                ))}
            </Box>

            {/* Action Buttons */}
            <Box mt={3} display="flex" flexWrap={"wrap"} gap={2}>
                {nextStage && hiringStage !== "hired" && hiringStage !== "declined" && hiringStage != "offered" && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if(nextStage === "hired/declined"){
                                onMoveToNextStep("hired");
                            } else {
                                onMoveToNextStep(nextStage);
                            }
                        }}
                        disabled={disabled}
                    >
                        {nextStage === "in-review"
                            ? "Move to Review"
                            : nextStage === "offered" 
                                ? "Offer Job"
                                : nextStage === "hired/declined"
                                    ? "Move to Hiring"
                                    : `Move to ${nextStage.charAt(0).toUpperCase() + nextStage.slice(1)}`}
                    </Button>
                )}

                {hiringStage !== "hired" && hiringStage !== "declined" && (
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setModelOpen(true)}
                        disabled={disabled}
                    >
                        Decline Application
                    </Button>
                )}
            </Box>

            {/* Dialog for Declining Application */}
            <CustomDialog open={modelOpen} onClose={handleModelClose}>
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Decline Application
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Please provide a reason for declining the application (optional).
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Type your reason here..."
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        sx={{ marginTop: 2 }}
                    />
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleModelClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeclineSubmit}
                        >
                            Decline
                        </Button>
                    </Box>
                </Box>
            </CustomDialog>
        </Box>
    );
};

export default HiringProgress;
