import useAppSelector from '@core/hooks/useSelector';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_NOTIFICATION_SOCKET_URL;

const NotificationContext = createContext<Socket | null>(null);

type NotificationProviderProps = {
    children: React.ReactNode;
}
export const NotificationProvider= ({ children }: NotificationProviderProps) => {
    const user = useAppSelector(state => state.auth.user);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (user) {
            const socketConnection = io(SOCKET_URL, {
                transports: ['websocket'],
                query: {
                    userId: user.id, 
                    email: user.email, 
                },
            });

            setSocket(socketConnection);

            return () => {
                socketConnection.disconnect();
            };
        }
    }, [user]);

    return <NotificationContext.Provider value={socket}>{children}</NotificationContext.Provider>;
};

export const useNotificationSocket = () => {
    const socket = useContext(NotificationContext);
    if (!socket) {
        throw new Error('Socket not initialized');
    }
    return socket;
};
