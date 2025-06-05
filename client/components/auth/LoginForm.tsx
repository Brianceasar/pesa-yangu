"use client";
import { useState } from "react";
import { login } from "../../app/actions/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const result = await login(formData);

        if (result.success) {
            setSuccess(true);
            setMessage("Login successful! Redirecting...");

            let targetPath = "/";

            switch (result.role) {
                case "admin":
                    targetPath = "/dashboard/admin";
                    break;
                case "mentor":
                    targetPath = "/dashboard/mentor";
                    break;
                case "customer":
                    targetPath = "/dashboard/customer";
                    break;
                default:
                    targetPath = "/";
            }

            setTimeout(() => {
                router.push(targetPath);
            }, 2000);

            setForm({ identifier: "", password: "" });
            setError(null);
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-10 flex flex-col gap-5 max-w-md mx-auto mt-12"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-sm border border-red-300">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 text-green-700 px-4 py-3 rounded text-sm border border-green-300">
                    {message}
                </div>
            )}

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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm pr-10 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((show) => !show)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 transition"
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21-2.21A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.927-5.927"
                                />
                            </svg>
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