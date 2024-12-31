import axios from "@core/lib/axios"
import { IPaginationResponse } from "@core/types/pagination.interface";
import { User, UserRoles } from "@core/types/user.interface";
import { apiWrapper } from "@core/utils/helper";

export const listUsers = async (role: UserRoles, page=1, limit=10, query=''): Promise<IPaginationResponse<User>> => {
    return (await apiWrapper(axios.get<IPaginationResponse<User>>(`/user/list?role=${role}&page=${page}&limit=${limit}&query=${query}`))).data;
};

export const blockUser = async (data: { userId: string; isBlocked: boolean }): Promise<void> => {
    return (await apiWrapper(axios.put<void>('/user/block-user', data))).data;
};