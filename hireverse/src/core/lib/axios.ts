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
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
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
        if (!error.response) {
            // Network error (e.g., server down or no internet)
            console.error(error);
            toast.error("Network Error: Unable to reach the server!");
        } else if (error.response.status >= 500) {
            // Server error (5xx)
            console.error(error);
            toast.error("Something went wrong!", {description: "Please  try after sometime"})
        }

        // Reject all errors so the application
        return Promise.reject(error);
    }
);

export default axiosInstance;

