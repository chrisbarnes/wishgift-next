import clsx from "clsx";
import Icons from "../Icons";
import AccessibleText from "../Utils/AccessibleText";

interface IconButtonProps {
  accessibleText?: string;
  icon: "Photo" | "Trash" | "Edit";
  clickHandler: () => void;
  text?: string;
  displayText?: boolean;
}

const IconButton = ({
  accessibleText,
  icon,
  clickHandler,
  text,
  displayText,
}: IconButtonProps) => {
  const buttonClasses = clsx({
    "rounded-md": true,
    "text-blue-700": true,
    "w-5": !displayText,
    "h-5": !displayText,
    "text-xs": displayText,
    uppercase: displayText,
    flex: displayText,
    "items-center": displayText,
    "p-2": displayText,
    "font-semibold": displayText,
  });

  return (
    <button className={buttonClasses} onClick={clickHandler}>
      {icon === "Photo" && <Icons.Photo extraClasses="mr-1" />}
      {icon === "Trash" && <Icons.Trash extraClasses="mr-1" />}
      {icon === "Edit" && <Icons.Edit extraClasses="mr-1" />}
      {displayText ? (
        <span>{text}</span>
      ) : (
        <AccessibleText>{accessibleText}</AccessibleText>
      )}
    </button>
  );
};

export default IconButton;
