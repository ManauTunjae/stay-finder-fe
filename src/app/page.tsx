import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import { ArrowRight } from "lucide-react";

const featured = ["Stockholm", "Göteborg"];

export default async function Home() {
  const properties = await getProperties({limit: 30});


  return (
    <main className="p-4 flex flex-col gap-4 overflow-x-auto md:gap-10">
      {featured.map((c) => (
        <section key={c}>
          <div className="flex items-center gap-2 md:px-10 mb-3">
            <h2 className="text-lg md:text-xl font-semibold">{c}</h2>
            <ArrowRight className="w-5 h-5" />
          </div>

          <div className="flex gap-3 md:gap-10 overflow-x-auto md:px-10">
            {properties
              .filter((p) => p.city === c)
              .map((p) => (
                <PropertyCard key={p.property_id} property={p} />
              ))}
          </div>
        </section>
      ))}
      <section>
        <div className="flex items-center gap-2 md:px-10 mb-3">
          <h2 className="text-lg md:text-xl font-semibold">Alla boenden</h2>
          <ArrowRight className="w-5 h-5" />
        </div>
        <div className="flex gap-3 md:gap-10 overflow-x-auto md:px-10">
          {properties.map((p) => (
            <PropertyCard key={p.property_id} property={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
