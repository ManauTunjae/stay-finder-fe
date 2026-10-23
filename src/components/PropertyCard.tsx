import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";

type Props = {
  property: Property;
  fullWidth?: boolean;
};

export default function PropertyCard({ property, fullWidth }: Props) {
  return (
    <Link
      href={`/properties/${property.property_id}`}
      className={`block py-2 px-1 ${
        fullWidth ? "w-full" : "w-40 md:w-56 lg:w-56 shrink-0"
      }`}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200">
        {property.image_url ? (
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            sizes={
              fullWidth
                ? "(min-width: 768px) 33vw, 50vw"
                : "(min-width: 1024px) 224px, (min-width: 768px) 224px, 160px"
            }
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Ingen bild
          </div>
        )}
      </div>

      <h3 className="mt-2 text-sm md:text-base font-semibold">
        {property.title}
      </h3>
      <p className="text-xs md:text-sm text-gray-500">{property.city}</p>
      <p className="text-xs md:text-sm text-gray-500">{property.country}</p>
      <p className="text-xs md:text-sm">
        <span className="font-semibold">
          {property.price_per_night.toLocaleString("sv-SE")} SEK
        </span>{" "}
        / natt
      </p>
    </Link>
  );
}
