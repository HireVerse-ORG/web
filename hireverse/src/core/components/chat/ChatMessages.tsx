import colors from "@core/theme/colors";
import { Box, SxProps, Typography } from "@mui/material";
import ScrollableContainer from "../ui/ScrollableContainer";
import { useEffect, useState } from "react";
import { IMessage } from "@core/types/message.interface";
import useAppSelector from "@core/hooks/useSelector";
import { getMessagesofConversation } from "@core/api/shared/chatsApi";

type ChatMessagesProps = {
  conversationId: string;
  styles?: SxProps;
};

const ChatMessages = ({ conversationId, styles }: ChatMessagesProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchChats = async (conversationId: string) => {
      try {
        const response = await getMessagesofConversation(conversationId, 1, 10);
        setMessages(response.data);
      } catch (error) {
        setMessages([])
      }
  }

  useEffect(() => {
    fetchChats(conversationId)
  }, [conversationId])
  
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
        messages.map((msg, index) => {
          const isMe = user?.id === msg.sender;

          return (
            <Box
              key={index}
              sx={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                backgroundColor: isMe ? `primary.main` : `${colors.secondory.veryLight}`,
                color: isMe ? "primary.contrastText" : "primary",
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: "70%",
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
            </Box>
          )
        })
      )}
    </ScrollableContainer>
  );
};

export default ChatMessages;
