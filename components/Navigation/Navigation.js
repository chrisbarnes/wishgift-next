import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/groups">Groups</Link>
        </li>
        <li>
          <Link href="/auth/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="/auth/sign-in">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
