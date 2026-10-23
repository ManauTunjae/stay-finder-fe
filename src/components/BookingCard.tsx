"use client";

import { useState } from "react";
import type { Booking, BookingStatus } from "@/types/booking";
import {
  cancelBooking,
  confirmBooking,
  updateBookingDates,
  updateBookingGuests,
} from "@/lib/bookings";
import { getTodayDate } from "@/lib/date";
import { ApiError } from "@/lib/apiError";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  const today = getTodayDate();

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
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Något gick fel");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex flex-row gap-3 md:gap-4">
      <Link
        href={`/properties/${booking.property_id}`}
        className="relative w-24 sm:w-32 md:w-56 aspect-square shrink-0 self-start rounded-xl overflow-hidden bg-gray-200"
      >
        {booking.properties?.image_url ? (
          <Image
            src={booking.properties.image_url}
            alt={booking.properties.title}
            fill
            sizes="(min-width: 768px) 224px, 128px"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Ingen bild
          </div>
        )}
      </Link>

      <div className="flex-1 flex flex-col gap-2 p-3">
        {booking.properties && (
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-bold text-lg">{booking.properties.title}</p>
            <p className="flex items-center gap-1 text-sm text-gray-500 font-semibold">
              <MapPin className="w-4 h-4" />
              {booking.properties.city}
            </p>
          </div>
        )}

        <span
          className={`self-start text-xs font-semibold px-2 py-1 rounded-md ${status.className}`}
        >
          {status.label}
        </span>

        <p className="text-sm">Namn: {booking.guest_name}</p>
        <p className="text-xs md:text-sm break-all">E-post: {booking.guest_email}</p>
        <p className="text-sm">
          Datum: {booking.check_in} – {booking.check_out}
        </p>
        <p className="text-sm">Antal gäster: {booking.guests}</p>
        <p className="font-bold">
          Totalt {booking.total_price.toLocaleString("sv-SE")} SEK
        </p>

        <div className="flex flex-wrap gap-2">
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

          {canEdit && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="border border-gray-400 text-gray-700 hover:bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer"
            >
              Ändra
            </button>
          )}
        </div>

        {isEditing && (
          <div className="flex flex-col gap-3 border-t border-gray-200 pt-3 mt-1">
            <label className="text-sm font-semibold">
              Antal gäster
              <input
                type="number"
                min={1}
                value={editGuests}
                onChange={(e) => setEditGuests(Number(e.target.value))}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
              />
            </label>

            <label className="text-sm font-semibold">
              Incheckning
              <input
                type="date"
                min={today}
                value={editCheckIn}
                onChange={(e) => setEditCheckIn(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
              />
            </label>

            <label className="text-sm font-semibold">
              Utcheckning
              <input
                type="date"
                min={editCheckIn || today}
                value={editCheckOut}
                onChange={(e) => setEditCheckOut(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
              />
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Sparar..." : "Spara"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="border border-gray-300 px-4 py-1.5 rounded-lg text-sm cursor-pointer"
              >
                Avbryt
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
