export type Property = {
  property_id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  price_per_night: number;
  max_guests: number;
  created_at: string;
  image_url: string | null;
  kind: string;
  host_id: string;
};

export type PropertyQuery = {
  city?: string;
  country?: string;
  max_price?: number;
  max_guests?: number;
  sort_by?: "price_per_night" | "created_at" | "title" | "city";
  sort_order?: "asc" | "desc";
  limit?: number;
  q?: string;
};
