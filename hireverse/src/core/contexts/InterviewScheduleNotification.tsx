import { createContext, useContext, useEffect, useState } from "react";
import { useChatSocket } from "./ChatSocketContext";
import { toast } from "sonner";
import { Box, Button, Typography } from "@mui/material";

export interface InterviewScheduleNotificationContextType {
    notifications: { roomId: string, interviewId: string }[];
    setNotifications: React.Dispatch<React.SetStateAction<{
        roomId: string;
        interviewId: string;
    }[]>>
}

const InterviewScheduleNotificationContext = createContext<InterviewScheduleNotificationContextType>({
    notifications: [],
    setNotifications: () => {},
});

type InterviewScheduleNotificationProviderProps = {
    children: React.ReactNode
}

export const InterviewScheduleNotificationProvider = ({ children }: InterviewScheduleNotificationProviderProps) => {
    const [notifications, setNotifications] = useState<{ roomId: string, interviewId: string }[]>([]);

    const { socket } = useChatSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('meeting-started', (data: { roomId: string, interviewId: string }) => {
            setNotifications((prev) => {
                const existingIndex = prev.findIndex((n) => n.interviewId === data.interviewId);
                if (existingIndex !== -1) {
                  if (prev[existingIndex].roomId !== data.roomId) {
                    const updated = [...prev];
                    updated[existingIndex] = data; 
                    return updated;
                  }
                  return prev; 
                }
                return [...prev, data];
            });
            toast.custom(
                (id) => (
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                      textAlign: "center",
                      margin: "0 auto",
                    }}
                  >
                    <Typography variant="body1" color="textPrimary">
                      Your meeting has started!
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => {
                        window.open(`/meeting/${data.roomId}`, "_self");
                        toast.dismiss(id);
                      }}
                    >
                      Join Meeting
                    </Button>
                  </Box>
                ),
                { position: "top-center", duration: 5000 }
              );
        });

        socket.on('meeting-ended', (data: {roomId: string}) => {
            setNotifications(prev => prev.filter(nt => nt.roomId !== data.roomId));
        })

        return () => {
            socket.off('meeting-started');
            socket.off('meeting-ended');
        };

    }, [socket])

    return (
        <InterviewScheduleNotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </InterviewScheduleNotificationContext.Provider>
    );
};

export const useInterviewScheduleNotification = () => {
    const context = useContext(InterviewScheduleNotificationContext)
    if (!context) {
        throw new Error('useInterviewScheduleNotification must be used within a InterviewScheduleNotificationProvider');
    }
    return context;
}
