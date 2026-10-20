import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types/property";
import Link from "next/link";

type Props = {
  title: string;
  properties: Property[];
  href?: string;
};

export default function PropertyRow({ title, properties, href }: Props) {
  return (
    <section>
      <div className="flex items-center gap-2 px-4 md:px-10 mb-3">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        {href && (
          <Link href={href} aria-label={`Visa alla i ${title}`}>
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
      <div className="flex gap-4 md:gap-10 overflow-x-auto px-4 md:px-10">
        {properties.map((p) => (
          <PropertyCard key={p.property_id} property={p} />
        ))}
      </div>
    </section>
  );
}
