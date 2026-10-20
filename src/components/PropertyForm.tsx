"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/properties";
import { ApiError } from "@/lib/apiError";
import type { NewProperty } from "@/types/property";

export default function PropertyForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Sweden");
  const [kind, setKind] = useState<NewProperty["kind"]>("apartment");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const newProperty = await createProperty({
        title,
        description,
        city,
        country,
        kind,
        price_per_night: Number(price),
        max_guests: Number(maxGuests),
        image_url: imageUrl.trim() || undefined,
      });
      router.push(`/properties/${newProperty.property_id}`);
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

  const inputClass = "block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal";
}
