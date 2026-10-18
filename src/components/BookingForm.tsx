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
