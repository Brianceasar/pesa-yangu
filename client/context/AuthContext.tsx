"use client";
import {
    createContext,
    useState,
    ReactNode,
    useEffect
} from "react";

type User = {
    id: string;
    username: string;
    email: string;
    role: {
        name: "Student" | "Mentor" | "Admin";
    }
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

export const AuthProvider = ({ children }: AuthProviderProps ) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = document.cookie
            .split("; ")
            .find(row => row.startsWith("user="))?.split("=")[1];

            if (storedUser) {
                setUser(JSON.parse(decodeURIComponent(storedUser)));
            }
}, []);

    const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

    return (
        <AuthContext.Provider value={{  user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

