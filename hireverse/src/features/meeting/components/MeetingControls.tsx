import { CallEnd, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface MeetingControlsProps {
  audioEnabled: boolean;
  videoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
}

const MeetingControls = ({
  audioEnabled,
  videoEnabled,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
}: MeetingControlsProps) => {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
      <IconButton onClick={onToggleAudio} color="primary">
        {audioEnabled ? <Mic /> : <MicOff />}
      </IconButton>
      <IconButton onClick={onToggleVideo} color="primary">
        {videoEnabled ? <Videocam /> : <VideocamOff />}
      </IconButton>
      <IconButton onClick={onEndCall} color="error">
        <CallEnd />
      </IconButton>
    </Box>
  );
};

export default MeetingControls;
