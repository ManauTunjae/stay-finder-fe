import { notFound } from "next/navigation";
import Image from "next/image";
import { getPropertyById } from "@/lib/api";
import { Building, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="p-4 md:px-10 md:py-8 max-w-4xl mx-auto">
      {/* Kind of property and city-location*/}
      <div className="flex gap-2 mb-4">
        <span className="flex gap-2 items-center px-2 py-1 rounded-md bg-gray-100 text-md font-medium capitalize">
          <Building /> {property.kind}
        </span>
        <span className="flex gap-2 items-center px-2 py-1 rounded-md bg-gray-100 text-md font-medium capitalize">
          <MapPin /> {property.city}
        </span>
      </div>

      <div className="relative aspect-[4/3] md:aspect-video rounded-xl overflow-hidden bg-gray-200 mb-4">
        {property.image_url ? (
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Ingen bild
          </div>
        )}
      </div>

      <h1 className="text-xl md:text-2xl font-bold">{property.title}</h1>
      <p>{property.city}</p>
    </main>
  );
}
