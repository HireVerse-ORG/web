import { clearToken, clearUser, getToken } from "@core/utils/storage";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Request Interceptor (Optional)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (!response) {
            toast.error("Network Error: Unable to reach the server!");
        } else if (response.status >= 500) {
            toast.error("Something went wrong!", { description: "Please try again later." });
        } else if (response.status === 401 || response.status === 403) {
            const errorMessage =
                response.status === 401
                    ? "Session expired. Please log in to continue."
                    : response.data?.message || "Forbidden access.";
            toast.error(errorMessage, {
                duration: 3000,
                onAutoClose: () => {
                    clearUser();
                    clearToken();
                    window.location.href = "/auth"; 
                },
            });
        }

        // Reject all errors so the application
        return Promise.reject(error);
    }
);

export default axiosInstance;

