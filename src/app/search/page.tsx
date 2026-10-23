import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import type { PropertyQuery } from "@/types/property";
import SearchFilters from "@/components/SearchFilters";
import BlurredBackground from "@/components/BlurredBackground";

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
    q: params.q,
    check_in: params.check_in,
    check_out: params.check_out,
  };

  const properties = await getProperties(query);

  const allProperties = await getProperties({ limit: 50 });
  const cities = [...new Set(allProperties.map((p) => p.city))].sort();

  return (
    <BlurredBackground>
      <div className="p-4 md:px-10 md:py-8">
        <h1 className="text-xl font-bold mb-6">Sök boenden</h1>
        <SearchFilters
          key={JSON.stringify(params)}
          cities={cities}
          initialCity={params.city}
          initialMaxPrice={params.max_price}
          initialGuests={params.max_guests}
          initialSortOrder={params.sort_order}
          initialQ={params.q}
          initialCheckIn={params.check_in}
          initialCheckOut={params.check_out}
        />
        <p className="text-gray-700 m-2">{properties.length} boenden</p>
        {properties.length === 0 ? (
          <p className="text-gray-500">Hitta inga boenden</p>
        ) : (
          <div className="grid grid-cols-2 bg-white/60 p-2 rounded-xl md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {properties.map((p) => (
              <PropertyCard key={p.property_id} property={p} fullWidth />
            ))}
          </div>
        )}
      </div>
    </BlurredBackground>
  );
}
