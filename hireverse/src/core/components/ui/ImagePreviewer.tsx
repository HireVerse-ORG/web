import React, { useState, useCallback, useEffect } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Crop } from "@mui/icons-material";
import ReactCrop, { Point, Area } from "react-easy-crop";
import { getCroppedImg } from "@core/utils/imageHelper";

interface ImagePreviewerProps {
  image: File | string | null;
  shape?: "circle";
  aspect?: number;
  styles?: React.CSSProperties;
  onCropped?: (croppedImage: File, url: string) => void;
}

const ImagePreviewer = ({ image, shape, styles, onCropped, aspect = 1 }: ImagePreviewerProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  useEffect(() => {
    if (image instanceof File) {
      setImageUrl(URL.createObjectURL(image));
    } else {
      setImageUrl(image as string);
    }
  }, [image]);

  const onCropChange = useCallback((newCrop: Point) => {
    setCrop(newCrop);
  }, []);

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!imageUrl || !croppedArea) return;

    try {
      const croppedResult = await getCroppedImg(imageUrl, croppedArea, 0, { horizontal: false, vertical: false });
      if (croppedResult?.file) {
        onCropped?.(croppedResult.file as File, croppedResult.url);
      }
    } catch (error) {
      console.error("Error cropping the image:", error);
    }

    setIsEditing(false);
  };

  const imageStyles: React.CSSProperties = {
    position: "relative",
    height: 200,
    width: "100%",
    background: imageUrl ? `url(${imageUrl}) no-repeat center center/cover` : "#d1d1d1",
    borderRadius: shape === "circle" ? "50%" : "8px",
    marginBottom: 1,
    ...styles,
  };

  return (
    <Box sx={imageStyles}>
      {!imageUrl && (
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
          textAlign={"center"}
        >
          No image Selected
        </Typography>
      )}

      {imageUrl && !isEditing && (
        <IconButton
            sx={{
            position: "absolute",
            top: shape === "circle" ? "50%" : "10px", 
            left: shape === "circle" ? "50%" : "auto", 
            right: shape === "circle" ? "auto" : "10px",
            transform: shape === "circle" ? "translate(-50%, -50%)" : "none",
            backgroundColor: "rgba(137, 94, 255, 0.45)",
            color: "white",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            }}
            onClick={() => setIsEditing(true)}
        >
        <Crop />
      </IconButton>      
      )}

      {isEditing && imageUrl && (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 500,
              height: 400,
              backgroundColor: "#000",
            }}
          >
            <ReactCrop
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={shape === "circle" ? 1 : aspect || 1}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleSave} color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)} color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImagePreviewer;
