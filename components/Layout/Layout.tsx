import { ReactNode } from "react";
import Navigation from "../Navigation/Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="container px-8 py-8 mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
