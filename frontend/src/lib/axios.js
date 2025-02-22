import axios from "axios"

// Create axios instance
export const axiosInstance = axios.create({
    baseURL: "https://spendwise-f400.onrender.com/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
})
