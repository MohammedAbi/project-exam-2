import { API_KEY } from "./apiConfig";

/**
 * Generate headers for API requests.
 *
 * @param {string} [accessToken] - Optional access token for authenticated requests.
 * @returns {Object} Headers object suitable for fetch requests.
 *
 * @example
 * const headers = getHeaders("myAccessToken");
 * fetch(url, { method: "GET", headers });
 */
export function getHeaders(accessToken) {
  return {
    // Include Authorization header only if accessToken is provided
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    "X-Noroff-API-Key": API_KEY,
    "Content-Type": "application/json",
  };
}
