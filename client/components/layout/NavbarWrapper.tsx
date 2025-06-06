"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const { data: session, status } = useSession();

    // Show Navbar only if no user is logged in (session is null)
    if (status === "loading") {
        return null; // or a loader if you want
    }

    return !session?.user ? <Navbar /> : null;
}