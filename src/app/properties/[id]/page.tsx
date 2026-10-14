import { notFound } from "next/navigation";
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
      <div className="flex gap-2 mb-4">
        <span className="flex gap-2 items-center px-2 py-1 rounded-md bg-gray-100 text-md font-medium capitalize">
          <Building /> {property.kind}
        </span>
        <span className="flex gap-2 items-center px-2 py-1 rounded-md bg-gray-100 text-md font-medium capitalize">
          <MapPin /> {property.city}
        </span>
      </div>
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p>{property.city}</p>
    </main>
  );
}
