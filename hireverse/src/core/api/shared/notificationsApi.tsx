import axios from "@core/lib/axios";
import { INotification, NotificationStatus, NotificationType } from "@core/types/notification.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = "/notifications";

export const getMyNotifications = async (
    page: number,
    limit: number,
    filter?: { status?: NotificationStatus; type?: NotificationType }
): Promise<IPaginationResponse<INotification>> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });

    if (filter?.status) params.append("status", filter.status);
    if (filter?.type) params.append("type", filter.type);

    const url = `${baseUrl}?${params.toString()}`;

    return (await apiWrapper(axios.get<IPaginationResponse<INotification>>(url))).data;
};

export const getMyNotificationsCount = async (
    filter?: { status?: NotificationStatus; type?: NotificationType }
): Promise<{count: number}> => {
    const params = new URLSearchParams();

    if (filter?.status) params.append("status", filter.status);
    if (filter?.type) params.append("type", filter.type);

    const url = `${baseUrl}/count?${params.toString()}`;

    return (await apiWrapper(axios.get<{count: number}>(url))).data;
};

export const markAllNotificationsAsRead  = async (): Promise<void> => {
    const url = `${baseUrl}/mark-read/all`;
    return (await apiWrapper(axios.put(url))).data;
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
    const url = `${baseUrl}/mark-read/${notificationId}`;
    return (await apiWrapper(axios.put(url))).data;
};
