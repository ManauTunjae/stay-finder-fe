"use client";

import { useState } from "react";
import type { Booking, BookingStatus } from "@/types/booking";
import { cancelBooking } from "@/lib/bookings";
import { getTodayDate } from "@/lib/date";

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
  onUpdated: (updates: Booking) => void;
};

export default function BookingCard({ booking, onUpdated }: Props) {
  const status = statusInfo[booking.status];

  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
      <span
        className={`self-start text-xs font-semibold px-2 py-1 rounded-md ${status.className}`}
      >
        {status.label}
      </span>
      <p className="text-sm">Namn: {booking.guest_name}</p>
      <p className="text-sm">E-post: {booking.guest_email}</p>
      <p className="text-sm">
        Datum: {booking.check_in} – {booking.check_out}
      </p>
      <p className="text-sm">Antal gäster: {booking.guests}</p>
      <p className="font-bold">
        Totalt {booking.total_price.toLocaleString("sv-SE")} SEK
      </p>
    </div>
  );
}
