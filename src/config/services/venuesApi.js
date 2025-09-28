import { PROFILES_ENDPOINTS, VENUES_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

/**
 * API helper for managing venues.
 */
export const venuesApi = {
  /**
   * Fetch all venues with optional pagination and sorting.
   *
   * @param {number} [limit=100] - Number of venues per page.
   * @param {number} [page=2] - Page number.
   * @param {string|null} [accessToken=null] - User access token for protected endpoints.
   * @param {string|null} [sort=null] - Sort field.
   * @param {string|null} [sortOrder=null] - Sort order ("asc" or "desc").
   * @returns {Promise<Object>} API response with venues data and meta info.
   * @throws {Error} Throws if the request fails.
   */
  async getAllVenues(
    limit = 100,
    page = 2,
    accessToken = null,
    sort = null,
    sortOrder = null
  ) {
    try {
      const url = new URL(VENUES_ENDPOINTS.BASE);
      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);
      if (sort) url.searchParams.append("sort", sort);
      if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

      const response = await fetch(url.toString(), {
        headers: getHeaders(accessToken),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch venues:", error);
      throw error;
    }
  },

  /**
   * Fetch venues owned by a specific user.
   *
   * @param {string} ownerName - Profile name of the owner.
   * @param {number} [limit=10] - Number of venues per page.
   * @param {number} [page=1] - Page number.
   * @param {string|null} [accessToken=null] - User access token.
   * @param {string|null} [sort=null] - Sort field.
   * @param {string|null} [sortOrder=null] - Sort order ("asc" or "desc").
   * @returns {Promise<Object>} API response with venues data.
   * @throws {Error} Throws if the request fails.
   */
  getVenuesByOwner: async (
    ownerName,
    limit = 10,
    page = 1,
    accessToken = null,
    sort = null,
    sortOrder = null
  ) => {
    const url = new URL(PROFILES_ENDPOINTS.VENUES(ownerName));
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    if (sort) url.searchParams.append("sort", sort);
    if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

    const response = await fetch(url.toString(), {
      headers: getHeaders(accessToken),
    });
    if (!response.ok)
      throw new Error(
        `Error fetching venues for owner ${ownerName}: ${response.status} ${response.statusText}`
      );
    return response.json();
  },

  /**
   * Fetch a single venue by ID.
   *
   * @param {string|number} id - Venue ID.
   * @param {string|null} [accessToken=null] - User access token.
   * @param {Object} [options={}] - Optional query parameters.
   * @param {boolean} [options._bookings] - Include bookings in the response.
   * @param {boolean} [options._owner] - Include owner info in the response.
   * @returns {Promise<Object>} API response with venue data.
   * @throws {Error} Throws if the request fails.
   */
  getVenueById: async (id, accessToken = null, options = {}) => {
    try {
      const url = new URL(VENUES_ENDPOINTS.SINGLE(id));
      if (options._bookings) url.searchParams.append("_bookings", "true");
      if (options._owner) url.searchParams.append("_owner", "true");

      const response = await fetch(url.toString(), {
        headers: getHeaders(accessToken),
      });
      if (!response.ok)
        throw new Error(
          `Error fetching venue ${id}: ${response.status} ${response.statusText}`
        );
      return response.json();
    } catch (error) {
      console.error(`Failed to fetch venue ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new venue.
   *
   * @param {Object} venueData - Data for the new venue.
   * @param {string} accessToken - User access token.
   * @returns {Promise<Object>} Created venue data.
   * @throws {Error} Throws if the request fails.
   */
  createVenue: async (venueData, accessToken) => {
    const response = await fetch(VENUES_ENDPOINTS.BASE, {
      method: "POST",
      headers: getHeaders(accessToken),
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errors?.[0]?.message || "Failed to create venue");
    }

    return response.json();
  },

  /**
   * Update an existing venue.
   *
   * @param {string|number} id - Venue ID.
   * @param {Object} venueData - Updated venue data.
   * @param {string} accessToken - User access token.
   * @returns {Promise<Object>} Updated venue data.
   * @throws {Error} Throws if the request fails.
   */
  updateVenue: async (id, venueData, accessToken) => {
    const response = await fetch(VENUES_ENDPOINTS.SINGLE(id), {
      method: "PUT",
      headers: getHeaders(accessToken),
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errors?.[0]?.message || "Failed to update venue");
    }

    return response.json();
  },

  /**
   * Delete a venue.
   *
   * @param {string|number} id - Venue ID.
   * @param {string} accessToken - User access token.
   * @returns {Promise<boolean|Object>} True if deleted, otherwise API response data.
   * @throws {Error} Throws if deletion fails.
   */
  deleteVenue: async (id, accessToken) => {
    const response = await fetch(VENUES_ENDPOINTS.SINGLE(id), {
      method: "DELETE",
      headers: getHeaders(accessToken),
    });

    if (response.status === 204) return true;

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.errors?.[0]?.message || "Failed to delete venue");
    return data;
  },

  /**
   * Search venues by query.
   *
   * @param {string} query - Search query string.
   * @param {number} [limit=10] - Number of results per page.
   * @param {number} [page=1] - Page number.
   * @param {string|null} [accessToken=null] - User access token.
   * @returns {Promise<Array>} Array of matching venues.
   * @throws {Error} Throws if the request fails.
   */
  searchVenues: async (query, limit = 10, page = 1, accessToken = null) => {
    const url = new URL(`${VENUES_ENDPOINTS.BASE}/search`);
    url.searchParams.append("q", query);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);

    const response = await fetch(url.toString(), {
      headers: getHeaders(accessToken),
    });
    if (!response.ok)
      throw new Error(
        `Search failed: ${response.status} ${response.statusText}`
      );

    const json = await response.json();
    return json.data || [];
  },
};
