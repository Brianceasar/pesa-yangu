"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
    const auth = useContext(AuthContext);
    console.log("NavbarWrapper auth:", auth?.user); // Debug user state
    return !auth?.user ? <Navbar /> : null;
}