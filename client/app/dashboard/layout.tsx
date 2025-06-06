"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    const navItems = [
        { name: "Profile", href: "#" },
        { name: "Mentors", href: "#" },
        { name: "Resources", href: "#" },
    ];

    const handleLogout = async () => {
        await signOut({ redirect: false });
        toast.success("Logged out successfully!");
        router.push("/login");
    };

    // Show loading state or return null if session not loaded yet
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // Optionally, if no session, redirect to login (or do it in a higher-level auth guard)
    if (!session) {
        router.push("/login");
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold text-primary">Pesa Yangu</Link>
                    <ul className="flex space-x-6 items-center">
                        {navItems.map(item => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-gray-700 hover:text-primary transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}

                        {/* Show Admin Panel link only if user role is Admin */}
                        {session.user?.role === "Admin" && (
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