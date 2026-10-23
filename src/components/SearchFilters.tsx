"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTodayDate } from "@/lib/date";

type Props = {
  cities: string[];
  initialCity?: string;
  initialMaxPrice?: string;
  initialGuests?: string;
  initialSortOrder?: string;
  initialQ?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

export default function SearchFilters({
  cities,
  initialCity,
  initialMaxPrice,
  initialGuests,
  initialSortOrder,
  initialQ,
  initialCheckIn,
  initialCheckOut,
}: Props) {
  const router = useRouter();

  const [city, setCity] = useState(initialCity ?? "");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice ?? "");
  const [guests, setGuests] = useState(initialGuests ?? "");
  const [sortOrder, setSortOrder] = useState(initialSortOrder ?? "");
  const [q, setQ] = useState(initialQ ?? "");
  const [checkIn, setCheckIn] = useState(initialCheckIn ?? "");
  const [checkOut, setCheckOut] = useState(initialCheckOut ?? "");
  const [dateError, setDateError] = useState<string | null>(null);

  const today = getTodayDate();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const query = new URLSearchParams();
    if (city) query.set("city", city);
    if (maxPrice) query.set("max_price", maxPrice);
    if (guests) query.set("max_guests", guests);
    if (sortOrder) query.set("sort_order", sortOrder);
    if (q.trim()) query.set("q", q.trim());

    setDateError(null);

    if ((checkIn && !checkOut) || (!checkIn && checkOut)) {
      setDateError("Välj både incheckning och utbeckning");
      return;
    }

    if (checkIn && checkOut) {
      query.set("check_in", checkIn);
      query.set("check_out", checkOut);
    }
    router.push(`/search?${query.toString()}`);
  }

  function handleClear() {
    router.push("/search");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 border border-gray-300 rounded-2xl p-4 mb-6 grid grid-cols-2 md:grid-cols-6 gap-3 md:items-end"
    >
      <label className="text-sm font-semibold col-span-2 md:flex-1">
        Sök
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="t.ex. villa, loft, Södermalm"
          maxLength={80}
          className="block w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        />
      </label>

      <label className="text-sm font-semibold md:flex-1">
        Stad
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bblock w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        >
          <option value="">Alla Städer</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-semibold md:flex-1">
        Maxpris per natt
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="t.ex. 2000"
          className="block w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        />
      </label>

      <label className="text-sm font-semibold md:flex-1">
        Antal gäster
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="1"
          className="block w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        />
      </label>

      <label className="text-sm font-semibold md:flex-1">
        Sortera
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="block w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        >
          <option value="">Ingen sortering</option>
          <option value="asc">Pris: lägst först</option>
          <option value="desc">Pris: högst först</option>
        </select>
      </label>

      <label className="text-sm font-semibold md:flex-1">
        Incheckning
        <input
          type="date"
          min={today}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="block w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        />
      </label>

      <label className="text-sm font-semibold md:flex-1">
        Utcheckning
        <input
          type="date"
          min={checkIn || today}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="block w-full h-11 border border-gray-300 rounded-lg px-3 mt-1 font-normal bg-white"
        />
      </label>

      <div className="col-span-2 flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer"
        >
          Sök
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-white border border-gray-300 text-black px-5 py-2 rounded-lg font-semibold cursor-pointer"
        >
          Rensa
        </button>
      </div>
      {dateError && (
        <p className="col-span-2 md:col-span-1 text-sm text-red-600">
          {dateError}
        </p>
      )}
    </form>
  );
}
