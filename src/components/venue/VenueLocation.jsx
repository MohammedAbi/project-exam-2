// src/components/venue/VenueLocation.jsx
import { FaMapMarkerAlt } from "react-icons/fa";

export default function VenueLocation({ location }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-2">Location</h2>
      <p className="flex items-center gap-2 text-lg text-gray-700">
        <FaMapMarkerAlt className="text-yellow-600" />
        {location.address}, {location.zip} {location.city}, {location.country}
      </p>
    </div>
  );
}
