import { Box, SxProps, Typography, useTheme } from "@mui/material";
import moment from "moment";
import colors from "@core/theme/colors";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { IMessage } from "@core/types/message.interface";

type MessageBubbleProps = {
  message: IMessage;
  isOwn: boolean;
  sx?: SxProps;
};

const MessageBubble = ({ message, isOwn, sx }: MessageBubbleProps) => {
    const theme = useTheme();

  const renderStatusIcon = () => {
    const status = message.status;
    if (status === "sent") {
        return <DoneIcon sx={{ fontSize: 10, ml: 0.5, color: theme.palette.grey[500] }} />;
      }
      if (status === "delivered") {
        return <DoneAllIcon sx={{ fontSize: 10, ml: 0.5, color: theme.palette.grey[500] }} />;
      }
      if (status === "read") {
        return <DoneAllIcon sx={{ fontSize: 10, ml: 0.5, color: theme.palette.primary.contrastText }} />;
      }
      return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOwn ? "flex-end" : "flex-start",
        width: "100%",
        mb: 0.5,
        ...sx,
      }}
    >
      <Box
        sx={{
          backgroundColor: isOwn ? "primary.main" : `${colors.secondory.veryLight}`,
          color: isOwn ? "primary.contrastText" : "text.primary",
          px: 2,
          py: 1,
          borderRadius: 2,
          maxWidth: "70%",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body2">{message.content}</Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            fontSize: "10px",
            opacity: 0.7,
            textAlign: isOwn ? "right" : "left",
            marginTop: "4px",
          }}
        >
          {moment(message.sentAt).format("hh:mm A")}
          {isOwn && renderStatusIcon()}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
