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

  const myBookings = bookings.filter((b) => b.guest_id === user.id)
  const hostBookings = bookings.filter((b) => b.guest_id !== user.id)

  return (
    <div className="p-4 md:px-10 md:py-8 max-w-4xl mx-auto flex flex-col gap-8">
        {isFetching && <p>Hämtar bokningar...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <section>
            <h1 className="text-2xl font-bold mb-4">Mina bokningar</h1>
            {myBookings.length === 0 ? (
                <p className="text-gray-500"> Du har ingen bokningar än.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {myBookings.map((b) => (
                        </>
                    ))}
                </div>
            )}
        </section>
    </div>
  )
}
