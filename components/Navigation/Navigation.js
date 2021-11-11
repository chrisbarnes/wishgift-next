import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-black">
      <ul className="flex container mx-auto px-4 py-4">
        <li>
          <Link href="/">
            <a className="text-white px-4 py-4 font-bold">WishGift</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="text-white px-4 py-4">About</a>
          </Link>
        </li>
        <li>
          <Link href="/groups">
            <a className="text-white px-4 py-4">Groups</a>
          </Link>
        </li>

        {status !== "loading" && (
          <li className="ml-auto">
            {session ? (
              <button className="text-white" onClick={() => signOut()}>
                Sign Out
              </button>
            ) : (
              <button className="text-white" onClick={() => signIn()}>
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
