/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { SERVER_URI } from "@/constants/constant";

export const getMentorResources = async (token: string) => {
    try {
        const response = await axios.get(`${SERVER_URI}/learning-resources`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Fetch error:", error?.response?.data || error.message);
        return { error: "Unable to fetch resources" };
    }
};