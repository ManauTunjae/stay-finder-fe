import type { Property } from "@/types/property";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProperties(): Promise<Property[]> {
  const res = await fetch(`${API_URL}/properties`);

  if (!res.ok) {
    throw new Error("Kunde inte hämta boenden");
  }

  const json = await res.json();
  return json.data;
}
