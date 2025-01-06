import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { CloudUploadOutlined, Close } from "@mui/icons-material";

interface ImageUploaderProps {
    onChange: (file: File | null) => void;
    previewSize?: number;
    maxSize?: { width: number; height: number };
}

const ImageUploader = ({
    onChange,
    previewSize = 100,
    maxSize = { width: 400, height: 400 },
}: ImageUploaderProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false); // State to track drag-and-drop

    const handleFileChange = (file: File | null) => {
        if (file) {
            const validTypes = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                setError("Invalid file type. Only images are allowed.");
                return;
            }

            setImage(file);
            setError(null);
            onChange(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleFileChange(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            handleFileChange(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setError(null);
        onChange(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                paddingBlock: 2,
                textAlign: "center",
            }}
        >
            {/* Image Preview with Remove Button */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                    src={image ? URL.createObjectURL(image) : ""}
                    alt="Profile Image"
                    sx={{
                        width: previewSize,
                        height: previewSize,
                        border: "2px solid #e0e0e0",
                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    }}
                >
                    {!image && "N/A"}
                </Avatar>
                {image && (
                    <IconButton
                        size="small"
                        color="error"
                        sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            background: "white",
                            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                            "&:hover": { background: "#f5f5f5" },
                        }}
                        onClick={removeImage}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* File Upload Button with Drag-and-Drop */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: error
                        ? "2px dashed red"
                        : isDragging
                        ? "2px dashed blue"
                        : "2px dashed #e0e0e0",
                    borderRadius: 2,
                    height: previewSize + 16,
                    width: "300px",
                    maxWidth: "100%",
                    cursor: "pointer",
                    padding: 1,
                    background: isDragging ? "#f0f8ff" : "transparent",
                    "&:hover": { borderColor: error ? "red" : "blue" },
                }}
                component={"label" as React.ElementType}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleInputChange}
                />

                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CloudUploadOutlined
                        fontSize="small"
                        sx={{ color: "primary.main" }}
                    />
                    <Typography variant="body2" color="primary">
                        Click to replace or drag and drop
                    </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">
                    SVG, PNG, JPG, or GIF (max. {maxSize.width} × {maxSize.height}px)
                </Typography>
            </Box>
        </Box>
    );
};

export default ImageUploader;
