"use client";
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    userId: string;
    jwt: string;
};

const UpdateProfileModal = ({ open, onClose, userId, jwt }: Props) => {
    const [form, setForm] = useState({ full_name: "", phone_number: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(form),
        });
        setLoading(false);

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error updating profile: ${errorData.message}`);
        } else {
            alert("Profile updated successfully!");
            onClose();
            window.location.reload();
        }
    };

    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={form.full_name}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`p-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500">Close</button>
            </div>
        </div>
    );
};

export default UpdateProfileModal;