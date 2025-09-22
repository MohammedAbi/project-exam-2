import { PROFILES_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

export const profilesApi = {
  /**
   * Get a single profile by name
   */
  async getProfile(name, accessToken) {
    try {
      const response = await fetch(
        `${PROFILES_ENDPOINTS.SINGLE(name)}?_bookings=true&_venues=true`,
        {
          headers: getHeaders(accessToken),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch profile");

      const json = await response.json();
      return json.data; // ✅ Return only the data
    } catch (error) {
      console.error(`Failed to fetch profile ${name}:`, error);
      throw error;
    }
  },

  async getBookings(name, accessToken) {
    try {
      const response = await fetch(
        `${PROFILES_ENDPOINTS.BOOKINGS(name)}?_venue=true&sort=created&sortOrder=desc`,
        {
          headers: getHeaders(accessToken),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");

      const json = await response.json();
      return json.data; // ✅ Now includes venue info
    } catch (error) {
      console.error(`Failed to fetch bookings for ${name}:`, error);
      throw error;
    }
  },

  /**
   * Get venues for a profile
   */
  async getVenues(name, accessToken) {
    try {
      const response = await fetch(PROFILES_ENDPOINTS.VENUES(name), {
        headers: getHeaders(accessToken),
      });
      if (!response.ok) throw new Error("Failed to fetch venues");

      const json = await response.json();
      return json.data; // ✅ Return only the data
    } catch (error) {
      console.error(`Failed to fetch venues for ${name}:`, error);
      throw error;
    }
  },

  /**
   * Update a user profile
   */
  async updateProfile(name, updatedData, accessToken) {
    try {
      const response = await fetch(PROFILES_ENDPOINTS.SINGLE(name), {
        method: "PUT",
        headers: getHeaders(accessToken),
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update profile");

      const json = await response.json();
      return json.data; // You can also return just `json.data` here
    } catch (error) {
      console.error(`Failed to update profile ${name}:`, error);
      throw error;
    }
  },

  /**
   * Search profiles by name
   */
  async searchProfiles(query, accessToken) {
    try {
      const response = await fetch(PROFILES_ENDPOINTS.SEARCH(query), {
        headers: getHeaders(accessToken),
      });
      if (!response.ok) throw new Error("Failed to search profiles");

      const json = await response.json();
      return json.data; // Return only search results
    } catch (error) {
      console.error(`Failed to search profiles with "${query}":`, error);
      throw error;
    }
  },
};
