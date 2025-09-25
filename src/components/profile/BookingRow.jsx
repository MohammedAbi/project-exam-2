import React, { useState } from "react";
import { BsPeople } from "react-icons/bs";
import ConfirmModal from "../ConfirmModal";
import { createPortal } from "react-dom";

export default function BookingRow({ booking, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const venue = booking.venue || {};

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    onDelete(booking.id);
    setIsModalOpen(false);
  };

  return (
    <>
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
        <td className="px-6 py-4 text-right">
          <button
            onClick={handleDeleteClick}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded bg-red-600 text-white text-xs sm:text-sm hover:bg-red-700 transition"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Render modal*/}
      {isModalOpen &&
        createPortal(
          <ConfirmModal
            isOpen={isModalOpen}
            title="Delete Booking"
            message={`Are you sure you want to delete booking for "${
              venue.name || "this venue"
            }"?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />,
          document.body
        )}
    </>
  );
}
