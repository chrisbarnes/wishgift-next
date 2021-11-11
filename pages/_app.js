import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";

import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
