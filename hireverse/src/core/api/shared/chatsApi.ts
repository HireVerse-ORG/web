import axios from "@core/lib/axios";
import { IConversation } from "@core/types/conversation.interface";
import { IMessage } from "@core/types/message.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const conversationBaseUrl = "/chats/conversations";
const messagesBaseUrl = "/chats/messages";

export const listConversations = async (page=1, limit=10): Promise<IPaginationResponse<IConversation>> => {
    const url = `${conversationBaseUrl}/list?page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<IPaginationResponse<IConversation>>(url))).data;
};

export const getConversationDetails = async (...participants: string[]): Promise<IConversation> => {
    const url = `${conversationBaseUrl}/details?participants=${participants}`;
    return (await apiWrapper(axios.get<IConversation>(url))).data;
};

export const getConversationFromId = async (id: string): Promise<IConversation> => {
    const url = `${conversationBaseUrl}/${id}`;
    return (await apiWrapper(axios.get<IConversation>(url))).data;
};

export const startConversation = async (data: {participantId: string; participantRole: string, message: string}): Promise<IConversation> => {
    const url = `${conversationBaseUrl}/start`;
    return (await apiWrapper(axios.post<IConversation>(url, data))).data;
};

export const getMessagesofConversation = async (conversationId: string, page:number, limit: number): Promise<IPaginationResponse<IMessage>> => {
    const url = `${messagesBaseUrl}/list/${conversationId}?page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<IPaginationResponse<IMessage>>(url))).data;
};

export const getMyUnreadMessageCount = async (): Promise<{count: number}> => {
    const url = `${messagesBaseUrl}/unread-count`;
    return (await apiWrapper(axios.get<{count: number}>(url))).data;
};