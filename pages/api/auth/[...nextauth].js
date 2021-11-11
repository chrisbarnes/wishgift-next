import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/Auth0";

export default NextAuth({
  providers: [Auth0Provider({})],
});
