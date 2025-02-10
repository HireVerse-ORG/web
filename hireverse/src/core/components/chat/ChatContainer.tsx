import colors from '@core/theme/colors';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { IConversation } from '@core/types/conversation.interface';
import { getConversationFromId } from '@core/api/shared/chatsApi';
import { useChatSocket } from '@core/contexts/ChatSocketContext';
import { toast } from 'sonner';
import useAppSelector from '@core/hooks/useSelector';

type ChatContainerProps = {
  onBack?: () => void;
  activeChatId?: string | null;
};

const ChatContainer = ({ onBack, activeChatId }: ChatContainerProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [activeChat, setActiveChat] = useState<IConversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { socket } = useChatSocket();

  const fetchConversation = async (conversationId: string) => {
    setLoading(true);
    setError(null)

    try {
      const chat = await getConversationFromId(conversationId);
      setActiveChat(chat);
    } catch (error: any) {
      setError("Failed to load conversation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeChatId) {
      fetchConversation(activeChatId);
    }
  }, [activeChatId]);

  useEffect(() => {
    if (!activeChat || !socket) return;

    socket.emit('join-room', { roomId: activeChat.id });

    return () => {
      socket.off('join-room');
    }
  }, [socket, activeChat])

  const handleSendMessage = (text: string) => {
    if (socket && activeChat) {
      socket.emit('send-message', {
        roomId: activeChat.id,
        message: text,
        to: activeChat.participants.filter(participant => participant.id === user?.id)[0]
      });
      return;
    }

    toast.error("Couldn't send message")
  };

  const handleTobBarClick = useCallback(() => {
    if (activeChat && activeChat.profileType && activeChat.profilePublicId) {
      const profileLink = activeChat.profileType === "seeker" ?
        `/${activeChat.profilePublicId}` : `/company-view/${activeChat.profilePublicId}`
      window.open(profileLink, "_blank");
    }
  }, [activeChat])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 145px)' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `${activeChat ? `1px solid ${colors.borderColour}` : "none"}`,
          pb: 2,
          paddingLeft: !onBack ? 2 : 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {onBack && (
            <Box onClick={onBack} sx={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
              <ArrowBackIosNewOutlined />
            </Box>
          )}
          {loading ? (
            <CircularProgress size={24} />
          ) : activeChat && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={activeChat.thumbnail} alt={activeChat.title}
                sx={{ cursor: 'pointer' }}
                onClick={handleTobBarClick}
              />
              <Box>
                <Typography variant="h6"
                  sx={{ cursor: 'pointer' }}
                  onClick={handleTobBarClick}
                >{activeChat.title}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">{error}</Typography>
        ) : activeChat && activeChatId ? (
          <ChatMessages conversationId={activeChatId} styles={{ flexGrow: 1, paddingLeft: !onBack ? 2 : 0, height: "100%" }} />
        ) : (
          <Typography textAlign="center">Select a chat to start messaging.</Typography>
        )}
      </Box>

      {/* Chat Input */}
      {activeChat && !loading && !error && <ChatInput onSendMessage={handleSendMessage} />}
    </Box>
  );
};

export default ChatContainer;
