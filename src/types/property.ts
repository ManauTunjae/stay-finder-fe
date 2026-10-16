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
