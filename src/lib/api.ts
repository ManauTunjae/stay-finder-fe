import type { Property } from "@/types/property";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PropertyQuery = {
  city?: string;
  limit?: number;
};

export async function getProperties(
  params?: PropertyQuery,
): Promise<Property[]> {
  const query = new URLSearchParams();
  if (params?.city) query.set("city", params.city);
  if (params?.limit) query.set("limit", String(params.limit));

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
    throw new Error("Property not found");
  }

  if (!res.ok) {
    throw new Error("Could not fetch a property");
  }
  return await res.json();
}
