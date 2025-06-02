import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert
} from "@mui/material";

const RegisterForm = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const response = await registerUser(form.username, form.email, form.password);
        if (response.error) {
            setError(response.error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
            setForm({ username: "", email: "", password: "" });
            setError(null);
        }
        setLoading(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            <Typography variant="h4" align="center">Register</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{message}</Alert>}
            <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
        </Box>
    );
};

export default RegisterForm;