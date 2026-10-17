"use client";

import { useState } from "reat";
import { useAuth } from "@/context/AuthContext";

type Props = {
  propertyId: string;
  pricePerNight: number;
  maxGuests: number;
};

export default function BookingBar({ pricePerNight: pricePerNight }: Props) {
  return (
    <div className="sticky bottom-0 bg-gray-100/90 boder-t border-gray-200 px-4 md:px-10 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <p className="font-semibold underline">
            {pricePerNight.toLocaleString("sv-SE")} SEK / natt
          </p>
          <p className="text-xs text-gray-500">Tillgänglig att boka</p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer">
          Boka
        </button>
      </div>
    </div>
  );
}
