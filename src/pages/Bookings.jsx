import { FaCalendarAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { venues } from "../data/venues";

export default function Bookings() {
  // Flatten all bookings from all venues with venue reference
  const bookings = venues.flatMap((venueWrapper) =>
    venueWrapper.data.bookings.map((booking) => ({
      ...booking,
      venue: venueWrapper.data,
    }))
  );

  if (bookings.length === 0) {
    return (
      <section className="py-24 container mx-auto max-w-4xl px-6 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-6">Your Upcoming Bookings</h1>
        <p>No upcoming bookings found.</p>
      </section>
    );
  }

  return (
    <section className="py-24 container mx-auto max-w-6xl px-6">
      <h1 className="text-4xl font-extrabold mb-12">Your Upcoming Bookings</h1>

      <div className="flex flex-col gap-10">
        {bookings.map((booking) => {
          const { venue } = booking;
          const fromDate = new Date(booking.dateFrom).toLocaleDateString();
          const toDate = new Date(booking.dateTo).toLocaleDateString();

          return (
            <div
              key={booking.id}
              className="flex flex-col lg:flex-row gap-6 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Venue Image */}
              <img
                src={venue.media?.[0]?.url}
                alt={venue.media?.[0]?.alt || venue.name}
                className="w-full lg:w-64 h-48 object-cover"
              />

              {/* Booking & Venue Details */}
              <div className="flex flex-col flex-1 p-6">
                {/* <Link
                  to={`/venue/${venue.id}?date=${booking.dateFrom}`}
                  className="text-2xl font-bold text-purple-700 hover:underline"
                >
                  {venue.name}
                </Link> */}
                {/* <Link
                  to={`/venue/${venue.id}?dateFrom=${booking.dateFrom}&dateTo=${booking.dateTo}`}
                  className="text-2xl font-bold text-purple-700 hover:underline"
                >
                  {venue.name}
                </Link> */}
                <Link
                  to={`/venue/${venue.id}?dateFrom=${booking.dateFrom}&dateTo=${booking.dateTo}&guests=${booking.guests}`}
                  className="text-2xl font-bold text-purple-700 hover:underline"
                >
                  {venue.name}
                </Link>

                <p className="text-gray-600 my-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-600" />
                  {venue.location.city}, {venue.location.country}
                </p>

                <p className="text-gray-700 mt-3">{venue.description}</p>

                <div className="flex flex-wrap gap-6 text-lg font-semibold text-purple-700 mt-6">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt /> {fromDate} - {toDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaUsers /> Guests: {booking.guests}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
