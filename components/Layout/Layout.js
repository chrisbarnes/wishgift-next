import Navigation from "../Navigation/Navigation";
import { Footer } from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />

      <main className="container px-8 py-8 mx-auto">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
