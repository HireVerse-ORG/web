import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

interface ImageUploaderProps {
  onChange: (file: File | null) => void;
  maxSize?: { width: number; height: number };
  error?: string | null;
}

const ImageUploader = ({ onChange, maxSize = { width: 400, height: 400 }, error: externalError = null}: ImageUploaderProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only images are allowed.");
        return;
      }
      onChange?.(file);
      setError(null);
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

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const displayError = externalError || error;

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
      {/* File Upload Button with Drag-and-Drop */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: displayError
            ? "2px dashed red"
            : isDragging
            ? "2px dashed blue"
            : "2px dashed #e0e0e0",
          borderRadius: 2,
          height: "100px",
          width: "300px",
          maxWidth: "100%",
          cursor: "pointer",
          padding: 1,
          background: isDragging ? "#f0f8ff" : "transparent",
          "&:hover": { borderColor: displayError ? "red" : "blue" },
        }}
        component={"label" as React.ElementType}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" hidden onChange={handleInputChange} />
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <CloudUploadOutlined fontSize="small" sx={{ color: "primary.main" }} />
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
