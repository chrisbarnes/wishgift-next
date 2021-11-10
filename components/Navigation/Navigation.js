import Link from "next/link";

const Navigation = () => {
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
        <li className="ml-auto">
          <Link href="/auth/sign-up">
            <a className="text-white px-4 py-4">Sign Up</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/sign-in">
            <a className="text-white px-4 py-4">Sign In</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
