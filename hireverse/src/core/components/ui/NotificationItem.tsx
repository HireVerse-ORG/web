import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import colors from "@core/theme/colors";
import { INotification } from "@core/types/notification.interface";
import { momentDateFormatter } from "@core/utils/helper";

type NotificationItemProps = {
    notification: INotification,
    handleMarkAsRead: (id: string) => void;
    onClick?: () => void;
}
const NotificationItem = ({ notification, handleMarkAsRead, onClick }: NotificationItemProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: notification.status === "sent" ? colors.secondory.veryLight : "white",
                borderBottom: `1px solid ${colors.borderColour}`,
                padding: "12px 16px",
                borderRadius: hovered ? "8px" : "none",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                "&:hover": {
                    backgroundColor: 'secondary.light',
                },
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onClick?.()}
        >
            <Box>
                <Typography variant="subtitle1" fontWeight={hovered ? 500 : "normal"}>{notification.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ maxWidth: "400px" }}>
                    {notification.message}
                </Typography>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 0.5}}>
                <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic' }}>
                    {momentDateFormatter(notification.createdAt)}
                </Typography>
                {notification.status === "sent" && (
                    <Button variant="text" size="small"
                        sx={{ textWrap: "nowrap" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id)
                        }}>
                        Mark as Read
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default NotificationItem;
