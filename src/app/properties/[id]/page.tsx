import { notFound } from "next/navigation";
import Image from "next/image";
import { getPropertyById } from "@/lib/api";
import { MapPin, User, Wallet } from "lucide-react";
import { kindInfo, defaultKind } from "@/lib/propertyKind";
import BookingBar from "@/components/BookingBar";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const kind = kindInfo[property.kind] ?? defaultKind;
  const KindIcon = kind.icon;

  return (
    <>
      <div className="p-4 md:px-10 md:py-8 max-w-4xl mx-auto">
        {/* Kind of property and city-location*/}
        <div className="flex gap-2 mb-4">
          <span className="flex gap-2 items-center px-2 py-1 rounded-md bg-gray-100 text-base font-medium">
            <KindIcon /> {kind.label}
          </span>
          <span className="flex gap-2 items-center px-2 py-1 rounded-md bg-gray-100 text-base font-medium">
            <MapPin /> {property.city}
          </span>
        </div>

        {/*Property image*/}
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

        {/*Info*/}
        <h1 className="flex gap-1 items-center text-xl md:text-2xl font-bold mb-1">
          <KindIcon />
          {property.title}
        </h1>
        <span className="text-sm md:text-base flex gap-1 items-center">
          <MapPin /> {property.city}, {property.country}
        </span>
        <span className="text-sm md:text-base flex gap-1 items-center">
          <User />
          Max {property.max_guests} gäster
        </span>
        <span className="text-sm md:text-base flex gap-1 items-center">
          <Wallet /> {property.price_per_night.toLocaleString("sv-SE")} SEK /
          natt
        </span>

        {/*Description*/}
        <section className="mt-5 border-t boder-gray-60 pt-6">
          <h2 className="text-lg font-semibold mb-1">Om detta boendet</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
        </section>
      </div>

      <BookingBar
        propertyId={property.property_id}
        pricePerNight={property.price_per_night}
        maxGuests={property.max_guests}
      />
    </>
  );
}
