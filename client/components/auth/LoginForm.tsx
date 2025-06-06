"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";


const LoginForm = () => {
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Call next-auth credentials signIn
        const result = await signIn("credentials", {
            redirect: false,
            email: form.identifier, // assuming your provider expects email
            password: form.password,
        });


        if (result?.error) {
            toast.error("Login failed: " + result.error);
        } else {
            toast.success("Login successful!");

            // Fetch session to access user info (e.g., role_type)
            const session = await getSession();

            const role = session?.user?.role;

            if (role === "mentor") {
                router.push("/dashboard/mentor");
            } else if (role === "customer") {
                router.push("/dashboard/customer");
            } else {
                router.push("/login");
            }
        }
        setLoading(false);
    };

    // SVGs as React components (recommended)
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
        </svg>
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-10 flex flex-col gap-5 max-w-md mx-auto mt-12"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

            {/* Identifier */}
            <div>
                <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Identifier (Username or Email)
                </label>
                <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={form.identifier}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-12 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((show) => !show)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <EyeOffIcon />
                        ) : (
                            <EyeIcon />
                        )}
                    </button>
                </div>

            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-300 text-white font-semibold py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* Don't have an account? */}
            <p className="text-sm text-center text-gray-600 mt-2">
                Don’t have an account?{" "}
                <a href="/register" className="text-green-600 hover:underline font-medium">
                    Register
                </a>
            </p>
        </form>
    );
};

export default LoginForm;