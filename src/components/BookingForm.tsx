"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { calculateNights, getTodayDate } from "@/lib/date";

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

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  const today = getTodayDate();

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

        <div className="bg-green-300/30 rounded-lg p-3 text-md">
          {nights > 0 ? (
            <>
              <p>
                {pricePerNight.toLocaleString("sv-SE")} SEK × {nights}{" "}
                {nights === 1 ? "natt" : "nätter"}
              </p>
              <p className="font-bold text-base mt-1">
                Totalt {totalPrice.toLocaleString("sv-SE")} SEK
              </p>
            </>
          ) : (
            <p className="text-gray-500">Välj datum för att se priset</p>
          )}
        </div>

        <form className="flex flex-col gap-4 py-3">
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
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
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
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="guestName"
              className="block text-sm font-semibold mb-1"
            >
              Ditt nman
            </label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="guestEmail"
              className="block text-sm font-semibold mb-1"
            >
              Ditt e-post
            </label>
            <input
              id="guestEmail"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
