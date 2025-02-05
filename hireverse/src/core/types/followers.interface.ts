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

export interface IFindFollower {
    followId: string;
    name: string,
    title: string,
    image: string,
    userType: UserRoles,
    userId: string,
    publicId: string,
    isMutual: boolean, 
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