import { listConversations } from '@core/api/shared/chatsApi';
import InboxChatCardSkeleton from '@core/components/chat/InboxCardSkeleton';
import InboxChatCard from '@core/components/chat/InboxChatCard';
import { useChatSocket } from '@core/contexts/ChatSocketContext';
import useGet from '@core/hooks/useGet';
import useAppSelector from '@core/hooks/useSelector';
import { IConversation } from '@core/types/conversation.interface';
import { IMessage } from '@core/types/message.interface';
import { ChatBubbleOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

type MyInboxProps = {
    onSelectChat?: (chatId: string) => void;
    activeChatId?: string | null;
};

const MyInbox = ({ onSelectChat, activeChatId }: MyInboxProps) => {
    const user = useAppSelector(state => state.auth.user);
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const { data, loading, error } = useGet(listConversations);

    const { socket } = useChatSocket();

    useEffect(() => {
        if (data) {
            setConversations(data.data);
        }
    }, [data]);

    useEffect(() => {
        if (conversations.length === 0 || !socket) return;

        const handleIncomingMessage = (message: IMessage, eventType: "new-message-notification" | "message-send") => {
            setConversations(prevConversations => {
                const updatedConversations = prevConversations.map(chat => {
                    if (chat.id === message.conversation) {
                        return {
                            ...chat,
                            lastMessage: {
                                ...message,
                                status: eventType === "new-message-notification" && message.conversation === activeChatId
                                    ? "read"
                                    : message.status,
                            },
                        };
                    }
                    return chat;
                });

                updatedConversations.sort((a, b) => {
                    const aTime = a.lastMessage ? new Date(a.lastMessage.sentAt!).getTime() : 0;
                    const bTime = b.lastMessage ? new Date(b.lastMessage.sentAt!).getTime() : 0;
                    return bTime - aTime;
                });

                return updatedConversations;
            });
        };

        const handleNewMessageNotification = (message: IMessage) => {
            handleIncomingMessage(message, "new-message-notification");
        };

        const handleMessageSend = (message: IMessage) => {
            handleIncomingMessage(message, "message-send");
        };

        socket.on("new-message-notification", handleNewMessageNotification);
        socket.on("message-send", handleMessageSend);

        return () => {
            socket.off("new-message-notification", handleNewMessageNotification);
            socket.off("message-send", handleMessageSend);
        };
    }, [socket, conversations, activeChatId]);


    const flipKey = conversations.map(chat => chat.id).join(",");

    return (
        <Box sx={{ paddingRight: 2, height: "100%" }}>
            {loading ? (
                Array.from({ length: 6 }).map((_, index) => <InboxChatCardSkeleton key={index} />)
            ) : error ? (
                <Typography color="error" sx={{ textAlign: 'center', padding: 2 }}>
                    Failed to load conversations. Please try again.
                </Typography>
            ) : conversations.length === 0 ? (
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                    <ChatBubbleOutline sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="h6" color="text.secondary">
                        No Conversations Yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Start a chat to see your messages here.
                    </Typography>
                </Box>
            ) : (
                <Flipper flipKey={flipKey}>
                    {conversations.map((chat) => {
                        let isUnread = activeChatId !== chat.id && chat.lastMessage?.status !== "read" && user?.id !== chat.lastMessage?.sender;

                        return (
                            <Flipped key={chat.id} flipId={chat.id}>
                                <div>
                                    <InboxChatCard
                                        data={{
                                            name: chat.title || "Unknown",
                                            image: chat.thumbnail || "",
                                            lastMessage: chat.lastMessage?.content || "",
                                            lastMessageTimeStamp: chat.lastMessage?.sentAt,
                                        }}
                                        onClick={() => {
                                            if (isUnread && chat.lastMessage) {
                                                isUnread = false;
                                                chat.lastMessage.status = "read"
                                            }
                                            onSelectChat && onSelectChat(chat.id)
                                        }}
                                        isActive={activeChatId === chat.id}
                                        isUnread={isUnread}
                                    />
                                </div>
                            </Flipped>
                        );
                    })}
                </Flipper>
            )}
        </Box>
    );
};

export default MyInbox;
