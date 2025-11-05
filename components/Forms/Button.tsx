import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
}

const Button = ({ type, children, className = "", ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
