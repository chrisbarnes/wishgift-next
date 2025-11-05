import { ReactNode } from "react";
import Navigation from "../Navigation/Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />

      <main className="container px-8 py-8 mx-auto">{children}</main>
    </>
  );
};

export default Layout;
