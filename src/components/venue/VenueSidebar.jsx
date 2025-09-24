// src/components/venue/VenueSidebar.jsx
import BookingForm from "../forms/BookingForm";
import VenueRules from "./VenueRules";

export default function VenueSidebar({ venue, defaultGuests, accessToken }) {
  return (
    <aside className="lg:w-[400px] w-full p-4 lg:p-8 rounded-lg shadow-lg flex flex-col gap-8 min-w-0">
      <h2 className="text-2xl font-semibold">Your Reservation</h2>
      <BookingForm
        venueId={venue.id}
        defaultGuests={defaultGuests}
        maxGuests={venue.maxGuests}
        accessToken={accessToken}
        existingBookings={venue.bookings}
      />
      <VenueRules petsAllowed={venue.meta.pets} />
    </aside>
  );
}
