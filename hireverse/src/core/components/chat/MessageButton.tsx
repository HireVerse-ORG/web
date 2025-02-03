import { Button } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";

type MessageButtonProps = {
    toId: string;
}
const MessageButton = ({toId}: MessageButtonProps) => {
    console.log(toId);
    
    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<ChatBubbleOutline />}
            sx={{
                "&:hover": {
                    backgroundColor: "primary.dark",
                },
            }}
        >
            Message
        </Button>
    );
};

export default MessageButton;
