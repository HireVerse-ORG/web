import useAppSelector from '@core/hooks/useSelector';
import { getToken } from '@core/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_CHAT_SOCKET_URL;

interface ChatContextType {
    socket: Socket | null;
}

const ChatContext = createContext<ChatContextType | null>(null);

type ChatSocketProviderProps = {
    children: React.ReactNode;
};

export const ChatSocketProvider = ({ children }: ChatSocketProviderProps) => {
    const user = useAppSelector(state => state.auth.user);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const token = getToken();
        if (user && token) {
            const socketConnection = io(SOCKET_URL, {
                transports: ['websocket'],
                query: {
                    token,
                },
            });

            setSocket(socketConnection);

            socketConnection.on('connect', () => {
                socketConnection.emit('join', {data: "test data"})
            })

            socketConnection.on('disconnect', () => {
                setSocket(null);
            });

            return () => {
                socketConnection.disconnect();
            };
        }
    }, [user]);

    return (
        <ChatContext.Provider value={{ socket }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatSocket = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatSocket must be used within a ChatSocketProvider');
    }
    return context;
};
