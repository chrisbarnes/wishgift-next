import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>WishGift</title>
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
