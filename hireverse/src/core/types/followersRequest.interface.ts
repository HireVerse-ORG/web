import { UserRoles } from "./user.interface";

export type FollowRequestStatus = 'pending' | 'accepted' | 'rejected';

export interface FollowRequest {
    id: string;
    requesterId: string;
    requesterType: UserRoles;
    targetUserId: string;
    targetUserType: UserRoles;
    status: FollowRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface FollowRequestWithProfile {
    id: string;
    requesterId: string;
    requesterType: UserRoles;
    targetUserId: string;
    targetUserType: UserRoles;
    status: FollowRequestStatus;
    targetProfile: {
        id: string,
        name: string,
        type: string,
        uniqueid: string,
        image?: string,
    };
    createdAt: Date;
    updatedAt: Date;
}