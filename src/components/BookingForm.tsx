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
}
