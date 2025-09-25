import React from "react";

export default function VenueActions({ onEdit, onDelete }) {
  return (
    <div className="inline-flex justify-center gap-1 sm:gap-2">
      <button
        onClick={onEdit}
        className="px-3 sm:px-4 py-1 sm:py-2 rounded bg-blue-600 text-white text-xs sm:text-sm hover:bg-blue-700 transition"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-3 sm:px-4 py-1 sm:py-2 rounded bg-red-600 text-white text-xs sm:text-sm hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}
