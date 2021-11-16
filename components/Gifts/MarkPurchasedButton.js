const MarkPurchasedButton = ({ isOwner }) => {
  // You can't mark your own gifts as purchased
  if (isOwner) {
    return null;
  }

  return <button>Toggle Purchased</button>;
};

export default MarkPurchasedButton;
