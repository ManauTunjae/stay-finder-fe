"use client";

import { useState } from "react";
import type { Booking, BookingStatus } from "@/types/booking";
import {
  ApiError,
  cancelBooking,
  confirmBooking,
  updateBookingDates,
  updateBookingGuests,
} from "@/lib/bookings";
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
  isHost: boolean;
};

export default function BookingCard({ booking, onUpdated, isHost }: Props) {
  const status = statusInfo[booking.status];

  const [isCancelling, setIsCancelling] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editGuests, setEditGuests] = useState(booking.guests);
  const [editCheckIn, setEditCheckIn] = useState(booking.check_in);
  const [editCheckOut, setEditCheckOut] = useState(booking.check_out);
  const [error, setError] = useState<string | null>(null);

  const canCancel =
    (booking.status === "pending" || booking.status === "confirmed") &&
    booking.check_in >= getTodayDate();

  async function handleCancel() {
    if (!window.confirm("Vill du verkligen avboka?")) return;

    setError(null);
    setIsCancelling(true);

    try {
      const updated = await cancelBooking(booking.booking_id);
      onUpdated(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Något gick fel");
    } finally {
      setIsCancelling(false);
    }
  }

  const canConfirm = isHost && booking.status === "pending";

  async function handleConfirm() {
    setError(null);
    setIsConfirming(true);
    try {
      const updated = await confirmBooking(booking.booking_id);
      onUpdated(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Något gick fel");
    } finally {
      setIsConfirming(false);
    }
  }

  const canEdit =
    !isHost &&
    booking.status === "pending" &&
    booking.check_in >= getTodayDate();

  async function handleSave() {
    setError(null);
    setIsSaving(true);

    try {
      let latest = booking;

      if (editGuests !== booking.guests) {
        latest = await updateBookingGuests(booking.booking_id, editGuests);
      }

      if (
        editCheckIn !== booking.check_in ||
        editCheckOut !== booking.check_out
      ) {
        latest = await updateBookingDates(
          booking.booking_id,
          editCheckIn,
          editCheckOut,
        );
      }
      onUpdated(latest);
      setIsEditing(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Något gick fel");
    } finally {
      setIsSaving(false);
    }
  }

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

      <div className="flex gap-2">
        {canConfirm && (
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50"
          >
            {isConfirming ? "Bekräfta..." : "Bekräfta"}
          </button>
        )}

        {canCancel && (
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50"
          >
            {isCancelling ? "Avboka..." : "Avboka"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
