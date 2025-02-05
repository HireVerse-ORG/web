import { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, SxProps } from "@mui/material";
import { Send, EmojiEmotionsOutlined } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import colors from "@core/theme/colors";

type ChatInputProps = {
    onSendMessage: (message: string) => void;
    styles?: SxProps;
};

const ChatInput = ({ onSendMessage, styles }: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage("");
    };

    const handleEmojiSelect = (emoji: any) => {
        setMessage((prev) => prev + emoji.native);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showEmojiPicker]);

    return (
        <Box sx={{ display: "flex", alignItems: "center", position: "relative", paddingTop: 1.5, ...styles }}>
            {/* Emoji Picker */}
            {showEmojiPicker && (
                <Box ref={emojiPickerRef} sx={{ position: "absolute", bottom: 50, left: 0, zIndex: 10 }}>
                    <Picker data={data}
                        onEmojiSelect={handleEmojiSelect}
                    />
                </Box>
            )}

            {/* Emoji Button */}
            <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)} sx={{
                mr: 0.5,
                color: `${colors.borderColour}`,
                "&:hover": {
                    color: "primary.main"
                }
            }}>
                <EmojiEmotionsOutlined />
            </IconButton>

            {/* Text Input */}
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            {/* Send Button */}
            <IconButton
                onClick={handleSend}
                sx={{
                    ml: 1,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                <Send />
            </IconButton>
        </Box>
    );
};

export default ChatInput;
