"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty, updateProperty } from "@/lib/properties";
import { ApiError } from "@/lib/apiError";
import type { NewProperty, Property } from "@/types/property";

type Props = {
  property?: Property;
  onSaved?: (saved: Property) => void;
};

export default function PropertyForm({ property, onSaved }: Props) {
  const isEdit = !!property;
  const router = useRouter();

  const [title, setTitle] = useState(property?.title ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [city, setCity] = useState(property?.city ?? "");
  const [country, setCountry] = useState(property?.country ?? "");
  const [kind, setKind] = useState<NewProperty["kind"]>(
    (property?.kind as NewProperty["kind"]) ?? "apartment",
  );
  const [price, setPrice] = useState(property?.price_per_night ?? "");
  const [maxGuests, setMaxGuests] = useState(property?.max_guests ?? "");
  const [imageUrl, setImageUrl] = useState(property?.image_url ?? "");

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const data: NewProperty = {
        title,
        description,
        city,
        country,
        kind,
        price_per_night: Number(price),
        max_guests: Number(maxGuests),
        image_url: imageUrl.trim() || undefined,
      };

      const saved = isEdit
        ? await updateProperty(property.property_id, data)
        : await createProperty(data);

      if (onSaved) {
        onSaved(saved);
      } else {
        router.push(`/properties/${saved.property_id}`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setFieldErrors(err.fieldErrors);
      } else {
        setError("Något gick fel");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="text-sm font-semibold">
        Titel
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.title && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.title}
          </span>
        )}
      </label>

      <label className="text-sm font-semibold">
        Beskrivning
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.description && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.description}
          </span>
        )}
      </label>

      <label className="text-sm font-semibold">
        Typ av boende
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as NewProperty["kind"])}
          className={inputClass}
        >
          <option value="apartment">Lägenhet</option>
          <option value="villa">Villa</option>
        </select>
      </label>

      <label className="text-sm font-semibold">
        Stad
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.city && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.city}
          </span>
        )}
      </label>

      <label className="text-sm font-semibold">
        Land
        <input
          type="text"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.country && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.country}
          </span>
        )}
      </label>

      <label className="text-sm font-semibold">
        Pris per natt
        <input
          type="number"
          required
          value={price}
          min={1}
          onChange={(e) => setPrice(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.price && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.price_per_night}
          </span>
        )}
      </label>

      <label className="text-sm font-semibold">
        Max antal gäster
        <input
          type="number"
          required
          value={maxGuests}
          min={1}
          onChange={(e) => setMaxGuests(e.target.value)}
          className={inputClass}
        />
        {fieldErrors.maxGuests && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.max_guests}
          </span>
        )}
      </label>

      <label className="text-sm font-semibold">
        Bildlänk (valfri)
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className={inputClass}
        />
        <span className="block text-xs text-gray-500 font-normal mt-1">
          Använd en bild från Unsplash eller iStock.
        </span>
        {fieldErrors.image_url && (
          <span className="block text-xs text-red-600 mt-1">
            {fieldErrors.image_url}
          </span>
        )}
      </label>

      {error && (
        <p className="bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg cursor-pointer disabled:opacity-50"
      >
        {isSubmitting
          ? "Sparar..."
          : isEdit
            ? "Spara ändringar"
            : "Skapa boende"}
      </button>
    </form>
  );
}
