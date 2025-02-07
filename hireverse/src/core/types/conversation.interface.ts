import { IMessage } from "./message.interface";
import { UserRoles } from "./user.interface";

export interface IConversation {
    id: string;
    participants: { id: string; role: UserRoles }[];
    lastMessage: IMessage | null;
    title?: string;
    thumbnail?: string;
    profilePublicId?: string,
    profileType?: string 
    createdAt: Date;
    updatedAt: Date;
}

