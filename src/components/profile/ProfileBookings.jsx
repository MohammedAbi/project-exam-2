import React from "react";
import BookingRow from "./BookingRow";

export default function ProfileBookings({ bookings }) {
  return (
    <section className="mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Venue Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Dates
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
