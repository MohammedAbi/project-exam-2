import React from "react";
import { Link } from "react-router-dom";
import { BsPeople } from "react-icons/bs";

export default function VenueCard({ venue }) {

  const { id, name, description, media, maxGuests, price, location } = venue;

  const image = media?.[0]?.url || "/placeholder.jpg";
  const alt = media?.[0]?.alt || name;

  return (
    <div className="bg-white shadow-2xl min-h-[500px] group rounded-lg overflow-hidden">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="group-hover:scale-110 transition-all duration-300 w-full h-60 object-cover"
        />
      </div>

      {/* Info strip */}
      <div className="bg-white shadow-sm max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-medium tracking-wide text-base">
        <div className="flex justify-center w-[80%]">
          <div className="flex items-center gap-x-2">
            <div className="text-purple-600">
              <BsPeople className="text-[18px]" />
            </div>
            <div className="flex gap-x-1">
              <div>Max</div>
              <div>{maxGuests || 1}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center px-4">
        <Link to={`/venue/${id}`}>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-1">
          {location.city}, {location.country}
        </p>
        <p className="text-gray-700 text-sm mb-4">
          {description ? `${description.slice(0, 56)}...` : "No description"}
        </p>
      </div>

      {/* Book now button */}
      <Link
        to={`/venue/${id}`}
        className="block w-full max-w-[300px] mx-auto mb-4 py-2 rounded-md bg-purple-600 text-white text-center font-medium hover:bg-purple-700 transition"
      >
        Book now from ${price}
      </Link>
    </div>
  );
}
