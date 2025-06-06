/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SERVER_URI } from "@/constants/constant";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    const response = await axios.post(`${SERVER_URI}/auth/local`, {
                        identifier: credentials.email, // ✅ FIXED
                        password: credentials.password,
                    });

                    const { jwt, user } = response.data;

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.username,
                        accessToken: jwt,
                        role: user.role_type,
                    };
                } catch (error: any) {
                    console.error("Credentials login error:", error.response?.data || error);
                    throw new Error("Invalid credentials");
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    trustHost: true,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.accessToken = user.accessToken;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.accessToken = token.accessToken as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
});