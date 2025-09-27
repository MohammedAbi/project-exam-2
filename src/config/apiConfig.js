export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;

// Bookings endpoints
export const BOOKINGS_ENDPOINTS = {
  BASE: `${API_BASE_URL}/holidaze/bookings`,
  SINGLE: (id) => `${API_BASE_URL}/holidaze/bookings/${id}`,
};

// Venues endpoints
export const VENUES_ENDPOINTS = {
  BASE: `${API_BASE_URL}/holidaze/venues`,
  SINGLE: (id) => `${API_BASE_URL}/holidaze/venues/${id}`,
};

// Profiles endpoints
export const PROFILES_ENDPOINTS = {
  BASE: `${API_BASE_URL}/holidaze/profiles`,
  SINGLE: (name) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}`,
  BOOKINGS: (name) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}/bookings`,
  VENUES: (profileName) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(profileName)}/venues`,
  SEARCH: (query) =>
    `${API_BASE_URL}/holidaze/profiles/search?q=${encodeURIComponent(query)}`,
};
