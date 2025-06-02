const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    return response.json();
};

export const loginUser = async (identifier: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
    });
    return response.json();
}