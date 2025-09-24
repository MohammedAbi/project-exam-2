// src/pages/VenueDetailsPage.jsx
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { venuesApi } from "../config/services/venuesApi";
import LoadingSpinner from "../components/LoadingSpinner";
import VenueDetails from "../components/venue/VenueDetails";

export default function VenueDetailsPage() {
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
        setVenue(data.data);
      } catch (err) {
        setError(err.message || "Failed to load venue");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, auth?.accessToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
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

  return (
    <VenueDetails
      venue={venue}
      defaultGuests={guests}
      accessToken={auth?.accessToken}
    />
  );
}
