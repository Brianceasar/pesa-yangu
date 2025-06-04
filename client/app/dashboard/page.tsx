"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardRedirect () {
    const { user } = useContext(AuthContext) || {};
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            const role = user.role?.name.toLowerCase();
            router.push(`/dashboard/${role}`);
        }
    }, [user, router]);
    return null;
}
