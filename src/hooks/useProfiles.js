import { getHeaders } from "../apiHeaders";
import { PROFILES_ENDPOINTS } from "../config/apiConfig";

/**
 * Fetch the bookings for a user profile from the API.
 *
 * @param {string} token - The user's access token for authentication.
 * @returns {Promise<Object>} A promise that resolves to the JSON response containing the user's bookings.
 * @throws Will throw an error if the API request fails.
 */
export async function fetchBooking(token) {
  const response = await fetch(PROFILES_ENDPOINTS.SINGLE, {
    headers: getHeaders(token),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
}
