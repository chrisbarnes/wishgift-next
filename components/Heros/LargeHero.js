import Link from "next/link";
import Image from "next/image";

const LargeHero = ({ heading, description, link, backgroundImage }) => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "66.66vw" }}>
      <Image
        src={backgroundImage}
        layout="fill"
        objectFit="cover"
        style={{ zIndex: "-1" }}
      />
      <h1>{heading}</h1>
      {description && <p>{description}</p>}
      {link && link.url && link.text && (
        <Link href={link.url}>{link.text}</Link>
      )}
    </div>
  );
};

export default LargeHero;
