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
    throw new Error("Kunde inte hämta boenden");
  }

  const json = await res.json();
  return json.data;
}
