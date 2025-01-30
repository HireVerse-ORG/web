export type NotificationType = "push" | "inApp" | "email";
export type NotificationStatus = "sent" | "read";

export interface INotification {
    id: string;
    sender: string;
    title: string;
    message: string;
    recipient: string | null;
    type: NotificationType;
    status: NotificationStatus;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}