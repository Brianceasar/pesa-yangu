"use client";
import { Container } from "@mui/material";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <LoginForm />
    </Container>
);

export default LoginPage;