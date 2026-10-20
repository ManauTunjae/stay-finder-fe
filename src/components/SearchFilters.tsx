"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  cities: string[];
  initialCity?: string;
  initialMaxPrice?: string;
  intialGuests?: string;
  initialSortOrder?: string;
};

export default function SearchFilters({
    cities.
    initialCity,
    initialMaxPrice,
    initialGuests,
    initialSortOrder,
}: Props) {
    const router = useRouter();

    const [city, setCity] = useState(initialCity ?? "");
    const [maxPrice, setMaxPrice] = useState(initialMaxPrice ?? "");
    const [guests, setGuests] = useState(initialGuests ?? "");
    const [sortOrder, setSortOrder] = useState(initialSortOrder ?? "")

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        const query = new URLSearchParams();
        if (city) query.set("city", city);
        if (maxPrice) query.set("max_price", maxPrice);
        if (guests) query.set("max_guests", guests);
        if (sortOrder) query.set("sort_order", sortOrder);

        router.push(`/search${query.toString()}`);
    }
}
