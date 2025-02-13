import React from "react";
import { Avatar, Box, Paper, SxProps, Typography } from "@mui/material";
import { MicOff } from "@mui/icons-material";
import { DEAFULT_SEEKER_PROFILE_IMAGE_URL } from "@core/utils/constants";

interface VideoTileProps {
  displayName?: string;
  image?: string;
  muted?: boolean;
  videoOff?: boolean;
  style?: SxProps;
  children: React.ReactNode;
}

const defaultImageUrl = DEAFULT_SEEKER_PROFILE_IMAGE_URL;

const VideoTile: React.FC<VideoTileProps> = ({ displayName, image, muted, videoOff, style, children }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "600px",
        aspectRatio: { xs: "1 / 1", sm: "16 / 9" },
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Display name at top left */}
      {displayName && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 2,
          }}
        >
          <Typography variant="caption">{displayName}</Typography>
        </Box>
      )}

      {/* Mute icon at top right */}
      {muted && (
        <Box
          sx={{
            width: "40px",
            height: "40px",
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            zIndex: 2,
          }}
        >
          <MicOff sx={{ color: "white", fontSize: 24 }} />
        </Box>
      )}

      {videoOff && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={image || defaultImageUrl}
            alt={displayName || "Video off"}
            sx={{ width: "auto", height: "70%", fontSize: "3rem" }}
          >
            {!image && displayName ? displayName.charAt(0).toUpperCase() : ""}
          </Avatar>
        </Box>
      )}

      {children}
    </Paper>
  );
};

export default VideoTile;
