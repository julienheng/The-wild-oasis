import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => {
      if (bookingId) {
        return getBooking(bookingId);
      } else {
        throw new Error("Booking ID is undefined");
      }
    },
    retry: false, // try to fetch data 3 times
  });

  return { isLoading, error, booking };
}
