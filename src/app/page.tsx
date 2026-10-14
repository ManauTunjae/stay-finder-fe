import { getProperties } from "@/lib/api";

export default async function Home() {
  const properties = await getProperties();
  console.log("Antal boenden: ", properties.length);
  console.log("Första: ", properties[0]?.title);

  return (
    <main>
      <h1>StayFinder</h1>
    </main>
  );
}
