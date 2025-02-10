export type MessageStatus = "sent" | "delivered" | "read";

export interface IMessage {
    id: string;
    conversation: string;
    sender: string;
    recipient: string;
    content: string;
    status: MessageStatus;
    deliveredAt?: Date;
    readAt?: Date;
    sentAt?: Date; 
}