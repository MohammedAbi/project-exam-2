import { getHeaders } from "../apiHeaders";
import { PROFILES_ENDPOINTS } from "../config/apiConfig";

export async function fetchBooking(token) {
  const response = await fetch(PROFILES_ENDPOINTS.SINGLE, {
    headers: getHeaders(token),
  });
  console.log(response);
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
}
