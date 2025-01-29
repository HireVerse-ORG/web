
const dummyNotifications = [
    {
        id: '1',
        sender: 'System',
        title: 'New Product Launch',
        message: 'We have launched a new product in the electronics category.',
        recipient: 'user1',
        type: 'push',
        status: 'sent',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        sender: 'Admin',
        title: 'Account Verification',
        message: 'Your account has been successfully verified.',
        recipient: 'user1',
        type: 'email',
        status: 'read',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        sender: 'Marketing Team',
        title: 'Exclusive Offer',
        message: 'Enjoy a 20% discount on your next purchase.',
        recipient: 'user1',
        type: 'inApp',
        status: 'sent',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '4',
        sender: 'Support',
        title: 'Ticket Resolved',
        message: 'Your support ticket has been resolved. Please check the details.',
        recipient: 'user1',
        type: 'push',
        status: 'read',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import colors from '@core/theme/colors';

const NotificationsPage = () => {
  // Replace this with the actual API call in production
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating loading
    setLoading(false);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, status: 'read' } : notification
      )
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ paddingBottom: 2 }}>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <List>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                backgroundColor: notification.status === 'sent' ? `${colors.secondory.veryLight}` : 'white',
                borderBottom: `1px solid ${colors.borderColour}`,
                padding: '8px 16px',
              }}
            >
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No notifications available.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default NotificationsPage;
