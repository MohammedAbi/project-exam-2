import React, { useState } from "react";
import { toast } from "react-toastify";
import BookingRow from "./BookingRow";
import { bookingsApi } from "../../config/services/bookingsApi";
import { getAccessToken } from "../../config/services/authStorage";

export default function ProfileBookings({ bookings: initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings || []);

  const handleDelete = async (id) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      toast.error("You must be logged in to delete a booking.");
      return;
    }

    try {
      await bookingsApi.deleteBooking(id, accessToken);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    } catch (err) {
      toast.error(err.message || "Could not delete booking");
    }
  };

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
                <th className="px-6 py-3 text-right text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <BookingRow
                  key={booking.id}
                  booking={booking}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
