import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="p-4 flex gap-4 overflow-x-auto">
      {properties.map((p) => (
        <PropertyCard key={p.property_id} property={p} />
      ))}
    </main>
  );
}
