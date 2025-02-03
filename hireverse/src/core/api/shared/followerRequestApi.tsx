import axios from "@core/lib/axios";
import { FollowRequestStatus, FollowRequestWithProfile } from "@core/types/followersRequest.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseurl = "/profile/follow-request";

export const getFollowRequestCount = async (status: FollowRequestStatus): Promise<{ count: number }> => {
    const url = `${baseurl}/count?status=${status}`;
    return (await apiWrapper(axios.get<{ count: number }>(url))).data;
};

export const getMyFollowRequest = async (
    status: FollowRequestStatus,
    page: number = 1,
    limit: number = 10
): Promise<IPaginationResponse<FollowRequestWithProfile>> => {
    const url = `${baseurl}/list`;
    const response = await apiWrapper(
        axios.get<IPaginationResponse<FollowRequestWithProfile>>(url, {
            params: { status, page, limit },
        })
    );
    return response.data;
};
