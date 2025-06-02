import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesa Yangu",
  description: "Financial mentorship for everyone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
