"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const auth = useContext(AuthContext);
    const router = useRouter();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Profile", href: "/dashboard/profile" },
        { name: "Mentors", href: "/dashboard/mentors" },
        { name: "Resources", href: "/dashboard/resources" },
        { name: "Settings", href: "/dashboard/settings" }

    ];

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        toast.success("Logged out successfully!");
        router.push("/login");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-primary">Pesa Yangu</Link>
                    <ul className="flex space-x-6">
                        {navItems.map(item => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-gray-700 hover:text-primary transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        {auth?.user?.role?.name === "Admin" && (
                            <li>
                                <Link href="/dashboard/admin" className="text-gray-700 hover:text-primary transition-colors">
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-700 px-3 rounded-lg cursor-pointer transition-colors"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}