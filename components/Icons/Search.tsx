import React from "react";

interface SearchProps {
  extraClasses?: string;
  size?: "sm" | "md" | "lg";
}

const Search = ({ extraClasses = "", size }: SearchProps) => {
  let sizeClasses: string;

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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export default Search;
