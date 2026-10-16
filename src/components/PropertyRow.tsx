import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types/property";

type Props = {
  title: string;
  properties: Property[];
};

export default function PropertyRow({ title, properties }: Props) {
  return (
    <section>
      <div className="flex items-center gap-2 px-4 md:px-10 mb-3">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <ArrowRight className="w-5 h-5" />
      </div>
      <div className="flex gap-4 md:gap-10 overflow-x-auto px-4 md:px-10">
        {properties.map((p) => (
          <PropertyCard key={p.property_id} property={p} />
        ))}
      </div>
    </section>
  );
}
