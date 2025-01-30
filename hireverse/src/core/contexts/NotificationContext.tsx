import useAppSelector from '@core/hooks/useSelector';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_NOTIFICATION_SOCKET_URL;

interface NotificationContextType {
    socket: Socket | null;
    notificationCount: number;
    setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

type NotificationProviderProps = {
    children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const user = useAppSelector(state => state.auth.user);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notificationCount, setNotificationCount] = useState<number>(0);

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

    return (
        <NotificationContext.Provider value={{ socket, notificationCount, setNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationSocket = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationSocket must be used within a NotificationProvider');
    }
    return context;
};
