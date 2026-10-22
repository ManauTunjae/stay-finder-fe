import { getProperties } from "@/lib/api";
import PropertyRow from "@/components/PropertyRow";
import Hero from "@/components/Hero";

const featured = ["Stockholm", "Göteborg"];

export default async function Home() {
  const properties = await getProperties({
    limit: 50,
    sort_by: "price_per_night",
    sort_order: "asc",
  });

  return (
    <>
      <Hero />
      <main className="py-4 flex flex-col gap-4 md:gap-10">
        {featured.map((c) => (
          <PropertyRow
            key={c}
            title={c}
            properties={properties.filter((p) => p.city === c)}
            href={`/search?city=${encodeURIComponent(c)}`}
          />
        ))}

        <PropertyRow
          title="Alla boenden"
          properties={properties}
          href="/search"
        />
      </main>
    </>
  );
}
