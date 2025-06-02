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
};
interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextType {
    user: User | null;
    jwt: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps ) => {
    const [user, setUser] = useState<User | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);

    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        const storedUser = localStorage.getItem("user");
        if (storedJwt && storedUser) {
        setJwt(storedJwt);
        setUser(JSON.parse(storedUser));
        }
}, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setJwt(token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        setJwt(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{  user, jwt, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

