import type { Booking, BookingStatus } from "@/types/booking";

const statusInfo: Record<BookingStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Väntar på bekräftelse",
      className: "bg-yellow-100 text-yellow-800",
    },
    confirmed: {
      label: "Bokningen är bekräftad",
      className: "bg-green-100 text-green-800",
    },
    cancelled: {
      label: "Bokningen är avbokad",
      className: "bg-red-100 text-red-800",
    },
  };

type Props = {
  booking: Booking;
};

export default function BookingCard({ booking }: Props) {}
