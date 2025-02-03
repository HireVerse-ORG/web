import axios from "@core/lib/axios";
import { apiWrapper } from "@core/utils/helper";

const baseurl = "/profile/followers";

export const getFollowersCount = async (userId: string): Promise<{ count: number }> => {
    const url = `${baseurl}/${userId}/count`;
    return (await apiWrapper(axios.get<{ count: number }>(url))).data;
};

export const userIsFollowing = async (followedUserId: string): Promise<{ isFollowing: boolean }> => {
    const url = `${baseurl}/isFollowing/${followedUserId}`;
    return (await apiWrapper(axios.get<{ isFollowing: boolean }>(url))).data;
};

