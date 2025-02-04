import { UserRoles } from "./user.interface";

export type FollowRequestStatus = 'pending' | 'accepted' | 'rejected';

export interface IFollowers {
    id: string;
    followerId: string,
    followerUserType: UserRoles;
    followedUserId: string;
    followedUserType: UserRoles;
    requestStatus: FollowRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface IFollowersWithProfile {
    id: string;
    requesterId: string;
    requesterType: UserRoles;
    targetUserId: string;
    targetUserType: UserRoles;
    status: FollowRequestStatus;
    followedUserProfile: null | {
        id: string,
        name: string,
        type: UserRoles,
        publicId: string,
        image?: string,
    };
    createdAt: Date;
    updatedAt: Date;
}