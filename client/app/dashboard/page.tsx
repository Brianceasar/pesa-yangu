"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardRedirect () {
    const auth = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        if (!auth?.user) {
            router.push("/login");
        } else {
            const role = auth.user.role?.name?.toLowerCase();
            router.push(`/dashboard/${role}`);
        }
    }, [auth?.user, router]);
    return null;
}
