import axios from "axios"

// Create axios instance
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
})
