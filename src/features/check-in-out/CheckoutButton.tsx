import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

type Props = {
  bookingId: string;
};

function CheckoutButton({ bookingId }: Props) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
