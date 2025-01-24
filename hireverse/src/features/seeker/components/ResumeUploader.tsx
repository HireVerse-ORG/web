import { Box, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { AttachFile, Visibility, Delete } from "@mui/icons-material";
import colors from "@core/theme/colors";

type ResumeUploaderProps = {
    onFileUpload: (file: File | null) => void;
    existingResumeUrl?: string; // URL for an existing resume
    error?: string;
};

const ResumeUploader = ({ onFileUpload, existingResumeUrl, error: customError }: ResumeUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(existingResumeUrl || null);
    const [error, setError] = useState<string | null>(customError || null);
    const MAX_SIZE_MB = 5; // 5 MB size limit

    useEffect(() => {
        if (existingResumeUrl) {
            setResumeUrl(existingResumeUrl);
        }
    }, [existingResumeUrl]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (!validTypes.includes(file.type)) {
                setError("Invalid file type. Only PDF or DOC files are allowed.");
                setSelectedFile(null);
                onFileUpload(null);
                return;
            }

            // Validate file size
            const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
            if (fileSizeInMB > MAX_SIZE_MB) {
                setError(`File size exceeds ${MAX_SIZE_MB} MB. Please upload a smaller file.`);
                setSelectedFile(null);
                onFileUpload(null);
                return;
            }

            // Clear error and set file
            setError(null);
            setSelectedFile(file);
            setResumeUrl(null); // Remove existing URL when uploading a new file
            onFileUpload(file);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setResumeUrl(null);
        onFileUpload(null);
    };

    const handleView = () => {
        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            window.open(fileUrl, "_blank");
        } else if (resumeUrl) {
            window.open(resumeUrl, "_blank");
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* Uploader Box */}
            {!selectedFile && !resumeUrl && (
                <Box
                    sx={{
                        border: "2px dashed",
                        borderColor: "primary.main",
                        borderRadius: 2,
                        backgroundColor: `${colors.secondory.veryLight}`,
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "secondary.light" },
                    }}
                    onClick={() => document.getElementById("file-input")?.click()}
                >
                    <AttachFile sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="body1" color="primary.main">
                        Attach resume (PDF/DOC)
                    </Typography>
                    <input
                        id="file-input"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </Box>
            )}

            {/* Preview Box */}
            {(selectedFile || resumeUrl) && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: 2,
                        backgroundColor: `${colors.secondory.veryLight}`,
                        padding: 2,
                        mt: 1,
                    }}
                >
                    <Typography variant="body1" color="text.primary">
                        {selectedFile ? selectedFile.name : "Existing Resume"}
                    </Typography>
                    <Box>
                        <IconButton onClick={handleView} color="primary" size="small">
                            <Visibility />
                        </IconButton>
                        <IconButton onClick={handleRemove} color="error" size="small">
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
            )}

            {/* Error Message */}
            {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default ResumeUploader;
