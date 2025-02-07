import axios from "@core/lib/axios";
import { IConversation, IConversationWithSenderProfle } from "@core/types/conversation.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const conversationBaseUrl = "/chats/conversations"

export const listConversations = async (page=1, limit=10): Promise<IPaginationResponse<IConversationWithSenderProfle>> => {
    const url = `${conversationBaseUrl}/list?page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<IPaginationResponse<IConversationWithSenderProfle>>(url))).data;
};

export const getConversationDetails = async (...participants: string[]): Promise<IConversation> => {
    const url = `${conversationBaseUrl}/details?participants=${participants}`;
    return (await apiWrapper(axios.get<IConversation>(url))).data;
};

export const startConversation = async (data: {participantId: string; participantRole: string, message: string}): Promise<IConversation> => {
    const url = `${conversationBaseUrl}/start`;
    return (await apiWrapper(axios.post<IConversation>(url, data))).data;
};