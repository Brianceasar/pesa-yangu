"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => setMenuOpen((open) => !open);
    const handleMenuClose = () => setMenuOpen(false);

    const handleLogout = () => {
        auth?.logout();
        handleMenuClose();
        router.push("/");
    };

    return (
        <nav className="sticky top-0 bg-primary text-white shadow z-50">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                <div
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    Pesa Yangu
                </div>
                {!auth?.user ? (
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 rounded hover:bg-primary-dark transition"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="px-4 py-2 rounded border border-white hover:bg-white hover:text-primary transition"
                            onClick={() => router.push("/register")}
                        >
                            Register
                        </button>
                    </div>
                ) : (
                    <div className="relative flex items-center gap-2">
                        <span className="font-medium">{auth.user.username}</span>
                        <button
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white focus:outline-none"
                            onClick={handleMenuToggle}
                            aria-label="User menu"
                        >
                            {auth.user.username?.[0]?.toUpperCase() || "U"}
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded shadow-lg py-2 z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        handleMenuClose();
                                        router.push("/profile");
                                    }}
                                >
                                    Account Settings
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
