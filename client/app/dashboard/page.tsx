"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load

        if (!session?.user) {
            router.push("/login");
        } else {
            const role = session.user.role?.toLowerCase() || "";
            router.push(`/dashboard/${role}`);
        }
    }, [session, status, router]);

    return null;
}