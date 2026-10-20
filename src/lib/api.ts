import type { Property, PropertyQuery } from "@/types/property";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProperties(
  params?: PropertyQuery,
): Promise<Property[]> {
  const query = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/properties?${query.toString()}`);
  if (!res.ok) {
    throw new Error("Could not fetch properties");
  }

  const json = await res.json();
  return json.data;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const res = await fetch(`${API_URL}/properties/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Could not fetch a property");
  }
  return await res.json();
}
