import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export default async function Home() {
  const properties = await getProperties();
  const cities = [...new Set(properties.map((p) => p.city))]

  return (
    <main className="p-4 flex gap-4 overflow-x-auto md:gap-10">
      {properties.map((p) => (
        <PropertyCard key={p.property_id} property={p} />
      ))}
    </main>
  );
}
