import { ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import CheckboxToggle from "../Forms/CheckboxToggle";

interface MarkPurchasedButtonProps {
  isOwner: boolean;
  isPurchased: boolean;
  purchasedBy: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MarkPurchasedButton = ({
  isOwner,
  isPurchased,
  purchasedBy,
  onChange,
}: MarkPurchasedButtonProps) => {
  const { data: session } = useSession();

  // You can't mark your own gifts as purchased
  if (isOwner || (isPurchased && purchasedBy !== session?.user?.email)) {
    return null;
  }

  return (
    <CheckboxToggle
      label="Purchased?"
      onChange={onChange}
      isChecked={isPurchased}
    />
  );
};

export default MarkPurchasedButton;
