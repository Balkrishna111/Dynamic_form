"use client";
import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:3500",
    headers: {
        "Content-Type": "application/json",
    },
})

export default apiClient;