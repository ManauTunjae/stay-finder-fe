"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyBookings } from "@/lib/bookings";
import type { Booking } from "@/types/booking";

export default function BookingsPage() {
  const { user, isLoading, openAuthModal } = useAuth();

  
}
