"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyBookings } from "@/lib/bookings";
import type { Booking } from "@/types/booking";

export default function BookingsPage() {
  const { user, isLoading, openAuthModal } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isFetching. setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !user) return;

    getMyBookings()
        .then((data) => setBookings(data))
        .catch(() => setError("Kunde inte hämta bokningar"))
        .finally(() => setIsFetching(false))
  }, [user, isLoading]);

  if(isLoading) {
    return <p className="p-4">Laddar...</p>
  }

  if(!user) {
    return (
        <div className="p-4 text-center flex flex-col items-center gap-3 py-20">
            <p>Du måste logga in för att se dina bokningar.</p>
            <button onClick={() => openAuthModal("login")} className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer">Logga in</button>
        </div>
    )
  }
}
