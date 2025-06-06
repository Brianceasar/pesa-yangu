"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => setMenuOpen((open) => !open);
    const handleMenuClose = () => setMenuOpen(false);

    const handleLogout = async () => {
        handleMenuClose();
        await signOut({ redirect: false });
        router.push("/login");
    };

    if (status === "loading") {
        return null; // or a loading spinner
    }

    return (
        <nav className="sticky top-0 bg-white text-primary shadow z-50">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
                <div
                    className="text-xl font-bold cursor-pointer text-primary"
                    onClick={() => router.push("/")}
                >
                    Pesa Yangu
                </div>

                {!session?.user ? (
                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 rounded border cursor-pointer border-primary text-primary bg-green-500 hover:bg-primary hover:text-white transition"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="px-4 py-2 rounded border cursor-pointer border-primary text-primary bg-green-500 hover:bg-primary hover:text-white transition"
                            onClick={() => router.push("/register")}
                        >
                            Register
                        </button>
                    </div>
                ) : (
                    <div className="relative flex items-center gap-2">
                        <span className="font-medium text-primary">{session.user.name || session.user.email}</span>
                        <button
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white focus:outline-none"
                            onClick={handleMenuToggle}
                            aria-label="User menu"
                        >
                            {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-primary rounded shadow-lg py-2 z-50 border border-primary">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white"
                                    onClick={() => {
                                        handleMenuClose();
                                        router.push("/profile");
                                    }}
                                >
                                    Account Settings
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white"
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