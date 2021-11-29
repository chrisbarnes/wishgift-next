import clsx from "clsx";
import Icons from "../Icons";

const IconButton = ({
  accessibleText,
  icon,
  clickHandler,
  text,
  displayText,
}) => {
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
  });

  return (
    <button className={buttonClasses} onClick={clickHandler}>
      {icon === "Photo" && <Icons.Photo extraClasses="mr-1" />}
      {icon === "Trash" && <Icons.Trash extraClasses="mr-1" />}
      {icon === "Edit" && <Icons.Edit extraClasses="mr-1" />}
      {displayText ? (
        <span>{text}</span>
      ) : (
        <span
          className="absolute overflow-hidden"
          style={{
            height: "1px",
            width: "1px",
            clip: "rect(1px, 1px, 1px, 1px)",
          }}
        >
          {accessibleText}
        </span>
      )}
    </button>
  );
};

export default IconButton;
