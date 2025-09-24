// src/components/venue/VenueHeader.jsx
import { FaStar } from "react-icons/fa";

export default function VenueHeader({ venue }) {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-4">{venue.name}</h1>
      <p className="text-gray-600 mb-2 text-lg font-medium">
        {venue.location?.city}, {venue.location?.country}
      </p>
      <p className="text-yellow-600 text-xl mb-6 flex items-center gap-1">
        <FaStar /> {venue.rating}/5
      </p>
      <p className="text-gray-800 mb-8 text-lg">{venue.description}</p>
    </>
  );
}
