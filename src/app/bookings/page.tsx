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
}
