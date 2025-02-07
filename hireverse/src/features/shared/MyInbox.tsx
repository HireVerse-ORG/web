import { listConversations } from '@core/api/shared/chatsApi';
import InboxChatCardSkeleton from '@core/components/chat/InboxCardSkeleton';
import InboxChatCard from '@core/components/chat/InboxChatCard';
import useGet from '@core/hooks/useGet';
import { IConversationWithSenderProfle } from '@core/types/conversation.interface';
import { ChatBubbleOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type MyInboxProps = {
    onSelectChat?: (chatId: string) => void;
    activeChatId?: string | null;
};

const MyInbox = ({ onSelectChat, activeChatId }: MyInboxProps) => {
    const [conversations, setConversations] = useState<IConversationWithSenderProfle[]>([]); 
    const { data, loading, error } = useGet(listConversations);

    useEffect(() => {
        if (data) {
            setConversations(data.data);
        }
    }, [data]);


    return (
        <Box sx={{ paddingRight: 2, height: "100%" }}>
            {loading ? (
                Array.from({ length: 6 }).map((_, index) => <InboxChatCardSkeleton key={index} />)
            ) : error ? (
                <Typography color="error" sx={{ textAlign: 'center', padding: 2 }}>
                    Failed to load conversations. Please try again.
                </Typography>
            ) : conversations.length === 0 ? (  
                <Box sx={{padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                    <ChatBubbleOutline sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="h6" color="text.secondary">
                        No Conversations Yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Start a chat to see your messages here.
                    </Typography>
                </Box>
            ) : (
                conversations.map((chat) => (
                    <InboxChatCard
                        key={chat.id}
                        data={{
                            name: chat.senderProfile?.name || "Unknown",
                            image: chat.senderProfile?.image || "",
                            lastMessage: chat.lastMessage?.text || "",
                            lastMessageTimeStamp: chat.lastMessage?.sentAt
                        }}
                        onClick={() => onSelectChat && onSelectChat(chat.id)}
                        isActive={activeChatId === chat.id}
                    />
                ))
            )}
        </Box>
    );    
};

export default MyInbox;
