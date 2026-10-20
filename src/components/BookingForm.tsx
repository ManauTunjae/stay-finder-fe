"use client";

import { useState } from "react";
import { X, ClipboardClock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { calculateNights, getTodayDate } from "@/lib/date";
import { createdBooking } from "@/lib/bookings";
import type { Booking } from "@/types/booking";
import { ApiError } from "@/lib/apiError";

type Props = {
  propertyId: string;
  pricePerNight: number;
  maxGuests: number;
  onClose: () => void;
};

export default function BookingForm({
  propertyId,
  pricePerNight,
  maxGuests,
  onClose,
}: Props) {
  const { user } = useAuth();

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState(user?.email ?? "");

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  const today = getTodayDate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const newBooking = await createdBooking({
        property_id: propertyId,
        guest_name: guestName,
        guest_email: guestEmail,
        check_in: checkIn,
        check_out: checkOut,
        guests,
      });
      setBooking(newBooking);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setFieldErrors(err.fieldErrors);
      } else {
        setError("Något gick fel");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Stäng"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-3">Boka boendet</h2>

        {booking ? (
          <div className="flex flex-col items-center text-center gap-3">
            <ClipboardClock className="w-10 h-10 text-gray-600" />
            <p className="font-semibold">Väntar på bovärdens bekräftelse</p>

            <div className="w-full text-left text-sm bg-gray-50 rounded-lg p-3">
              <p>E-post: {booking.guest_email}</p>
              <p>Antal gäster: {booking.guests}</p>
              <p>
                Datum: {booking.check_in} - {booking.check_out}
              </p>
              <p className="font-bold mt-1">
                Totalt {booking.total_price.toLocaleString("sv-SE")} SEK
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold cursor-pointer"
            >
              Stäng
            </button>
          </div>
        ) : (
          <>
            <div className="bg-blue-300/20 rounded-lg p-3 text-base">
              {nights > 0 ? (
                <>
                  <p>
                    {pricePerNight.toLocaleString("sv-SE")} SEK x {nights}{" "}
                    {nights === 1 ? "natt" : "nätter"}
                  </p>
                  <p className="font-bold text-base text-blue-700 mt-1">
                    Totalt {totalPrice.toLocaleString("sv-SE")} SEK
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Välj datum för att se priset</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-3">
              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-semibold mb-1"
                >
                  Antal gäster
                </label>
                <input
                  id="guests"
                  type="number"
                  min={1}
                  max={maxGuests}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />

                {fieldErrors.guests && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.guests}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkIn"
                  className="block text-sm font-semibold mb-1"
                >
                  Incheckning
                </label>
                <input
                  id="checkIn"
                  type="date"
                  required
                  value={checkIn}
                  min={today}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.check_in && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.check_in}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkOut"
                  className="block text-sm font-semibold mb-1"
                >
                  Utcheckning
                </label>
                <input
                  id="checkOut"
                  type="date"
                  required
                  value={checkOut}
                  min={checkIn || today}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.check_out && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.check_out}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="guestName"
                  className="block text-sm font-semibold mb-1"
                >
                  Ditt namn
                </label>
                <input
                  id="guestName"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.guest_name && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.guest_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="guestEmail"
                  className="block text-sm font-semibold mb-1"
                >
                  Din e-post
                </label>
                <input
                  id="guestEmail"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.guest_email && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.guest_email}
                  </p>
                )}
              </div>

              {error && (
                <p className="bg-red-50 text-red-700 text-sm rounded-lg p-3">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Skickar..." : "Boka"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
