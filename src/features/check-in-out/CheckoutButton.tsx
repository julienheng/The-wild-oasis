import Button from "../../ui/Button";

type Props = {
  bookingId: number;
};

function CheckoutButton({ bookingId }: Props) {
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
