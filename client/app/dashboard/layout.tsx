"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function DashboardLayout ({ children }: { children: React.ReactNode }) {
    const auth = useContext(AuthContext);

    const navItems = [
        { name: "Home", href: "/"},
        { name: "Profile", href: "/dashboard/profile" },
        { name: "Mentors", href: "/dashboard/mentors" },
        { name: "Resources", href: "/dashboard/resources" },
        { name: "Settings", href: "/dashboard/settings" }

    ];

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
                    </ul>
                </div>
            </nav>
            <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}