"use client";

import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import PropertyForm from "@/components/PropertyForm";

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
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* 1. Suddig bild i bakgrunden */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover blur-lg scale-100 -z-10"
      />

      {/* 2. Ljus slöja, så det inte blir för mörkt */}
      <div className="absolute inset-0 bg-white/30 -z-10" />

      {/* 3. Innehållet, som förut */}
      <div className="p-4 md:px-10 md:py-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Skapa boende</h1>
        <PropertyForm />
      </div>
    </div>
  );
}
