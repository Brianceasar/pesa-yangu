'use client';

import { useState } from "react";
import { register } from "../../app/actions/auth";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";

const RegisterForm = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState<{ id: string; jwt: string } | null>(null);

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
            setMessage("Registration successful! Redirecting to complete Profile...");
            localStorage.setItem("jwt", result.jwt);
            localStorage.setItem("user", JSON.stringify(result.user));
            setUserData({ id: result.user.id, jwt: result.jwt });
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
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 max-w-md mx-auto mt-10"
            >
                <h2 className="text-2xl font-bold text-center mb-2">Register</h2>
                {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{message}</div>}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {showModal && userData && (
                <UpdateProfileModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    userId={userData.id}
                    jwt={userData.jwt}
                />
            )}
        </>
    );
};

export default RegisterForm;