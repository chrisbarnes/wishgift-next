import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />

      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
