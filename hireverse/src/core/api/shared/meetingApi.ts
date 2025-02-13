import axios from "@core/lib/axios";
import { IMeeting } from "@core/types/meeting.interface";
import { apiWrapper } from "@core/utils/helper";

const meetingBaseUrl = "/chats/meeting";

export const startInterview = async (data:{interviewId: string}): Promise<IMeeting> => {
    const url = `${meetingBaseUrl}/start-interview`;
    return (await apiWrapper(axios.post<IMeeting>(url, data))).data;
};

export const getMeetingRoomDetails = async (roomId: string): Promise<IMeeting> => {
    const url = `${meetingBaseUrl}/room/${roomId}`;
    return (await apiWrapper(axios.get<IMeeting>(url))).data;
};

