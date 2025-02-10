import { getMyUnreadMessageCount } from '@core/api/shared/chatsApi';
import useAppSelector from '@core/hooks/useSelector';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useChatSocket } from './ChatSocketContext';
import { IMessage } from '@core/types/message.interface';

interface MessageContextType {
    unReadCount: number;
    setUnReadCount: React.Dispatch<React.SetStateAction<number>>;
    activeConversation: string | null;
    setActiveConversation: React.Dispatch<React.SetStateAction<string | null>>;
}

const MessageContext = createContext<MessageContextType | null>(null);

type MessageProviderProps = {
    children: React.ReactNode;
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
    const user = useAppSelector(state => state.auth.user);
    const [unReadCount, setUnReadCount] = useState(0);
    const [activeConversation, setActiveConversation] = useState<string | null>(null);

    const { socket } = useChatSocket();

    useEffect(() => {
        const fetchUnreadMessages = async () => {
            try {
                const { count } = await getMyUnreadMessageCount();
                setUnReadCount(count);
            } catch (error) {
                console.error("Error fetching unread messages:", error);
            }
        };
        if (user) {
            fetchUnreadMessages();
        }
    }, [user]);

    useEffect(() => {
        if (!socket) return;

        socket.on('message-read-updated', (data: { conversation: string, readCount: number }) => {
            setUnReadCount(prev => prev - data.readCount);
        });

        return () => {
            socket.off('message-read-updated');
        };

    }, [socket])

    useEffect(() => {
        if (!socket) return;

        const newMessageNotificationHandler = (message: IMessage) => {
            if (message.conversation !== activeConversation) {
                setUnReadCount((prev) => prev + 1);
            }
        };

        socket.on("new-message-notification", newMessageNotificationHandler);

        return () => {
            socket.off("new-message-notification", newMessageNotificationHandler);
        };
    }, [socket, activeConversation]);


    return (
        <MessageContext.Provider value={{ unReadCount, setUnReadCount, setActiveConversation, activeConversation }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};
