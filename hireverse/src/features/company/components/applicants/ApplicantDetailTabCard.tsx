import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, TextField, Button } from "@mui/material";
import colors from "@core/theme/colors";
import DocViewer from "@core/components/ui/DocViewer";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import HiringProgress from "./HiringProgress";

type ApplicantDetailTabCardProps = {
    resume: string;  
    hiringProgress: JobApplicationStatus;  
};

const ApplicantDetailTabCard = ({
    resume,
    hiringProgress,
}: ApplicantDetailTabCardProps) => {
    const [comment, setComment] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = () => {
        console.log("Comment submitted:", comment);
        setComment("");  
    };

    return (
        <Box sx={{
            backgroundColor: "white",
            border: `1px solid ${colors.borderColour}`,
            minWidth: "300px",
            minHeight: "100%",
        }}>
            {/* Tab Section */}
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Resume" />
                <Tab label="Hiring Progress" />
                <Tab label="Interview Schedule" />
            </Tabs>

            {/* Content Section */}
            <Box sx={{
                padding: 2,
            }}>
                {/* Resume Tab */}
                {selectedTab === 0 && (
                    <Box>
                        {/* Resume Viewer */}
                        <Box sx={{ marginBottom: 2 }}>
                            <DocViewer docUrl={resume} />
                        </Box>

                        {/* Comment Section */}
                        <Box sx={{ marginTop: 3 }}>
                            <Typography variant="h6" fontWeight="bold">
                                Leave a Comment
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Add your comment here..."
                                sx={{ marginTop: 2 }}
                            />
                            <Box sx={{ marginTop: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmitComment}
                                >
                                    Submit Comment
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                )}


                {/* Hiring Progress Tab */}
                {selectedTab === 1 && (
                    <HiringProgress 
                        hiringStage={hiringProgress}
                        onMoveToNextStep={(nextStage) => console.log(nextStage)}
                        onDeclineApplication={(reason) => console.log(reason)}
                        />
                )}


                {/* Interview Schedule Tab */}
                {selectedTab === 2 && (
                    <Box>
                        <Typography variant="body1" fontWeight="bold" >
                            Interview Schedules
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                            {"No interview scheduled"}
                        </Typography>
                    </Box>
                )}

            </Box>
        </Box>
    );
};

export default ApplicantDetailTabCard;
