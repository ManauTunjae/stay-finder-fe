"use client";

import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import PropertyForm from "@/components/PropertyForm";
import BlurredBackground from "@/components/BlurredBackground";

export default function NewPropertyPage() {
  const { user, isLoading, openAuthModal } = useAuth();

  if (isLoading) {
    <p className="p-4">Laddar...</p>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center flex flex-col items-center gap-3 py-20">
        <p>Du måste logga in för att skapa ett boende.</p>
        <button
          onClick={() => openAuthModal("login")}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
        >
          Logga in
        </button>
      </div>
    );
  }

  return (
    <BlurredBackground>
      <div className="p-4 md:px-10 md:py-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Skapa boende</h1>
        <PropertyForm />
      </div>
    </BlurredBackground>
  );
}
