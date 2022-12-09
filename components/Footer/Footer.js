import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black flex-grow min-h-[200px] flex flex-col py-8">
      <div className="container mx-auto text-white">
        <ul className="px-4">
          <li>
            <Link href="/" className="text-white px-4 py-4 font-bold">
              WishGift
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
