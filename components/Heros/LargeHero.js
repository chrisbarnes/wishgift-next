import Link from "next/link";
import Image from "next/image";

const LargeHero = ({ heading, description, link, backgroundImage }) => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "66.66vw" }}>
      <Image
        src={backgroundImage}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <h1 className="relative z-10">{heading}</h1>
      {description && <p className="relative z-10">{description}</p>}
      {link && link.url && link.text && (
        <Link href={link.url}>
          <a className="relative z-10">{link.text}</a>
        </Link>
      )}
    </div>
  );
};

export default LargeHero;
