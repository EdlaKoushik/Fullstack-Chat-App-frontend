import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://full-stack-chat-application-backend.vercel.app/api",
    withCredentials: true,
});