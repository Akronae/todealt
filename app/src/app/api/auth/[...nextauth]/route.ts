import { env } from "@/utils/env";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: env("GITHUB_ID"),
      clientSecret: env("GITHUB_SECRET"),
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
