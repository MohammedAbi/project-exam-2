// src/components/venue/VenueRules.jsx
import { FaStar } from "react-icons/fa";

export default function VenueRules({ petsAllowed }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Venue Rules</h3>
      <ul className="flex flex-col gap-4 text-lg text-gray-700">
        <li className="flex items-center gap-3">
          <FaStar className="text-yellow-600" /> Check-In: 3:00 PM – 09:00 PM
        </li>
        <li className="flex items-center gap-3">
          <FaStar className="text-yellow-600" /> Check-Out: 10:30 AM
        </li>
        <li className="flex items-center gap-3">
          <FaStar className="text-yellow-600" /> No Smoking
        </li>
        <li className="flex items-center gap-3">
          <FaStar className="text-yellow-600" /> Pets allowed:{" "}
          {petsAllowed ? "Yes" : "No"}
        </li>
      </ul>
    </div>
  );
}
