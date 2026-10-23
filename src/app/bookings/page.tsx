"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyBookings } from "@/lib/bookings";
import type { Booking } from "@/types/booking";
import BookingCard from "@/components/BookingCard";
import BlurredBackground from "@/components/BlurredBackground";

export default function BookingsPage() {
  const { user, isLoading, openAuthModal } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !user) return;

    getMyBookings()
      .then((data) => setBookings(data))
      .catch(() => setError("Kunde inte hämta bokningar"))
      .finally(() => setIsFetching(false));
  }, [user, isLoading]);

  function handleUpdated(updated: Booking) {
    setBookings((prev) =>
      prev.map((b) =>
        b.booking_id === updated.booking_id
          ? { ...b, ...updated, properties: updated.properties ?? b.properties }
          : b,
      ),
    );
  }

  if (isLoading) {
    return <p className="p-4">Laddar...</p>;
  }

  if (!user) {
    return (
      <BlurredBackground>
        <div className="text-center text-lg flex flex-col items-center gap-3 py-20">
          <p>Du måste logga in för att se dina bokningar.</p>
          <button
            onClick={() => openAuthModal("login")}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
          >
            Logga in
          </button>
        </div>
      </BlurredBackground>
    );
  }

  const myBookings = bookings.filter((b) => b.guest_id === user.id);
  const hostBookings = bookings.filter((b) => b.guest_id !== user.id);

  return (
    <BlurredBackground>
      <div className="p-4 md:px-10 md:py-8 max-w-7xl mx-auto flex flex-col gap-8">
        {isFetching && <p>Hämtar bokningar...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <section>
          <h1 className="text-2xl font-bold mb-4">Mina bokningar</h1>
          {myBookings.length === 0 ? (
            <p className="text-gray-500"> Du har ingen bokningar än.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {myBookings.map((b) => (
                <BookingCard
                  key={b.booking_id}
                  booking={b}
                  onUpdated={handleUpdated}
                  isHost={false}
                />
              ))}
            </div>
          )}
        </section>

        {hostBookings.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Bokningar på mina boenden
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {hostBookings.map((b) => (
                <BookingCard
                  key={b.booking_id}
                  booking={b}
                  onUpdated={handleUpdated}
                  isHost={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </BlurredBackground>
  );
}
