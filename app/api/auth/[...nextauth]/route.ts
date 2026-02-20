import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // 🔹 Example: Replace with your DB logic
                const user = {
                    id: "1",
                    email: "test@example.com",
                    name: "Test User",
                    password: "123456",
                };

                // 🔹 Compare with database user
                if (
                    credentials.email === user.email &&
                    credentials.password === user.password
                ) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
                }

                return null;
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),



    ],
    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,


});


export { handler as GET, handler as POST };

