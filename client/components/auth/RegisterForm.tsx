'use client';

import { useState } from "react";
import { register } from "../../app/actions/register";
import AlreadyVerifiedModal from "@/components/profile/AlreadyVerifiedModal";
import toast from "react-hot-toast";

const RegisterForm = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("email", form.email);
        formData.append("password", form.password);

        const result = await register(formData);

        if (result.success && result.user) {
            toast.success("Registered successfully! Waiting for admin approval.");

            setShowModal(true);
            setForm({ username: "", email: "", password: "" });
        } else {
            toast.error(result.error || "Registration failed");
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