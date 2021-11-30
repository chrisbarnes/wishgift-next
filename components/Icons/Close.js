const Close = ({ extraClasses, size }) => {
  let sizeClasses;

  switch (size) {
    case "md":
      sizeClasses = "h-8 w-8";
      break;

    case "lg":
      sizeClasses = "h-10 w-10";
      break;

    default:
      sizeClasses = "h-6 w-6";
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses} ${extraClasses}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default Close;
