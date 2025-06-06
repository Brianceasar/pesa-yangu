/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import { SERVER_URI } from "@/constants/constant";

export const register = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await axios.post(`${SERVER_URI}/auth/local/register`, {
            username, email, password
        });

        const data = response.data;

        return {
            success: true,
            jwt: data.jwt,
            user: data.user,
            role: data.user.role_type,
        };
    } catch (error: any) {
        console.error("Registration error:", error?.response?.data);
        return {
            success: false,
            error: error?.response?.data?.error?.message || "Registration failed",
        };
    }
};