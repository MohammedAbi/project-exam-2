import { useParams, useLocation } from "react-router-dom";
import BookingForm from "../components/forms/BookingForm";
import { useAuth } from "../hooks/useAuth";
import {
  FaWifi,
  FaParking,
  FaUtensils,
  FaPaw,
  FaStar,
  FaDollarSign,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { venuesApi } from "../config/services/venuesApi";

export default function VenueDetails() {
  const { auth } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const guests = queryParams.get("guests") || "";

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const data = await venuesApi.getVenueById(id, auth?.accessToken, {
          _bookings: true,
          _owner: true,
        });
        setVenue(data.data); // assuming API response has { data: {...} }
      } catch (err) {
        setError(err.message || "Failed to load venue");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, auth?.accessToken]);

  if (loading) {
    return <div className="p-6 text-center">Loading venue details...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Error loading venue: {error}
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Venue not found
      </div>
    );
  }

  const venueBookings = venue.bookings || [];
  console.log("Existing bookings for this venue:", venueBookings);
  venueBookings.forEach((b) => {
    console.log(
      `Booking ID: ${b.id}, From: ${b.dateFrom}, To: ${b.dateTo}, Guests: ${b.guests}`
    );
  });

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        {venue.media?.length > 0 && (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || `${venue.name} main image`}
            className="w-full mb-12 rounded-lg shadow-lg object-cover max-h-[450px]"
          />
        )}

        <div className="flex flex-col lg:flex-row flex-wrap gap-12">
          <div className="lg:flex-1 min-w-0">
            <h1 className="text-4xl font-extrabold mb-4">{venue.name}</h1>
            <p className="text-gray-600 mb-2 text-lg font-medium">
              {venue.location?.city}, {venue.location?.country}
            </p>
            <p className="text-yellow-600 text-xl mb-6 flex items-center gap-1">
              <FaStar /> {venue.rating}/5
            </p>
            <p className="text-gray-800 mb-8 text-lg">{venue.description}</p>

            <div className="flex flex-wrap gap-6 text-lg font-semibold text-green-700 mb-8">
              <span className="flex items-center gap-2 min-w-[160px]">
                <FaDollarSign className="text-yellow-600 text-2xl" /> $
                {venue.price} per night
              </span>
              <span className="flex items-center gap-2 min-w-[160px]">
                <FaUsers className="text-yellow-600 text-2xl" /> Max guests:{" "}
                {venue.maxGuests}
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
                {venue.meta.wifi && (
                  <div className="flex items-center gap-3">
                    <FaWifi className="text-yellow-600 text-2xl" /> WiFi
                  </div>
                )}
                {venue.meta.parking && (
                  <div className="flex items-center gap-3">
                    <FaParking className="text-yellow-600 text-2xl" /> Parking
                  </div>
                )}
                {venue.meta.breakfast && (
                  <div className="flex items-center gap-3">
                    <FaUtensils className="text-yellow-600 text-2xl" />{" "}
                    Breakfast
                  </div>
                )}
                {venue.meta.pets && (
                  <div className="flex items-center gap-3">
                    <FaPaw className="text-yellow-600 text-2xl" /> Pets Allowed
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">Location</h2>
              <p className="flex items-center gap-2 text-lg text-gray-700">
                <FaMapMarkerAlt className="text-yellow-600" />{" "}
                {venue.location.address}, {venue.location.zip}{" "}
                {venue.location.city}, {venue.location.country}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Host</h2>
              <div className="flex items-center gap-4">
                <img
                  src={venue?.owner?.avatar.url}
                  alt={venue?.owner?.avatar.alt || venue?.owner?.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <p className="font-semibold text-lg">{venue.owner?.name}</p>
                  <p className="text-gray-600">{venue.owner?.bio}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:w-[400px] w-full p-4 lg:p-8 rounded-lg shadow-lg flex flex-col gap-8 min-w-0">
            <h2 className="text-2xl font-semibold">Your Reservation</h2>
            <BookingForm
              venueId={venue.id}
              defaultGuests={guests || ""}
              maxGuests={venue.maxGuests}
              accessToken={auth?.accessToken}
              existingBookings={venue.bookings}
            />

            <div>
              <h3 className="text-2xl font-semibold mb-4">Venue Rules</h3>
              <ul className="flex flex-col gap-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <FaStar className="text-yellow-600" /> Check-In: 3:00 PM –
                  09:00 PM
                </li>
                <li className="flex items-center gap-3">
                  <FaStar className="text-yellow-600" /> Check-Out: 10:30 AM
                </li>
                <li className="flex items-center gap-3">
                  <FaStar className="text-yellow-600" /> No Smoking
                </li>
                <li className="flex items-center gap-3">
                  <FaStar className="text-yellow-600" /> Pets allowed:{" "}
                  {venue.meta.pets ? "Yes" : "No"}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
