"use client";
import { Container } from "@mui/material";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <RegisterForm />
    </Container>
);

export default RegisterPage;