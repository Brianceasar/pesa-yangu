import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import "../globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Pesa Yangu",
  description: "Financial mentorship for everyone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <SessionProvider>
          <NavbarWrapper />
          <main className="flex-1">
            {children}
            <Toaster position="top-center" />
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
