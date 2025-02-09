import moment from "moment";
import { IMessage } from "@core/types/message.interface";

/**
 * Groups messages by date.
 * @param messages Array of messages to group.
 * @returns An object with dates as keys and arrays of messages as values.
 */
export const groupMessagesByDate = (messages: IMessage[]) => {
    return messages.reduce((acc, message) => {
        const dateKey = moment(message.sentAt).format("YYYY-MM-DD"); 
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(message);
        return acc;
    }, {} as Record<string, IMessage[]>);
};
