import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import type { PropertyQuery } from "@/types/property";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;

  const query: PropertyQuery = {
    city: params.city,
    max_price: params.max_price ? Number(params.max_price) : undefined,
    max_guests: params.max_guests ? Number(params.max_guests) : undefined,
    sort_by: params.sort_order ? "price_per_night" : undefined,
    sort_order:
      params.sort_order === "asc" || params.sort_order === "desc"
        ? params.sort_order
        : undefined,
    limit: 50,
  };

  const properties = await getProperties(query);

  return (
    
  )
}
