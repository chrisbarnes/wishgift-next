import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  theme: {
    colorScheme: "light",
    brandColor: "#1d4ed8",
    logo: "/images/gift.svg",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure session is properly structured
      return session;
    },
  },
  debug: true, // Enable debug mode to see what's happening
};

export default NextAuth(authOptions);
