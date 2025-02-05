import InboxChatCard from '@core/components/chat/InboxChatCard';
import { Box } from '@mui/material';

const dummyChats = [
    {
        id: '1',
        name: "Alice Johnson",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        lastMessage: "Hey, how have you been?",
        lastMessageTimeStamp: new Date("2025-01-30T14:20:00"),
    },
    {
        id: '2',
        name: "Bob Smith",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        lastMessage: "Let's catch up later.",
        lastMessageTimeStamp: new Date("2025-01-30T13:05:00"),
    },
    {
        id: '3',
        name: "Carol Davis",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        lastMessage: "Got it, thanks!",
        lastMessageTimeStamp: new Date("2025-01-29T18:45:00"),
    },
];

type MyInboxProps = {
    onSelectChat?: (chatId: string) => void;
    activeChatId?: string | null;
};

const MyInbox = ({ onSelectChat, activeChatId }: MyInboxProps) => {
    return (
        <Box sx={{ paddingRight: 2 }}>
            {dummyChats.map((chat) => (
                <InboxChatCard
                    key={chat.id}
                    data={chat}
                    onClick={() => onSelectChat && onSelectChat(chat.id)}
                    isActive={activeChatId === chat.id}
                />
            ))}
        </Box>
    );
};

export default MyInbox;
