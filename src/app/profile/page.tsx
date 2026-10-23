"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Property } from "@/types/property";
import Avatar from "@/components/Avatar";
import PropertyCard from "@/components/PropertyCard";
import { getMyProperties, deleteProperty } from "@/lib/properties";
import { ApiError } from "@/lib/apiError";
import { X } from "lucide-react";
import PropertyForm from "@/components/PropertyForm";
import BlurredBackground from "@/components/BlurredBackground";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, openAuthModal, logoutUser } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<Property | null>(null);

  useEffect(() => {
    if (isLoading || !user) return;

    getMyProperties()
      .then((data) => setProperties(data))
      .catch(() => setError("Kunde inte hämta dina boenden"))
      .finally(() => setIsFetching(false));
  }, [user, isLoading]);

  async function handleLogout() {
    await logoutUser();
    router.push("/");
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Vill du verkligen ta bort boendet?")) return;

    setError(null);
    setDeletingId(id);

    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.property_id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Något gick fel");
    } finally {
      setDeletingId(null);
    }
  }

  // 1. Laddar
  if (isLoading) {
    return <p className="p-4">Laddar...</p>;
  }

  // 2. Inte inloggad
  if (!user) {
    return (
      <BlurredBackground>
        <div className="p-4 text-xl text-center flex flex-col items-center gap-3 py-20">
          <p>Du måste logga in för att se din profil.</p>
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

  function handleSaved(updated: Property) {
    setProperties((prev) =>
      prev.map((p) => (p.property_id === updated.property_id ? updated : p)),
    );
    setIsEditing(null);
  }

  // 3. Inloggad
  return (
    <BlurredBackground>
      <div className="p-4 md:px-10 md:py-8 max-w-4xl mx-auto flex flex-col gap-8">
        {/* Del 1: Användaren */}
        <section className="flex flex-col items-center bg-gray-100 text-center text-lg gap-3 border border-gray-300 rounded-2xl p-6">
          <Avatar email={user.email} />
          <p className="font-semibold">{user.email}</p>

          <div className="flex gap-4">
            <Link
              href="/bookings"
              className="bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Mina bokningar
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white border border-gray-300 px-5 py-2 rounded-lg cursor-pointer"
            >
              Logga ut
            </button>
          </div>
        </section>

        {/* Del 2: Mina boenden */}
        <section>
          <h2 className="text-xl font-bold mb-4">Mina boenden</h2>

          {/* {isFetching && <p>Hämtar dina boenden...</p>} */}
          {error && <p className="text-red-600">{error}</p>}

          {!isFetching && !error && properties.length === 0 && (
            <div className="flex flex-col items-start gap-3">
              <p className="text-gray-500">Du har inga boenden än.</p>
              <Link
                href="/properties/new"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
              >
                Skapa ditt första boende
              </Link>
            </div>
          )}

          {properties.length > 0 && (
            <div className="grid grid-cols-2 bg-white/55 shadow-xl rounded-lg p-5 md:grid-cols-3 gap-4">
              {properties.map((p) => (
                <div key={p.property_id} className="flex flex-col gap-2">
                  <PropertyCard property={p} fullWidth />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(p)}
                      className="flex-1 border border-blue-400 text-blue-700 hover:bg-gray-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50"
                    >
                      Ändra
                    </button>
                    <button
                      onClick={() => handleDelete(p.property_id)}
                      disabled={deletingId === p.property_id}
                      className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-50"
                    >
                      {deletingId === p.property_id ? "Tar bort..." : "Ta bort"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {isEditing && (
          <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsEditing(null)}
          >
            <div
              className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Stäng"
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setIsEditing(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-6">Ändra boende</h2>
              <PropertyForm
                key={isEditing.property_id}
                property={isEditing}
                onSaved={handleSaved}
              />
            </div>
          </div>
        )}
      </div>
    </BlurredBackground>
  );
}
