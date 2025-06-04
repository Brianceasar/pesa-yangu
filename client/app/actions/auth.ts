"use server";

import { cookies } from "next/headers";

export const login = async (formData: FormData) => {
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (response.ok) {
        (await cookies()).set("jwt", data.jwt, { httpOnly: true });
        (await cookies()).set("user", JSON.stringify(data.user), { httpOnly: true });
        return { success: true };
    } else {
        return { success: false, error: data.message || "Login failed" };
    }
};

export const register = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        return { success: true };
    } else {
        return { success: false, error: data.message || "Registration failed" };
    }
};

export const logout = async () => {
    (await cookies()).delete("jwt");
    (await cookies()).delete("user");
    return { success: true };
};