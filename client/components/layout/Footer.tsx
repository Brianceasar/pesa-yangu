"use client";
import Link from "next/link";
import { useState } from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setEmail("");
    };

    return (
        <footer className="py-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h6 className="text-lg font-bold mb-2">Pesa Yangu</h6>
                    <p className="text-sm">
                        Empowering you financially, one step at a time.
                    </p>
                </div>
                <div>
                    <h6 className="text-lg font-bold mb-2">Quick Links</h6>
                    <ul className="space-y-1  text-green-500">
                        <li>
                            <Link href="/" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link href="/mentor" className="hover:underline">Mentors</Link>
                        </li>
                        <li>
                            <Link href="/resources" className="hover:underline">Resources</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h6 className="text-lg font-bold mb-2">Contact Us</h6>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="rounded px-3 py-2 text-gray-900 border-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-secondary-dark cursor-pointer text-white rounded-lg px-4 py-2 font-semibold transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
                <div>
                    <h6 className="text-lg font-bold mb-2">Follow Us</h6>
                    <div className="flex space-x-6 cursor-pointer">
                        <InstagramIcon style={{ fontSize: 25 }} />
                        <FacebookIcon style={{ fontSize: 25 }} />
                        <XIcon style={{ fontSize: 25 }} />
                    </div>
                </div>

            </div>
            <div className="text-center mt-8 text-sm">
                © {new Date().getFullYear()} Pesa Yangu. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;