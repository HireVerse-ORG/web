import axios from "@core/lib/axios";
import { IConversationWithSenderProfle } from "@core/types/conversation.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = "/chats"

export const listConversations = async (page=1, limit=10): Promise<IPaginationResponse<IConversationWithSenderProfle>> => {
    const url = `${baseUrl}/conversations/list?page=${page}&limit=${limit}`;
    return (await apiWrapper(axios.get<IPaginationResponse<IConversationWithSenderProfle>>(url))).data;
};