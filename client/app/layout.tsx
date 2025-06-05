import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import "../globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pesa Yangu",
  description: "Financial mentorship for everyone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <AuthProvider>
          <NavbarWrapper />
          <main className="flex-1">
            {children}
            <Toaster position="top-center" />
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
