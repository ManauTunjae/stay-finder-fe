import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  console.log("Sidan körs, id:", id);
  const property = await getPropertyById(id);
  console.log("Boende:", property);

  if (!property) {
    notFound();
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <p>{property.city}</p>
    </main>
  );
}
