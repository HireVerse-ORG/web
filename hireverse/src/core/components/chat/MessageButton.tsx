import { Button, CircularProgress, TextField, Box, SxProps } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { UserRoles } from "@core/types/user.interface";
import { useEffect, useState, ReactNode } from "react";
import { getConversationDetails, startConversation } from "@core/api/shared/chatsApi";
import CustomDialog from "../ui/CustomDialog";
import { useNavigate } from "react-router-dom";
import { SeekerSubscriptioPlan } from "@core/types/subscription.interface";
import { getSeekerSubscription } from "@core/api/subscription/seekerSubscriptionApi";
import { toast } from "sonner";

type MessageButtonProps = {
    toId: string;
    toType: UserRoles;
    toName: string;
    fromId: string;
    fromType: UserRoles;
    isFollowing?: boolean;
    buttonText?: string;
    sx?: SxProps;
    icon?: ReactNode;
} & React.ComponentProps<typeof Button>;

const MessageButton = ({ 
    toId, 
    toType, 
    toName, 
    fromId, 
    fromType, 
    isFollowing,
    buttonText = "Message",
    sx = {}, 
    icon = <ChatBubbleOutline />, 
    ...props
}: MessageButtonProps) => {
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const [plan, setPlan] = useState<SeekerSubscriptioPlan | null>(null);
    const [startChatModel, setStartChatModel] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkConditions = async () => {
            setLoading(true);
            try {
                const chat = await getConversationDetails(toId, fromId);
                setChatId(chat.id);
            } catch (error) {
                setChatId(null);
            }
            if (fromType === "seeker") {
                try {
                    const subscription = await getSeekerSubscription();
                    setPlan(subscription.plan);
                } catch (error) {
                    setPlan(null);
                }
            }
            setLoading(false);
        };
        checkConditions();
    }, [toId, fromId]);

    const handleClick = async () => {
        if (chatId) {
            const chatPage = fromType === "seeker" ? `/seeker/messages?chatId=${chatId}` : `/company/messages?chatId=${chatId}`;
            navigate(chatPage);
            return;
        }

        if (fromType === "company" || (fromType === "seeker" && (isFollowing || plan !== "free"))) {
            setStartChatModel(true);
        } else {
            toast.warning("Upgrade your plan to start a conversation.");
        }
    };

    const handleStartChat = async () => {
        if (!message.trim()) {
            setError("Please enter a message to start the conversation.");
            return;
        }

        setLoading(true);
        try {
            const newChat = await startConversation({
                participantId: toId,
                participantRole: toType,
                message,
            });

            setChatId(newChat.id);
            navigate(fromType === "seeker" ? `/seeker/messages?chatId=${newChat.id}` : `/company/messages?chatId=${newChat.id}`);
            setStartChatModel(false);
        } catch (error) {
            toast.error("Failed to start conversation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                size="small"
                startIcon={icon}
                sx={{
                    width: "130px",
                    "&:hover": { backgroundColor: "primary.dark" },
                    ...sx, 
                }}
                disabled={loading}
                {...props} 
            >
                {loading ? <CircularProgress size={20} /> : `${buttonText}`}
            </Button>

            <CustomDialog open={startChatModel} title={`Start Chat with ${toName}`} onClose={() => setStartChatModel(false)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="Your first Message"
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        error={!!error}
                        helperText={error}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStartChat}
                        disabled={loading || !message.trim()}
                    >
                        {loading ? <CircularProgress size={20} /> : "Start Chat"}
                    </Button>
                </Box>
            </CustomDialog>
        </>
    );
};

export default MessageButton;
