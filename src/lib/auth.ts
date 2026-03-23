import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import prismaClient from "./prisma";

interface User {
  user: { id: string; name: string; email: string };
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user.id } as User;

      return session;
    },
  },
};

export async function requireAdmin(): Promise<User> {
  const session: User | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return session;
}
