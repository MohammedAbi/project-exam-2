import { BOOKINGS_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

/**
 * @typedef {Object} BookingData
 * @property {string} venueId - ID of the venue to book.
 * @property {string} dateFrom - Booking start date in ISO format (YYYY-MM-DD).
 * @property {string} dateTo - Booking end date in ISO format (YYYY-MM-DD).
 * @property {number} [guests] - Number of guests (optional).
 * @property {string} [additionalInfo] - Any additional information for the booking.
 */

/**
 * Bookings API utility to create and delete bookings.
 */
export const bookingsApi = {
  /**
   * Creates a new booking for a venue.
   *
   * @async
   * @param {BookingData} bookingData - Data for the booking to create.
   * @param {string} accessToken - User access token for authentication.
   * @throws {Error} Throws if the API request fails.
   * @returns {Promise<Object>} Resolves with the created booking data.
   */
  async createBooking(bookingData, accessToken) {
    const response = await fetch(BOOKINGS_ENDPOINTS.BASE, {
      method: "POST",
      headers: getHeaders(accessToken),
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    const json = await response.json();
    return json.data;
  },

  /**
   * Deletes a booking by ID.
   *
   * @async
   * @param {string} id - ID of the booking to delete.
   * @param {string} accessToken - User access token for authentication.
   * @throws {Error} Throws if deletion fails.
   * @returns {Promise<boolean>} Returns true if deletion was successful.
   */
  async deleteBooking(id, accessToken) {
    const response = await fetch(BOOKINGS_ENDPOINTS.SINGLE(id), {
      method: "DELETE",
      headers: getHeaders(accessToken),
    });

    if (response.status === 204) {
      return true; // ✅ deleted successfully
    }

    const data = await response.json();
    throw new Error(data.errors?.[0]?.message || "Failed to delete booking");
  },
};
