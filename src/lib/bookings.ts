import type { Booking, NewBooking } from "@/types/booking";

const API_URL = "/api";

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function getMyBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_URL}/bookings`, {
    credentials: "include",
  });
  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(json.error ?? "Kunde inte hämta bokningar", res.status);
  }
  return json.data;
}

export async function createdBooking(data: NewBooking): Promise<Booking> {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      json.error ?? "Bokningen misslyckades",
      res.status,
      Object.fromEntries(json.errors ?? []),
    );
  }
  return json;
}

export async function cancelBooking(bookingId: string): Promise<Booking> {
  const res = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
    method: "PATCH",
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(json.error ?? "Kunde inte avboka", res.status);
  }
  return json;
}
