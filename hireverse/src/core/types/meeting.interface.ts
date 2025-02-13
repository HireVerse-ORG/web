import { UserRoles } from "./user.interface";

export type MeetingStatus  = 'active' |'ended';

export interface IMeeting {
    roomId: string;
    meetingIdentifier?: string;
    host: string;
    participants: {
        id: string;
        role: UserRoles;
        displayName: string;
        image?: string;
    }[];
    startedAt: Date;
    endedAt?: Date;
    status: MeetingStatus;
}
