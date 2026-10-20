"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatWithOptions } from "util";

type Props = {
  cities: string[];
  initialCity?: string;
  initialMaxPrice?: string;
  initialGuests?: string;
  initialSortOrder?: string;
};

export default function SearchFilters({
  cities,
  initialCity,
  initialMaxPrice,
  initialGuests,
  initialSortOrder,
}: Props) {
  const router = useRouter();

  const [city, setCity] = useState(initialCity ?? "");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice ?? "");
  const [guests, setGuests] = useState(initialGuests ?? "");
  const [sortOrder, setSortOrder] = useState(initialSortOrder ?? "");

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const query = new URLSearchParams();
    if (city) query.set("city", city);
    if (maxPrice) query.set("max_price", maxPrice);
    if (guests) query.set("max_guests", guests);
    if (sortOrder) query.set("sort_order", sortOrder);

    router.push(`/search?${query.toString()}`);
  }

  function handleClear() {
    router.push("/search");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row md:items-end gap-3 mb-6"
    >
      <label className="text-sm font-semibold">
        Stad
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
        >
          <option value="">Alla Städer</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-semibold">
        Maxpris per natt
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="t.ex. 2000"
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
        />
      </label>

      <label className="text-sm font-semibold">
        Antal gäster
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="1"
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
        />
      </label>

      <label className="text-sm font-semibold">
        Sortera
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 font-normal"
        >
          <option value="">Ingen sortering</option>
          <option value="asc">Pris: lägst först</option>
          <option value="desc">Pris: högst först</option>
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer"
        >
          Sök
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="border border-gray-300 px-5 py-2 rounded-lg cursor-pointer"
        >
          Rensa
        </button>
      </div>
    </form>
  );
}
