import { Button } from "@/components/ui/button";
import Icons from "../Icons";
import AccessibleText from "../Utils/AccessibleText";
import { cn } from "@/lib/utils";

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
  return (
    <Button
      variant="ghost"
      size={displayText ? "sm" : "icon"}
      onClick={clickHandler}
      className={cn(
        "text-blue-700 hover:text-blue-800 dark:text-white dark:hover:text-gray-400",
        !displayText && "w-5 h-5 p-0",
        displayText && "text-xs uppercase font-semibold"
      )}
    >
      {icon === "Photo" && <Icons.Photo extraClasses="mr-1" />}
      {icon === "Trash" && <Icons.Trash extraClasses="mr-1" />}
      {icon === "Edit" && <Icons.Edit extraClasses="mr-1" />}
      {displayText ? (
        <span>{text}</span>
      ) : (
        <AccessibleText>{accessibleText}</AccessibleText>
      )}
    </Button>
  );
};

export default IconButton;
