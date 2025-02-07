import { Button, CircularProgress, TextField, Box } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { UserRoles } from "@core/types/user.interface";
import { useEffect, useState } from "react";
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
};

const MessageButton = ({ toId, toType, toName, fromId, fromType, isFollowing }: MessageButtonProps) => {
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

        if (fromType === "company") {
            setStartChatModel(true);
            return;
        }

        if (fromType === "seeker") {
            if ((isFollowing || plan !== "free")) {
                setStartChatModel(true);
                return;
            } else {
                toast.warning("Upgrade your plan to start conversation.")
            }
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
                message
            });

            setChatId(newChat.id);
            const chatPage = fromType === "seeker" ? `/seeker/messages?chatId=${newChat.id}` : `/company/messages?chatId=${newChat.id}`;
            navigate(chatPage);
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
                startIcon={<ChatBubbleOutline />}
                sx={{
                    width: "130px",
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={20} /> : "Message"}
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
