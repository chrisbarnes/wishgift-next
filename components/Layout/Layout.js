import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />

      <main className="container px-8 py-8 mx-auto">{children}</main>
    </>
  );
};

export default Layout;
