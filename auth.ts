export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  debug: true,
  pages: {
    error: '/auth/error', // Custom error page to help debug OAuth errors
    signIn: '/auth/signin' // Optional custom sign-in page
  },
});
