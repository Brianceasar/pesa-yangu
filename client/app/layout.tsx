import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Home from "./page";
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Pesa Yangu",
  description: "Personal finance app for East Africa",
};

export default function RootLayout({

}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Home />
      </body>
    </html>
  );
}