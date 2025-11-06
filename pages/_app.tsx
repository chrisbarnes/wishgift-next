import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
