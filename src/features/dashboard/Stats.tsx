/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

type Props = {
  bookings: any;
  confirmedStays: any;
  cabinCount: number;
  numDays: number;
};

export default function Stats({
  bookings,
  confirmedStays,
  cabinCount,
  numDays,
}: Props) {
  // 1. Get the number of bookings
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce(
    (acc: number, booking: any) => acc + booking.totalPrice,
    0
  );

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc: number, cur: any) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
