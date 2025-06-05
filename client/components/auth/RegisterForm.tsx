'use client';

import { useState } from "react";
import { register } from "../../app/actions/auth";
import AlreadyVerifiedModal from "@/components/profile/AlreadyVerifiedModal";

const RegisterForm = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await register(formData);

        if (result.success && result.user && result.jwt) {
            setSuccess(true);
            setMessage("Registred successful! Waiting For Admin Approval");
            localStorage.setItem("jwt", result.jwt);
            localStorage.setItem("user", JSON.stringify(result.user));
            setShowModal(true);
            setForm({ username: "", email: "", password: "" });
            setError(null);
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-8 flex flex-col gap-5 max-w-md mx-auto mt-12"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>

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

                {/* Username */}
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
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
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-300 text-white font-semibold py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                {/* Already have an account? */}
                <p className="text-sm text-center text-gray-600 mt-2">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-600 hover:underline font-medium">
                        Login
                    </a>
                </p>
            </form>

            {showModal && (
                <AlreadyVerifiedModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default RegisterForm;