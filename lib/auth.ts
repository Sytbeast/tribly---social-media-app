import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDb();

                // email se user dhundho
                const user = await User.findOne({ email: credentials?.email })

                // user nahi mila
                if (!user) return null

                // password check karo
                const isMatch = await bcrypt.compare(credentials?.password!, user.password)

                // wrong password 
                if (!isMatch) return null

                // right password
                return user
            }
        })

    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session({ session, token }: {session:any, token: any}) {
            if (session.user) {
                session.user.id = token.sub!
            }
            return session
        }
    }
}


export default NextAuth(authOptions)