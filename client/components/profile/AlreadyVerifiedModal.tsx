"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
    open: boolean;
    onClose: () => void;
};

const AlreadyVerifiedModal = ({ open, onClose }: Props) => {
    const router = useRouter();

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full relative">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                    Already Verified?
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    If you’ve already verified your account, you can log in now.
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full py-2 bg-green-500 cursor-pointer text-white font-medium rounded-md hover:bg-green-600 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-2 cursor-pointer bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlreadyVerifiedModal;