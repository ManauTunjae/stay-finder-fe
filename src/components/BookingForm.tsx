"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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

  return (
    <div
      className="fixed insert-0 z-50 bg-black/50 flex items-center justify-center p-4"
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

        <h2 className="text-xl font-bold mb-6">Boka boendet</h2>

        <form className="flex flex-col gap-4">
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
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* <div>
            <label
              htmlFor="guest"
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
          </div> */}
        </form>
      </div>
    </div>
  );
}
