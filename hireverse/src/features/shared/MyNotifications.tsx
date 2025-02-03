import { getMyNotifications, markAllNotificationsAsRead, markNotificationAsRead } from '@core/api/shared/notificationsApi';
import NotificationItem from '@core/components/ui/NotificationItem';
import { useNotificationSocket } from '@core/contexts/NotificationContext';
import useGet from '@core/hooks/useGet';
import { INotification } from '@core/types/notification.interface';
import { IPaginationResponse } from '@core/types/pagination.interface';
import { Box, Button, CircularProgress, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type MyNotificationsProps = {
    onClick?: (metadata?: Record<string, any>) => void;
}

const MyNotifications = ({onClick}:MyNotificationsProps) => {
    const { data, loading, error } = useGet<IPaginationResponse<INotification>>(() => getMyNotifications(1, 10, { type: "inApp" }));
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [markingAllNotificationRead, setMarkingAllNotificationRead] = useState<boolean>(false);

    const {setNotificationCount} = useNotificationSocket();

    useEffect(() => {
        if (data) {
            setNotifications(data.data);
        }
    }, [data]);

    const handleMarkAsRead = async (id: string) => {
        try {
            await markNotificationAsRead(id);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === id ? { ...notification, status: 'read' } : notification
                )
            );

            setNotificationCount((prevCount) => prevCount - 1);
        } catch (error) {
            toast.error("Failed to update notification.")
        }
    };

    const handleMarkAllAsRead = async() => {   
        setMarkingAllNotificationRead(true);
        try {
            await markAllNotificationsAsRead();
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({ ...notification, status: 'read' }))
            );
            setNotificationCount(0);
        } catch (error) {
            toast.error("Failed to update notification.")
        } finally {
            setMarkingAllNotificationRead(false);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Header with "Mark All as Read" Button */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 2
            }}>
                <Typography variant="h5">Notifications</Typography>
                {notifications.length > 0 && (
                    <Button
                        variant="text"
                        color='inherit'
                        size='small'
                        onClick={handleMarkAllAsRead}
                        disabled={notifications.every(n => n.status === 'read') || markingAllNotificationRead}
                    >
                        {markingAllNotificationRead ? <CircularProgress size={16} /> : "Mark All as Read"}
                    </Button>
                )}
            </Box>

            {/* Loading State (Skeletons) */}
            {loading && (
                <Box>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={90}
                            sx={{ borderRadius: 1, marginBottom: 1 }}
                        />
                    ))}
                </Box>
            )}

            {/* Error State */}
            {error && (
                <Typography color="error" variant="body1">
                    Failed to load notifications. Please try again.
                </Typography>
            )}

            {/* Notifications List */}
            {!loading && !error && (
                <Box>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                handleMarkAsRead={handleMarkAsRead}
                                onClick={() => onClick?.(notification.metadata)}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No notifications available.
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default MyNotifications;
