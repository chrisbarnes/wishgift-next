interface TagProps {
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

const Tag = ({ size }: TagProps) => {
  let iconSize: string;

  switch (size) {
    case "sm":
      iconSize = "h-5 w-5";
      break;
    case "md":
      iconSize = "h-8 w-8";
      break;
    case "lg":
      iconSize = "h-12 w-12";
      break;
    case "xl":
      iconSize = "h-14 w-14";
      break;
    case "xxl":
      iconSize = "h-16 w-16";
      break;

    default:
      iconSize = "h-5 w-5";
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={iconSize}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Tag;
