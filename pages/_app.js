import "tailwindcss/tailwind.css";
import "./styles/styles.css";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WishGift</title>
      </Head>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
