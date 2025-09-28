import { PROFILES_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

/**
 * @typedef {Object} ProfileData
 * @property {string} name
 * @property {string} email
 * @property {string} [bio]
 * @property {string} [avatar]
 * @property {string} [banner]
 * @property {boolean} [venueManager]
 */

/**
 * @typedef {Object} BookingData
 * @property {string} id
 * @property {string} venueId
 * @property {string} dateFrom
 * @property {string} dateTo
 * @property {Object} [venue] - Includes venue info if requested with `_venue=true`
 */

/**
 * @typedef {Object} VenueData
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} location
 */

/**
 * Profiles API utility to handle user profiles, bookings, and venues.
 */
export const profilesApi = {
  /**
   * Get a single profile by name.
   * @async
   * @param {string} name - Profile name (username).
   * @param {string} [accessToken] - Optional access token for authentication.
   * @throws {Error} Throws if fetching fails.
   * @returns {Promise<ProfileData>} Resolves with profile data.
   */
  async getProfile(name, accessToken) {
    try {
      const response = await fetch(
        `${PROFILES_ENDPOINTS.SINGLE(name)}?_bookings=true&_venues=true`,
        { headers: getHeaders(accessToken) }
      );
      if (!response.ok) throw new Error("Failed to fetch profile");

      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(`Failed to fetch profile ${name}:`, error);
      throw error;
    }
  },

  /**
   * Get bookings for a profile.
   * @async
   * @param {string} name - Profile name.
   * @param {string} [accessToken] - Optional access token.
   * @throws {Error} Throws if fetching fails.
   * @returns {Promise<BookingData[]>} Resolves with an array of bookings.
   */
  async getBookings(name, accessToken) {
    try {
      const response = await fetch(
        `${PROFILES_ENDPOINTS.BOOKINGS(name)}?_venue=true&sort=created&sortOrder=desc`,
        { headers: getHeaders(accessToken) }
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");

      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(`Failed to fetch bookings for ${name}:`, error);
      throw error;
    }
  },

  /**
   * Get venues for a profile.
   * @async
   * @param {string} name - Profile name.
   * @param {string} [accessToken] - Optional access token.
   * @throws {Error} Throws if fetching fails.
   * @returns {Promise<VenueData[]>} Resolves with an array of venues.
   */
  async getVenues(name, accessToken) {
    try {
      const response = await fetch(PROFILES_ENDPOINTS.VENUES(name), {
        headers: getHeaders(accessToken),
      });
      if (!response.ok) throw new Error("Failed to fetch venues");

      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(`Failed to fetch venues for ${name}:`, error);
      throw error;
    }
  },

  /**
   * Update a user profile.
   * @async
   * @param {string} name - Profile name.
   * @param {ProfileData} updatedData - Updated profile information.
   * @param {string} [accessToken] - Access token for authentication.
   * @throws {Error} Throws if updating fails.
   * @returns {Promise<ProfileData>} Resolves with the updated profile data.
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
      return json.data;
    } catch (error) {
      console.error(`Failed to update profile ${name}:`, error);
      throw error;
    }
  },

  /**
   * Search profiles by query string.
   * @async
   * @param {string} query - Search query (name or partial name).
   * @param {string} [accessToken] - Optional access token.
   * @throws {Error} Throws if searching fails.
   * @returns {Promise<ProfileData[]>} Resolves with an array of matching profiles.
   */
  async searchProfiles(query, accessToken) {
    try {
      const response = await fetch(PROFILES_ENDPOINTS.SEARCH(query), {
        headers: getHeaders(accessToken),
      });
      if (!response.ok) throw new Error("Failed to search profiles");

      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(`Failed to search profiles with "${query}":`, error);
      throw error;
    }
  },
};
