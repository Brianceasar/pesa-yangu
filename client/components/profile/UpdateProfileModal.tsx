"use client";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type Props = {
    open: boolean;
    onClose: () => void;
    userId: string;
    jwt: string;
};

const UpdateProfileModal = ({ open, onClose, userId, jwt }: Props) => {
    const [form, setForm] = useState({ full_name: "", bio: "", phone_number: "", role: "User" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Update Profile</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="flex flex-col gap-5"
                >
                    {/* Full Name */}
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />

                    {/* Bio */}
                    <input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />

                    {/* Phone Number */}
                    <PhoneInput
                        country={'ke'}
                        value={form.phone_number}
                        onChange={(phone) => setForm({ ...form, phone_number: phone })}
                        inputClass="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !shadow-sm focus:!outline-none focus:!ring-2 focus:!ring-green-400 transition"
                        containerClass="w-full"
                        inputProps={{
                            name: 'phone_number',
                            required: true,
                        }}
                    />

                    {/* Role Selection */}
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        title="Role type"
                    >
                        <option value="User">User</option>
                        <option value="Mentor">Mentor</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 bg-green-500 text-white font-semibold rounded-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-6 block mx-auto text-sm text-red-500 hover:underline focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UpdateProfileModal;