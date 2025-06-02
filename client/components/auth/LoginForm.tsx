"use client";
import { useState, useContext } from "react";
import { loginUser } from "@/lib/api";
import { AuthContext } from "@/context/AuthContext";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    IconButton,
    InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const response = await loginUser(form.identifier, form.password);
        if (response.error) {
            setError(response.error.message);
            setLoading(false);
        } else {
            auth?.login(response.user, response.jwt);
            setSuccess(true);
            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                router.push("/");
            }, 2000);
            setForm({ identifier: "", password: "" });
            setError(null);
        }
        setLoading(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "auto", mt: 4 }}
        >
            <Typography variant="h4" align="center">Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{message}</Alert>}
            <TextField
                label="Identifier (Username or Email)"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                required
            />
            <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                disabled={loading}
            >
                {loading ? "Loggiing in..." : "Login"}
            </Button>
        </Box>
    );
}
export default LoginPage;