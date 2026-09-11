import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            // Executa apenas no login
            if (account && user) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/google`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                nome: user.name,
                                email: user.email,
                                imageUrl: user.image,
                            }),
                        }
                    );

                    const data = await response.json();

                    // token retornado pela sua API
                    token.accessToken = data.token;
                    token.userId = data.user.id;
                } catch (error) {
                    console.error(error);
                }
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.userId;
            return session;
        },
    },
});

export { handler as GET, handler as POST };