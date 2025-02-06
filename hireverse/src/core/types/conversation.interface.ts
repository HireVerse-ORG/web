import { UserRoles } from "./user.interface";

export interface IConversation {
    id: string;
    participants: { id: string; role: UserRoles }[];
    lastMessage: { text: string; sentAt: Date, senderId: string } | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IConversationWithSenderProfle extends IConversation {
    senderProfile: {
        name: string,
        image?: string,
        type: string
    }
}

