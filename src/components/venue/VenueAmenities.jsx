// src/components/venue/VenueAmenities.jsx
import {
  FaWifi,
  FaParking,
  FaUtensils,
  FaPaw,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";

export default function VenueAmenities({ meta, price, maxGuests }) {
  return (
    <>
      <div className="flex flex-wrap gap-6 text-lg font-semibold text-green-700 mb-8">
        <span className="flex items-center gap-2 min-w-[160px]">
          <FaDollarSign className="text-yellow-600 text-2xl" /> ${price} per
          night
        </span>
        <span className="flex items-center gap-2 min-w-[160px]">
          <FaUsers className="text-yellow-600 text-2xl" /> Max guests:{" "}
          {maxGuests}
        </span>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
          {meta.wifi && (
            <div className="flex items-center gap-3">
              <FaWifi className="text-yellow-600 text-2xl" /> WiFi
            </div>
          )}
          {meta.parking && (
            <div className="flex items-center gap-3">
              <FaParking className="text-yellow-600 text-2xl" /> Parking
            </div>
          )}
          {meta.breakfast && (
            <div className="flex items-center gap-3">
              <FaUtensils className="text-yellow-600 text-2xl" /> Breakfast
            </div>
          )}
          {meta.pets && (
            <div className="flex items-center gap-3">
              <FaPaw className="text-yellow-600 text-2xl" /> Pets Allowed
            </div>
          )}
        </div>
      </div>
    </>
  );
}
