import React from "react";
import { BsPeople } from "react-icons/bs";

export default function BookingRow({ booking }) {
  const venue = booking.venue || {};
  return (
    <tr className="hover:bg-purple-50 transition-colors">
      <td className="px-6 py-4 text-sm">
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono">
          {booking.id.slice(0, 8) + "…"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-purple-700">
        {venue.name || "Unknown Venue"}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-1">
        {booking.guests}
        <BsPeople className="inline-block text-purple-600" />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
        {new Date(booking.dateTo).toLocaleDateString()}
      </td>
    </tr>
  );
}
