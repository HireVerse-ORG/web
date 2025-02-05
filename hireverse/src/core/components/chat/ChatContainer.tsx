import colors from '@core/theme/colors';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type ChatContainerProps = {
  onBack?: () => void;
  activeChatId?: string | null;
};

const dummyChats = [
  { id: '1', name: 'Alice Johnson', image: 'https://randomuser.me/api/portraits/women/44.jpg', title: 'Software Engineer' },
  { id: '2', name: 'Bob Smith', image: 'https://randomuser.me/api/portraits/men/32.jpg', title: 'Product Manager' },
  { id: '3', name: 'Carol Davis', image: 'https://randomuser.me/api/portraits/women/68.jpg', title: 'UX Designer' }
];

const ChatContainer = ({ onBack, activeChatId }: ChatContainerProps) => {
  const activeChat = dummyChats.find((chat) => chat.id === activeChatId);
  const [messages, setMessages] = useState<{ sender: string; text: string; isMe: boolean }[]>([{ sender: "John", text: "hello", isMe: false }]);

  const handleSendMessage = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "Me", text, isMe: true }]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 145px)' }}>
      {/* Top Bar */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        borderBottom: `${activeChat ? `1px solid ${colors.borderColour}` : "none"}`,
        pb: 2, paddingLeft: !onBack ? 2 : 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {onBack && (
            <Box onClick={onBack} sx={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
              <ArrowBackIosNewOutlined />
            </Box>
          )}
          {activeChat && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={activeChat.image} alt={activeChat.name} />
              <Box>
                <Typography variant="h6">{activeChat.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {activeChat.title}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {activeChat ? <ChatMessages messages={messages} styles={{
          flexGrow: 1,
          paddingLeft: !onBack ? 2 : 0,
          height: "100%"
        }} /> : <Typography textAlign="center">Select a chat to start messaging.</Typography>}
      </Box>

      {/* Chat Input */}
      {activeChat && <ChatInput onSendMessage={handleSendMessage} />}
    </Box>
  );
};

export default ChatContainer;
