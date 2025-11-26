import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from "@/components/ui/button";
import { forwardRef } from "react";

interface ButtonProps extends Omit<ShadcnButtonProps, "variant" | "size"> {
  variant?: ShadcnButtonProps["variant"];
  size?: ShadcnButtonProps["size"];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, ...rest }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...rest}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
