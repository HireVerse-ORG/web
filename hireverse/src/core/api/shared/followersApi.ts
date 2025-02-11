import axios from "@core/lib/axios";
import { IFollowers, IFollowersWithProfile, IFindFollower } from "@core/types/followers.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseurl = "/profile";

export const getFollowersCount = async (userId: string): Promise<{ count: number }> => {
    const url = `${baseurl}/followers/${userId}/count`;
    return (await apiWrapper(axios.get<{ count: number }>(url))).data;
};

export const getFolloweRequestCount = async (): Promise<{ count: number }> => {
    const url = `${baseurl}/follow-request/count`;
    return (await apiWrapper(axios.get<{ count: number }>(url))).data;
};

export const getfollowDetails = async (followedUserId: string): Promise<{ followDetails: IFollowers | null }> => {
    const url = `${baseurl}/follow-details/${followedUserId}`;
    return (await apiWrapper(axios.get<{ followDetails: IFollowers | null }>(url))).data;
};

export const getFollowersList = async (
    userId: string,
    page: number = 1,
    limit: number = 10,
    query?: string
): Promise<IPaginationResponse<IFindFollower>> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    if (query) {
        params.append("query", query);
    }

    const url = `${baseurl}/followers/${userId}/list?${params.toString()}`;

    const response = await apiWrapper(
        axios.get<IPaginationResponse<IFindFollower>>(url)
    );

    return response.data;
};


export const getMyFollowersRequests = async (
    page: number = 1,
    limit: number = 10
): Promise<IPaginationResponse<IFollowersWithProfile>> => {
    const url = `${baseurl}/follow-request?&page=${page}&limit=${limit}`;
    const response = await apiWrapper(
        axios.get<IPaginationResponse<IFollowersWithProfile>>(url)
    );
    return response.data;
};

export const sendFollowRequest = async (data: {
    followedUserId: string,
    followedUserType: string
}
): Promise<IFollowers> => {
    const url = `${baseurl}/follow-request`;
    const response = await apiWrapper(
        axios.post<IFollowers>(url, data)
    );
    return response.data;
};

export const unFollow = async (followedUserId: string): Promise<void> => {
    const url = `${baseurl}/follower/${followedUserId}`;
    const response = await apiWrapper(
        axios.delete<void>(url)
    );
    return response.data;
};


export const acceptFolloweRequest = async (requestId: string): Promise<{ count: number }> => {
    const url = `${baseurl}/follow-request/${requestId}/accept`;
    return (await apiWrapper(axios.put<{ count: number }>(url))).data;
};

export const rejectFolloweRequest = async (requestId: string): Promise<{ count: number }> => {
    const url = `${baseurl}/follow-request/${requestId}/reject`;
    return (await apiWrapper(axios.put<{ count: number }>(url))).data;
};