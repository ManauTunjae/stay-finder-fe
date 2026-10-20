type PropertyQuery = {
  city?: string;
  country?: string;
  max_price?: number;
  max_guests?: number;
  sort_by?: "price_per_night" | "created_at" | "title" | "city";
  sort_order?: "asc" | "desc";
  limit?: number;
};
