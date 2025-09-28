import { useEffect, useState } from "react";
import { fetchBookings } from "../config/services/bookingsApi";

/**
 * Custom hook to fetch and manage user bookings.
 *
 * @param {string|null} accessToken - User's access token for API authentication
 * @returns {{ bookings: Array, loading: boolean }} Object containing bookings array and loading state
 */
export function useBookings(accessToken) {
  /** @type {[Array, Function]} bookings state and setter */
  const [bookings, setBookings] = useState([]);

  /** @type {[boolean, Function]} loading state for async fetching */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetch bookings from API and update state
     */
    async function loadBookings() {
      try {
        const data = await fetchBookings(accessToken);
        setBookings(data); // setBookings with the actual array, no extra .data
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      loadBookings();
    } else {
      setLoading(false);
      setBookings([]);
    }
  }, [accessToken]);

  return { bookings, loading };
}
