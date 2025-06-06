import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
            accessToken: string;
            role: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name?: string;
        accessToken: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name?: string;
        accessToken: string;
        role: string;
    }
}