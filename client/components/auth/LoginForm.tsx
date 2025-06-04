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
            setTimeout(() => {
                router.push("/");
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
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 max-w-md mx-auto mt-10"
        >
            <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
            {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{message}</div>}
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
                    Identifier (Username or Email)
                </label>
                <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={form.identifier}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                        onClick={() => setShowPassword((show) => !show)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21-2.21A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.927-5.927" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;