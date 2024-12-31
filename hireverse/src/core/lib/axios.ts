import { clearToken, clearUser } from "@core/utils/storage";
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
            toast.error("Network Error: Unable to reach the server!");
        } else if (error.response.status >= 500) {
            toast.error("Something went wrong!", {description: "Please  try after sometime"})
        } else if (error.response.status === 401){
            clearUser()
            clearToken()
            window.location.reload();
        }

        // Reject all errors so the application
        return Promise.reject(error);
    }
);

export default axiosInstance;

