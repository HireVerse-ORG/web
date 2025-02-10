import { Box, useMediaQuery, Slide } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import MyInbox from './MyInbox';
import ChatContainer from '@core/components/chat/ChatContainer';
import colors from '@core/theme/colors';
import { useSearchParams } from 'react-router-dom';
import { useMessage } from '@core/contexts/MessageContext';

const MessagesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showChat, setShowChat] = useState(false);

  const { activeConversation, setActiveConversation } = useMessage();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    return () => {
      setActiveConversation(null);
    };
  }, [setActiveConversation]);

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    if (chatId) {
      setActiveConversation(chatId);
      setShowChat(true);
    }
  }, [searchParams]);

  const handleInboxClick = (chatId: string) => {
    setActiveConversation(chatId);
    setSearchParams({ ...Object.fromEntries(searchParams), chatId });
    setShowChat(true);
  };

  if (isMobile) {
    const handleBack = () => {
      setSearchParams(prev => {
        const params = { ...Object.fromEntries(prev.entries()) };
        delete params.chatId;
        return params;
      });
      setActiveConversation(null);
      setShowChat(false);
    }
    return (
      <Box sx={{ height: "100%" }}>
        {!showChat ? (
          <MyInbox onSelectChat={handleInboxClick} activeChatId={activeConversation} />
        ) : (
          <Slide
            direction="left"
            in={showChat}
            mountOnEnter
            unmountOnExit
          >
            <Box sx={{ height: "inherit" }}>
              <ChatContainer onBack={handleBack} activeChatId={activeConversation} />
            </Box>
          </Slide>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" height="100%">
      <Box minWidth="350px" borderRight={`1px solid ${colors.borderColour}`}>
        <MyInbox onSelectChat={handleInboxClick} activeChatId={activeConversation} />
      </Box>
      <Box flex={1}>
        <ChatContainer activeChatId={activeConversation} />
      </Box>
    </Box>
  );
};

export default MessagesPage;

