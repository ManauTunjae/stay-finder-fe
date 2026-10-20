import type { NewProperty, Property } from "@/types/property";
import { ApiError } from "./apiError";

const API_URL = "/api";

export async function createProperty(data: NewProperty): Promise<Property> {
  const res = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.error ?? "Kunde inte skapa boendet",
      res.status,
      Object.fromEntries(json.error ?? []),
    );
  }
  return json;
}
