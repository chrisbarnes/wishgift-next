import { useSession } from "next-auth/react";
import CheckboxToggle from "../Forms/CheckboxToggle";

const MarkPurchasedButton = ({
  isOwner,
  isPurchased,
  purchasedBy,
  onChange,
}) => {
  const { data: session } = useSession();

  // You can't mark your own gifts as purchased
  if (isOwner || (isPurchased && purchasedBy !== session.user.email)) {
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
