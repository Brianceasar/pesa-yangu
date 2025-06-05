"use client";

import { createContext, useState, ReactNode, useEffect, useContext } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  role: {
    name: "Customer" | "Mentor" | "Admin";
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  // Function to parse user from cookie
  const getUserFromCookie = () => {
    if (typeof document === "undefined") return null; // Avoid SSR issues
    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1];
      if (cookie) {
        return JSON.parse(decodeURIComponent(cookie));
      }
      return null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return null;
    }
  };

  // Initial load and cookie sync
  useEffect(() => {
    setIsClient(true); // Mark as client-side
    const storedUser = getUserFromCookie();
    setUser(storedUser);

    // Optional: Poll for cookie changes (if login/logout happens externally)
    const interval = setInterval(() => {
      const updatedUser = getUserFromCookie();
      if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
        setUser(updatedUser);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup
  }, [user]); // Re-run if user changes

  const login = (userData: User) => {
    setUser(userData);
    // Set cookie (example, adjust based on your setup)
    document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`;
  };

  const logout = () => {
    setUser(null);
    // Clear cookie
    document.cookie = "user=; path=/; max-age=0";
  };

  // Prevent rendering children until client-side hydration
  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};