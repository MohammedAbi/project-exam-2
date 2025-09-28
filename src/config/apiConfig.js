/**
 * Base URL for the Holidaze API, loaded from environment variables.
 * @constant {string}
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * API key for authenticating with the Holidaze API, loaded from environment variables.
 * @constant {string}
 */
export const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Endpoints related to bookings in the Holidaze API.
 * @namespace BOOKINGS_ENDPOINTS
 */
export const BOOKINGS_ENDPOINTS = {
  /** Base endpoint for bookings */
  BASE: `${API_BASE_URL}/holidaze/bookings`,

  /**
   * Get a single booking by ID.
   * @param {string|number} id - The booking ID.
   * @returns {string} Full URL for the booking endpoint.
   */
  SINGLE: (id) => `${API_BASE_URL}/holidaze/bookings/${id}`,
};

/**
 * Endpoints related to venues in the Holidaze API.
 * @namespace VENUES_ENDPOINTS
 */
export const VENUES_ENDPOINTS = {
  /** Base endpoint for venues */
  BASE: `${API_BASE_URL}/holidaze/venues`,

  /**
   * Get a single venue by ID.
   * @param {string|number} id - The venue ID.
   * @returns {string} Full URL for the venue endpoint.
   */
  SINGLE: (id) => `${API_BASE_URL}/holidaze/venues/${id}`,
};

/**
 * Endpoints related to profiles in the Holidaze API.
 * @namespace PROFILES_ENDPOINTS
 */
export const PROFILES_ENDPOINTS = {
  /** Base endpoint for profiles */
  BASE: `${API_BASE_URL}/holidaze/profiles`,

  /**
   * Get a single profile by name.
   * @param {string} name - The profile name.
   * @returns {string} Full URL for the profile endpoint.
   */
  SINGLE: (name) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}`,

  /**
   * Get bookings for a specific profile.
   * @param {string} name - The profile name.
   * @returns {string} Full URL for the profile bookings endpoint.
   */
  BOOKINGS: (name) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}/bookings`,

  /**
   * Get venues managed by a specific profile.
   * @param {string} profileName - The profile name.
   * @returns {string} Full URL for the profile venues endpoint.
   */
  VENUES: (profileName) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(profileName)}/venues`,

  /**
   * Search for profiles by query string.
   * @param {string} query - The search query.
   * @returns {string} Full URL for the profile search endpoint.
   */
  SEARCH: (query) =>
    `${API_BASE_URL}/holidaze/profiles/search?q=${encodeURIComponent(query)}`,
};
