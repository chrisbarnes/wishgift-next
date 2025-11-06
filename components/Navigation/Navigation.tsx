import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "./Logo";

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-black">
      <ul className="flex container mx-auto px-4 py-4">
        <li>
          <Link href="/" className="text-white px-4 py-4 font-bold">
            <Logo /> WishGift
          </Link>
        </li>
        {/* <li>
          <Link href="/about">
            <a className="text-white px-4 py-4">About</a>
          </Link>
        </li> */}
        <li>
          <Link href="/groups" className="text-white px-4 py-4">
            Groups
          </Link>
        </li>

        {status !== "loading" && (
          <li className="ml-auto">
            {session ? (
              <button className="text-white pr-4" onClick={() => signOut()}>
                Sign Out
              </button>
            ) : (
              <button className="text-white pr-4" onClick={() => signIn()}>
                Sign Up/Sign In
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
