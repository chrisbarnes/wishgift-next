import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link
          href="/"
          className="text-white px-4 py-2 font-bold flex items-center gap-2"
        >
          <Logo /> WishGift
        </Link>

        <NavigationMenu className="ml-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/groups" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Groups
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {status !== "loading" && (
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            {session ? (
              <button
                className="text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => signIn()}
              >
                Sign Up/Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
