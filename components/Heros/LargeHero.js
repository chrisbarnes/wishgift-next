import Link from "next/link";
import Image from "next/image";

const LargeHero = ({ heading, description, link, backgroundImage }) => {
  return (
    <div
      className="relative flex flex-col justify-center items-center rounded-md overflow-hidden text-white"
      style={{ height: "66.66vw" }}
    >
      <Image
        src={backgroundImage}
        fill
        className="z-0 max-w-full"
        priority
        alt=""
      />
      <h1 className="relative z-10 font-bold text-6xl">{heading}</h1>
      {description && <p className="relative z-10 mb-8">{description}</p>}
      {link && link.url && link.text && (
        <Link
          href={link.url}
          className="relative z-10 rounded-md bg-blue-700 text-white px-4 py-2"
        >
          {link.text}
        </Link>
      )}
    </div>
  );
};

export default LargeHero;
