// import { PROFILES_ENDPOINTS, VENUES_ENDPOINTS } from "../apiConfig";
// import { getHeaders } from "../apiHeaders";

// export const venuesApi = {
//   // GET all venues
//   async getAllVenues(
//     limit = 100,
//     page = 2,
//     accessToken = null,
//     sort = null,
//     sortOrder = null
//   ) {
//     try {
//       const url = new URL(VENUES_ENDPOINTS.BASE);
//       url.searchParams.append("limit", limit);
//       url.searchParams.append("page", page);
//       if (sort) url.searchParams.append("sort", sort);
//       if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

//       const response = await fetch(url.toString(), {
//         headers: getHeaders(accessToken),
//       });

//       return await response.json();
//     } catch (error) {
//       console.error("Failed to fetch venues:", error);
//       throw error;
//     }
//   },

//   // GET venues by owner
//   getVenuesByOwner: async (
//     ownerName,
//     limit = 10,
//     page = 1,
//     accessToken = null,
//     sort = null,
//     sortOrder = null
//   ) => {
//     const url = new URL(PROFILES_ENDPOINTS.VENUES(ownerName));
//     url.searchParams.append("limit", limit);
//     url.searchParams.append("page", page);
//     if (sort) url.searchParams.append("sort", sort);
//     if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

//     const headers = getHeaders(accessToken);

//     const response = await fetch(url.toString(), { headers });
//     if (!response.ok) {
//       throw new Error(
//         `Error fetching venues for owner ${ownerName}: ${response.status} ${response.statusText}`
//       );
//     }

//     return response.json();
//   },

//   // GET single venue
//   getVenueById: async (id, accessToken = null, options = {}) => {
//     try {
//       const url = new URL(VENUES_ENDPOINTS.SINGLE(id));
//       if (options._bookings) url.searchParams.append("_bookings", "true");
//       if (options._owner) url.searchParams.append("_owner", "true");

//       const response = await fetch(url.toString(), {
//         headers: getHeaders(accessToken),
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Error fetching venue ${id}: ${response.status} ${response.statusText}`
//         );
//       }

//       return response.json();
//     } catch (error) {
//       console.error(`Failed to fetch venue ${id}:`, error);
//       throw error;
//     }
//   },

//   // CREATE a venue
//   createVenue: async (venueData, accessToken) => {
//     const response = await fetch(VENUES_ENDPOINTS.BASE, {
//       method: "POST",
//       headers: getHeaders(accessToken),
//       body: JSON.stringify(venueData),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.errors?.[0]?.message || "Failed to create venue");
//     }

//     return response.json();
//   },

//   // UPDATE a venue
//   updateVenue: async (id, venueData, accessToken) => {
//     const response = await fetch(VENUES_ENDPOINTS.SINGLE(id), {
//       method: "PUT",
//       headers: getHeaders(accessToken),
//       body: JSON.stringify(venueData),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.errors?.[0]?.message || "Failed to update venue");
//     }

//     return response.json();
//   },

//   // DELETE a venue
//   deleteVenue: async (id, accessToken) => {
//     const response = await fetch(VENUES_ENDPOINTS.SINGLE(id), {
//       method: "DELETE",
//       headers: getHeaders(accessToken),
//     });

//     if (response.status === 204) return true;

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.errors?.[0]?.message || "Failed to delete venue");
//     }

//     return data;
//   },
// };

import { PROFILES_ENDPOINTS, VENUES_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

/**
 * Service object for interacting with Venues API endpoints.
 * Provides methods to get, create, update, and delete venues.
 */
export const venuesApi = {
  /**
   * Fetch all venues with optional pagination and sorting.
   * @param {number} [limit=100] - Number of items per page.
   * @param {number} [page=2] - Page number.
   * @param {string|null} [accessToken=null] - User access token.
   * @param {string|null} [sort=null] - Field to sort by.
   * @param {"asc"|"desc"|null} [sortOrder=null] - Sort order.
   * @returns {Promise<Object>} API response containing venues and metadata.
   * @throws {Error} Throws if the fetch fails.
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
   * Fetch venues created by a specific owner.
   * @param {string} ownerName - Username of the venue owner.
   * @param {number} [limit=10] - Number of items per page.
   * @param {number} [page=1] - Page number.
   * @param {string|null} [accessToken=null] - User access token.
   * @param {string|null} [sort=null] - Field to sort by.
   * @param {"asc"|"desc"|null} [sortOrder=null] - Sort order.
   * @returns {Promise<Object>} API response containing venues.
   * @throws {Error} Throws if the fetch fails or returns non-OK status.
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

    const headers = getHeaders(accessToken);
    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(
        `Error fetching venues for owner ${ownerName}: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  /**
   * Fetch a single venue by ID with optional related data.
   * @param {string|number} id - Venue ID.
   * @param {string|null} [accessToken=null] - User access token.
   * @param {Object} [options={}] - Optional flags.
   * @param {boolean} [options._bookings=false] - Include bookings.
   * @param {boolean} [options._owner=false] - Include owner info.
   * @returns {Promise<Object>} API response with venue data.
   * @throws {Error} Throws if the fetch fails or returns non-OK status.
   */
  getVenueById: async (id, accessToken = null, options = {}) => {
    try {
      const url = new URL(VENUES_ENDPOINTS.SINGLE(id));
      if (options._bookings) url.searchParams.append("_bookings", "true");
      if (options._owner) url.searchParams.append("_owner", "true");

      const response = await fetch(url.toString(), {
        headers: getHeaders(accessToken),
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching venue ${id}: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch venue ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new venue.
   * @param {Object} venueData - Venue details to create.
   * @param {string} accessToken - User access token.
   * @returns {Promise<Object>} API response with created venue.
   * @throws {Error} Throws if creation fails.
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
   * Update an existing venue by ID.
   * @param {string|number} id - Venue ID.
   * @param {Object} venueData - Updated venue details.
   * @param {string} accessToken - User access token.
   * @returns {Promise<Object>} API response with updated venue.
   * @throws {Error} Throws if update fails.
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
   * Delete a venue by ID.
   * @param {string|number} id - Venue ID.
   * @param {string} accessToken - User access token.
   * @returns {Promise<Object|boolean>} True if deleted successfully, or API response.
   * @throws {Error} Throws if deletion fails.
   */
  deleteVenue: async (id, accessToken) => {
    const response = await fetch(VENUES_ENDPOINTS.SINGLE(id), {
      method: "DELETE",
      headers: getHeaders(accessToken),
    });

    if (response.status === 204) return true;

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Failed to delete venue");
    }

    return data;
  },
};
