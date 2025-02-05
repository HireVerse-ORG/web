import { Box, useMediaQuery, Slide } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import MyInbox from './MyInbox';
import ChatContainer from '@core/components/chat/ChatContainer';
import colors from '@core/theme/colors';

const MessagesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showChat, setShowChat] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleInboxClick = (chatId: string) => {
    setActiveChatId(chatId);
    setShowChat(true);
  };

  if (isMobile) {
    const handleBack = () => {
        setActiveChatId(null);
        setShowChat(false);
    }
    return (
      <Box sx={{ height: "100%"}}>
        {!showChat ? (
          <MyInbox onSelectChat={handleInboxClick} activeChatId={activeChatId} />
        ) : (
          <Slide
            direction="left"
            in={showChat}
            mountOnEnter
            unmountOnExit
          >
            <Box sx={{ height: "inherit" }}>
              <ChatContainer onBack={handleBack} activeChatId={activeChatId} />
            </Box>
          </Slide>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" height="100%">
      <Box minWidth="350px" borderRight={`1px solid ${colors.borderColour}`}>
        <MyInbox onSelectChat={handleInboxClick} activeChatId={activeChatId} />
      </Box>
      <Box flex={1}>
        <ChatContainer activeChatId={activeChatId} />
      </Box>
    </Box>
  );
};

export default MessagesPage;

