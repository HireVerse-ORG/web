import colors from "@core/theme/colors";
import { Box, SxProps, Typography } from "@mui/material";
import ScrollableContainer from "../ui/ScrollableContainer";

type ChatMessagesProps = {
  messages: { sender: string; text: string; isMe: boolean }[];
  styles?: SxProps;
};

const ChatMessages = ({ messages, styles }: ChatMessagesProps) => {
  return (
    <ScrollableContainer sx={{
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 1,
      paddingTop: 0.75,
      paddingRight: 0.75,
      ...styles
    }}>
      {messages.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No messages yet. Start a conversation!
        </Typography>
      ) : (
        messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.isMe ? "flex-end" : "flex-start",
              backgroundColor: msg.isMe ? `primary.main` : `${colors.secondory.veryLight}`,
              color: msg.isMe ? "primary.contrastText" : "primary",
              px: 2,
              py: 1,
              borderRadius: 2,
              maxWidth: "70%",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))
      )}
    </ScrollableContainer>
  );
};

export default ChatMessages;
