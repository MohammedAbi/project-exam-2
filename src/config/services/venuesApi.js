import { PROFILES_ENDPOINTS, VENUES_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

export const venuesApi = {
  // GET all venues
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

  // GET venues by owner
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

  // GET single venue
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

  // CREATE a venue
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

  // UPDATE a venue
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

  // DELETE a venue
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
  // Search venues
  searchVenues: async (query, limit = 10, page = 1, accessToken = null) => {
    const url = new URL(`${VENUES_ENDPOINTS.BASE}/search`);
    url.searchParams.append("q", query);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);

    const response = await fetch(url.toString(), {
      headers: getHeaders(accessToken),
    });

    if (!response.ok) {
      throw new Error(
        `Search failed: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();

    // The search API returns an object with { data: [...] }
    return json.data || [];
  },
};
