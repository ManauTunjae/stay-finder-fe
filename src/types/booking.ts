export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  booking_id: string;
  property_id: string;
  guest_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  properties?: {
    title: string;
    city: string;
  } | null;
};

export type NewBooking = {
  property_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
};
