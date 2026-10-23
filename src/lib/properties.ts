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
      Object.fromEntries(json.errors ?? []),
    );
  }
  return json;
}

export async function getMyProperties(): Promise<Property[]> {
  const res = await fetch(`${API_URL}/properties/my-properties?limit=50`, {
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.error ?? "Kunde inte hämta dina boenden",
      res.status,
    );
  }

  return json.data;
}

export async function updateProperty(
  id: string,
  data: NewProperty,
): Promise<Property> {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.error ?? "Kunde inte spara ändringarna",
      res.status,
      Object.fromEntries(json.errors ?? []),
    );
  }
  return json;
}

export async function deleteProperty(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new ApiError(json.error ?? "Kunde inte ta bort boendet", res.status);
  }
  return;
}
